define([
    'lodash',
    'jquery',
    'react',
    '../TodoModel',
    '../consts',
    'js/comps/app.rt'
], function (_, $, React, TodoModel, /** Consts */consts, template) {
    'use strict';

    var ENTER_KEY = 13;

    var app = React.createClass({

        displayName: 'TodoApp',

        getInitialState: function () {
            return {
                nowShowing: app.ALL_TODOS,
                editing: null
            };
        },

        componentWillMount: function () {
            this.props.model.subscribe(this.forceUpdate.bind(this));
        },

        componentDidMount: function () {
            var setState = this.setState;
            var router = window.Router({
                '/': setState.bind(this, {nowShowing: consts.ALL_TODOS}),
                '/active': setState.bind(this, {nowShowing: consts.ACTIVE_TODOS}),
                '/completed': setState.bind(this, {nowShowing: consts.COMPLETED_TODOS})
            });
            router.init('/');
        },

        handleNewTodoKeyDown: function (event) {
            if (event.which !== ENTER_KEY) {
                return;
            }

            event.preventDefault();

            var val = event.target.value.trim();

            if (val) {
                this.props.model.addTodo(val);
				event.target.value = '';
            }
        },

        getTodos: function () {
            return _.filter(this.props.model.todos, function (todo) {
                switch (this.state.nowShowing) {
                    case consts.ACTIVE_TODOS:
                        return !todo.completed;
                    case consts.COMPLETED_TODOS:
                        return todo.completed;
                    default:
                        return true;
                }
            }, this);
        },

		onSave: function (todo, text) {
			this.props.model.save(todo, text);
			this.setState({editing: null});
		},

        getCompletedTodoCount: function () {
            return _.filter(this.props.model.todos, 'completed').length;
        },

        render: function () {
            return template.apply(this);
        }
    });

    return app;
});
