let React = require('react');
let ReactDOM = require('react-dom');

let GroceryItemList = require('./components/GroceryItemList.jsx')

let initial = [{
    name: 'Ice Cream'
}, {
    name: 'Coca Cola',
    purchased: true
}, {
    name: 'Snus',
    purchased: true
}, {
    name: 'Waffles'
}, {
    name: 'Candy'
}, {
    name: 'Sanarks'
}];

ReactDOM.render(<GroceryItemList items={initial}/>, document.getElementById('app'));