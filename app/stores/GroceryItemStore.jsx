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

    function deleteGroceryItem(item) {
        let index;
        items.filter(function(_item, _index) {
            if (_item.name == item.name) {
                index = _index;
            }
        });

        items.splice(index, 1);
        triggerListeners();
    }

    function setGroceryItemBought(item, isBought) {
        //let _item = items.filter(function(a) { return a.name == item.name })[0];
        //console.log(_item);
        item.purchased = isBought || false;
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
                case 'delete':
                    deleteGroceryItem(event.payload);
                    break;
                case 'buy':
                    setGroceryItemBought(event.payload, true);
                    break;
                case 'unbuy':
                    setGroceryItemBought(event.payload, false);
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