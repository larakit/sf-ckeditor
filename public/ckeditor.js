var LarakitWysiwyg = {
    instances: {},

    config: {
        allowedContent: true,
        /* extraPlugins: 'form-content,imgparser',*/
        toolbarGroups: [
            {name: 'document', groups: ['mode', 'document', 'doctools']},
            {name: 'clipboard', groups: ['clipboard', 'undo']},
            {name: 'editing', groups: ['find', 'selection', 'spellchecker']},
            {name: 'forms'},
            {name: 'basicstyles', groups: ['basicstyles', 'cleanup']},
            {name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align', 'bidi']},
            {name: 'links'},
            '/',
            {name: 'insert'},
            {name: 'styles'},
            {name: 'colors'},
            {name: 'tools'},
            {name: 'others'},
            {name: 'about'}
            /* { name: 'form-content'} */
        ]
    },

    getConfig: function ($element) {
        return new Promise(function (resolve, reject) {
            var url = $element.attr('data-config-url');
            if (undefined === url || '' == url) {
                resolve(LarakitWysiwyg.config);
            } else {
                $
                    .get(url, function (data) {
                        resolve(data);
                    })
                    .error(function () {
                        reject('Ошибка при получении конфига');
                    });
            }
        });
    },

    instance: function ($element) {
        var js_element = $element.get(0),
            id = LarakitWysiwyg.getId($element),
            instance = LarakitWysiwyg.instances[id];


        if (undefined === instance) {
            LarakitWysiwyg.getConfig($element).then(function (config) {
                instance = LarakitWysiwyg.instances[id] = CKEDITOR.replace(js_element, config);
                instance.on('change', function () {
                    instance.updateElement();
                });
            });
            return false;
            // instance = LarakitWysiwyg.instances[id] = CKEDITOR.replace(js_element, LarakitWysiwyg.config);
        } else {
            if ('none' != $element.css('display')) {
                delete LarakitWysiwyg.instances[id];
                delete CKEDITOR.instances[id];
                return LarakitWysiwyg.instance($element);
            }
            if (undefined === CKEDITOR.instances[id]) {
                return LarakitWysiwyg.instance($element);
            }
        }
        return instance;
    },

    getId: function ($element) {
        var id = $element.attr('id');
        if (!id || undefined === id) {
            id = 'wysiwyg-uid-' + Object.keys(LarakitWysiwyg.instances).length;
            $element.attr('id', id);
        }
        return id;
    }
};

(function () {
    $.fn.laraWysiwyg = function () {
        return LarakitWysiwyg.instance($(this));
    };
})();

LarakitJs.initSelector('.js-element-wysiwyg', function () {
    $(this).laraWysiwyg();
});


LarakitJs.initSelector('.js-wysiwyg-insert', function () {
    $(this).on('click', function () {
        var $this = $(this),
            textarea_id = $this.attr('data-id'),
            $textarea = $("#" + textarea_id),
            content = $this.attr('data-content'),
            $modal = $this.closest('.modal-dialog'),
            $close = $modal.find('.js-modal-close');

        $textarea.laraWysiwyg().insertHtml(content);
        $close.trigger('click');

        return false;
        // var textarea = $(this).closest('.form-group').find('textarea'),
        //     content = $(this).attr('data-content');
        // LarakitWysiwyg.instance(textarea).insertHtml(content);
    });
});
