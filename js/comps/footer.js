define([
    'react',
    'js/comps/footer.rt'
], function (React, template) {
    'use strict';

	return React.createClass({

		displayName: 'TodoFooter',

		render: function () {
			return template.apply(this);
		}
	});
});
