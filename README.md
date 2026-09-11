# Toshiki Sakuta Web

作田敏希の個人ポートフォリオサイト。1 ページ構成で、英語 / 日本語とライト / ダークに対応しています。

- 本番: `main` への push で Vercel に自動デプロイ
- 検索エンジンには載せない設定です（`noindex`）

## 技術構成

Next.js 14（App Router）/ React 18 / JavaScript / Tailwind CSS 3.4 / Font Awesome

## 開発

```bash
npm install
npm run dev            # http://localhost:3000
npm run check:design   # デザインシステムのルール検査
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
| `src/content/site.js` | 文言とリンク（en / ja） |
| `scripts/check-design.mjs` | ルールの自動検査（GitHub Actions でも実行） |
