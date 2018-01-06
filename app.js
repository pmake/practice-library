// 使用自製的問候函式庫，G$或Greetr指向相同的函式
// 此函式庫不需手動使用new關鍵字建立新物件，且方法是可連鎖的

var g = G$('Chris', 'Chang');

g.greet().setLang('es').greet(true).log();

// 設定登入鈕點擊事件監聽器
// 以下DOM相關操作使用好用的jQuery
$('#login').click(function(){
    
    // 隱藏登入介面，假裝登入成功，並已從server取得使用者名稱Chris Chang
    $('#login-div').hide();
    
    // 使用自製的函式庫建立問候物件
    var loginGrtr = G$('Chris', 'Chang');
    
    // 取得選定語言
    var selectedLang = $('#lang').val();
    
    // 使用自製函式庫在一行程式裡連鎖呼叫3個方法，依序執行下列任務
    // 設定語言、在頁面顯示問候語、在 console 輸出 log
    loginGrtr.setLang(selectedLang).HTMLGreeting('#greeting', true).log();
    
    
});