const express = require("express");
const app = express();
const port = 7777;

app.listen(port, () => {
  console.log(`サーバーが http://localhost:${port} で起動中です！`);
});

//app.listen(port); のみでも動く。
//() =>{  } はアロー関数と呼ばれる書き方で、関数を簡潔に書くためのもの。

//Expressの主な役割
// 1 サーバー起動	HTTPリクエストを受けて応答する
// 2 ルーティング	URLごとに処理を振り分ける（例：/clients、/users）
// 3 JSONパース	req.body を自動で読み取ってくれる
// 4 ミドルウェア対応	ログ出力・バリデーション・認証などを途中で挟める
// 5 静的ファイル配信	HTMLや画像なども簡単に配れる
// 6 拡張性	他のライブラリやデータベースとつなぎやすい（MySQL、MongoDB など）

// package.json の役割を説明する
// ① ライブラリの管理	使ってるパッケージを記録する	Express など
// ② スクリプト登録	短いコマンドで実行できるようにする	npm start など
// ③ プロジェクト情報	名前・バージョン・説明などを記録	アプリ名など
// ④ 他の人が再現できる	npm install ですぐ同じ環境にできる	チーム開発に便利
