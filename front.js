// 0729までにコメント最後のコードまで書き終わること
// ユーザーが入力する取引先名フォームの要素(htmlのタグの情報)を取得（id="client-form"のもの）

//キャメルケース（camelCase）とは？
// 最初の単語は小文字で始まり、
// 2語目以降の単語の頭文字を大文字にする書き方です。
// 例：
// userName
// fetchDataFromServer
// clientFormFromFront
// formを指定してからinputを指定することで、
// フォームの中の特定の要素を取得できます。
// form単位でスコープを絞る書き方。
// getElementByIdとは？
// HTMLの要素を取得するためのメソッドで、
// 指定したIDを持つ要素を返します。
// 例：document.getElementById("client-form")は、
// IDが"client-form"の要素を指定します。
// JavaScript における document は、
// 「現在表示されている HTML ドキュメント全体」を指すオブジェクト

// element は HTML内の <form> や <div>、<input> などの「1つ1つの部品（パーツ）」を指します。
// element の意味
// 「要素」という意味。
// フォームが送信されたときの動きをここに書くよ
form.addEventListener("submit", function (event) {
  event.preventDefault(); // ページが勝手に再読み込みされるのを止める EVENT

  // フォームの中の「取引先名」の入力値を取る
  // 「定義するだけで値が取れるのか？」という疑問に対しては、
  //  ✅ 正しく書かれていれば、それだけで取得できます。
  // clientNameとはhtmlのinputタグのname属性で既に指定されている。
  // ここで初めてinputに入力された取引先名を取得する。
  const clientName = document.getElementById("clientName").value;

  // 送るデータをまとめる（名前と値のセットにする）
  const data = { clientName: clientName };

  // サーバーにデータを送るよ（POSTでJSON形式）
  // const port = 7777; とserver.jsで指定済み
  //   headers: { "Content-Type": "application/json" } は
  // 「中身の形式が JSON ですよ」とサーバーに伝えているだけです。
  // データの変換そのもの（整形）はしていません。
  fetch("http://localhost:7777/api/clients", {
    method: "POST", // 送る方法はPOST（新しい情報を送る）
    headers: {
      "Content-Type": "application/json", // JSONで送りますよ、の合図
    },
    body: JSON.stringify(data), // JavaScriptのデータを文字列に変換して送る　const data = { clientName: clientName };で定義したものを送る。
    // fetchは文字列しか送れない。{ clientName: clientName }をJSON.stringify(data)で{"clientName":"株式会社ABC"}に変換する。ダブルコーテーションを付けるだけ。
    // fetchは、JavaScriptでHTTPリクエストを送るための関数です。
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
