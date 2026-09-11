#!/usr/bin/env node
/**
 * Design system guardrails.
 *
 * Enforces the machine-checkable rules from DESIGN.md (section 16 "自動チェック") so the
 * visual language stays consistent no matter who — or which AI — writes the code.
 *
 *   npm run check:design
 *
 * A line containing `design-check-ignore` is skipped. Only use it with a comment that
 * explains why, and prefer extending the design system instead.
 */
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');

const violations = [];
const report = (file, line, rule, message) => violations.push({ file, line, rule, message });

// ---------------------------------------------------------------------------
// Files
// ---------------------------------------------------------------------------

function listFiles() {
  try {
    return execSync('git ls-files --cached --others --exclude-standard', { cwd: root, encoding: 'utf8' })
      .split('\n')
      .filter(Boolean)
      .filter((file) => fs.existsSync(path.join(root, file)));
  } catch {
    const walk = (dir) =>
      fs.readdirSync(path.join(root, dir), { withFileTypes: true }).flatMap((entry) => {
        const child = path.join(dir, entry.name);
        if (['node_modules', '.next', '.git'].includes(entry.name)) return [];
        return entry.isDirectory() ? walk(child) : [child];
      });
    return walk('.');
  }
}

const allFiles = listFiles();
const sourceFiles = allFiles.filter((file) => /^src\/.*\.(jsx?|tsx?)$/.test(file));
const textFiles = allFiles.filter(
  (file) =>
    !/(^|\/)package-lock\.json$/.test(file) &&
    file !== 'scripts/check-design.mjs' &&
    /\.(jsx?|tsx?|mjs|cjs|json|md|mdx|css|html|ya?ml|txt|svg)$/.test(file),
);

// ---------------------------------------------------------------------------
// Line rules for component source (src/**/*.js[x])
// ---------------------------------------------------------------------------

const PALETTE =
  'slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose';
const COLOR_UTILS =
  'bg|text|border(?:-[trblxyse])?|ring|ring-offset|outline|fill|stroke|from|via|to|shadow|decoration|divide|placeholder|caret';
const SPACING_ALLOWED = new Set(['0', '1', '1.5', '2', '2.5', '3', '4', '5', '6', '8', '10', '12', '16', '24', '32', '36', '48']);
const isPrimitive = (file) => file.startsWith('src/components/ui/');

