<?php
$subject = $_GET['subject'];
$time = $_GET['time'];
$count = $_GET['count'];
$kcal = $_GET['kcal'];

//CSVファイルに書き込む配列を定義
if (!empty($subject)&&!empty($time)&&!empty($count)&&!empty($kcal)){
    $ary = array(
        //筋トレ項目，時間，回数，カロリー
        array($subject, $time, $count,$kcal),
       );
      // ファイルを書き込み用に開きます。
      $f = fopen("subject.csv", "a");
      // 正常にファイルを開くことができていれば、書き込みます。
      if ( $f ) {
        // $ary から順番に配列を呼び出して書き込みます。
        foreach($ary as $line){
          // fputcsv関数でファイルに書き込みます。
          fputcsv($f, $line);
        } 
      }
      // ファイルを閉じます。
      fclose($f);
      echo '成功しました';
      $link_address = 'index.html';
      echo "<a href='".$link_address."'>アプリケーションに戻る</a>";
}else{
    //エラー
    $alert = "<script type='text/javascript'>
    alert('エラー');
   
    </script>";
}
?>
