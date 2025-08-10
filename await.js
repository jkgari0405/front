// ✅ ユーザーが入力するフォーム（id="client-form"）を取得
// 1224
// formというのは　htmlに記述されているclient-formというidを持つフォームのことだと丁寧に記している。
const form = document.getElementById("client-form");

// ✅ フォームが送信されたときの処理を設定
// submitが起きたときに起こる処理がつらつらと書かれている。
// ここまででthenとの違いは　functionの前にasyncがついていること。
// asyncは非同期処理を行うことを示すキーワードで、
// awaitはその非同期処理の結果を待つために使います。
// つまり、awaitはasync関数の中でしか使えません。
form.addEventListener("submit", async function (event) {
  event.preventDefault(); // デフォルトの動作（ページリロード）を止める

  // ✅ フォームの中の「取引先名」の入力値を取得
  const clientName = document.getElementById("clientName").value;

  // ✅ サーバーに送るデータをオブジェクトでまとめる
  const data = { clientName: clientName };

  // tryというのは、エラーが起きる可能性のある処理を囲むためのものです。
  // もしエラーが起きたら、catchの中に飛ぶ。
  // catchは、tryの中でエラーが発生したときに実行される処理を定義します。
  // try-catch構文は、JavaScriptでエラー処理を行うための一般的な方法です。
  try {
    // ✅ fetch でサーバーにデータを送信（非同期通信）
    // thenの時はURLを指定するだけだが、awaitではconst responseとしてawaitを使ってfetchの結果を待つ。
    // awaitは、非同期処理の結果を待つためのキーワードです。
    // これにより、fetchが完了するまで次の行のコードが実行されません。
    //     .then() → 結果は関数の引数でもらう
    // await → 結果は変数に入れて使うことが多い
    // const response は必須じゃないけど、後で使うなら必要
    const response = await fetch("http://localhost:7777/api/clients", {
      method: "POST", // POST：新しいデータを送るときに使う
      headers: {
        "Content-Type": "application/json", // JSON形式で送るという合図
      },
      body: JSON.stringify(data), // オブジェクトをJSON文字列に変換して送信
    });

    // ✅ サーバーからの応答（JSON形式）をJavaScriptオブジェクトに変換
    const result = await response.json();

    // ✅ サーバーからのメッセージを表示
    console.log("サーバーからの返事:", result);
    alert("登録が完了しました！");

    // ✅ フォームの入力内容をリセット（空にする）
    form.reset();
    // catchは、tryの中でエラーが発生したときに実行される処理を定義します。
  } catch (error) {
    // ✅ 通信エラーやサーバーエラーが発生した場合
    console.error("送信でエラーが出たよ:", error);
    alert("送信に失敗しました。");
  }
});

// # 変更を保存（ステージング）
// git add .

// # コミットで変更を記録
// git commit -m "最新の変更内容"

// # リモートに送る
// git push origin main

// Ctrl + Shift + P（Mac: Cmd + Shift + P）でコマンドパレット
// 「Git: Clone」と入力
// リポジトリのURLまたは「Clone from GitHub」を選択
