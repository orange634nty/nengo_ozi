//// csv -> object に変換

// 変換した結果を入れる
var csvDataList = [];

// ファイル読み込み
file = new File("C:\\<csvまでのパス>\\nendai.csv");
file.encoding = "UTF-8";
file.open("r", "TEXT");
text = file.read();

// 各行ごとの配列に変換
var textRow = text.split("\n");

// 最初の行はカラムとして分離
var columns = textRow.shift().split(",");

// 全行に対してkey valueになるように変換
for (var i = 0; i < textRow.length; i++) {
    var tmp = {};
    var rowItems = textRow[i].split(",");
    for (var j = 0; j < columns.length; j++) {
        tmp[columns[j]] = rowItems[j]
    }
    csvDataList.push(tmp);
}

//// 変換する部分のオブジェクトを取得

// ドキュメントを取得
var doc = app.activeDocument;

// 対象のレイヤーを取得
var targetLayer;
var layers = doc.layers;
for (var i = 0; i < layers.length; i++) {
    if (layers[i].name === "Design") {
        targetLayer = layers[i];
    }
}

// 対象のTextFrameを取得
var nengouTextFrame;
var dateTextFrame;
var textFrames = targetLayer.textFrames;
for (var i = 0; i < textFrames.length; i++) {
    if (textFrames[i].name === "Nengou") {
        nengouTextFrame = textFrames[i];
    }
    if (textFrames[i].name === "Date") {
        dateTextFrame = textFrames[i];
    }
}

//// 置き換えて別名保存

for (var i = 0; i < csvDataList.length; i++) {
    var csvData = csvDataList[i];
    nengouTextFrame.contents = csvData.name;
    dateTextFrame.contents = csvData.start_at;
    doc.saveAs(new File("C:\\<cardsまでのパス>\\" + csvData.fileName + ".ai"));
}
