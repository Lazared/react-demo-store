import React, { Component } from 'react';
import * as lamp7 from "../../assets/img/products/lamp7-trans.png";
import { connect } from 'react-redux';
import * as api from '../../utils/moltin';

function mapStateToProps(state) {
    return(state)
}


class CartItems extends Component {

  render() {

  var cart_decrement = (ID, quantity) => {
      api.UpdateCartMinus(ID, quantity)

      .then((cart) => {
        console.log("cart quantity updated")

        this.props.dispatch((dispatch) => {
            dispatch({type: "Fetch_Cart", payload: cart})
        })
      })

      .catch((e) => {
        console.log(e)
      })
    };

  var cart_increment = (ID, quantity) => {
    api.UpdateCartPlus(ID, quantity)

    .then((cart) => {
      console.log("cart quantity updated")

      this.props.dispatch((dispatch) => {
          dispatch({type: "Fetch_Cart", payload: cart})
      })
    })

    .catch((e) => {
      console.log(e)
    })
  }

  var cart_edit = (ID, quantity) => {
    api.UpdateCart(ID, quantity)

    .then((cart) => {
      console.log("cart quantity updated")

      this.props.dispatch((dispatch) => {
          dispatch({type: "Fetch_Cart", payload: cart})
      })
    })

    .catch((e) => {
      console.log(e)
    })
  }

    if(this.props.cart.fetched === true) {
      var items = this.props.cart.cart.data;

      return (
      <div>
      {items.map(function(item) {
        return (
          <div className="cart-item" key={item.id}>
            <div className="cart-product">
                <div className="product-image" aria-hidden="true">
                    <img src={lamp7} alt="Crown - A unique black lamp with six metal legs forming a nest at the top, creating a crown of six lights." style={{"background": "#d9d9d9"}}/>
                </div>
                <h3>{item.name}</h3>
            </div>
            <div className="cart-quantity">
                <div className="quantity-input">
                    <p className="hide-content">Product quantity.</p>
                    <p className="hide-content">Increment the quantity by using the plus and minus buttons, or alter the input directly.</p>
                    <button type="button" className="decrement number-button" onClick={() => {cart_decrement(item.id, item.quantity)}} ><span className="hide-content">Decrement quantity</span><span aria-hidden="true">-</span></button>
                    <input className="quantity" name="number" type="number" min="1" max="10"  size="2"  onChange={() => {cart_edit(item.id, item.quantity);console.log("hello")}}/>
                    <button type="button" className="increment number-button" onClick={() => {cart_increment(item.id, item.quantity)}}><span className="hide-content">Increment quantity</span><span aria-hidden="true">+</span></button>
                </div>
            </div>
            <div className="cart-price">
                <p className="price"><span className="hide-content">Price per item </span>{item.unit_price.amount * item.quantity}</p>
            </div>
            <div className="cart-delete">
                <button className="remove" type="button"><span className="hide-content">Delete item</span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.55635 15.55635">
                        <rect fill="currentColor" x="-2.22183" y="6.77817" width="20" height="2" transform="translate(7.77817 -3.22183) rotate(45)"/>
                        <rect fill="currentColor" x="-2.22183" y="6.77817" width="20" height="2" transform="translate(18.77817 7.77817) rotate(135)"/>
                    </svg>
                </button>
            </div>
        </div>
        )
      })}
      </div>
    )
    }

    else {

      return (
        <p>no cart data</p>
      )
    }

  }
};

export default connect(mapStateToProps)(CartItems);
