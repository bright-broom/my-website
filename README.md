# Toshiki Sakuta Web

作田敏希の個人ポートフォリオサイト。1 ページ構成で、英語 / 日本語とライト / ダークに対応しています。

- 本番: `main` への push で Vercel に自動デプロイ
- 検索エンジンには載せない設定です（`noindex`）

## 技術構成

Next.js 15（App Router）/ React 19 / TypeScript（strict） / Tailwind CSS 3.4 / Font Awesome

## 開発

Node.js 22.12 以上の 22 系、または 24 以上を使います。CI は Node.js 22 です。

```bash
npm ci
npm run dev            # http://localhost:3000
npm run check          # 型・デザイン・未使用コードをまとめて検査
npm run check:types    # TypeScript strict 検査
npm run check:deadcode # 未使用ファイル・export・依存の検査
npm run test:behavior  # 言語・テーマ・メニュー等の操作確認（本番ビルドを含む）
npm run build          # 本番ビルド
```

## ドキュメント

| ファイル | 内容 |
|---|---|
| [DESIGN.md](DESIGN.md) | デザインガイド。カラー、タイポグラフィ、スペーシング、レイアウト、コンポーネント、判断基準 |
| [AGENTS.md](AGENTS.md) | 作業ルール（AI エージェント・人間共通）。プライバシーと公開範囲のルールを含む |

## 構成

| 場所 | 内容 |
|---|---|
| `src/app/` | レイアウト、ページ、色トークン（`globals.css`） |
| `src/components/ui/` | 汎用 UI 部品 |
| `src/components/site/` | ページのセクション（Header / Hero / About / Works / Contact / Footer） |
| `src/content/site.ts` | 文言とリンク（en / ja） |
| `scripts/check-design.ts` | ルールの自動検査（GitHub Actions でも実行） |

## TypeScript と未使用コード

アプリ、Next.js / Tailwind 設定、検査スクリプト、テストは TypeScript です。PostCSS 設定は処理を持たない JSON にしています。
`allowJs: false`、`strict`、未使用の変数・引数の検査を有効にし、Knip で未使用ファイル・export・依存を検査します。既存の UI 部品はすべて参照されているため維持しています。

Next.js 15 は `next.config.ts` を読み込めます。Next.js が参照する PostCSS も修正版の 8.5.28 に揃えるため、`overrides` で直接依存と同じ版に固定しています。更新時には `npm audit` とビルドを確認してください。

見た目を変えない変更では、変更前に `npm run test:visual:baseline`、変更後に `npm run test:visual` を実行します。基準画像は同一端末・ブラウザーで撮影し、許容差は 0 ピクセルです。
