// フォームを取得
const form = document.getElementById("client-form");
const form = document.getElementById("client-form");
const form = document.getElementById("client-form");
// コードを何回も書くことで答えを見ないでコーディングできるのがなんとなくわかってきた。

// フォーム送信時の処理
form.addEventListener("submit", async (event) => {
  event.preventDefault(); // デフォルトの送信（ページリロード）を止める

  //   form.addEventListener("submit", async (event) =>{
  //     event.preventDefault();
  // //     とにかく書く！！
  //     form.addEventListener})
});

// 入力値を取得
const clientName = document.getElementById("clientName").value;

// 送信するデータをオブジェクトにまとめる
const data = { clientName };

try {
  // サーバーにデータを送信
  const response = await fetch("http://localhost:7777/api/clients", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  // await fetchです。　この　httpを待ちます　そのhttpが来たら　以下の処理を実行します。
  // try {
  //     const response = await fetch("http://localhost:7777/api/clients",{

  //     })

  // }

  // サーバーからの応答を取得
  // 上のawait(fetchのリクエストに対するレスポンス)が終わるまで　const responcwの行まで行かない
  const result = await response.json();

  // 結果を表示
  // await があるので、Promise が解決するまで次の行（console.log や alert など）は待機する
  console.log("サーバーからの返事:", result);
  // console.log("文字列", 変数);

  alert("登録が完了しました！");

  // フォームをリセット
  form.reset();
} catch (error) {
  console.error("送信でエラーが出たよ:", error);
  alert("送信に失敗しました。");
}

// 練習用 Promise + setTimeout
// const log = (num) => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       console.log(num);
//       resolve();
//     }, 1000);
//   });
// };

// const func = async () => {
//   await log(3);
//   await log(2);
//   await log(1);
// };

// func();

// // Promiseの基本例
// new Promise((resolve) => {
//   setTimeout(() => {
//     resolve("データ完了");
//   }, 1000);
// }).then((result) => {
//   console.log(result); // → "データ完了"
// });
