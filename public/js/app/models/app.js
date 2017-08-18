define([
	'backbone',
	'backbone.localStorage'
], function (Backbone) {

	'use strict';

	var AppModel = Backbone.Model.extend({
		localStorage: new Backbone.LocalStorage("AppSettings"),
		defaults: {
			'backgroundColor': '#FFF',
			'celsius': true,
			'welcomeMessage': 'Welcome!'
		}
	});

	return AppModel;
});