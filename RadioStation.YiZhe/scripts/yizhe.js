var YIZHE = {
    loadingBar: '<span class="icon-spinner icon-spin yizhe-loading"></span>'
};

YIZHE.Init = function () {
    yizhePlayer.init();
    YIZHE.SammyRoute.run('#/home');
    YIZHE._koBind();
    
};

YIZHE.NavigatonBar = {
    navigationBarViewModel: {
        activeIndex: ko.observable(1),
        goHome: function () {
            if (this.activeIndex() == 1) { return; }
            this.activeIndex(1);

            YIZHE.SammyRoute.setLocation("#/home"); 
        },
        goMusic: function () {
            if (this.activeIndex() == 2) { return; }
            this.activeIndex(2);

            YIZHE.SammyRoute.setLocation("#/music");
        },
        goList: function () {
            if (this.activeIndex() == 3) { return; }

            this.activeIndex(3);
        }
    }
};

YIZHE.SammyRoute = Sammy("#main-container", function () {
    var self = this;
    self.storysViewModel = null;
    self.videosViewModel = null;
    // top offset
    self.offset = new Array();
    self.offset[0] = 0;
    self.offset[1] = 0;
    
    self.offsetIndex;

    self.setOffset = function (offsetIndex) {
        if (self.offsetIndex >= 0) {
            self.offset[self.offsetIndex] = $("#main-container").find("div:first").offset().top - 50;
        }
        self.offsetIndex = offsetIndex;
    }

    this.get("#/home", function (context) {
        self.setOffset(0);

        context.app.swap(YIZHE.loadingBar);
        
        require(['home'], function (viewModel) {
            self.storysViewModel = new viewModel(); 
            context.$element().load("/pages/home.html", function () {
                ko.applyBindings(self.storysViewModel, $(this).children(":first")[0]);
                context.$element().scrollTop(-self.offset[0]);
            }); 
        });
    });

    this.get("#/home/:itemId", function (context) {
        self.setOffset(-1);

        var _story = self.storysViewModel.story;
        _story.Title('To Drive Economy Toward Equality, Obama Requests More Spending');
        _story.StoryText("His State of the Union address celebrated a year that brought the U.S. jobs and growth, and called on Congress to expand child care and free education. Critics say its pure politics that wont pass");
        //_story.Image({ Url: 'http://media.npr.org/assets/img/2015/01/21/speech2_wide-220ffc822ddb14d9077cb266f992649439b62f59-s1000-c85.jpg', Title: 'ee' });
        _story.ImageUrl('http://media.npr.org/assets/img/2015/01/21/speech2_wide-220ffc822ddb14d9077cb266f992649439b62f59-s1000-c85.jpg');
        _story.ImageTitle("ee");
        self.storysViewModel.shouldShowList(false);
    });

    this.get("#/music/:itemId", function (context) {
        context.app.swap('Loading detail...'); 
    }); 

    this.get("#/music", function (context) {
        self.setOffset(1);
        context.app.swap('Loading music...');
        require(['foo'], function (viewModel) {
            self.videosViewModel = new viewModel(); 
            context.$element().load("/pages/inland/inland.html", function () {
                ko.applyBindings(self.videosViewModel, $(this).children(":first")[0]);
                context.$element().scrollTop(-self.offset[1]);
            }); 
        }); 
    });

    
});

YIZHE._koBind = function () {
    ko.applyBindings(YIZHE.NavigatonBar.navigationBarViewModel, $("div.radio-navigation")[0]); 
};

$(function () {
    YIZHE.Init();

    require.config({
        paths: {
            foo: '/pages/inland/script',
            home: '/pages/home'
        }
    });
});


