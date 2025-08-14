// 再現性を高めるなら、コピペよりも実際に書くこと。読めるようになるのも書いたほうがいいし。なによりかけるようになりたいなら。

// ✅ ユーザーが入力するフォーム（id="client-form"）を取得
// 1224
// formというのは　htmlに記述されているclient-formというidを持つフォームのことだと丁寧に記している。
const form = document.getElementById("client-form");
// ;について
// const form = ... のあとに 改行があるので、JavaScript は自動で文の終わりと判断します

// そのため ; を省略しても動作に問題はない

// 2. 実務的な理由でつける場合
// 読みやすさ：文の区切りが明確になる

// バグ予防：別の文を後から追加したときに自動セミコロン挿入のルールで思わぬ挙動にならない

// const form = document.getElementById("client-form");
// とにかくコードを書いてみて復習する。それに意味があるとか即効性があるとか関係なく。
// 自分のものにすること。
// とにかく問題は、自分のものにできているか。知識が血肉になっているかどうかだ。
// とにかくゴールとタスクを決めること。ゴールが難しすぎるならそれを達成するための目標。
// そしてやっとタスクまで分解できる。
// ✅ フォームが送信されたときの処理を設定
// submitが起きたときに起こる処理がつらつらと書かれている。
// ここまででthenとの違いは　functionの前にasyncがついていること。
// asyncは非同期処理を行うことを示すキーワードで、
// awaitはその非同期処理の結果を待つために使います。
// つまり、awaitはasync関数の中でしか使えません。
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  //   「デフォルト」とは ブラウザが標準で行う動作 のことです。
  // フォームの場合のデフォルトは 送信するとページがリロードされること です。
  // asyncはあくまで後のawaitのメソッドのためにあるの？
  //   2. 「関数の後に処理される」わけではない
  // JavaScriptで関数を呼び出す時は
  // myFunc(引数);
  // の形で、先に引数の値を決めてから関数の中身が実行されます。
  //preventDefault() は「イベントオブジェクト (event) に生えているメソッド」です。
  // つまり event を引数として受け取らないと、そのオブジェクトにアクセスできないため preventDefault() も呼べません。
  // 引数を省いた場合、関数内で event という変数は存在しないのでエラーになります（preventDefault 自体に到達できない）。
  //   イベントオブジェクト作成（event）    │
  //  │   例: {                                   │
  //  │        type: "submit",                    │
  //  │        target: <form#myForm>,              │
  //  │        timeStamp: 123456789,

  // この event は、フォームが送信された事実そのものを表す「イベントオブジェクト」です。

  // デフォルトの動作（ページリロード）を止める
  // 模写というのはその分血肉にするという観点で大事だ。意味をなんとなくでも、調べて理解してやる。とにかく後でもいいから理解する。それも大事。
  // 理解だけでは血肉にならないし、ただ手を動かしているだけでもダメ。特に今は手を動かさずにシステムやAIが発展し菅いるからそういう現象がある。
  // ✅ フォームの中の「取引先名」の入力値を取得
  const clientName = document.getElementById("clientName").value;
  //   3. もし form から直接取るなら

  // form 変数がフォーム要素を指しているなら、その中の要素をこうやって取れます：

  // const clientName = form.clientName.value;
  // // または
  // const clientName = form.elements["clientName"].value;
  // const clientName = document.getElementById("clienName").value;
  // ✅ サーバーに送るデータをオブジェクトでまとめる
  // キーとバリューが同じ場合は省略可能。
  const data = { clientName };
  //   const data = { clientName };
  // は、さっき取得した変数 clientName の値を持つオブジェクトを作っているだけです。
  // data という名前は完全にあなたが自由につけられる変数名です。
  // 実際メモを丁寧にまとめる意味は痛い目に合わないとわからない。

  //   1. async は関数につけるキーワード
  // その関数の中で await を使えるようにするためのもの

  // 関数全体に作用し、関数内のすべての処理（同期・非同期）が含まれる

  // 2. await は「Promiseの処理が終わるのを待つ」ための演算子
  // await の 直前にあるPromiseを待つ

  // await より前に書いた変数宣言や普通の処理は、ただの通常の（同期的な）処理なので

  // async があっても、await の前の処理には影響しません

  // まとめると
  // js
  // コードをコピーする
  // async function example() {
  //   const a = 1;        // ここは同期処理。asyncでも普通に動く
  //   const b = 2;        // 同期処理
  //   await someAsync();  // ここで非同期処理の完了を待つ
  //   console.log(a + b);
  // }
  // async は関数の枠組みとして「await使うよ！」と宣言

  // await は「ここで非同期処理を待つよ！」の合図

  // await より前の変数宣言や処理は普通の同期処理として動きます

  // tryというのは、エラーが起きる可能性のある処理を囲むためのものです。
  // もしエラーが起きたら、catchの中に飛ぶ。
  // catchは、tryの中でエラーが発生したときに実行される処理を定義します。
  // try-catch構文は、JavaScriptでエラーになる可能性のあるものを囲むための一般的な方法です。
  try {
//     try は オブジェクトでも async の機能でもありません。
// 整理するとこうです。
// 1. try とは
// JavaScript の文法キーワードです
// 「このブロック内でエラーが起きたら catch に飛ばす」という 例外処理用の構文
    // ✅ fetch でサーバーにデータを送信（非同期通信）
    // thenの時はURLを指定するだけだが、awaitではconst responseとしてawaitを使ってfetchの結果を待つ。
    // awaitは、非同期処理の結果を待つためのキーワードです。
    // これにより、fetchが完了するまで次の行のコードが実行されません。
    //     .then() → 結果は関数の引数でもらう
    // await → 結果は変数に入れて使うことが多い
    // const response は必須じゃないけど、後で使うなら必要
    // responceは特別名前ではない。変数名は自由につけてもいい。
    const response = await fetch("http://localhost:7777/api/clients", {
      // サーバーでもapi clientsのpostを受け取ると指定するよ。
      method: "POST", // POST：新しいデータを送るときに使う
//       fetch() で method を指定しなければ GET
// method: "POST" と指定したら、そのリクエストは POST になるだけ で、同時に GET にはなりません
      headers: {
        "Content-Type": "application/json", // JSON形式で送るという合図
      },
      body: JSON.stringify(data), // オブジェクトをJSON文字列に変換して送信
    });

    //     そうですね、fetchで送信時と受信時の両方でJSONを扱う必要があるので、コードにどうしても

    // headersで「送るデータはJSONですよ」と伝え、

    // bodyでオブジェクトを文字列化（JSON.stringify）、

    // 受信時は response.json() でJSONからオブジェクトに戻す

    // という二重のJSON処理が入ります。

    // 上のawait(fetchのリクエストに対するレスポンス)が終わるまで　const responcwの行まで行かない
    // ✅ サーバーからの応答（JSON形式）をJavaScriptオブジェクトに変換
    const result = await response.json();

//     サーバー側：res.json() → フロントに JSON を返す
// フロント側：response.json() → 返ってきた JSON を JS オブジェクトに変換

// 2. await response.json() の順序イメージ
// const result = await response.json();


// response.json() が呼ばれる

// ボディの解析が開始される

// 結果はまだ返っていない → Promise(Pending)

// await が処理を一時停止

// JSON 解析が終わるまで次の行を待つ

// 解析が完了 → Promise Fulfilled

// 解析された JavaScript オブジェクトが返る

// await が解除される → result に代入

// この時点で result が使える

// 次の行の処理が実行される
    // ✅ サーバーからのメッセージを表示
    console.log("サーバーからの返事:", result);
    alert("登録が完了しました！");

    // ✅ フォームの入力内容をリセット（空にする）
    form.reset();
    // catchは、tryの中でエラーが発生したときに実行される処理を定義します。
  } 

catch (error) {
    // ✅ 通信エラーやサーバーエラーが発生した場合
    console.error("送信でエラーが出たよ:", error);
    alert("送信に失敗しました。");
  }

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

// new Promise((resolve) => {
//   setTimeout(() => {
//     console.log(3);
//     resolve();
//   }, 1000);
// });

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
