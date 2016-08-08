function FORM_WYSIWYG() {
    this.init_class = 'js-init';

    this.elements = {};

    this.initAjaxSettings();

    return this;
}

FORM_WYSIWYG.prototype.initAjaxSettings = function () {
    var _this = this;

    $.ajaxSetup({
        beforeSend: function (jqXHR, settings) {
            settings.data = settings.data + '&' + $.param(_this.getDataAll());
            return true;
        },
        complete: function () {
            _this.replace();
        }
    });

    return _this;
};

FORM_WYSIWYG.prototype.getDataAll = function () {
    var _this = this;
    var data = {};
    _this.destroyAll();
    for (var i in _this.elements) {
        var element = $('#' + i).attr('name');
        data[element] = _this.getData(i);
    }
    _this.replace();
    return data;
};

FORM_WYSIWYG.prototype.getData = function (id) {
    var _this = this;
    var data = "";
    if ('undefined' != _this.elements[id]) {
        //console.log('#' + id);
        data = _this.elements[id].getData();
        //data = $('#' + id).val();
    } else {
        //console.log('undefined:' + id);
    }
    return data;
};

FORM_WYSIWYG.prototype.destroyAll = function () {
    var _this = this;
    for (var i in _this.elements) {
        _this.destroy(i);
        //console.log(FORM_WYSIWYG.elements[id]);
    }
    $('.js-element-wysiwyg').removeClass('js-init');
    return _this;
};

FORM_WYSIWYG.prototype.destroy = function (id) {
    var _this = this;

    if ('undefined' != _this.elements[id]) {
        try {
            //console.log(_this.elements[id]);
            _this.elements[id].destroy();
            $('#' + id).removeClass(_this.init_class);
        } catch (e) {

        }
    } else {
        //console.log('undefined:' + id);
    }
    return _this;
};

FORM_WYSIWYG.prototype.replace = function () {
    var _this = this;
    CKEDITOR.config.allowedContent = true;
    $('.js-element-wysiwyg:not(.' + _this.init_class + ')').each(function () {
        var elem = $(this),
            id = elem.attr('id');
        elem.addClass(_this.init_class);
        _this.elements[id] = CKEDITOR.replace(elem.get(0), {
            filebrowserBrowseUrl: '/packages/larakit-filemanager/dialog.php?editor=ckeditor&type=1&lang=ru&popup=1&crossdomain=0&field_id=&CKEditor=' + id + '&fldr=/&CKEditorFuncNum=1',
            filebrowserUploadUrl: '/packages/larakit-filemanager/dialog.php?editor=ckeditor&type=1&lang=ru&popup=1&crossdomain=0&field_id=&CKEditor=' + id + '&fldr=/&CKEditorFuncNum=1',
            filebrowserImageBrowseUrl: '/packages/larakit-filemanager/dialog.php?editor=ckeditor&type=1&lang=ru&popup=1&crossdomain=0&field_id=&CKEditor=' + id + '&fldr=/&CKEditorFuncNum=1'
        });
    });

    return _this;
};

var wysiwyg = new FORM_WYSIWYG();

var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
var eventer = window[eventMethod];
var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";

eventer(messageEvent, function (e) {
    if ('responsivefilemanager' == e.data.sender) {
        CKEDITOR.tools.callFunction(1, e.data.url);
    } else {
        console.log(e.data);
    }
}, true);

$('body')
    .on('larakit.js', function () {
        wysiwyg.replace();
    });

function OnMessage(e) {
    var event = e.originalEvent;
    // Make sure the sender of the event is trusted
    if (event.data.sender === 'responsivefilemanager') {
        console.log(event.data);
        if (event.data.field_id) {
            var fieldID = event.data.field_id;
            var url = event.data.url;

            $('#' + fieldID).val(url).trigger('change');
            $.fancybox.close();

            // Delete handler of the message from ResponsiveFilemanager
            $(window).off('message', OnMessage);
        }
    }
}

function responsive_filemanager_callback(field_id) {
    console.log(field_id);
    var url = jQuery('#' + field_id).val();
    alert('update ' + field_id + " with " + url);
    //your code
}