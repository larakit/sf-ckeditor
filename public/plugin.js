var methods = {
    imgData: {},
    opened: false,
    getFormData: function () {
        var $formData = {};
        $.ajax({
            type: "POST",
            async: false,
            url: "server.php?formData=get",
            success: function (data) {
                $formData = jQuery.parseJSON(data);
            }
        });
        return $formData;
    },
    handleHtml: function (element, editor) {
        var $element, $data;
        for (var i = 0; i < element.$.length; i++) {
            if (!methods.opened) {
                $(element.$[i]).on('click', function () {
                    var $this = $(this);
                    $element = $this.find('img')[0];
                    $data = $this.attr('data-insert');
                    var $obj = $data.match(/\[(.*)\]/);
                    $element.setAttribute("data-insert", $obj[1]);
                    methods.imgData[$obj[1]] = $element;
                    editor.insertHtml($element.outerHTML);
                });
            }
        }
        methods.opened = true;
    },
    dataReplace: function (data, parse) {
        var $imgCodes = Object.keys(methods.imgData),
            $pattern;
        for (var i = 0, len = $imgCodes.length; i < len; i++) {
            var $image = methods.imgData[$imgCodes[i]],
                $dataIns = $image.attributes['data-insert'].nodeValue;
            if (parse == 'data') {
                $pattern = new RegExp($image.outerHTML, 'g');
                data = data.replace($pattern, '[' + $dataIns + ']');
            }
            else if (parse == 'html') {
                $pattern = new RegExp('\\[' + $dataIns + '\\]', 'g');
                data = data.replace($pattern, $image.outerHTML);
            }
        }
        return data;
    }
};

CKEDITOR.plugins.add('form-content', {
    icons: 'form-content',
    init: function (editor) {
        editor.addCommand('form-content', new CKEDITOR.dialogCommand('formContentDialog'));
        editor.ui.addButton('form-content', {
            label: 'Form content',
            command: 'form-content',
            toolbar: 'form-content, 0',
            icon: 'image'
        });
    }
});

CKEDITOR.dialog.add('formContentDialog', function (editor) {
    return {
        title: 'Content',
        minWidth: 600,
        minHeight: 200,
        contents: [methods.getFormData()],
        onShow: function () {
            var dialog = this,
                $hc = dialog.getContentElement('contentData', 'htmlContent'),
                $htmlContent = CKEDITOR.document.getById('js-ck-html'),
                $contentItem = $htmlContent.find('.js-ck-html-content'),
                $content = methods.handleHtml($contentItem, editor);
        }
    };
});


CKEDITOR.plugins.add('imgparser',
    {
        requires: ['htmlwriter'],
        init: function (editor) {
            editor.dataProcessor = new CKEDITOR.imgparser(editor);
        }
    });

CKEDITOR.imgparser = function (editor) {
    this.editor = editor;
    this.writer = new CKEDITOR.htmlWriter();
    this.dataFilter = new CKEDITOR.htmlParser.filter();
    this.htmlFilter = new CKEDITOR.htmlParser.filter();
};

CKEDITOR.imgparser.prototype =
{
    toHtml: function (data) {
        data = methods.dataReplace(data, 'html');
        return data;
    },

    toDataFormat: function (html) {
        html = methods.dataReplace(html, 'data');
        return html;
    }
};

