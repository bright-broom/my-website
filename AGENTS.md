# AGENTS.md

このリポジトリで作業する AI エージェント（Claude Code、Codex、Cursor、Copilot など）と人間のための作業ルール。
**UI・スタイル・文言に触る前に、必ず [DESIGN.md](DESIGN.md) を読むこと。**

## プロジェクト

- 作田敏希の個人ポートフォリオサイト（1 ページ構成、英語 / 日本語、ライト / ダーク）
- Next.js 14（App Router）/ React 18 / JavaScript（TypeScript なし）/ Tailwind CSS 3.4 / Font Awesome
- `main` への push で Vercel の本番（toshiki-sakuta-web.vercel.app）に自動デプロイされる

## コマンド

| コマンド | 用途 |
|---|---|
| `npm run dev` | 開発サーバー（http://localhost:3000） |
| `npm run build` | 本番ビルド（開発サーバーと同時に実行しない。どちらも `.next` を使うため） |
| `npm run check:design` | デザインシステム・プライバシー・多言語・検索除外のルール検査 |
| `npm run test:visual:baseline` | 見た目の基準画像を撮る（8 通り＋モバイルメニュー。変更前のコードで実行） |
| `npm run test:visual` | 基準画像と 1 ピクセル単位で比較する（本番ビルドをポート 3100 で起動するので、開発サーバーは止めておく） |

## ファイル構成

```
src/app/globals.css        色トークン（ライト / ダーク）とベーススタイル
tailwind.config.js         トークンの公開、文字サイズ・角丸・影・モーション
src/app/layout.js          フォント、テーマ初期化スクリプト、metadata（noindex）
src/app/page.jsx           セクションの並び、テーマと言語の状態
src/components/ui/         見た目のルールを持つ汎用部品（プリミティブ）
src/components/site/       ページのセクション（プリミティブを組み合わせるだけ）
src/content/site.js        すべての文言とリンク（en / ja）
scripts/check-design.mjs   ルールの自動検査
tests/visual/              見た目の比較テスト（Playwright）。基準画像は端末ごとに撮るので Git 管理しない
DESIGN.md                  デザインガイド（トークン・部品・判断基準）
```

## 必ず守るルール

### デザイン

1. 色・文字サイズ・余白・角丸・影・動きは、DESIGN.md に定義されたトークンとスケールだけを使う。パレット色（`bg-blue-600`）、任意値（`p-[13px]`）、`dark:` バリアント、`style` 属性でのスタイル指定は使わない
2. 見た目のルールは `src/components/ui/` にだけ書く。セクションでは既存のプリミティブを使い、足りなければバリアントを追加する（DESIGN.md §17）
3. 新しいトークン・バリアント・プリミティブを作ったら、同じコミットで DESIGN.md の該当箇所と変更履歴（§22）を更新する
4. 以前の紫〜ピンクのグラデーション中心のデザインに戻す方向の変更はしない（DESIGN.md §18）

### コンテンツ

5. 表示する文字列は `src/content/site.js` に置き、`en` と `ja` の両方を同じキー構造で書く
6. 文体と表記は DESIGN.md §14 に従う（誇張しない、和文と英数字の間に半角スペース）

### プライバシーと公開範囲

7. **個人の連絡先（メールアドレス、電話番号、番地までの住所）をリポジトリのどこにも書かない。** コード、文言、README、コメント、テストデータ、コミットメッセージを含む。所在地は「東京」のように都市名まで
8. **コミットの作成者メールは GitHub の noreply アドレスを使う**（`git config user.email` を確認してから commit する）。個人のメールアドレスでコミットしない
9. **検索エンジン除外の設定を消さない。** `src/app/layout.js` の `metadata.robots`（`index: false`）と、`next.config.js` の `X-Robots-Tag: noindex` ヘッダー

## 作業の完了条件

UI に関わる変更は、次をすべて満たして完了とする。

1. `npm run check:design` が通る
2. `npm run build` が通る
3. 見た目を変えない変更（リファクタリング、ライブラリの更新など）: 変更前のコードで `npm run test:visual:baseline`、変更後に `npm run test:visual` を実行し、差分がゼロである
4. 見た目を変える変更: 幅 390px と 1440px × ライトとダーク × 英語と日本語の 8 通りで、意図した変化だけであること、表示崩れと横スクロールがないことを確認した（`npm run test:visual` の差分画像 `playwright-report/` が使える）
5. DESIGN.md §19 のチェックリストを満たす

確認できなかった項目があれば、完了報告でそう明記する。

## Git

- 変更はブランチを切って PR にする。履歴の書き換え（force push）は、持ち主の明示的な指示があるときだけ
- コミットメッセージは英語の命令形で、何を・なぜ変えたかがわかるように書く

## 既知の課題

DESIGN.md §20 を参照（お問い合わせフォームの送信処理なし、実績ページ未作成、入力欄の枠のコントラストなど）。
課題に触れる変更をしたら、§20 を更新する。
