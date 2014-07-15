var App = Ember.Application.create({
    LOG_TRANSITIONS: true
});

// the default behaviour is to load the index template
App.Router.map(function () {
    this.route('about');
    this.route('credits');
    // Resource Route (noun)
    this.resource('products', function() {
        this.resource('product', { path: '/:product_id' });
        this.route('onsale');
    });
    this.resource('contacts');
});

App.IndexController = Ember.ArrayController.extend({
    productsCount: Ember.computed.alias('length'),
    // productsCount: function() {
    //     return this.get('length');
    // }.property('length'),

    onSale: function() {
        // only three
        return this.filterBy('isOnSale').slice(0, 3);
    }.property('@each.isOnSale'),

    time: function() {
        return (new Date()).toDateString();
    }.property()
});

App.ProductsRoute = Ember.Route.extend({
    model: function() {
        // Sort using server side /products?sort=title
        // return this.store.find('product', {sort: 'title'});
        return this.store.findAll('product');
    }
});

App.ProductsOnsaleRoute = Ember.Route.extend({
    model: function() {
        return this.modelFor('products').filterBy('isOnSale');
    }
});

App.ProductRoute = Ember.Route.extend({
    model: function(params) {
        return this.store.find('product', params.product_id);
    }
});

App.ContactsRoute = Ember.Route.extend({
    model: function() {
        return App.CONTACTS;
    }
});

App.IndexRoute = Ember.Route.extend({
    model: function() {
        return this.store.findAll('product');
    }
});

App.ApplicationAdapter = DS.FixtureAdapter.extend();

App.ProductDetailsComponent = Ember.Component.extend({
    reviewsCount: Ember.computed.alias('product.reviews.length'),
    hasReviews: function() {
        return this.get('reviewsCount') > 0;
    }.property('reviewsCount')
});

App.ProductView = Ember.View.extend({
    classNames: ['row'],
    classNameBindings: ['isOnSale'],
    isOnSale: Ember.computed.alias('controller.isOnSale')
});

App.Product = DS.Model.extend({
    title: DS.attr('string'),
    price: DS.attr('number'),
    description: DS.attr('string'),
    isOnSale: DS.attr('boolean'),
    image: DS.attr('string'),
    // lazy loading
    reviews: DS.hasMany('review', {async: true})
});

App.Review = DS.Model.extend({
    text: DS.attr('string'),
    reviewedAt: DS.attr('date'),
    product: DS.belongsTo('product')
});

App.ProductsController = Ember.ArrayController.extend({
    // Sort using the controller (in browser)
    sortProperties: ['title'],
    sortAscending: false
});

App.ReviewsController = Ember.ArrayController.extend({
    // Sort using the controller (in browser)
    sortProperties: ['reviewedAt'],
    sortAscending: true
});

var imageSrc = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNDAiIGhlaWdodD0iMTQwIj48cmVjdCB3aWR0aD0iMTQwIiBoZWlnaHQ9IjE0MCIgZmlsbD0iI2VlZSIvPjx0ZXh0IHRleHQtYW5jaG9yPSJtaWRkbGUiIHg9IjcwIiB5PSI3MCIgc3R5bGU9ImZpbGw6I2FhYTtmb250LXdlaWdodDpib2xkO2ZvbnQtc2l6ZToxMnB4O2ZvbnQtZmFtaWx5OkFyaWFsLEhlbHZldGljYSxzYW5zLXNlcmlmO2RvbWluYW50LWJhc2VsaW5lOmNlbnRyYWwiPjE0MHgxNDA8L3RleHQ+PC9zdmc+';

App.Product.FIXTURES = [
    {
        id: 1,
        title: 'Fint',
        price: 99,
        description: 'Flint is ...',
        isOnSale: true,
        image: imageSrc,
        reviews: [100, 101]
    }, {
        id: 2,
        title: 'Kindling',
        price: 249,
        description: 'Easily ...',
        isOnSale: false,
        image: imageSrc
    }, {
        id: 3,
        title: 'A Product',
        price: 249,
        description: 'Easily ...',
        isOnSale: true,
        image: imageSrc
    }, {
        id: 4,
        title: 'B Product',
        price: 249,
        description: 'Easily ...',
        isOnSale: false,
        image: imageSrc
    }, {
        id: 5,
        title: 'X Product',
        price: 249,
        description: 'Easily ...',
        isOnSale: false,
        image: imageSrc
    }, {
        id: 6,
        title: 'Z Product',
        price: 249,
        description: 'Easily ...',
        isOnSale: true,
        image: imageSrc
    }, {
        id: 7,
        title: 'Z Product2',
        price: 249,
        description: 'Easily ...',
        isOnSale: false,
        image: imageSrc
    }
];

App.Review.FIXTURES = [
    {
        id: 100,
        product: 1,
        text: "Started a fire in no time!"
    },
    {
        id: 101,
        product: 1,
        text: "Bla bla bla bla bla"
    }
];

App.CONTACTS = [
    {
        name: 'Giamia',
        avatar: 'images/contacts/giamia.png',
        about: 'About ...'
    }, {
        name: 'Anostagia',
        avatar: 'images/contacts/anostagia.png',
        about: 'About ...'
    }
];
