// 使用IIFE讓此函式庫不受污染，也不污染別人，把需要取用的資源傳入即可
// IIFE前面加上分號是為了避免別人忘記在此函式庫的上一列程式碼加上分號
// 導致此IIFE被視為使用()呼叫上一列程式碼內容，而造成預期之外的錯誤
;(function(global, $){
    
    // 自動 new 一個新物件，讓使用者不用每次使用都要打 new 關鍵字
    var Greetr = function(firstName, lastName, language) {
        // 函式內容在函式被呼叫時才會真正執行，屆時Grtter.init已被定義
        return new Greetr.init(firstName, lastName, language);
        
    };
    
    // 定義private variables做內部使用，外部無法變更其內容
    var 
        supportedLangs = ['en', 'es'],
        // 使用物件類別而非陣列原因為可以直接透過['']依據對應語言的屬性名稱取值，比較方便
        greetings = {
            en: 'Hello',
            es: 'Hola'
        },
        formalGreetings = {
            en: 'Greetings',
            es: 'Saludos'
        },
        logMessages = {
            en: 'Logged in',
            es: 'Inicio sesion'
        };
    
    
    
    // 所有函式都有一個預設的屬性叫prototype，預設值是一個物件，
    // 此物件會有一個預設的constructor屬性指向其函式
    
    // 使用new 關鍵字呼叫函式時，會先建立一個空物件，並將函式中的this關鍵字指向此物件
    // 此物件會有一個預設的屬性叫__proto__，指向與函式的prototype指向的同一個物件
    
    // 因為要在prototype指向的物件上新增一連串的方法
    // 在預設prototype物件上新增屬性要一直重複Greetr.prototype.xxx，
    // 以新物件取代語法較簡潔，如下:
    Greetr.prototype = {
        // 把原物件預設的constructor屬性加回來
        constructor: Greetr,
        
        fullName: function() {
          return this.firstName + ' ' + this.lastName;  
        },
        
        validate: function() {
            if(supportedLangs.indexOf(this.language) === -1) {
                throw new Error('Invalid language');
            }
        },
        
        greeting: function() {
            return greetings[this.language] + ' ' + this.firstName + '!';
        },
        
        formalGreeting: function() {
            return formalGreetings[this.language] + ', ' + this.fullName();
        },
        
        greet: function(formal) {
            var msg;
            
            if(formal) {
                msg = this.formalGreeting();
            } else {
                msg = this.greeting();
            }
            
            // console 物件在ie瀏覽器只有被開啟時才會存在
            if(console) {
                console.log(msg);
            }
            
            // prototype chain 上的方法中的 this 關鍵字會指向呼叫此方法的物件(本身沒有這個方法而從 prototype chain 上找的那個物件)
            // 這讓prototype上的方法可以連鎖(chaining)
            
            return this;
            
        },
        
        log: function() {
            if(console) {
                console.log(logMessages[this.language] + ': ' + this.fullName());
            }
            
            return this;
        },
        
        setLang: function(lang) {
            this.language = lang;
            // 驗證新設定的語言是否在支援清單裡
            this.validate();
            
            return this;
        },
        
        // 整合jQuery進來處理DOM操作
        HTMLGreeting: function(selector, formal) {
            if(!$) {
                throw new Error('jQuery is not loaded');
            }
            
            if(!selector) {
                throw new Error('Missing jQuery selector');
            }
            
            var msg;
            
            if(formal) {
                msg = this.formalGreeting();
            } else {
                msg = this.greeting();
            }
            
            // 雖然在index.html引入jQuery之後，jQuery就可以全域取用
            // 但也許有人不想用jQuery，不一定會引入，所以這裡不使用全域jQuery變數
            // 而是使用傳入此IIFE的$變數中的內容，不管傳入的是什麼，只要能和jQuery一樣使用即可
            
            $(selector).html(msg);
            
            // 使可連鎖
            return this;
        }
        
        
        
        
    };
    
    // 函數也是物件，可增加屬性
    // init函式的作用是讓使用Greetr時不用一直打new關鍵字
    Greetr.init = function(firstName, lastName, language) {
        this.firstName = firstName || "";
        this.lastName = lastName || "";
        this.language = language || "en";
        
        // 驗證給定的語言是否有支援
        this.validate();
    };
    
    
    
    // 讓init函式的prototype與Greetr的prototype指向相同物件
    Greetr.init.prototype = Greetr.prototype;
    
    // 將其與global物件連結，讓外部環境的任何地方都可使用Greetr
    // G$做為一個簡短的別名，便於使用
    global.Greetr = global.G$ = Greetr;
    
}(window, jQuery));