const lineRules = [
  {
    id: 'color/raw-palette',
    pattern: new RegExp(`(?<![\\w-])(?:${COLOR_UTILS})-(?:(?:${PALETTE})-\\d{2,3}|white|black)(?![\\w-])`, 'g'),
    message: 'Tailwind のパレット色は使わない。bg-surface / text-fg-muted などのトークンを使う（DESIGN.md §3）',
  },
  {
    id: 'color/literal',
    pattern: /['"`]#[0-9a-fA-F]{3,8}['"`]|\b(?:rgba?|hsla?)\(/g,
    message: '色の直書きは禁止。globals.css にトークンを追加する（DESIGN.md §3.4）',
  },
  {
    id: 'style/dark-variant',
    pattern: /(?<![\w-])dark:/g,
    message: 'dark: バリアントは使わない。テーマ差分はトークンの値で表現する（DESIGN.md §11）',
  },
  {
    id: 'style/arbitrary-value',
    pattern: /(?<![\w-])(?!grid-cols-|grid-rows-)[a-z][a-z0-9-]*-\[[^\]\s]+\]/g,
    message: '任意値（xxx-[...]）は禁止。スケールかトークンを使う。例外は grid-cols-[...] のみ（DESIGN.md §5）',
  },
  {
    id: 'style/inline-style',
    pattern: /style=\{\{(?![^}]*\b(?:animationDelay|transitionDelay)\b)/g,
    message: 'インラインスタイルはアニメーションの遅延（animationDelay / transitionDelay）以外禁止（DESIGN.md §9）',
  },
  {
    id: 'type/weight',
    pattern: /(?<![\w-])font-(?:thin|extralight|light|bold|extrabold|black)(?![\w-])/g,
    message: 'ウェイトは font-normal / font-medium / font-semibold のみ（DESIGN.md §4.3）',
  },
  {
    id: 'type/scale',
    pattern: /(?<![\w-])text-(?:xl|[3-9]xl)(?![\w-])/g,
    message: 'このサイズはスケール外。text-display / heading / title / lead / label / sm を使う（DESIGN.md §4.2）',
  },
  {
    id: 'type/primitive-only-size',
    pattern: /(?<![\w-])text-(?:base|lg|2xl)(?![\w-])/g,
    skip: isPrimitive,
    message: 'text-base / text-lg / text-2xl は src/components/ui の中だけで使う（DESIGN.md §4.2）',
  },
  {
    id: 'shape/radius',
    pattern: /(?<![\w-])rounded(?:-(?:t|b|l|r|s|e|tl|tr|bl|br|ss|se|es|ee))?(?:-(?:none|xs|md|lg|xl|2xl|3xl))?(?![\w-])/g,
    message: '角丸は rounded-control / rounded-card / rounded-full（フォーカス用に rounded-sm）のみ（DESIGN.md §7）',
  },
  {
    id: 'shape/shadow',
    pattern: /(?<![\w-])shadow(?:-(?:sm|md|lg|xl|2xl|inner|none))?(?![\w-])/g,
    message: '影は shadow-card のみ（DESIGN.md §7.3）',
  },
  {
    id: 'motion/duration',
    pattern: /(?<![\w-])duration-(?!(?:200|300|700)(?![\w-]))\d+(?![\w-])/g,
    message: 'duration は 200 / 300 / 700 のみ（DESIGN.md §9）',
  },
  {
    id: 'motion/easing',
    pattern: /(?<![\w-])ease-(?:linear|in|out|in-out)(?![\w-])/g,
    message: 'イージングを付けるときは ease-out-expo のみ（DESIGN.md §9）',
  },
  {
    id: 'layout/spacing-scale',
    pattern: /(?<![\w-])-?(?:m[trblxyse]?|p[trblxyse]?|gap(?:-[xy])?|space-[xy])-(\d+(?:\.\d+)?)(?![\w.])/g,
    test: (match) => !SPACING_ALLOWED.has(match[1]),
    message: `スペーシングはスケール内の値のみ: ${[...SPACING_ALLOWED].join(', ')}（DESIGN.md §5）`,
  },
  {
    id: 'layout/z-index',
    pattern: /(?<![\w-])z-(?!(?:10|20)(?![\w-]))\d+(?![\w-])/g,
    message: 'z-index は z-10 / z-20 のみ（DESIGN.md §6.5）',
  },
  {
    id: 'icon/library',
    pattern: /from\s+['"](?:react-icons|lucide-react|@heroicons)[^'"]*['"]/g,
    message: 'アイコンは Font Awesome のみ（DESIGN.md §10）',
  },
];

for (const file of sourceFiles) {
  read(file)
    .split('\n')
    .forEach((text, index) => {
      if (text.includes('design-check-ignore')) return;
      for (const rule of lineRules) {
        if (rule.skip?.(file)) continue;
        for (const match of text.matchAll(rule.pattern)) {
          if (rule.test && !rule.test(match)) continue;
          report(file, index + 1, rule.id, `${rule.message} — "${match[0]}"`);
        }
      }
    });
}

// ---------------------------------------------------------------------------
// Privacy: no personal contact details anywhere in the repository
// ---------------------------------------------------------------------------

const EMAIL = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g;
const EMAIL_ALLOWED = /@(?:users\.noreply\.github\.com|anthropic\.com)$|^noreply@|^git@github\.com$/;
const privacyRules = [
  { id: 'privacy/email', pattern: EMAIL, test: (m) => !EMAIL_ALLOWED.test(m[0]) },
  { id: 'privacy/mailto-tel', pattern: /\b(?:mailto|tel):/g },
  { id: 'privacy/phone', pattern: /(?:\+81[\s-]?\d{1,4}|(?<![\w-])0\d{1,4})-\d{1,4}-\d{3,4}(?!\d)/g },
];

for (const file of textFiles) {
  read(file)
    .split('\n')
    .forEach((text, index) => {
      if (text.includes('design-check-ignore')) return;
      for (const rule of privacyRules) {
        for (const match of text.matchAll(rule.pattern)) {
          if (rule.test && !rule.test(match)) continue;
          report(file, index + 1, rule.id, `個人の連絡先（メール・電話番号・連絡用リンク）はリポジトリに置かない（AGENTS.md）— "${match[0]}"`);
        }
      }
    });
}

// ---------------------------------------------------------------------------
// Structural checks
// ---------------------------------------------------------------------------

// Every color token exists in both themes and is exposed through tailwind.config.js.
{
  const css = read('src/app/globals.css');
  const block = (selector) => {
    const start = css.indexOf('{', css.indexOf(selector));
    return new Set([...css.slice(start, css.indexOf('}', start)).matchAll(/--color-([a-z-]+):/g)].map((m) => m[1]));
  };
  const light = block(':root');
  const dark = block("[data-theme='dark']");
  for (const name of light) if (!dark.has(name)) report('src/app/globals.css', 0, 'token/theme-parity', `--color-${name} がダークテーマにない`);
  for (const name of dark) if (!light.has(name)) report('src/app/globals.css', 0, 'token/theme-parity', `--color-${name} がライトテーマにない`);

  const config = read('tailwind.config.js');
  const exposed = new Set([...config.matchAll(/color\('([a-z-]+)'\)/g)].map((m) => m[1]));
  for (const name of light) {
    if (name !== 'shadow' && !exposed.has(name)) {
      report('tailwind.config.js', 0, 'token/unexposed', `--color-${name} が tailwind.config.js の colors に登録されていない`);
    }
  }
  for (const name of exposed) {
    if (!light.has(name)) report('tailwind.config.js', 0, 'token/undefined', `color('${name}') に対応する --color-${name} が globals.css にない`);
  }
}

// English and Japanese copy have the same shape.
{
  const tmp = path.join(os.tmpdir(), `site-content-${process.pid}.mjs`);
  fs.copyFileSync(path.join(root, 'src/content/site.js'), tmp);
  try {
    const { translations } = await import(pathToFileURL(tmp).href);
    const shape = (value, at, other, otherAt) => {
      if (Array.isArray(value)) {
        if (!Array.isArray(other)) return report('src/content/site.js', 0, 'i18n/parity', `${otherAt} が配列ではない`);
        const objects = value.some((item) => item && typeof item === 'object');
        if (objects && value.length !== other.length) {
          report('src/content/site.js', 0, 'i18n/parity', `${at} (${value.length}) と ${otherAt} (${other.length}) の件数が違う`);
        }
        if (objects) value.forEach((item, i) => other[i] && shape(item, `${at}[${i}]`, other[i], `${otherAt}[${i}]`));
        return;
      }
      if (value && typeof value === 'object') {
        for (const key of Object.keys(value)) {
          if (!(key in (other ?? {}))) report('src/content/site.js', 0, 'i18n/parity', `${otherAt}.${key} がない`);
          else shape(value[key], `${at}.${key}`, other[key], `${otherAt}.${key}`);
        }
        return;
      }
      if (typeof value === 'string' && value.trim() === '') report('src/content/site.js', 0, 'i18n/empty', `${at} が空文字`);
    };
    shape(translations.en, 'en', translations.ja, 'ja');
    shape(translations.ja, 'ja', translations.en, 'en');
  } finally {
    fs.rmSync(tmp, { force: true });
  }
}

// The site must stay out of search engines.
if (!/robots:\s*\{[\s\S]*?index:\s*false/.test(read('src/app/layout.js'))) {
  report('src/app/layout.js', 0, 'publish/noindex', 'metadata.robots の index: false を消さない（AGENTS.md）');
}
if (!/X-Robots-Tag[\s\S]*?noindex/.test(read('next.config.js'))) {
  report('next.config.js', 0, 'publish/noindex', 'X-Robots-Tag: noindex ヘッダーを消さない（AGENTS.md）');
}

// ---------------------------------------------------------------------------

if (violations.length === 0) {
  console.log(`✓ design check passed (${sourceFiles.length} source files, ${textFiles.length} text files)`);
  process.exit(0);
}

for (const v of violations) {
  console.log(`${v.file}${v.line ? `:${v.line}` : ''}  [${v.rule}]  ${v.message}`);
}
console.log(`\n✗ ${violations.length} design violation(s). See DESIGN.md.`);
process.exit(1);
