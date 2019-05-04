// 作業ディレクトリ
// ここに実行ディレクトリを入れてから実行する
var WORK_DIR = "";

// csv -> object に変換
function ConvertCsvToObj(csvPath) {
    // 変換した結果を入れる
    var result = [];

    // ファイル読み込み
    file = new File(csvPath);
    file.encoding = "UTF-8";
    file.open("r", "TEXT");
    text = file.read();

    // 空の場合はファイルが存在しない可能性があるのでアラートを上げる
    if (text === "") {
        alert("指定されたファイルの中身が空、もしくは存在しません。\nファイル：" + csvPath);
        return;
    }

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
        result.push(tmp);
    }

    return result;
}

// 指定された名前のレイヤーを取得する
function GetLayer(doc, layerName) {
    var targetLayer;
    var layers = doc.layers;
    for (var i = 0; i < layers.length; i++) {
        if (layers[i].name === layerName) {
            targetLayer = layers[i];
        }
    }
    if (targetLayer === undefined) {
        alert("指定されたレイヤーは存在しません。\nレイヤー名：" + layerName);
        return;
    }
    return targetLayer;
}

// 指定されたTextFrameを取得する
function GetTextFrame(layer, textFrameName) {
    var targetTextFrame;
    var textFrames = layer.textFrames;
    for (var i = 0; i < textFrames.length; i++) {
        if (textFrames[i].name === textFrameName) {
            targetTextFrame = textFrames[i];
        }
    }
    if (targetTextFrame === undefined) {
        alert("指定されたTextFrameは存在しません。\nTextFrame名：" + textFrameName);
        return;
    }
    return targetTextFrame;
}

// 保存先のパスを生成
function SavePath(fileName) {
    return WORK_DIR + "cards\\" + fileName + ".ai"
}

function main() {
    var csvDataList = ConvertCsvToObj(WORK_DIR + "nendai.csv");

    var doc = app.activeDocument;
    var csvData = csvDataList[i];
    var layer = GetLayer(doc, "Design");
    var nengouTextFrame = GetTextFrame(layer, "Nengou");
    var dateTextFrame = GetTextFrame(layer, "Date");

    for (var i = 0; i < csvDataList.length; i++) {
        nengouTextFrame.contents = csvData.name;
        dateTextFrame.contents = csvData.start_at;
        doc.saveAs(new File(SavePath(csvData.fileName)));
    }
}

main();

