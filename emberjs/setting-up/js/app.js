var App = Ember.Application.create({
    LOG_TRANSITIONS: true
});

// the default behaviour is to load the index template
App.Router.map(function () {
    this.route('about');
    this.route('credits');
});
