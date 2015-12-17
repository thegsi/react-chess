import React from "react";
import { Link } from 'react-router';

let MenuComponent = require('../menu.jsx');
let BasketBar = require('../basket-bar.jsx');

let SelectMenu = React.createClass({

  getInitialState: function(){
    return {
      view: "selectRestaurant",
      searching: false,
      filteredMenu: this.props.basket,
      searchText: ""
    };
  },

  goToRestaurant: function(e, restaurantName) {
    this.props.actions.setMenuType("restaurant", restaurantName);
  },

  goToFoodType: function(e, foodTypeName) {
    this.props.actions.setMenuType("foodType", foodTypeName);
  },

  focusOnInputBox: function(event) {
    this.setState({
      view: "inputBoxFocused"
    });
  },

  getRestaurantList: function() {
    var getUniqueTags = this.props.helpers.getUniqueTags;
    var uniqueTags = getUniqueTags(this.props.basket, "restaurant");
    return uniqueTags.map(function(restaurantName){
      return (
        <Link to="/basket/menu">
          <button
            onClick={event => this.goToRestaurant(event, restaurantName)}>{restaurantName}</button>
        </Link>
      )
    }.bind(this));
  },

  renderSelectRestaurant: function() {
    var restaurantList = this.getRestaurantList();
    return (
      <div>
          {restaurantList}
      </div>
    )
  },

  getFoodTypeList: function() {
    var getUniqueTags = this.props.helpers.getUniqueTags;
    var filteredMenu = this.getFilteredMenu()
    var uniqueTags = getUniqueTags(filteredMenu, "foodType");
    return uniqueTags.map(function(foodTypeName){
      return (
        <Link to="/basket/menu">
          <button
            onClick={event => this.goToFoodType(event, foodTypeName)}>{foodTypeName}</button>
        </Link>
      )
    }.bind(this));
  },



  renderSelectFoodType: function() {
    var foodTypeList = this.getFoodTypeList();
    return (
      <div>
        {foodTypeList}
      </div>
    );
  },


  searchInputChange: function(event){

    // let searchMenu = function (menu, searchTerm){
    //   return menu.filter(function(item){
    //     return item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    //   });
    // };

    this.setState({
      searching: true,
      searchText: event.target.value.substr(0)
    });
  },

  getFilteredMenu: function() {
    let searchMenu = function (menu, searchTerm){
      return menu.filter(function(item){
        return (
          item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||
          item.foodType.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
        )
      });
    };
    //validation with second substring argument
    return searchMenu(this.props.basket, this.state.searchText);

  },


  render: function(){
    var searchResult;
    var orderer = this.props.helpers.orderMenu;
    if (this.state.view === "selectRestaurant") {
      searchResult = this.renderSelectRestaurant()
    } else if (this.state.view === "inputBoxFocused") {
      if (this.state.searching === false){
        searchResult = this.renderSelectFoodType()
      } else {
        var basket = orderer(this.getFilteredMenu(), "restaurant")
        searchResult = (
          <div>
            <MenuComponent menu={basket} actions={this.props.actions} />
            {this.renderSelectFoodType()}
          </div>
        )
      }
    }

    return (
      <div>
        <input
          onFocus={this.focusOnInputBox}
          onChange={this.searchInputChange}
          type="text"
          placeholder="Search by food type or name">
        </input>
        {searchResult}
        <BasketBar helpers={this.props.helpers} menu={this.props.basket}/>
      </div>
    )
  }

});

module.exports = SelectMenu;