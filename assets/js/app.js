$(document).ready(function () {


    $('nav.header-responsive li.active').addClass('open').children('ul').show();

    $("nav.header-responsive li.sub-menu> a").on('click', function () {
        $(this).removeAttr('href');
        var e = $(this).parent('li');
        if (e.hasClass('open')) {
            e.removeClass('open');
            e.find('li').removeClass('open');
            e.find('ul').slideUp(400);

        } else {
            e.addClass('open');
            e.children('ul').slideDown(400);
            e.siblings('li').children('ul').slideUp(400);
            e.siblings('li').removeClass('open');
        }
    });


    // menu
    var $hoverEffect = $('.js-nav-list-category-hover'),
        $headerLinks = $('header.main-header .menu > ul > li');
    var moveHover = function (self) {
        var parent = self
            .parent()
            .parent()
            .parent();

        $hoverEffect
            .css('width', self.width())
            .css(
                'right',
                parent.width() -
                (self.offset().left + self.width()) +
                parent.offset().left
            );
        $hoverEffect.css('transform', 'scaleX(1)');
    };

    var removeHover = function () {
        $hoverEffect.css('transform', 'scaleX(0)');
    };

    $headerLinks.hover(function () {
            moveHover.call(this, $(this));
        },
        function () {
            removeHover.call(this, $(this));
        });

    $('header.main-header .menu .parent-category ul').find('> li:eq(0)').addClass('active');
    $('header.main-header .menu ul li.category-products').hover(function () {
        $('header.main-header .search-area').removeClass('active');
        $('.nav-categories-overlay').addClass('active');
    }, function () {
        $('.nav-categories-overlay').removeClass('active');
    });
    $('header.main-header .menu .parent-category li a').on('mouseenter', function (g) {
        var tab = $(this).closest('.product-category'),
            index = $(this).closest('li').index();

        tab.find('.parent-category ul > li').removeClass('active');
        $(this).closest('li').addClass('active');

        tab.find('.children-categories').find('.children-category').not('children-category:eq(' + index + ')').fadeOut(0);
        tab.find('.children-categories').find('.children-category:eq(' + index + ')').fadeIn(0);

        g.preventDefault();
    });
    // menu

});


var transparent = true;

var transparentDemo = true;
var fixedTop = false;

var navbar_initialized,
    backgroundOrange = false,
    toggle_initialized = false;

$(document).ready(function() {


    // Activate the image for the navbar-collapse
    nowuiKit.initNavbarImage();

    $navbar = $('.navbar[color-on-scroll]');
    scroll_distance = $navbar.attr('color-on-scroll') || 500;
});

$(window).on('resize', function() {
    nowuiKit.initNavbarImage();
});

$(document).on('click', '.navbar-toggler', function() {
    $toggle = $(this);

    if (nowuiKit.misc.navbar_menu_visible == 1) {
        $('html').removeClass('nav-open');
        nowuiKit.misc.navbar_menu_visible = 0;
        $('#bodyClick').remove();
        setTimeout(function() {
            $toggle.removeClass('toggled');
        }, 550);
    } else {
        setTimeout(function() {
            $toggle.addClass('toggled');
        }, 580);
        div = '<div id="bodyClick"></div>';
        $(div).appendTo('body').click(function() {
            $('html').removeClass('nav-open');
            nowuiKit.misc.navbar_menu_visible = 0;
            setTimeout(function() {
                $toggle.removeClass('toggled');
                $('#bodyClick').remove();
            }, 550);
        });

        $('html').addClass('nav-open');
        nowuiKit.misc.navbar_menu_visible = 1;
    }
});

nowuiKit = {
    misc: {
        navbar_menu_visible: 0
    },

    checkScrollForTransparentNavbar: debounce(function() {
        if ($(document).scrollTop() > scroll_distance) {
            if (transparent) {
                transparent = false;
                $('.navbar[color-on-scroll]').removeClass('navbar-transparent');
            }
        } else {
            if (!transparent) {
                transparent = true;
                $('.navbar[color-on-scroll]').addClass('navbar-transparent');
            }
        }
    }, 17),

    initNavbarImage: function() {
        var $navbar = $('.navbar').find('.navbar-translate').siblings('.navbar-collapse');
        var background_image = $navbar.data('nav-image');

        if ($(window).width() < 991 || $('body').hasClass('burger-menu')) {
            if (background_image != undefined) {
                $navbar.css('background', "url('" + background_image + "')")
                    .removeAttr('data-nav-image')
                    .css('background-size', "cover")
                    .addClass('has-image');
            }
        } else if (background_image != undefined) {
            $navbar.css('background', "")
                .attr('data-nav-image', '' + background_image + '')
                .css('background-size', "")
                .removeClass('has-image');
        }
    },

    initSliders: function() {
        // Sliders for demo purpose in refine cards section
        var slider = document.getElementById('sliderRegular');

        noUiSlider.create(slider, {
            start: 40,
            connect: [true, false],
            range: {
                min: 0,
                max: 100
            }
        });

        var slider2 = document.getElementById('sliderDouble');

        noUiSlider.create(slider2, {
            start: [20, 60],
            connect: true,
            range: {
                min: 0,
                max: 100
            }
        });
    }
}


var big_image;

// Javascript just for Demo purpose, remove it from your project
nowuiKitDemo = {
    checkScrollForParallax: debounce(function() {
        var current_scroll = $(this).scrollTop();

        oVal = ($(window).scrollTop() / 3);
        big_image.css({
            'transform': 'translate3d(0,' + oVal + 'px,0)',
            '-webkit-transform': 'translate3d(0,' + oVal + 'px,0)',
            '-ms-transform': 'translate3d(0,' + oVal + 'px,0)',
            '-o-transform': 'translate3d(0,' + oVal + 'px,0)'
        });

    }, 6)

}

$(document).on('click touchstart', function (e) {
    var headerSearchBox = $('.main-header__search');
    var input = $('.main-header__searchbox input');
    if ($(e.target).is(headerSearchBox) || headerSearchBox.has(e.target).length == 1) {
        input.addClass('bg-white')
        $('.main-header__search-content').show();

    } else {
        input.removeClass('bg-white');
        $('.main-header__search-content').hide();

    }
});
let offset = 120;
$(window).scroll(function () {
    $(this).scrollTop() >= offset ? ($("#navigation-ui").addClass("sticky")) : ($("#navigation-ui").removeClass("sticky"));
})

function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this,
            args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        }, wait);
        if (immediate && !timeout) func.apply(context, args);
    };
};