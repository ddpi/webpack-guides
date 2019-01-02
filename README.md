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