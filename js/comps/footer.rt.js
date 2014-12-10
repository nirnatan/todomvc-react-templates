/*eslint new-cap:0,no-unused-vars:0*/
define([
    'react',
    'lodash',
    '../consts'
], function (React, _, consts) {
    'use strict';
    function scopeCount1(count) {
        return React.DOM.span({ 'id': 'todo-count' }, React.DOM.strong({}, count), ' ' + (count === 1 ? 'item' : 'items') + ' left\n\t');
    }
    return function () {
        return React.DOM.footer({ 'id': 'footer' }, scopeCount1.apply(this, [this.props.count]), React.DOM.ul({ 'id': 'filters' }, React.DOM.li({}, React.DOM.a({
            'href': '#/',
            'className': React.addons.classSet({ selected: this.props.nowShowing === consts.ALL_TODOS })
        }, '\n\t\t\t\tAll\n\t\t\t')), '\n\t\t' + ' ' + '\n\t\t', React.DOM.li({}, React.DOM.a({
            'href': '#/active',
            'className': React.addons.classSet({ selected: this.props.nowShowing === consts.ACTIVE_TODOS })
        }, '\n\t\t\t\tActive\n\t\t\t')), '\n\t\t' + ' ' + '\n\t\t', React.DOM.li({}, React.DOM.a({
            'href': '#/completed',
            'className': React.addons.classSet({ selected: this.props.nowShowing === consts.COMPLETED_TODOS })
        }, '\n\t\t\t\tCompleted\n\t\t\t'))), this.props.completedCount > 0 ? React.DOM.button({
            'id': 'clear-completed',
            'onClick': this.props.onClearCompleted
        }, '\n\t\tClear completed (' + this.props.completedCount + ')\n\t') : null);
    };
});