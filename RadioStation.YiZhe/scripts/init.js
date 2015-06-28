
// initialize Sammy route config.
var stationApp = Sammy("#main-container", function () {
    this.get("#abroad", function () {  
        //this.render("/pages/abroad/abroad.html");
    });

    this.get("#inland", function (context) {
        context.app.swap('Loading...'); 

        this.render("/pages/inland/inland.html");
    });
});

stationApp.run('#abroad');


// Ko bind index.html

var navigationBarViewModel = {
    activeIndex: ko.observable(1),
    goHome: function () {
        if (this.activeIndex() == 1) { return; }

        this.activeIndex(1);
    },
    goMusic: function () {
        if (this.activeIndex() == 2) { return; }

        this.activeIndex(2);
    },
    goList: function () {
        if (this.activeIndex() == 3) { return; } 

        this.activeIndex(3);
    }
};

ko.applyBindings(navigationBarViewModel, $("div.radio-navigation")[0]);

var my_media = null;
var nprURL = 'http://nprdmp.ic.llnwd.net/stream/nprdmp_live01_mp3';




$("#play2").on("click", function () {

    // play
    if ($(this).hasClass("glyphicon-play-circle")) {
        $(this).removeClass("glyphicon-play-circle");
        $(this).addClass("glyphicon-pause");

        if (my_media == null || my_media == undefined) {
            my_media = new Media(nprURL, onSuccess, onError, onStatus);
        }
        
        my_media.play();
        $("#message").html("play");

        //alert('play');
    } else { // pause
        $(this).removeClass("glyphicon-pause");
        $(this).addClass("glyphicon-play-circle");

        if (my_media) {
            my_media.pause();
        }
    } 
});

//$("#btnInland").on("click", function () {

//});

//$("#btnAbout").on("click", function () {

//});



navigationBarViewModel.goToAbroad(); 

$("#play1").click(function () { 

    $.get("http://www.zhixingchuangyi.com/NPR/GetNews", { pageSize: 10, minId: 10000 }, function (data) {
        console.log(data);
        alert(data.length);
    }).error(function () {
        alert("error");
    });
}); 

