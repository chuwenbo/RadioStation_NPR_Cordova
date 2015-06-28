


define(['home'], function () {

    function getData() {
        var testData = [];
        for (var i = 0; i < 2; i++) {
            //testData.push({ Id: i, ArticleId: '', detailLink: '', Title: '', Teaser: '', StoryText: '', Crawled: '', Crawling: '', Image: { Url: '', Title: '' } });

            testData.push({ Id: i, ArticleId: 'story378727507', Title: 'To Drive Economy Toward Equality, Obama Requests More Spending', Teaser: 'His State of the Union address celebrated a year that brought the U.S. jobs and growth, and called on Congress to expand child care and free education. Critics say its pure politics that wont pass.', StoryText: 'His State of the Union address celebrated a year that brought the U.S. jobs and growth, and called on Congress to expand child care and free education. Critics say its pure politics that wont pass.', Image: { Url: 'http://media.npr.org/assets/img/2015/01/21/speech2_wide-220ffc822ddb14d9077cb266f992649439b62f59-s1000-c85.jpg', Title: 'ee' } });
        }

        return testData;
    }

    //var viewModel = {
    //    storys: ko.observableArray(getData())
    //};
    

    //同步加载数据

    var data = getData();

    return function viewModel() {
        var _this = this;

        this.shouldShowList = ko.observable(true);

        this.storys = ko.observableArray(data);

        this.story = {
            Title: ko.observable(),
            ImageUrl: ko.observable(),
            ImageTitle: ko.observable(),
            StoryText: ko.observable(),
            goBack: function () {
                location.hash = "#/home";
            }
        };

        this.showStory = function (story) {  
            location.hash = "#/home" + '/:' + story.Id;
        };

        this.show = function () {
            //YIZHE.SammyRoute.setLocation("#/home/:1");
            //alert('more');
             
            $.each(data, function (i, val) {
                _this.storys.push(val);
            }); 
            //$("#main-container .list-story").toggleClass("yizhe-hide");
        }
        
    };
});

