# Webpack Guides

webpack.js.orgのガイド (Getting Started)を試す https://webpack.js.org/guides/
https://webpack.js.org/guides/getting-started/


## Getting Started

* 最初にREADME.md作成
* 先にpackage.jsonを初期生成
```
npm init -y
```

* localにインストールがオススメ
```
npm install --save-dev webpack
npm install --save-dev webpack-cli
```
* ellintインストール初期設定
```
npm install -g eslint
eslint --init
```
初期設定で色々聞かれて、local devにeslint関連モジュールがインストールされる

* packageをプライベートに
  *  `"main": "index.js"`を削除して、不注意によるpublishを防ぐ

* npmでpeerのエラーが出るとき

https://stackoverflow.com/questions/46053414/npm-warn-requires-a-peer-of-but-none-is-installed-you-must-install-peer
  -gは--save等の方が良い？
```
npm install -g npm-install-peers
```
上記ではうまく行かなかったので、node_moduleaディレクトリを削除して再構築
```
npm cache clean
npm install
```

* JavaScriptのスタイル
  Standardsではセミコロンは省略
  https://standardjs.com/#the-rules

* Q: dist/index.htmlは直接編集する？

## Asset Management
* CSS等のローダーをwebpack.config.jsに指定

## Output Management
* distのjsやindex.htmlを自動生成
  * index.htmlはHtmlWebpackPluginで生成

## githubで管理開始
* githubにリポジトリ作成
* ローカルgitをリモートに紐付け

```
git remote add origin https://github.com/ddpi/webpack-guides.git
git push --set-upstream origin master
```
* 参考 https://qiita.com/riversun/items/29d5264480dd06c7b9fb

## Development
* webpack.config.jsに`devtoo: 'inline-source-map'`でbundle前のソースでのエラー表示
* package.jsonのscriptsに`"watch": "webpack --watch"`追加、`$ npm run watch`でソース変更ごとに再ビルドされる
* webpack-dev-serverの使用
  * webpack.config.jsに以下を指定
  * WebSocket関連のエラー([WDS] Disconnected)、Type Errorが発生している。要対応
```
  devServer: {
    contentBase: './dist',
    open: 'Google Chrome', // ブラウザをChromeに指定
    headers: { 'Access-Control-Allow-Origin': '*' }, // [WDS] Disconnected対応。https://github.com/webpack/webpack-dev-server/issues/851
    disableHostCheck: true // 同上
  },
```
* webpack-dev-middlewareを利用
  * expressをインストールして、server.jsを追加
  * こちらではwebpack-dev-serverで出ていたエラーは出ない

## Hot Module Replacement
* webpack-hot-middlewareを利用（webpack-dev-serverではエラー）
* 以下のURLを参照
* https://github.com/webpack-contrib/webpack-hot-middleware
* https://github.com/webpack-contrib/webpack-hot-middleware/blob/master/example/webpack.config.js
* server.jsをwebpack-hot-middlewareを使うよう設定
* index.jsにprint.jsの変更を検出するよう`module.hot.accept`追加
* リビルドしただけではDOMツリーは更新されていない。`module.hot.accept`のコールバックでDOMを変更する必要あり

## Tree Shaking
* 不要なexportをbundleに入れない
* webpack.config.jsに以下を指定
  ```
  mode: 'development',
  optimization: {
    usedExports: true
  }
  ```
* modeをproductionにするとminifyされ、利用されていないexportも削除される
* CSSはpackage.jsonのsideEffectsに追加すべし（importされたところで処理されるものはsideEffectsに追加）

## Production
* webpack-mergeを使ってwebpack.config.jsをcommon, dev, prodの3つに分割
* webpack-mergeは、JSON内の定義を「うまく」マージしてくれる様子 https://github.com/survivejs/webpack-merge
* package.jsonのscriptsで指定しているwebpack系のエントリーにはどのconfigを使うか指定
* nodeを呼び出しているエントリー(server)は、server.js内に参照するconfigを指定した（切り替えられる用法が良い？）
* prodでも`devtool: 'source-map'`は指定した方が良いらしい。ただし、公開しないよう注意　　https://webpack.js.org/configuration/devtool/

## Code Splitting
* エントリーポイントを複数にした場合のモジュールの重複を避けるためのwebpack.conifg.js指定
```
optimization: {
  splitChunks: {
    chunks: 'all'
  }
}
```
* scriptの先頭でimportしないダイナミックインポート
* Prefetch, Preload

## Lazy Loading
* ボタンが押されたタイミングでインポートするサンプル

## Caching
* `npm run build`から生成されるjsを分割し、ハッシュ値で管理
* さらにnode_module内のbundleはハッシュを変更しない

## Progressive Web Application
* オフラインでも動作するようWorkboxを追加