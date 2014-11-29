'use strict';

requirejs.config({
//    baseUrl: '/',
    paths: {
        lodash: 'http://cdnjs.cloudflare.com/ajax/libs/lodash.js/2.4.1/lodash',
        jquery: 'http://code.jquery.com/jquery-1.11.0.min',
        react: 'http://fb.me/react-with-addons-0.12.0',
		director: 'bower_components/director/lib/director'
    },
    shim: {
        lodash: { exports: '_' },
        jquery: { exports: '$' },
        react: { exports: 'React' },
		director: { exports: 'director'}
    }
});

requirejs(['jquery', 'react', 'js/TodoModel', 'js/comps/app'], function ($, React, TodoModel, app) {
    var model = new TodoModel('react-templates-todos');
    var appComp = React.createFactory(app);
    var rendered = appComp({model: model});
    React.render(rendered, $('#todoapp').get(0));
});

