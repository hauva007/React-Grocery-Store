let React = require('react');
let createReactClass = require('create-react-class');
let GroceryItem = require('./GroceryItem.jsx');

module.exports = createReactClass({
    render: function() {
        return (
            <div>
                <h1>Grocery Listify</h1>
                <div>
                    {this.props.items.map(function(item, index) {
                        return (
                            <GroceryItem item={item} key={'item' + index}/>
                        )
                    })
                    }
                </div>
            </div>
        )
    }
});