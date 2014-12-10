/*eslint new-cap:0,no-unused-vars:0*/
define([
    'react',
    'lodash',
    'js/comps/todoItem',
    'js/comps/footer'
], function (React, _, todoItem, todoFooter) {
    'use strict';
    function onChange1(evt) {
        this.props.model.toggleAll(evt.target.checked);
    }
    function onToggle2(todo, todoIndex) {
        this.props.model.toggle(todo);
    }
    function onDestroy3(todo, todoIndex) {
        this.props.model.destroy(todo);
    }
    function onEdit4(todo, todoIndex, callback) {
        this.setState({ editing: todo.id }, function () {
            callback();
        });
    }
    function onSave5(todo, todoIndex, text) {
        this.onSave(todo, text);
    }
    function onCancel6(todo, todoIndex) {
        this.setState({ editing: null });
    }
    function repeatTodo7(todo, todoIndex) {
        return todoItem({
            'key': todo.id,
            'todo': todo,
            'onToggle': onToggle2.bind(this, todo, todoIndex),
            'onDestroy': onDestroy3.bind(this, todo, todoIndex),
            'onEdit': onEdit4.bind(this, todo, todoIndex),
            'editing': this.state.editing === todo.id,
            'onSave': onSave5.bind(this, todo, todoIndex),
            'onCancel': onCancel6.bind(this, todo, todoIndex)
        });
    }
    function onClearCompleted8(completedCount) {
        this.props.model.clearCompleted();
    }
    function scopeCompletedCount9(completedCount) {
        return completedCount || this.props.model.todos.length - completedCount ? todoFooter({
            'count': completedCount,
            'completedCount': completedCount,
            'nowShowing': this.state.nowShowing,
            'onClearCompleted': onClearCompleted8.bind(this, completedCount)
        }) : null;
    }
    return function () {
        return React.DOM.div({}, React.DOM.header({ 'id': 'header' }, React.DOM.h1({}, 'todos'), React.DOM.input({
            'id': 'new-todo',
            'placeholder': 'What needs to be done?',
            'onKeyDown': this.handleNewTodoKeyDown,
            'autoFocus': true
        })), this.props.model.todos.length ? React.DOM.section({ 'id': 'main' }, React.DOM.input({
            'id': 'toggle-all',
            'type': 'checkbox',
            'onChange': onChange1.bind(this),
            'checked': this.getCompletedTodoCount() === 0
        }), React.DOM.ul.apply(this, _.flatten([
            { 'id': 'todo-list' },
            _.map(this.getTodos(), repeatTodo7.bind(this))
        ]))) : null, scopeCompletedCount9.apply(this, [this.getCompletedTodoCount()]));
    };
});