import React, { useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
import CheckOutModal from "./CheckOutModal";
class Cart extends React.Component {
  state = {
    cartItem: [],
    totalAmount: "",
    isHover: false,
    showLoader: false,
    showModal: false,
  };
  componentDidMount() {
    this.getCartDetail();
  }
  async getCartDetail() {
    await fetch(
      "http://127.0.0.1:8000/getCartDetails?store_id=1&website=3fca26bf0e1d0898135f2d3ccb4c987a&api_key=d0ffee856e7ac3aa17e29172487ab16d&customer_id=2"
    )
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result.cart);
          this.setState({
            cartItem: result.cart,
            totalAmount: result.cartTotalAmount,
          });
        },
        (error) => {
          console.log(error);
        }
      );
  }
  handleMouseEnter = () => {
    this.setState({ isHover: true });
  };

  RemoveItem = (product_ID) => {
    const Url =
      "http://127.0.0.1:8000/removeProductFromCart?store_id=1&website=3fca26bf0e1d0898135f2d3ccb4c987a&api_key=d0ffee856e7ac3aa17e29172487ab16d";
    const postBody = {
      customer_id: "2",
      product_id: product_ID,
      action: "remove_product",
      store_id: "1",
      website: "3fca26bf0e1d0898135f2d3ccb4c987a",
      api_key: "d0ffee856e7ac3aa17e29172487ab16d",
    };
    const requestMetadata = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postBody),
    };

    fetch(Url, requestMetadata)
      .then((res) => res.json())
      .then((res) => this.getCartDetail())
      .then((res) => console.log(res));
  };
  addQuantity = (id) => {
    const Url =
      "http://127.0.0.1:8000/removeProductFromCart?store_id=1&website=3fca26bf0e1d0898135f2d3ccb4c987a&api_key=d0ffee856e7ac3aa17e29172487ab16d";
    const postBody = {
      customer_id: "2",
      product_id: id,
      action: "add_quantity",
      store_id: "1",
      website: "3fca26bf0e1d0898135f2d3ccb4c987a",
      api_key: "d0ffee856e7ac3aa17e29172487ab16d",
    };
    const requestMetadata = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postBody),
    };

    fetch(Url, requestMetadata)
      .then((res) => res.json())
      .then((res) => this.getCartDetail())
      .then((res) => console.log(res));
  };
  subQuantity = (id) => {
    const Url =
      "http://127.0.0.1:8000/removeProductFromCart?store_id=1&website=3fca26bf0e1d0898135f2d3ccb4c987a&api_key=d0ffee856e7ac3aa17e29172487ab16d";
    const postBody = {
      customer_id: "2",
      product_id: id,
      action: "sub_quantity",
      store_id: "1",
      website: "3fca26bf0e1d0898135f2d3ccb4c987a",
      api_key: "d0ffee856e7ac3aa17e29172487ab16d",
    };
    const requestMetadata = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postBody),
    };

    fetch(Url, requestMetadata)
      .then((res) => res.json())
      .then((res) => this.getCartDetail())
      .then((res) => console.log(res));
  };
  handleCheckout = (event) => {
    console.log(event);
    event.preventDefault();

    this.setState({ showLoader: true });
    setTimeout(() => {
      this.setState({ showLoader: false, showModal: true });
    }, 5000);
  };
  render() {
    let { cartItem, totalAmount, showLoader, isHover, showModal } = this.state;
    return (
      <>
        {showModal && <CheckOutModal />}
        <div className="pageOverlay"></div>

        <div className="drawer drawer--fromRight" id="sidebar-cart">
          <div
            className="new-pm__header"
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "30px",
              padding: "4px 10px",
              position: "relative",
              zIndex: "1",
              borderBottom: "1px solid #dadde2",
            }}
          >
            <span
              style={{
                letterSpacing: "4.5px",
                color: "#000",
                fontFamily: "revert",
                fontWeight: "300",
              }}
            >
              CART
            </span>
            <button
              onClick={this.props.close}
              style={{ border: "none", background: "white" }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 6L6 18"
                  stroke="#241C3C"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M6 6L18 18"
                  stroke="#241C3C"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </div>

          <div className="coupon_holder">
            <div className="coupon_item_holder">
              <div className="coupon_item">
                <h5>Upto 25% off</h5>
                <p>No discount codes needed.</p>
              </div>
              <div className="coupon_item">
                <h5>FREE DELIVERY</h5>
                <h5>FREE EXCHANGES </h5>
                <h5>EASY RETURNS</h5>
                <p></p>
              </div>
              <p className="cpn_note">
                <strong>Note: </strong>
                You have saved a lot!
              </p>
            </div>
          </div>
          <form className="Cart Drawer__Content">
            <div
              className="Drawer__Main"
              style={{ overflow: "auto", height: "550px" }}
            >
              <div className="Drawer__Container">
                <div className="Cart__ItemList">
                  {cartItem.map((n) => {
                    return (
                      <div className="CartItemWrapper" key={n.pid}>
                        <div className="CartItem">
                          <div
                            className="CartItem__ImageWrapper"
                            style={{ width: "30%" }}
                          >
                            <div className="AspectRatio">
                              <img src={n.image} />
                            </div>
                          </div>
                          <div className="CartItem__Info">
                            <h2 className="CartItem__Title Heading">
                              <a>{n.pname}</a>
                            </h2>
                            <div className="CartItem_Meta Heading Text--subdued">
                              <div className="CartItem__PriceList">
                                <span>{n.price ? "Rs. " + n.price : ""}</span>
                                <strike>{n.mrp ? n.mrp : ""}</strike>
                                <span className="discount__cart">
                                  {n.discount ? "Save" + n.discount : ""}
                                </span>
                              </div>
                              <p className="cart-item__variant-title">
                                {n.color ? "Color:" + n.color : ""}
                              </p>
                              <p className="cart-item__variant-title">
                                {n.size ? "Size:" + n.size : ""}
                              </p>
                            </div>
                            <div
                              className="CartItem__Actions"
                              style={{
                                textAllign: "center",
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <div className="CartItem__QuantitySelector">
                                <div className="QuantitySelector">
                                  <div className="QuantitySelector__Button">
                                    <img
                                      onClick={() => this.subQuantity(n.pid)}
                                      src="minus.svg"
                                      style={{ width: "10px" }}
                                    />
                                  </div>
                                  <input
                                    type="text"
                                    className="QuantitySelector__CurrentQuantity"
                                    pattern="[0-9]"
                                    value={n.quantity}
                                  />
                                  <div className="QuantitySelector__Button">
                                    <img
                                      onClick={() => this.addQuantity(n.pid)}
                                      src="plus.svg"
                                      style={{ width: "10px" }}
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="CartItem__Remove">
                                <div
                                  style={{
                                    borderBottom: "1px solid",
                                    cursor: "pointer",
                                  }}
                                  onClick={() => this.RemoveItem(n.pid)}
                                >
                                  REMOVE
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="Drawer__footer">
              <p className="Cart__Taxes Text--subdued">
                Shipping & taxes calculated at checkout{" "}
              </p>
              <p className="price-text">
                Subtotal:
                <span className="wh-original-price">Rs. {totalAmount}</span>
              </p>
              <div className="gokwik-checkout">
                <button
                  style={showLoader && isHover ? { background: "black" } : {}}
                  onMouseEnter={this.handleMouseEnter}
                  onClick={(e) => {
                    this.handleCheckout(e);
                  }}
                >
                  {showLoader ? (
                    <LoadingSpinner />
                  ) : (
                    <div style={{ width: "100%", display: "flex" }}>
                      <div className="btn-text" style={{ marginLeft: "15%" }}>
                        <div style={{ display: "flex" }}>Pay via UPI / COD</div>
                        <div style={{ display: "flex", fontSize: "15px" }}>
                          Extra 5% off on UPI
                        </div>
                      </div>
                      <div
                        className="pay-opt-icon"
                        style={{ padding: "0 14px" }}
                      >
                        <img
                          src="https://cdn.gokwik.co/v4/images/upi-icons.svg"
                          style={{ width: "90px" }}
                        />
                        <img
                          src="https://cdn.gokwik.co/v4/images/right-arrow.svg"
                          style={{ width: "14px", marginLeft: "15px" }}
                        />
                      </div>
                    </div>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </>
    );
  }
}

export default Cart;
