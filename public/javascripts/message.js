/**
 * Created by maocg.
 * Date:2016/3/12 0012.
 * Time:下午 10:10.
 */
;
(function ($) {

    var userId = $('#userId').val();
    var SearchMsg = function () {
        $.get('http://localhost:3000/searchmsg/' + userId, function (data) {
            if (data) {
                RenderMsg(data);
            }
        });
    };
    var RenderMsg = function (data) {
        if (data.length < 1)
            return;
        var msgDom = $("#message");
        var msgNum = $("#msgNum");
        var len = data.length;
        $.each(data, function (index, obj) {
            var msgId = obj._id;
            var msg = '<li role="presentation" id=' + msgId + '><a role="menuitem" tabindex="-1">you have a message</a></li>';
            msgDom.append(msg);
            var remove =  $("#" + msgId);
            $("#" + msgId).onclick = function (msgId) {
                ReadMsg(msgId);
            };
        });
    };

    var ReadMsg = function (msgId) {
        $.get('http://localhost:3000/readmsg/' + msgId, function (data) {
            if (data) {
                $("#message").remove($("#" + msgId));
            }
        });
    };
    setInterval(function () {
        SearchMsg();
    }, 10000);


})(jQuery);

