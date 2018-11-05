# line-graph-drawer
折れ線グラフ描くよ

## これは何
折れ線グラフを挿入，描画するスクリプトです

## 使い方
1. リポジトリをクローンする
1. 任意のプロジェクトのフォルダに`line-graph-drawer.js`をコピーする
1. html内でscriptタグを用いてロード（グローバルに`LineGraphDrawer`が追加されます）
1. JSからコンストラクタを用いてインスタンスを生成し，実行

```html
<script src="line-graph-drawer.js"></script>
<div id="graph-area"></div>
```


```js
//LineGraphDrawerのインスタンスを生成
//パラメータオブジェクトのelをクエリセレクタとして，
//対応した要素にグラフ領域を追加する
const myGraph = new LineGraphDrawer({
    el: "#graph-area",
    width: 800,
    height: 450,
    data: [10, 25, 15, 20],
    label: [1, 2, 3, 4],
    strokeColor: "rgba(128, 128, 255, 1)",
    fillColor: "rgba(128, 128, 255, 0.2)",
    pointColor: "rgba(128, 128, 255, 1)",
});

//LineGraphDrawerインスタンスのdataプロパティ，labelプロパティを書き換えて，
//renderメソッドを実行すれば新たなデータでもって再描画される
myGraph.data.push(30);
myGraph.label.push(5);
myGraph.render();
```

より詳細な使用方法は`test/index.html`を参照してください．