let dispatcher = require('./../dispatcher.js');
let helper = require('./../helpers/RestHelper.js');

function GroceryItemStore() {
    let items = [];
    let listeners = [];

    helper.get('api/items').then(function(data) {
        items = data;
        triggerListeners();
    });

    function triggerListeners() {
        listeners.forEach(function(listener) {
            listener(items);
        });
    };

    function removeGroceryItem(item) {
        var index;
        items.filter(function(_item, _index) {
            if (_item.name === item.name) {
                index = _index;
            }
        });
        var removed = items.splice(index, 1)[0];
        triggerListeners();

        helper.del('api/items/' + item._id)
        .catch(function() {
            items.splice(index, 0, removed);
        });
    };

    function addGroceryItem(item) {
        var i = items.push(item);
        triggerListeners();
        helper.post('api/items', item)
        .then(function(data) {
            item._id = data._id;
        })
        .catch(function() {
            items.splice(i, 1);
        });
    };

    function setGroceryItemBought(item, isBought) {
        let _item = items.filter(function(a) { return a.name == item.name })[0];
        item.purchased = isBought || false;
        triggerListeners();
        helper.patch('api/items/' + item._id, item);
    }

    function getItems() {
        return items;
    };

    function onChange(listener) {
        listeners.push(listener);
    };

    dispatcher.register(function(event) {
        let split = event.type.split(':');
        if (split[0] === 'grocery-item') {
            switch(split[1]) {
                case 'add':
                    console.log(event);
                    addGroceryItem(event.payload);
                    break;
                case 'delete':
                    removeGroceryItem(event.payload);
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