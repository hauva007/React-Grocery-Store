let express = require('express');
let app = new express();
let parser = require('body-parser');
let React = require('react');
let ReactDOMServer = require('react-dom/server');
let GroceryItem = require('./models/GroceryItem.js')

require('babel-register');
require('./database.js');

app.get('/', function(req, res) {
    let application = React.createFactory(require('./../app/components/GroceryItemList.jsx'));
    GroceryItem.find(function(error, doc) {
        let generated = ReactDOMServer.renderToString(application({
            items: doc
        }));
        res.render('./../app/index.ejs', { reactOutput: generated });
    });
})
.use(express.static(__dirname + '/../.tmp'))
.listen(7777);

app.use(parser.json());
app.use(parser.urlencoded({ extended: false }));

require('./routes/items.js')(app);