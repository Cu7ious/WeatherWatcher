define([
	'jquery',
	'underscore',
	'backbone'
], function ($, _, Backbone) {

	'use strict';

	var AboutView = Backbone.View.extend({

		initialize: function() {

		},

		render: function() {
			var html = [
				'<div class="page-header">',
					'<h3>About page</h3>',
				'</div>',
			].join('');

			this.$el.html(html);

			return this;
		}

	});

	return AboutView;
});