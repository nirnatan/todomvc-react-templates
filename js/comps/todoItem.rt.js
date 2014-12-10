/*eslint new-cap:0,no-unused-vars:0*/
define([
    'react',
    'lodash'
], function (React, _) {
    'use strict';
    function onChange1() {
        this.setState({ editText: event.target.value });
    }
    return function () {
        return React.DOM.li({
            'className': React.addons.classSet({
                completed: this.props.todo.completed,
                editing: this.props.editing
            })
        }, React.DOM.div({ 'className': 'view' }, React.DOM.input({
            'className': 'toggle',
            'type': 'checkbox',
            'checked': this.props.todo.completed,
            'onChange': this.props.onToggle
        }), React.DOM.label({ 'onDoubleClick': this.handleEdit }, this.props.todo.title), React.DOM.button({
            'className': 'destroy',
            'onClick': this.props.onDestroy
        })), React.DOM.input({
            'ref': 'editField',
            'className': 'edit',
            'value': this.state.editText,
            'onBlur': this.handleSubmit,
            'onChange': onChange1.bind(this),
            'onKeyDown': this.handleKeyDown
        }));
    };
});