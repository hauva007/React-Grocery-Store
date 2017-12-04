let dispatcher = require('./../dispatcher.js');

function GroceryItemStore() {
    let items = [{
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
    
    let listeners = [];

    function getItems() {
        return items;
    }

    function addGroceryItem(item) {
        items.push(item);
        triggerListeners();
    }

    function onChange(listener) {
        listeners.push(listener);
    }

    function triggerListeners() {
        listeners.forEach(function(listener) {
            listener(items);
        })
    }

    dispatcher.register(function(event) {
        let split = event.type.split(':');
        if (split[0] === 'grocery-item') {
            switch(split[1]) {
                case 'add':
                    addGroceryItem(event.payload);
                    break;
            }
        }
    });

    return {
        getItems: getItems,
        onChange: onChange
    }
}

module.exports = new GroceryItemStore();