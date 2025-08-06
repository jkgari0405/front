// ✅ ユーザーが入力するフォーム（id="client-form"）を取得
const form = document.getElementById("client-form");

// ✅ フォームが送信されたときの処理を設定
form.addEventListener("submit", async function (event) {
  event.preventDefault(); // デフォルトの動作（ページリロード）を止める

  // ✅ フォームの中の「取引先名」の入力値を取得
  const clientName = document.getElementById("clientName").value;

  // ✅ サーバーに送るデータをオブジェクトでまとめる
  const data = { clientName: clientName };

  try {
    // ✅ fetch でサーバーにデータを送信（非同期通信）
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
  } catch (error) {
    // ✅ 通信エラーやサーバーエラーが発生した場合
    console.error("送信でエラーが出たよ:", error);
    alert("送信に失敗しました。");
  }
});
