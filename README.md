# Toshiki Sakuta Web

作田敏希の個人ポートフォリオサイト。プロフィール・実績・お問い合わせを 1 ページにまとめ、英語 / 日本語とライト / ダークに対応しています。言語とテーマの選択はブラウザーに保存します。

`main` への push で Vercel に本番デプロイされます。検索エンジン向けには `noindex` を設定しています。これはアクセス制御の設定ではありません。

## 技術構成

| 用途 | 技術 |
|---|---|
| アプリ | Next.js 15（App Router）/ React 19 |
| 言語 | TypeScript 5.9（strict） |
| スタイル・アイコン | Tailwind CSS 3.4 / Font Awesome 6 |
| 検査 | TypeScript / 独自のデザイン検査 / Knip |
| ブラウザーテスト | Playwright（Chromium） |
| CI・デプロイ | GitHub Actions / Vercel |

アプリ、Next.js / Tailwind 設定、検査スクリプト、テストは TypeScript です。PostCSS 設定は処理を持たない JSON にしています。

## セットアップ

Node.js 22.12 以上の 22 系、または 24 以上が必要です。CI に合わせる場合は Node.js 22 と、同梱の npm 10 系を使います。

```bash
git clone git@github.com:bright-broom/my-website.git
cd my-website
npm ci
npm run dev
```

開発サーバーは [http://localhost:3000](http://localhost:3000) で起動します。現在のローカル起動には環境変数の設定は不要です。

本番ビルドをローカルで確認する場合は、開発サーバーを停止してから実行します。

```bash
npm run build
npm run start
```

`dev` と `build` は同じ `.next` を使うため、同時に実行しないでください。

## コマンド

| コマンド | 内容 |
|---|---|
| `npm run dev` | 開発サーバーを起動（ポート 3000） |
| `npm run build` | 本番ビルドを作成 |
| `npm run start` | 作成済みの本番ビルドを起動（ポート 3000） |
| `npm run check` | 型・デザイン・未使用コードの検査を順に実行 |
| `npm run check:types` | strict 型検査、未使用の変数・引数、UI の型テストを確認 |
| `npm run check:design` | デザイン・プライバシー・多言語・検索除外・JavaScript 再追加を検査 |
| `npm run check:deadcode` | Knip で未使用ファイル・export・依存を検査 |
| `npm run test:behavior` | 言語・テーマの保存、メニュー、フォームのラベルなどの操作を確認 |
| `npm run test:visual:baseline` | 変更前のコードから比較用の基準画像を取得・更新 |
| `npm run test:visual` | 基準画像との比較と操作テストを実行 |
| `npm audit` | 依存パッケージの既知の脆弱性を確認 |

## テスト

初回はテスト用の Chromium をインストールします。

```bash
npx playwright install chromium
```

Linux でブラウザーのシステム依存も必要な場合は、CI と同じ `npx playwright install --with-deps chromium` を使います。

### 操作テスト

```bash
npm run check
npm run test:behavior
```

言語・テーマの切り替えと再読み込み後の復元、無効な保存値やストレージ拒否時の操作、モバイルメニュー、入力ラベル、横はみ出し、検索除外設定などを確認します。

Playwright は本番ビルドを作り、ポート 3100 でサーバーを自動起動・終了します。実行前に開発サーバーを止め、ポート 3100 を空けてください。`test:behavior` と `test:visual` も同時には実行しません。

### 見た目の比較

見た目を変えない変更では、次の順序で確認します。

1. **コードを変更する前に** `npm run test:visual:baseline` で基準画像を保存する。
2. コードを変更し、`npm run check` を実行する。
3. `npm run test:visual` で変更前と比較する。

確認対象は、幅 390px / 1440px × 英語 / 日本語 × ライト / ダークの全画面 8 枚と、モバイルメニュー 4 枚です。許容差は 0 ピクセルです。

基準画像は `tests/visual/__screenshots__/` に保存され、Git 管理の対象外です。同一端末・同一ブラウザーで取得と比較を行います。変更後の画像で基準を上書きすると差分を検出できなくなるため、意図した見た目の変更をレビューするときだけ更新してください。結果と差分は `playwright-report/`、`test-results/` に出力されます。

## ファイル構成

| 場所 | 内容 |
|---|---|
| `src/app/layout.tsx` | フォント、描画前のテーマ初期化、検索除外の metadata |
| `src/app/page.tsx` | セクションの並び、テーマと言語の状態 |
| `src/app/globals.css` | ライト / ダークの色トークン、フォールバックフォント、ベーススタイル |
| `src/components/ui/` | 汎用 UI 部品と共通の型 |
| `src/components/site/` | Header / Hero / About / Works / Contact / Footer |
| `src/content/site.ts` | 文言（en / ja）、プロフィールリンク、ナビゲーション |
| `src/lib/cn.ts` | クラス名の結合 |
| `scripts/check-design.ts` | デザインなどのルール検査 |
| `tests/types/` | UI の引数・属性に対する型テスト |
| `tests/visual/` | 画面比較・操作テスト |
| `next.config.ts` | Next.js 設定、検索除外のレスポンスヘッダー |
| `tailwind.config.ts` | デザイントークンを公開する Tailwind 設定 |
| `postcss.config.json` | PostCSS プラグイン設定 |
| `tsconfig.json` / `knip.json` | 型検査・未使用コード検査の設定 |
| `playwright.config.ts` | 画面幅・テーマ・テストサーバーの設定 |

## 変更時のルール

UI・スタイル・表示文言を変更する前に [DESIGN.md](DESIGN.md)、作業全般については [AGENTS.md](AGENTS.md) を確認してください。

- 表示文言は `src/content/site.ts` に置き、英語と日本語を同じキー構造で管理します。
- 色・文字サイズなどは既存のトークンを使い、見た目のルールは `src/components/ui/` に集約します。
- `allowJs: false` と strict 型検査を維持します。不要なコードは削除し、Knip の検査で確認します。
- 個人のメールアドレス・電話番号・詳しい住所は、README やテストを含めてリポジトリに記載しません。コミット作成者には GitHub の noreply アドレスを使います。
- `layout.tsx` の `metadata.robots` と `next.config.ts` の `X-Robots-Tag` による検索除外を維持します。
- 変更はブランチを作って PR にまとめます。

Next.js が参照する PostCSS も 8.5.28 に揃えるため、`package.json` の `overrides` で直接依存と同じ版に固定しています。依存更新時は `npm audit`、型・デザイン・未使用コード検査、ビルド、画面比較を確認してください。

## CI とデプロイ

[GitHub Actions](.github/workflows/design-check.yml) は PR と `main` への push で実行されます。Node.js 22 で `npm ci`、`npm run check`、Chromium のインストール、`npm run test:behavior` を順に実行します。操作テストには本番ビルドも含まれます。

基準画像は端末ごとに異なるため、CI では画像比較を実行していません。見た目を変えない変更の差分ゼロ確認は、手元で実施します。

Vercel では PR のプレビューを確認し、`main` へのマージ後に本番のデプロイ結果を確認します。

## 既知の課題

- お問い合わせフォームには送信処理がありません。
- 実績カードのリンク先ページは未作成で、現在は 404 になります。
- 入力欄の枠のコントラストと、UI 部品の無効状態には改善が必要です。
- テーマと言語の状態はページ内にあり、複数ページへの共有は未対応です。

詳細と対応方針は [DESIGN.md の「既知の課題」](DESIGN.md#20-既知の課題) を参照してください。
