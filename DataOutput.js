let timer_count = 0;
var lest_flag = 0;
var start_flag = 0;

function csv_data(dataPath) {
    const request = new XMLHttpRequest(); // HTTPでファイルを読み込む
    request.addEventListener('load', (event) => { // ロードさせ実行
        const response = event.target.responseText; // 受け取ったテキストを返す
        workout(response);
    });
    request.open('GET', dataPath, true); // csvのパスを指定
    request.send();
}
function workout(data) {
    subject_name = document.getElementById("subject_name");
    timer = document.getElementById("timer");
    sentence = document.getElementById("sentence");
    //説明文
    explanation = document.getElementById("explanation");
    //カロリー表示
    kcal_setence = document.getElementById("kcal");
    //筋トレ項目の画像pathの配列
    var pics_src = new Array("pics/pushUps.jpeg","pics/Abs.jpeg","pics/Squat.jpeg");
    const dataString = data.split('\n'); //改行で分割
    //4,8,12に項目が入っている
    //7,11,15にカロリーが入っている
    const dataSprit = (String(dataString)).split(','); //,で分割
    var kcal = 0;
    kcal_setence.innerHTML = Number(kcal)+"kcal";

    //dataString.lengthはcsvファイルの行分＋１になる．これでループを回す
    // selectタグを取得する
    //筋トレ項目を選択できるようにする
    var subject_select = document.getElementById("subject_select");
    for (let i = 0; i < dataString.length-2; i++) { //あるだけループ
        // optionタグを作成する
        var option = document.createElement("option");
        // optionタグのテキストを4に設定する
        option.text = dataSprit[(i+1)*4];
        // optionタグのvalueを4に設定する
        option.value = dataSprit[(i+1)*4];
        // selectタグの子要素にoptionタグを追加する
        subject_select.appendChild(option);
    }

    //値確認のコンソールログ
    console.log(dataString.length);
    //この処理をループで行う
    const countUp = () => {
        if(start_flag==0){
            //停止時
            setTimeout(countUp,10);
        }else{
            if (timer_count==0){
                if(lest_flag == 1){
                    //休憩ゾーン
                    lest_flag--;
                    //カロリー表示
                    kcal_setence.innerHTML = kcal+"kcal";
                    subject_name.innerHTML = "休憩";
                    timer_count = 10;
                    document.getElementById("mypic").style.display="none";
                    explanation.innerHTML = "休憩時間は10秒です";
                }else{
                    //筋トレゾーン
                    lest_flag++;
                    //ドロップダウンメニューの選択を判定する
                    if (subject_select.value == "ランダム"){
                        //ランダムで筋トレ項目を選択
                        var num = Math.floor( Math.random() * 3 )+1;
                    }else{
                        for (let i = 0; i < dataString.length-1; i++) { //あるだけループ
                           if(subject_select.value === dataSprit[i*4]){
                                console.log(i);
                                var num = i;
                                break;
                           }
                        }
                    }
                    
                    //ランダムで筋トレ項目を選択
                    //var num = Math.floor( Math.random() * 3 )+1;
                    //筋トレ項目
                    subject_name.innerHTML = dataSprit[num*4];
                    //カロリー計算
                    kcal += Number(dataSprit[num*4+3]);
                    //console.log(num);
                    timer_count = Number(dataSprit[num*4+1])
                    document.getElementById("mypic").style.display = "block";
                    document.getElementById("mypic").src = pics_src[num-1];
                    explanation.innerHTML = "テスト表示";
                    //clearTimeout(timeoutId);　//timeoutIdをclearTimeoutで指定している
                }
            }
            setTimeout(countUp,1000);
            timer_count--;
            sentence.innerHTML = "残り時間";
            timer.innerHTML = timer_count+"秒";
        }
    }
    countUp();
}

function Start() {
    if(start_flag==0){
        start_flag = 1;
        document.getElementById("str").value = "一時停止";
    }else{
        start_flag = 0;
        document.getElementById("str").value = "再開";
    }
}

function End(){
    window.location.href = 'http://localhost:2000/test/end_of_workout.html'; //遷移
    /*
    記録処理をする
    */
}

csv_data('https://koukionodera.github.io/WebSite1/subject.csv'); // csvのパス
