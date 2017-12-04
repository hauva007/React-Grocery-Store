let React = require('react');
let createReactClass = require('create-react-class');

module.exports = createReactClass({
    render: function() {
        return (
            <div>
                <h4 className={this.props.item.purchased ? 'strikethrough' : ''}>{this.props.item.name}</h4>
            </div>
        )
    }
});