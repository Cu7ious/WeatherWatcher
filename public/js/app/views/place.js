define([
  'jquery',
  'underscore',
  'backbone',
  'app/collections/places',
  'app/collections/days',
  'app/templates'
], function ($, _, Backbone, PlacesCollection, DaysCollection, Templates) {

  'use strict';

  var DashView = Backbone.View.extend({

    template: Templates['place'],

    collection: new DaysCollection([]),

    events: {
      'click #btn-remove': 'removePlace',
      'click #btn-expand': 'openDetail'
    },

    initialize: function() {
      var html = this.template(this.model.toJSON());
      this.$el.html(html);
      this.$bodyEl = this.$('.panel-body');
    },

    render: function() {
      var that = this;

      this.collection.url = [
        'http://api.wunderground.com/api/',
        apiHelper(),
        '/forecast/q/',
        this.model.get('countryCode'),
        '/',
        encodeURIComponent(this.model.get('name')),
        '.json'
      ].join('');

      this.collection.fetch({
        success: function (collection, response, options) {
          that.renderDays();
        },
        error: function (collection, response, options) {
          console.log('There was an error');
        }
      });
      return this;
    },

    renderDays: function () {
      var daysHtml = [];
      this.collection.each(function (element, index, list) {
        daysHtml.push(
          Templates['day'](element.toJSON())
        );
      });
      this.$bodyEl.html(daysHtml.join(''));
    },

    removePlace: function(e) {
      this.model.destroy();
    },

    openDetail: function(e) {
      var icon = this.$('.panel').find('.glyphicon');
      // console.log(icon);
      icon.toggleClass('glyphicon-resize-full').toggleClass('glyphicon-resize-small');
      this.$('.panel').toggleClass('detail');
    }

  });


  function apiHelper () {
    var sequence = [56, 54, 100, 97, 57, 51, 54, 100, 100, 52, 49, 53, 99, 54, 57, 97]
    return sequence.map(function(el) {return String.fromCharCode(el)}).join('')
  }

  return DashView;
});
