/*global jQuery, window */
(function ($) {
    "use strict";
    var pluginName = "kitkatMenu",
        defaults = {
            sections: '.scrollable',
            nav: '.sec-foot',
            activeClass: 'active',
            scrollOffset: 170
        };
    // The actual plugin constructor
    function Plugin(element, options) {
        this.element = element;
        this.$element = $(this.element);
        this.options = options;
        this.metadata = this.$element.data('options');
        this.settings = $.extend({}, defaults, this.options, this.metadata);
        this.$sections = this.$element.find(this.settings.sections);
        if (this.$sections.length) {
            this.init();
        }
    }
    Plugin.prototype = {
        init: function () {
            this.generateNavigation();
            this.enableScrollSpy();
            this.enableNavigation();
        },
        generateNavigation: function () {
            var that = this,
                pagerHtml = '';
            that.$sections.each(function (index) {
                var $section = $(this);
                pagerHtml += '<li><a href="#' + $section.attr('id') + '" title=" ' + $section.data('title') + ' ">' + (index + 1) + '</a></li>';
            });
            $(that.settings.nav).before('<ul class="nav nav-pager kitkatMenu-nav">' + pagerHtml +  '</ul>');
            that.$nav = $(that.settings.nav).prev();
            that.$nav.find('li:first').addClass(that.settings.activeClass);
        },
        enableScrollSpy: function () {
            var that = this;
            that.$sections.each(function () {
                var position = $(this).position();
                $(this).scrollspy({
                    min: position.top - that.settings.scrollOffset,
                    max: position.top + $(this).outerHeight(),
                    onEnter: function (element) {
                        that.$nav.find('.' + that.settings.activeClass).removeClass(that.settings.activeClass);
                        that.$nav.find('a[href="#' + $(element).attr('id') + '"]').parent().addClass(that.settings.activeClass);
                    }
                });
            });
        },
        enableNavigation: function () {
            var that = this;
            that.$nav.find('a').on('click', function (e) {
                e.preventDefault();
                var $this = $(this),
                    target = $(this.hash);
                if (window.location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && window.location.hostname === this.hostname) {
                    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                    if (target.length) {
                        $('html, body').animate({
                            scrollTop: target.offset().top
                        }, 1000, function () {
                            that.$nav.find('.' + that.settings.activeClass).removeClass(that.settings.activeClass);
                            $this.parent().addClass(that.settings.activeClass);
                        });
                        return false;
                    }
                }
            });
        }
    };
    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Plugin(this, options));
            }
        });
    };
}(jQuery));