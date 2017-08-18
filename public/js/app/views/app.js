define([
	'jquery',
	'underscore',
	'backbone',
	'app/views/dash',
	'app/views/about',
	'app/views/settings'
], function ($, _, Backbone, DashView, AboutView, SettingsView) {

	'use strict';

	var AppView = Backbone.View.extend({
		id: 'app-view',

		html: [
			'<div class="container-fluid">',
				'<div class="navbar navbar-inverse">',
					'<div class="navbar-header">',
						'<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target=".navbar-collapse">',
							'<span class="sr-only">Toggle navigation</span>',
							'<span class="icon-bar"></span>',
							'<span class="icon-bar"></span>',
							'<span class="icon-bar"></span>',
						'</button>',
					'<a class="navbar-brand" href="#">Weather Watcher</a>',
					'</div>',
					'<div class="navbar-collapse collapse">',
						'<ul class="nav navbar-nav">',
							'<li id="nav-dash"><a href="#dash">Dashboard</a></li>',
							'<li id="nav-about"><a href="#about">About</a></li>',
						'</ul>',
						'<ul class="nav navbar-nav navbar-right">',
							'<li class="navbar-text pull-left"></li>',
							'<li><a id="btn-settings" href="#"><span class="glyphicon glyphicon-cog"></a></li>',
						'</ul>',
					'</div>',
				'</div>',
				'<div id="content"></div>',
			'</div>'
		].join(''),

		events: {
			'click #btn-settings': 'openSettings'
		},

		views: {},

		initialize: function() {
			this.listenTo(this.model, 'change', this.render);

			this.views['about'] = new AboutView({
				id: 'page-about', 
				className: 'page-view'
			});

			this.views['dash'] = new DashView({
				id: 'page-dash', 
				className: 'page-view'
			});

			this.$el.append(this.html);

			this.$('#content').append(this.views['about'].render().el);
			this.$('#content').append(this.views['dash'].render().el);
		},

		render: function() {
			this.$el.css('background-color', this.model.get('backgroundColor'));
			this.$('.navbar-text').html(this.model.get('welcomeMessage'));
			var tempType = this.model.get('celsius') ? 'celsius' : 'fahrenheit';
			this.$el.removeClass('celsius fahrenheit');
			this.$el.addClass(tempType);
			return this;
		},

		setPage: function(page) {
			this.$('.nav li').removeClass('active');
			this.$('.page-view').hide();
			this.$('#page-'+page).show();
			this.$('#nav-'+page).addClass('active');
		},

		openSettings: function(e) {
			e.preventDefault();
			var modal = new SettingsView({
				title: 'Application Settings',
				id: 'modal-settings',
				model: this.model
			});
			modal.show();
		}

	});

	return AppView;
});
