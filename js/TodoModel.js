define(['lodash', 'js/utils'], function (_, Utils) {

    var TodoModel = function (key) {
        this.key = key;
        this.todos = Utils.store(key);
        this.onChanges = [];
    };

    TodoModel.prototype = {
        subscribe: function (onChange) {
            this.onChanges.push(onChange);
        },

        inform: function () {
            Utils.store(this.key, this.todos);
            this.onChanges.forEach(function (cb) {
                cb();
            });
        },

        addTodo: function (title) {
            this.todos = this.todos.concat({
                id: Utils.uuid(),
                title: title,
                completed: false
            });

            this.inform();
        },

        toggleAll: function (checked) {
            this.todos = _.map(this.todos, function (todo) {
                return _.merge({}, todo, {completed: checked});
            });

            this.inform();
        },

        toggle: function (todoToToggle) {
            this.todos = _.map(this.todos, function (todo) {
                return todo !== todoToToggle ?
                    todo :
                    _.merge({}, todo, {completed: !todo.completed});
            });

            this.inform();
        },

        destroy: function (todo) {
            this.todos = _.filter(this.todos, function (t) {
                return t.id !== todo.id;
            });

            this.inform();
        },

        save: function (todoToSave, text) {
            this.todos = _.map(this.todos, function (todo) {
                return todo !== todoToSave ? todo : _.merge({}, todo, {title: text});
            });

            this.inform();
        },

        clearCompleted: function () {
            this.todos = _.filter(this.todos, {completed: false});

            this.inform();
        }
    };

    return TodoModel;
});
