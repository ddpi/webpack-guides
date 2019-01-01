# Webpack Guides

webpack.js.orgのガイド (Getting Started)を試す https://webpack.js.org/guides/
https://webpack.js.org/guides/getting-started/


## メモ
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
