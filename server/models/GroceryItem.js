let mongoose = require('mongoose');

let GroceryItemSchema = {
    name: String,
    purchased: Boolean,
    id: String
};

let GroceryItem = mongoose.model('GroceryItem', GroceryItemSchema, 'groceryItems');

module.exports = GroceryItem;