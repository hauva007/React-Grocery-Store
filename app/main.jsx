let React = require('react');
let ReactDOM = require('react-dom');
let GroceryItemList = require('./components/GroceryItemList.jsx')
let groceryItemStore = require('./stores/GroceryItemStore.jsx')

var initial = groceryItemStore.getItems();

function render() {
    ReactDOM.render(<GroceryItemList items={initial}/>, document.getElementById('app'));
}
groceryItemStore.onChange(function(items) {
    initial = items;
    render();
})

render();