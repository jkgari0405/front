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
  //   headers: { "Content-Type": "application/json" } は「中身の形式が JSON ですよ」とサーバーに伝えているだけ。データの変換そのもの（整形）はしていない。

  fetch("http://localhost:7777/api/clients", {
    method: "POST", // 送る方法はPOST（新しい情報を送る）
    headers: {
      "Content-Type": "application/json", // JSONで送りますよ、の合図
    },
    //　application/json という表現は MIMEタイプ（インターネット標準）で決められた正式名称。
    // json だけだと意味が通じません。HTTPは厳密に標準に従います。
    //  bodyは  POST, PUT, PATCH など 何かを送信する場合に使います。
    // GET や DELETE では使いません。
    body: JSON.stringify(data), // JavaScriptのデータを文字列に変換して送る　const data = { clientName: clientName };で定義したものを送る。
    // fetchは文字列しか送れない。{ clientName: clientName }をJSON.stringify(data)で{"clientName":"株式会社ABC"}に変換する。ダブルコーテーションを付けるだけ。
    // fetchは、JavaScriptでHTTPリクエストを送るための関数です。
  })
    //   要素	説明
    // fetch()	Promise を返す関数（内部的に非同期処理）
    // .then()	Promise に対して「成功時の処理」を定義するメソッド
    // Promise	JavaScript の非同期処理を扱うための仕組み（fetch の中で使われている）
    //     JSON.stringify() は JavaScript → JSON文字列
    // response.json() は JSON文字列 → JavaScript
    // '{"success":true,"message":"登録完了"}'→{ success: true, message: "登録完了" }
    // 方法②：response.text() → JSON.parse()
    //   fetch("/api")
    // .then((response) => response.text()) // まず文字列として取り出す
    // .then((text) => {
    //   const data = JSON.parse(text);     // 手動で解析
    //   console.log("JSONオブジェクト:", data);
    // });
    // JavaScriptでの「オブジェクト」は：
    // 👉 「名前」と「値」のペア（key-value）をまとめたものです。
    // 例：
    // const user = {
    //   name: "Taro",
    //   age: 22
    // };
    // responceはオブジェクト。fetchの結果を受け取るためのもの。サーバーからの応答を表します。
    // responve.json()は、メソッソド。サーバーからの応答をJSON形式で受け取る。
    // .then((response) => response.json()) は、サーバーからの応答をJSON形式で受け取るための処理です。
    // つまり、サーバーが返したデータをJavaScriptのオブジェクトに変換しています。
    .then((response) => response.json())
    // result と response が指定するものは変わらないけど、response.json() で加工したものが result に来る
    .then((result) => {
      console.log("サーバーからの返事:", result);
      alert("登録が完了しました！");
      //  送信が成功したあと：フォームの中身（入力値）を消して
      // 「送信終わったよ！もう一度書いてね」っていう状態に戻したいから
      form.reset();
    })
    //     ✅ 2. 「resultの中でもさらに加工したら？」 → さらに .then() でつなげられる！
    // あなたが聞いているのはこういうことですね：

    // 「result の中でさらに加工したら、次はどうやって受け取るの？」

    // ✔ 回答：また .then() をつなげればOK！
    // js
    // コピーする
    // 編集する
    // fetch("/api")
    //   .then((response) => response.json())     // JSON → JSオブジェクトに
    //   .then((result) => {
    //     const userName = result.name;          // 加工：nameだけ取り出す
    //     return userName;                       // 加工した値を次へ渡す
    //   })
    //   .then((name) => {
    //     console.log("ユーザー名は:", name);     // nameを受け取る
    //   });
    .catch((error) => {
      console.error("送信でエラーが出たよ:", error);
      alert("送信に失敗しました。");
    });
});

// ✅ もし async/await で書いたらもっとスッキリ！！
// js
// コピーする
// 編集する
// const response = await fetch("/api");
// const result = await response.json();
// const name = result.name;
// console.log(name);
// then を連ねる代わりに、順番に書ける形になります。

// 質問したいことメモ
// .then((response) => response.json())     .then((result) => {       console.log("サーバーからの返事:", result);       alert("登録が完了しました！");       form.reset();     })     .catch((error) => {       console.error("送信でエラーが出たよ:", error);       alert("送信に失敗しました。");     }); });  この=>はどういう役割と意味か　なんで　responce jsonの後に空かっこがあるのか　しかもresultの後は　ふつうのかっこじゃなくて　限かっこがある　しかもthenとcatchが分けられているし　これも同じように　カッコで全体をかこって　コンソールエラーはおまけだと思うし　とにかく処理を中に書いている　responnceとその他の　メソッド？の違いとしては　中に動作が入っているかか？jsonに限定するというのがresponceの役割か　　後は限かっこのアロー関数？　がふょくわからんあん
