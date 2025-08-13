// ✅ ユーザーが入力するフォーム（id="client-form"）を取得
// 1224
// formというのは　htmlに記述されているclient-formというidを持つフォームのことだと丁寧に記している。
const form = document.getElementById("client-form");
// とにかくゴールとタスクを決めること。ゴールが難しすぎるならそれを達成するための目標。
// そしてやっとタスクまで分解できる。
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
  // キーとバリューが同じ場合は省略可能。
  const data = { clientName };

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

// getData('http://localhost:7777/api/clients')
// SharedWorker();
// データが取り込まれるまで何も表示されないという問題が。なので、データの取得をバックグラウンドで行えるようにした。
// setTimeout(() => console.log(1), 1000);
// console.log(2);
// 1秒後に1を表示する。なので、まずは2が表示される。1秒より早いから。
// とにかく書いて体が覚える。とにかくやる。
// ネストが深くなるからPromiseを解決。

// 状態を持つ。待っている状態からresolved状態に変わる。
// 最初は待って手の状態
// 　だが何も引数に入っていないし　処理も中に入っていない状態のコードでいいのか
// AIなどに聞いてみる必要がある。
// new Promise(()={});
// // ここのかっこで囲うのは何なんだろうか。よくjavascriptであるイメージだ。
// new Promise(resolve => resolve());
// new Promise(resolve => resolve('成功しました！'));
// .then(res => console.log(res));

// // つぎは　動画のネスト解消版のものを書いてみる。
// 模写することで頭で考えるよりも楽かもしれない。
// やってる感があるし。

// なんでnewを先頭につけているかはよくわからない。

new Promise((resolve) => {
  setTimeout(() => {
    console.log(3);
    resolve();
  }, 1000);
});

//   new Promise((resolve, reject) => {
//   // 失敗を扱わないならrejectは無視してOK
// });

// これはコンソールログ3の後に
// resolveのからのメソッドを入力しているという認識でいいか。
// 今はタブレットが苦繻子が流行っているみたいだが　それはよくないと思うぞ。
// このコードの場合、1秒後に行われるのは
// console.log(3);
// resolve();

// returnがあるのが特徴的。thenだからかな。
// 「コールバック」とは、「あるイベントや処理が終わったときに呼ばれる関数」という意味。
// thenはpromiseほぼ専属のコールバック関数。

//   .then(() => {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         console.log(2);
//         resolve();
//       }, 1000);
//     });
//   });

// new Promise(resolve);

// 読んでるだけじゃ意味ない。
// 声に出したり書いたりしてアウトプットしないと基本的にそれはやった気になってるだけ。
// 俺のレベルになると瞬時にやってるつもりにもならない。
// //   resolveの後の()はからだけどなんか処理を実行するだけという意味か。
// // なんでPromiseの後は()でくくるのか
// avaScriptで new Promise(...) は「Promise クラスのコンストラクタ関数を呼び出す」記述です。
// () の中には関数を渡します。
// resolve      // 関数そのもの（何も起きない）
// resolve()    // 関数を実行（Promiseが完了状態になる）
// おもしろい感覚ですね😊
// 確かに、プログラミング以外の文脈だと「カッコ（）」は中身が空なら“意味ないんじゃ？”って思うのが普通です。

// でも resolve() は 関数呼び出しなので、たとえ中が空でも「関数を実行しますよ」というシグナルになります。
// 関数は引数がなくても呼べるんです。

// resolve() に何か入れることはある？
// はい、あります。
// Promiseでは、resolve に値を渡すと、その値が .then() の引数として受け取れます。

// まずfuncってなんだ。ここは何でもいいのか。
// A.はい
// 引数は何も取らないんだな。とる時もあるのか？
// func = async () => {
//   await log(3);
//   await log(2);
//   await log(1);
// };
// // logに関しては何かのコールバック関数的なものか。
// // これも勝手につけたものか。

// // numに関してもよくわからんし。
// // await logと指定しているから log というのは　引数にコンソールログnumを持っているものでnumにはいろいろ入るということか。
// // またreturn出てきてるし。
// // const name = "Soga";  // 「外の名前」

// // function greet(userName) {  // userNameは「挨拶で使う名前」を受け取る箱
// //   console.log("こんにちは、" + userName + "さん！");  // userNameを使って挨拶
// // }

// // greet(name);  // 「外のname（'Soga'）をgreetに渡す」
// // このときの動き
// // 変数 name に文字列 "Soga" が入っている（外の名前）

// // greet(name) を呼ぶと、関数の引数 userName に "Soga" が入る

// // 関数内で userName は "Soga" として扱われる

// // console.log は "こんにちは、Sogaさん！" と表示する
// // ここもsetTimeoutの引数ないし。
// // コンソールログに関してはnumってあるけどもうそのまんまnumが出力される感じか？
// log = (num) => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       console.log(num);
//       resolve();
//     }, 1000);
//   });
// };

// func();
// js
// コピーする
// 編集する
// new Promise(resolve => {
//   setTimeout(() => {
//     resolve("データ完了");
//   }, 1000);
// }).then(result => {
//   console.log(result); // → "データ完了"
// });
