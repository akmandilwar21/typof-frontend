import React from "react";
import "./Checkout.css";
class CheckOutModal extends React.Component {
  state = {
    continueBtn: false,
    cartItem: [],
    totalAmount: null,
    showSummaryDetail: true,
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
  showSummary = (e) => {
    e.preventDefault();
    let { showSummaryDetail } = this.state;
    this.setState({ showSummaryDetail: !showSummaryDetail });
  };
  render() {
    let { continueBtn, cartItem, totalAmount, showSummaryDetail } = this.state;

    return (
      <div>
        <div className="ModalOverlay"></div>

        {/* <button className="close-btn" style={{ display: "block" }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32">
              <title />

              <g>
                <title>background</title>
                <rect
                  fill="none"
                  id="canvas_background"
                  height="402"
                  width="582"
                  y="-1"
                  x="-1"
                />
              </g>
              <g>
                <title>Layer 1</title>
                <path
                  fill="#ffffff"
                  stroke="null"
                  id="svg_1"
                  d="m19.730984,15.937888l11.2352,-11.300755a2.615879,2.631142 0 0 0 -3.701469,-3.723066l-11.2352,11.300755l-11.2352,-11.2876a2.615879,2.631142 0 0 0 -3.688389,3.70991l11.22212,11.300755l-11.22212,11.300755a2.615879,2.631142 0 1 0 3.701469,3.723066l11.22212,-11.300755l11.2352,11.300755a2.615879,2.631142 0 0 0 3.701469,-3.723066l-11.2352,-11.300755z"
                />
              </g>
            </svg>
          </button> */}
        <div className="page-wrap">
          <div className="user-detail">
            <header className="user-detail__header">
              <div className="merchant-logo">
                <img src="https://cdn.gokwik.co/merchant/79/logo1634739092270.svg" />
              </div>
            </header>
            <div className="gk-content" style={{ padding: "1rem 3rem" }}>
              <div className="steps">
                <div class="steps_inner">
                  <div className="steps_inner_mobile">
                    <div className="info_wrap">
                      <span
                        className="circle-box"
                        style={{ border: "2px solid" }}
                      >
                        1
                      </span>
                      <span className="title">Mobile</span>
                    </div>
                  </div>
                  <div className="steps_inner_address">
                    <div className="info_wrap">
                      <span
                        className="circle-box"
                        style={{ background: "#ededed", color: "#c9c9c9" }}
                      >
                        2
                      </span>
                      <span className="title" style={{ color: "#c9c9c9" }}>
                        Address
                      </span>
                    </div>
                  </div>
                  <div className="steps_inner_pay">
                    <div className="info_wrap">
                      <span
                        className="circle-box"
                        style={{ background: "#ededed", color: "#c9c9c9" }}
                      >
                        3
                      </span>
                      <span className="title" style={{ color: "#c9c9c9" }}>
                        Pay
                      </span>
                    </div>
                  </div>
                  <progress value="0.33" className="progress-line"></progress>
                </div>
              </div>
              <div className="main-container">
                <div className="mpi-container">
                  <div className="mpi-wrapper">
                    <div className="main-content" style={{ marginTop: "25%" }}>
                      <h3 className="main-content_header">
                        Enter Mobile Number
                      </h3>
                      <div className="merchant-border" id="input-wrapper">
                        <span id="country-code">+91 </span>
                        <span className="vr-line"></span>
                        <input
                          type="tel"
                          placeholder="Enter Number"
                          className="phone-input"
                          pattern="[0-9]{5}-[0-9]{5}"
                          autoComplete="tel"
                        />
                      </div>
                      <div className="notification-checkbox">
                        <input type="checkbox" id="notifications" />
                        <label
                          for="notifications"
                          className="notification_label"
                        >
                          <span style={{ marginLeft: "10px" }}>
                            {" "}
                            Notify me for orders, updates & offers
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="footer">
              <div className="btn-wrapper">
                <button
                  className={
                    continueBtn
                      ? "continue-button"
                      : "continue-button button-disabled"
                  }
                  id="continue-button"
                >
                  Continue{" "}
                  <img
                    id="arrow-img"
                    src="https://pdp.gokwik.co/assets/icons/arrow-right.png"
                  />
                </button>
              </div>
              <div className="main-footer">
                <span className="terms-policy">
                  <a
                    className="gokwik-links"
                    target="_blank"
                    href="https://www.gokwik.co/terms"
                  >
                    T&C
                  </a>
                  {" | "}
                  <a
                    className="gokwik-links"
                    target="_blank"
                    href="https://www.gokwik.co/data-policy"
                  >
                    Privacy
                  </a>
                  {" | a4347b8b"}
                </span>
                <div>
                  <span className="powered-by">Powered By</span>
                  <a
                    href="https://gokwik.co"
                    target="_blank"
                    style={{ color: "#050038" }}
                  >
                    <img
                      src="https://pdp.gokwik.co/assets/icons/footer-logo.svg"
                      style={{
                        width: "66px",
                        height: "28px",
                        verticaAlign: "middle",
                        marginLeft: "10px",
                      }}
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="cart-summary">
            <div className="cart-wrap">
              <div className="cart-wrap-scroller">
                <div className="cart-wrap-inner">
                  <div className="summary">
                    <div className="order-summary-container">
                      <div
                        className="summary-title"
                        onClick={(e) => this.showSummary(e)}
                      >
                        <div className="summary-title-inner">
                          <img
                            src="https://pdp.gokwik.co/assets/icons/cart.svg"
                            style={{
                              width: "30px",
                              height: "auto",
                              verticalAlign: "middle",
                            }}
                          />
                          <h4
                            style={{
                              fontWeight: "400",
                              fontSize: "2rem",
                              marginLeft: "10px",
                            }}
                          >
                            Order Summary
                          </h4>
                          <img
                            src="https://img.icons8.com/ios/344/expand-arrow--v2.png"
                            style={
                              showSummaryDetail
                                ? { marginLeft: "10px", width: "13px" }
                                : {
                                    transform: "rotate(180deg)",
                                    marginLeft: "10px",
                                    width: "13px",
                                  }
                            }
                          />
                        </div>
                      </div>
                      {showSummaryDetail ? (
                        <div className="order-summary-wrapper">
                          <div className="cart-product">
                            <div className="cart-product-detail">
                              <ul class="cart-product-list">
                                {cartItem.map((n) => {
                                  return (
                                    <li>
                                      <div className="product-img">
                                        <img src={n.image} />
                                      </div>
                                      <div className="product-details">
                                        <div className="product-title">
                                          {n.pname}
                                        </div>
                                        <span className="product-quantity">
                                          Quantity{": " + n.quantity}
                                        </span>
                                        <div className="product-price">
                                          Price{": ₹" + n.price}
                                        </div>
                                      </div>
                                    </li>
                                  );
                                })}
                              </ul>
                            </div>
                          </div>
                          <div className="order-summary">
                            <div className="order-summary-details">
                              <ul className="price-summary">
                                <li className="subtotal">
                                  <span>Subtotal</span>
                                  <span>{"₹" + totalAmount}</span>
                                </li>
                                <li className="coupon-discount">
                                  <span>Coupon Discount</span>
                                  <span>-₹0.00</span>
                                </li>
                                <li className="prepaid-discount">
                                  <span>Prepaid Discount</span>
                                  <span>-₹0.00</span>
                                </li>
                                <li className="shipping">
                                  <span>Shipping</span>
                                  <span>To be calculated</span>
                                </li>
                                <li className="topay">
                                  <span>To Pay</span>
                                  <span>{"₹" + totalAmount}</span>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="discounts">
                      <div className="discount-coupon">
                        <div className="discount-coupon-inner">
                          <img
                            src="https://pdp.gokwik.co/assets/icons/coupon-discount.svg"
                            style={{
                              marginLeft: "10px",
                              width: "50px",
                              height: "auto",
                              verticalAlign: "middle",
                              marginTop: "42px",
                            }}
                          />
                          <div className="discount-box">
                            <input
                              type="text"
                              name="discount"
                              required
                              maxLength="64"
                              placeholder=" "
                              className="discount-coupon-input"
                            />
                            <label
                              for="discount"
                              className="discount-coupon-text"
                            >
                              You have SAVED a lot, Congrats!
                            </label>
                            <div className="apply-coupon">
                              <div className="coupon-wrap"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default CheckOutModal;
