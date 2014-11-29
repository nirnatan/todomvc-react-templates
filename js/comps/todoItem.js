define([
    'react',
    'js/comps/todoItem.rt'
], function (React, template) {
    'use strict';

	var ESCAPE_KEY = 27;
	var ENTER_KEY = 13;

	return React.createClass({

		displayName: 'TodoItem',

		handleSubmit: function () {
			var val = this.state.editText.trim();
			if (val) {
				this.props.onSave(val);
				this.setState({editText: val});
			} else {
				this.props.onDestroy();
			}
		},

		handleEdit: function () {
			// react optimizes renders by batching them. This means you can't call
			// parent's `onEdit` (which in this case triggeres a re-render), and
			// immediately manipulate the DOM as if the rendering's over. Put it as a
			// callback. Refer to app.jsx' `edit` method
			this.props.onEdit(function () {
				var node = this.refs.editField.getDOMNode();
				node.focus();
				node.setSelectionRange(0, node.value.length);
			}.bind(this));
			this.setState({editText: this.props.todo.title});
		},

		handleKeyDown: function (event) {
			if (event.which === ESCAPE_KEY) {
				this.setState({editText: this.props.todo.title});
				this.props.onCancel(event);
			} else if (event.which === ENTER_KEY) {
				this.handleSubmit();
			}
		},

		getInitialState: function () {
			return {editText: this.props.todo.title};
		},

		render: function () {
			return template.apply(this);
		}
	});
});
