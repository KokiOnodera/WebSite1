const output_svg = document.getElementById('subject_list');
function csv_data(dataPath) {
    const request = new XMLHttpRequest(); // HTTPでファイルを読み込む
    request.addEventListener('load', (event) => { // ロードさせ実行
        const response = event.target.responseText; // 受け取ったテキストを返す
        csv_array(response); //表示
    });
    request.open('GET', dataPath, true); // csvのパスを指定
    request.send();
}
function csv_array(data) {
    const dataArray = []; //配列を用意
    const dataString = data.split('\n'); //改行で分割
    for (let i = 0; i < dataString.length-1; i++) { //あるだけループ
        dataArray[i] = dataString[i].split(',');
    }
    let insertElement = ''; //テーブルタグに表示する用の変数
    dataArray.forEach((element) => { //配列の中身を表示
        insertElement += '<tr>';
        element.forEach((childElement) => {
            insertElement += `<td>${childElement}</td>`
        });
        insertElement += '</tr>';
    });
    output_svg.innerHTML = insertElement; // 表示
}
csv_data('http://localhost:2000/test/subject.csv'); // csvのパス
