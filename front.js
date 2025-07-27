// 0727までにコメント最後のコードまで書き終わること
// フォームの要素を取得（id="client-form"のもの）
const clientFormFromFront = document.getElementById("client-form");

// フォームが送信されたときの動きをここに書くよ
form.addEventListener("submit", function (event) {
  event.preventDefault(); // ページが勝手に再読み込みされるのを止める EVENT

  // フォームの中の「取引先名」の入力値を取る
  // 「定義するだけで値が取れるのか？」という疑問に対しては、
  //  ✅ 正しく書かれていれば、それだけで取得できます。
  const clientName = document.getElementById("clientName").value;

  // 送るデータをまとめる（名前と値のセットにする）
  const data = { clientName: clientName };

  // サーバーにデータを送るよ（POSTでJSON形式）
  fetch("http://localhost:7777/api/clients", {
    method: "POST", // 送る方法はPOST（新しい情報を送る）
    headers: {
      "Content-Type": "application/json", // JSONで送りますよ、の合図
    },
    body: JSON.stringify(data), // JavaScriptのデータを文字列に変換して送る
  });
});

//     .then((response) => response.json()) // サーバーからの返事をJSONで受け取る
//     .then((result) => {
//       console.log("サーバーからの返事:", result);
//       alert("登録が完了しました！"); // 送った後にユーザーにお知らせ
//       form.reset(); // フォームの中身を空に戻す
//     })
//     .catch((error) => {
//       console.error("送信でエラーが出たよ:", error);
//       alert("送信に失敗しました。"); // 失敗したときにお知らせ
//     });
// });
