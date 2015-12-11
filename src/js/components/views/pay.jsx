import React from 'react';
import Formsy from 'formsy-react';
import { Select, Input } from 'formsy-react-components';
import { Link } from 'react-router';

let Selector = React.createClass({
 render: function() {
   let cardOptions = [
     {label : "Choose card"},
     {label : "Placeholder for card data"}
   ];
   return (
     <Formsy.Form>
       <Select
         name="cardSelector"
         options={cardOptions}
         onChange={this.props.onChange}
       />
     </Formsy.Form>
  );
 }
});

let Page = React.createClass({

  getInitialState: function() {
    return {
      cardSelected: false
    };
  },

  onChange: function() {
    this.setState({
      cardSelected: true
    });
  },

  render: function() {
    return (
      <div>
        <Selector onChange={this.onChange} />
        {!this.state.cardSelected ? (
          <p>Please choose a card</p>
        ) : (
          <div>
          <Formsy.Form>
            <Input
              name="cvv"
              value=""
              type="text"
              label="CVV"
              required
              />
          </Formsy.Form>
          <Link to="/order-confirmation">
            <div className="next-button">PAY</div>
          </Link>
          </div>
        )}
      </div>
    );
  }
});

module.exports = Page;