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

    instance: function ($element) {
        var js_element = $element.get(0),
            id = LarakitWysiwyg.getId($element),
            instance = LarakitWysiwyg.instances[id];

        if (undefined === instance) {
            instance = LarakitWysiwyg.instances[id] = CKEDITOR.replace(js_element, LarakitWysiwyg.config);
            instance.on('change', function () {
                instance.updateElement();
            });
        } else {
            if (undefined === CKEDITOR.instances[id]) {
                delete LarakitWysiwyg.instances[id];
                return LarakitWysiwyg.instance(js_element);
            }
        }
        return instance;
    },

    getId: function ($element) {
        // var id = $element.attr('id');
        // if (!id || undefined === id) {
        var id = 'wysiwyg-uid-' + Object.keys(LarakitWysiwyg.instances).length;
        $element.attr('id', id);
        // }
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