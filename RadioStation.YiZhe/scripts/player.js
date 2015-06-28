var yizhePlayer = {
    media: null,
    audioURL: "http://nprdmp.ic.llnwd.net/stream/nprdmp_live01_mp3",
    $play: $("#play"),
    $message: $("#message")
};

yizhePlayer.init = function () {
    var _this = this;

    $("#play").on("click", function () {

        // play
        if ($(this).hasClass("glyphicon-play-circle")) {
            _this.iconSetter.setPauseIcon();
            _this.iconSetter.setMessage("加载中..");

            if (_this.media == null || _this.media == undefined) {
                _this.media = new Media(yizhePlayer.audioURL, _this.eventContext.onStatus, _this.eventContext.onError, _this.eventContext.onStatus);
            }

            _this.media.play();

            
        } else { // pause 
            _this.iconSetter.setPlayIcon();
            _this.iconSetter.setMessage("");
            if (_this.media) {
                _this.media.pause();
            }
        }
    });
};

yizhePlayer.iconSetter = {
    setPlayIcon : function () {
        yizhePlayer.$play.removeClass("glyphicon-pause");
        yizhePlayer.$play.addClass("glyphicon-play-circle");
    },
    setPauseIcon : function () {
        yizhePlayer.$play.removeClass("glyphicon-play-circle");
        yizhePlayer.$play.addClass("glyphicon-pause");
    },
    setMessage: function (text) {
        yizhePlayer.$message.html(text);
    }
}; 

yizhePlayer.eventContext = {
    onSuccess: function () {
        if (yizhePlayer.$message.hasClass("message-error")) {
            yizhePlayer.$message.removeClass("message-error")
        }
    },
    onError: function () {
        if (!yizhePlayer.$message.hasClass("message-error")) {
            yizhePlayer.$message.addClass("message-error")
        }
        _this.iconSetter.setMessage("Error");
    },
    onStatus: function (status) {
        //Media.MEDIA_NONE = 0;
        //Media.MEDIA_STARTING = 1;
        //Media.MEDIA_RUNNING = 2;
        //Media.MEDIA_PAUSED = 3;
        //Media.MEDIA_STOPPED = 4; 
        if (status === Media.MEDIA_STARTING) {
            if (yizhePlayer.$message.hasClass("message-error")) {
                yizhePlayer.$message.removeClass("message-error")
            }
            yizhePlayer.iconSetter.setMessage("加载中..");
        }

        if (status === Media.MEDIA_STOPPED) { yizhePlayer.media.play(); }
        if (status == Media.MEDIA_RUNNING) { yizhePlayer.iconSetter.setMessage(""); }
    }
};