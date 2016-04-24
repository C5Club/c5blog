/**
 * Created by maocg.
 * Date:2016/1/6 0006.
 * Time:下午 10:39.
 * Descroption:jquey plugin test
 */

;
(function ($) {
    $.fn.extend({
        'ToolTip': function (option) {
            return this.each(function () {
                if (!(this && this.tagName === "DIV")) return;

                if (this.controller) {
                    this.controller.setOption(option);
                } else {
                    if ($.isPlainObject(option))
                        this.controller = new Controller(this, option);
                }
            });
        }
    });
    var Controller = function (div, option) {
        this.option = $.extend(false, {
            "message": "小乖乖",
            "width": 200
        }, option);
        _setupDiv.apply(this, [div]);
        _setupToolTip.apply(this, [div]);

    }
    var _setupToolTip = function () {
        var that = this;
        this.toolTipView = $("<div class='tooltip'>")
            .appendTo(document.body)
            .css("position", "absolute")
            .html(that.option.message)
            .hide();
        var top = this.divView.offset().top + this.divView.outerHeight();
        var left = this.divView.offset().left;
        this.toolTipView.css("top", top + "px").css("left", left + "px");

    }
    var _setupDiv = function (div) {
        var that = this;
        this.divView = $(div);
        this.divView
            .on("mouseenter", function () {
                that.toolTipView.show();
            })
            .on("mouseleave", function () {
                that.toolTipView.hide();
            })
    }
    Controller.prototype.setOption = function (option) {
        if ($.isPlainObject(option)) {
            this.option = $.extend(false, this.option, option);
        } else if (typeof (option) === "string") {
            switch (option) {
                case 'destory':
                    this.destory();
                    break;
            }
        }

    }
    Controller.prototype.destory = function () {
        this.toolTipView.remove;
        this.divView.unbind("mouseenter", this._enter).unbind("mouseleave", this._out);
        delete this.divView.get(0).controller;
    }
})(jQuery);

