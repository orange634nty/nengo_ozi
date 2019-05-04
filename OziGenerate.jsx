// csv -> object に変換
function CsvToObj(csvPath) {
    // 変換した結果を入れる
    var result = [];

    // ファイル読み込み
    file = new File(csvPath);
    file.encoding = "UTF-8";
    file.open("r", "TEXT");
    text = file.read();

    // 空の場合はファイルが存在しない可能性があるのでアラートを上げる
    if (text === "") {
        alert("ファイルの中身が空、もしくは存在しません。\nファイル：" + csvPath);
        return;
    }

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
