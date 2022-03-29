import "./styles.css";

const onClickAdd = () => {
  // テキストボックスの値を取得し、初期化する
  const inputText = document.getElementById("add-text").value;
  document.getElementById("add-text").value = "";

  createIncompleteList(inputText);
};

document
  .getElementById("add-button")
  .addEventListener("click", () => onClickAdd());

//未完了リストから指定の要素を削除する関数
const deleteFromIncompleteList = (target) => {
  document.getElementById("incomplete-list").removeChild(target);
};

//未完了リストに追加する関数
const createIncompleteList = (text) => {
  //li生成
  const li = document.createElement("li");

  //div生成
  const div = document.createElement("div");
  div.className = "list-row";

  //p生成
  const p = document.createElement("p");
  p.className = "item-row";
  p.innerText = text;

  //button（完了）タグの生成
  const completeButton = document.createElement("button");
  completeButton.innerText = "完了";
  completeButton.addEventListener("click", () => {
    //押された完了ボタンの親タグ（div）を未完了リストから完了したリストに移動
    const completeTarget = completeButton.closest("div");
    deleteFromIncompleteList(completeButton.closest("li"));
    const text = completeTarget.firstElementChild.innerText;
    completeTarget.textContent = null;

    //p生成
    const p = document.createElement("p");
    p.className = "item-row";
    p.innerText = text;

    //button（戻す）タグの生成
    const backButton = document.createElement("button");
    backButton.innerText = "戻す";
    backButton.addEventListener("click", () => {
      //押された戻すボタンの親タグを完了リストから削除
      const deleteTarget = backButton.closest("li");
      document.getElementById("complete-list").removeChild(deleteTarget);
      //押された戻すボタンの親タグ（div）を完了リストから未完了リストに移動
      const text = backButton.closest("div").firstElementChild.innerText;
      createIncompleteList(text);
    });

    //liタグの子要素に各要素を設定
    completeTarget.appendChild(p);
    completeTarget.appendChild(backButton);

    //完了のリストに追加
    document.getElementById("complete-list").appendChild(li);
  });

  //button（完了）タグの生成
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "削除";
  deleteButton.addEventListener("click", () => {
    //押された削除ボタンの親タグ（div）を未完了リストから削除
    deleteFromIncompleteList(deleteButton.closest("li"));
  });

  //liタグの子要素に各要素を設定
  li.appendChild(div);

  //divタグの子要素に各要素を設定
  div.appendChild(p);
  div.appendChild(completeButton);
  div.appendChild(deleteButton);

  //未完了のリストに追加
  document.getElementById("incomplete-list").appendChild(li);
};
