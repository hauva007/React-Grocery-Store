let mongoose = require('mongoose');
let GroceryItem = require('./models/GroceryItem.js')

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/grocery', { useMongoClient: true }, function() {
    console.log('Connected to MongoDB');

    mongoose.connection.db.dropDatabase();

    let items = [{
        name: 'Ice Cream'
    }, {
        name: 'Waffles'
    }, {
        name: 'Candy'
    }, {
        name: 'Sanarks'
    }];

    items.forEach(function(item) {
        new GroceryItem(item).save();
    })
})