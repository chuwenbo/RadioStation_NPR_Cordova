define(['foo'],function () {
    //Do setup work here
    //http://media.npr.org/assets/img/2015/02/17/_mg_0088_wide-b79ce14e02a2e98611437f4cae33af4333e198ec-s800-c85.jpg
    //http://pd.npr.org/npr-mp4/npr/ascvid/2015/02/20150217_ascvid_UntilTheRibbonBreaks_02-n-600000.mp4
    var data = [];

    for (var i = 0; i < 4; i++) {
        data.push({ ImageUrl: 'http://media.npr.org/assets/img/2015/02/17/_mg_0088_wide-b79ce14e02a2e98611437f4cae33af4333e198ec-s800-c85.jpg', ImageTitle: 'd' });
    }

   

    return function viewModel() {

        var _this = this;

        this.videos = ko.observableArray(data);

        this.showVideo = function () {
            //console.log('Just play a video');
            console.log(window.plugins);
            //VideoPlayer.play("file:///android_asset/www/movie.mp4");
            //VideoPlayer.play("http://pd.npr.org/npr-mp4/npr/ascvid/2015/02/20150217_ascvid_UntilTheRibbonBreaks_02-n-600000.mp4");
            // Just play a video



            var videoUrl = "http://pd.npr.org/npr-mp4/npr/ascvid/2015/02/20150217_ascvid_UntilTheRibbonBreaks_02-n-600000.mp4";
            //window.plugins.streamingMedia.playVideo(videoUrl);
            window.plugins.vitamio.playVideo(videoUrl);
            return;

            var videoUrl = STREAMING_VIDEO_URL;
            console.log(VideoPlayer);
           // console.log(window.plugins.streamingMedia.playVideo);

            //// Just play a video
            //window.plugins.streamingMedia.playVideo(videoUrl);


            //return;

            // Play a video with callbacks
            var options = {
                successCallback: function () {
                    console.log("Video was closed without error.");
                },
                errorCallback: function (errMsg) {
                    console.log("Error! " + errMsg);
                }
            };
            window.plugins.streamingMedia.playVideo(videoUrl, options);


            return;

            var audioUrl = STREAMING_AUDIO_URL;

            // Play an audio file (not recommended, since the screen will be plain black)
            window.plugins.streamingMedia.playAudio(audioUrl);

            // Play an audio file with options (all options optional)
            var options = {
                bgColor: "#FFFFFF",
                bgImage: "<SWEET_BACKGROUND_IMAGE>",
                bgImageScale: "fit",
                successCallback: function () {
                    console.log("Player closed without error.");
                },
                errorCallback: function (errMsg) {
                    console.log("Error! " + errMsg);
                }
            };
            window.plugins.streamingMedia.playAudio(audioUrl, options);

        }
    };
});