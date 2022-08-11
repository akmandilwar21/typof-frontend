import React from "react";
import "./Checkout.css";
import LoadingSpinner from "./Loader";
class CheckOutModal extends React.Component {
  state = {
    continueBtn: false,
    cartItem: [],
    totalAmount: null,
    showSummaryDetail: true,
    mobileNumber: "",
    showLoader: false,
    mobileVerification: false,
    addressVerificatin: false,
    mobileOTPpage: false,
    otp: "",
    currentPage: "mobile",
    pincode: "",
    city: "",
    state: "",
    fullAddress: "",
    fullName: "",
    selectedAddressType: "",
    email: "",
    stepMobileVerification: false,
    stepAddressVerification: false,
  };
  componentDidMount() {
    this.getCartDetail();
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.otp !== prevState.otp) {
      this.disableLoader();
      if (this.state.otp.length === 4) {
        this.setState({
          mobileOTPpage: false,
          currentPage: "address",
          showLoader: true,
          stepMobileVerification: true,
        });
      }
    }
  }
  async getCartDetail() {
    await fetch(
      "http://127.0.0.1:8000/getCartDetails?store_id=1&website=3fca26bf0e1d0898135f2d3ccb4c987a&api_key=d0ffee856e7ac3aa17e29172487ab16d&customer_id=2"
    )
      .then((res) => res.json())
      .then(
        (result) => {
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
  disableLoader = () => {
    setTimeout(() => {
      this.setState({ showLoader: false });
    }, 4000);
  };
  handleContinue = (e) => {
    let { continueBtn } = this.state;
    if (continueBtn)
      this.setState({ currentPage: "pay", stepAddressVerification: true });
  };
  async getState(e) {
    console.log(e.target.value);
    await fetch("http://www.postalpincode.in/api/pincode/" + e.target.value)
      .then((res) => res.json())
      .then((result) => {
        console.log(result.PostOffice);
        result.PostOffice[0] &&
          this.setState({
            state: result.PostOffice[0].State,
            city: result.PostOffice[0].District,
          });
      });
  }
  getOTP(e) {
    e.preventDefault();
    const Url =
      "https://e262-2405-201-4026-b81f-b401-908b-11aa-f8ae.in.ngrok.io/checkUserExistence?store_id=1&website=3fca26bf0e1d0898135f2d3ccb4c987a&api_key=d0ffee856e7ac3aa17e29172487ab16d";
    const postBody = {
      mobile: e.target.value,
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
      .then((res) => console.log(res))
      .then((res) => this.setState({ mobileOTPpage: true, showLoader: false }));
  }
  render() {
    let {
      continueBtn,
      cartItem,
      totalAmount,
      showSummaryDetail,
      mobileNumber,
      showLoader,
      mobileOTPpage,
      otp,
      currentPage,
      pincode,
      city,
      state,
      fullAddress,
      fullName,
      email,
      stepAddressVerification,
      stepMobileVerification,
    } = this.state;

    return (
      <div>
        <div className="ModalOverlay"></div>

        <div className="page-wrap">
          {showLoader && (
            <div className="mobile-otp-loader">
              <div style={{ display: "flex" }}>
                <LoadingSpinner />
              </div>
              <div></div>
            </div>
          )}
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
                    <div
                      className="info_wrap"
                      onClick={(e) => {
                        e.preventDefault();
                        this.setState({
                          mobileOTPpage: false,
                          currentPage: "mobile",
                          stepMobileVerification: false,
                          stepAddressVerification: false,
                          otp: "",
                          mobileNumber: "",
                        });
                        console.log(mobileOTPpage);
                      }}
                    >
                      <span
                        className="circle-box"
                        style={
                          stepMobileVerification
                            ? { border: "2px solid green" }
                            : { border: "2px solid" }
                        }
                      >
                        {stepMobileVerification ? (
                          <img
                            src="https://pdp.gokwik.co/assets/icons/green-check.svg"
                            alt=""
                          />
                        ) : (
                          1
                        )}
                      </span>
                      <span
                        className="title"
                        style={
                          stepMobileVerification
                            ? { color: "green" }
                            : { color: "#000" }
                        }
                      >
                        Mobile
                      </span>
                    </div>
                  </div>
                  <div className="steps_inner_address">
                    <div
                      className="info_wrap"
                      style={
                        stepAddressVerification
                          ? { cursor: "pointer" }
                          : { cursor: "text" }
                      }
                      onClick={
                        stepAddressVerification
                          ? (e) => {
                              this.setState({
                                currentPage: "address",
                                stepAddressVerification: false,
                              });
                            }
                          : ""
                      }
                    >
                      <span
                        className="circle-box"
                        style={
                          currentPage == "address"
                            ? { border: "2px solid black" }
                            : stepAddressVerification
                            ? { border: "2px solid green " }
                            : { background: "#ededed", color: "#c9c9c9" }
                        }
                      >
                        {stepAddressVerification ? (
                          <img
                            src="https://pdp.gokwik.co/assets/icons/green-check.svg"
                            alt=""
                          />
                        ) : (
                          2
                        )}
                      </span>
                      <span
                        className="title"
                        style={
                          currentPage == "address"
                            ? { color: "#000" }
                            : stepAddressVerification
                            ? { color: "green" }
                            : { color: "#c9c9c9" }
                        }
                      >
                        Address
                      </span>
                    </div>
                  </div>
                  <div className="steps_inner_pay">
                    <div className="info_wrap">
                      <span
                        className="circle-box"
                        style={
                          currentPage == "pay"
                            ? { border: "2px solid black" }
                            : { background: "#ededed", color: "#c9c9c9" }
                        }
                      >
                        3
                      </span>
                      <span
                        className="title"
                        style={
                          currentPage == "pay"
                            ? { color: "#000" }
                            : { color: "#c9c9c9" }
                        }
                      >
                        Pay
                      </span>
                    </div>
                  </div>
                  <progress value="0.33" className="progress-line"></progress>
                </div>
              </div>
              {currentPage === "pay" && (
                <div className="payment-options-wrapper">
                  <div className="payment-options">
                    <div className="payment-title">
                      <span>
                        Please select payment method to complete the order
                      </span>
                      <span>Additional 7% discount on UPI</span>
                    </div>
                    <button className="option-button">
                      <section className="upi-badge">
                        <div className="amount-wrapper">
                          <span className="price-text">₹{totalAmount}</span>
                          <span className="discount-badge">
                            Get 7% discount
                          </span>
                        </div>
                        <span className="payViaUpi-btn-label">Pay via UPI</span>
                      </section>
                      <section>
                        <img
                          src="https://cdn.gokwik.co/v4/images/upi-icons.svg"
                          style={{ width: "90px" }}
                        />
                        <img
                          src="https://cdn.gokwik.co/v4/images/right-arrow.svg"
                          style={{ width: "14px", marginLeft: "15px" }}
                        />
                      </section>
                    </button>
                    <button
                      className="option-button-cod"
                      style={{ cursor: "not-allowed" }}
                    >
                      <section className="cod-badge">
                        <div className="amount-wrapper">
                          <span className="price-text">₹{totalAmount}</span>
                        </div>
                        <span>Cash On Delivery</span>
                      </section>
                      <section className="">
                        <img src="https://pdp.gokwik.co/assets/icons/cod.svg" />
                        <img src="https://pdp.gokwik.co/assets/icons/right-arrow.svg" />
                      </section>
                    </button>
                    <div className="error_wrap">
                      <span className="text-error">
                        CoD is not available for the product in your cart.
                      </span>
                    </div>
                  </div>
                </div>
              )}
              {currentPage === "address" && (
                <div className="address-container">
                  <div className="address-title">
                    <p className="heading-address">Add New Address</p>
                    <p className="mandatory-label">
                      <em>*</em>
                      Mandatory Fields
                    </p>
                  </div>
                  <div className="phone-number">
                    <span
                      style={{
                        fontWeight: "500",
                        fontSize: "20px",
                      }}
                    >
                      {"+91   - " +
                        mobileNumber.substring(0, 5) +
                        " " +
                        mobileNumber.substring(5, 10)}
                    </span>
                    <img
                      src="https://pdp.gokwik.co/assets/icons/change-icon.svg"
                      style={{
                        marginLeft: "1rem",
                        cursor: "pointer",
                        maxWidth: "100%",
                        height: "auto",
                        verticalAlign: "middle",
                        width: "17px",
                      }}
                    />
                  </div>
                  <div
                    className="address-wrapper"
                    style={
                      !continueBtn
                        ? { overflowY: "hidden" }
                        : { overflowY: "auto" }
                    }
                  >
                    <div></div>
                    <div className="form">
                      <input
                        type="tel"
                        id="pincode"
                        className="form__input"
                        placeholder=" "
                        maxlength={6}
                        value={pincode}
                        onChange={(e) => {
                          this.setState({ pincode: e.target.value });
                          if (e.target.value.length === 6) {
                            this.getState(e);
                            this.setState({
                              showLoader: true,
                              continueBtn: true,
                            });
                          }
                          this.disableLoader();
                        }}
                      />
                      <label for="pincode" className="form__label">
                        Pincode
                        <span style={{ fontWeight: "600" }}> *</span>
                      </label>
                    </div>
                    <div
                      className="form-wrap"
                      style={!continueBtn ? { visibility: "hidden" } : {}}
                    >
                      <form className="survey-form">
                        <div className="line-inputs">
                          <div className="form">
                            <input
                              className="form__input"
                              id="city"
                              type="text"
                              required
                              maxlength={250}
                              placeholder=" "
                              value={city}
                              onChange={(e) =>
                                this.setState({ city: e.target.value })
                              }
                            />
                            <label for="city" className="form__label">
                              City<em>*</em>
                            </label>
                          </div>
                          <div className="form">
                            <input
                              className="form__input"
                              id="state"
                              type="text"
                              required
                              maxlength={250}
                              placeholder=" "
                              readOnly
                              value={state}
                            />
                            <label for="state" className="form__label">
                              State<em>*</em>
                            </label>
                          </div>
                        </div>
                        <div className="line-inputs">
                          <div className="form">
                            <input
                              className="form__input"
                              id="fullName"
                              type="text"
                              required
                              maxlength={250}
                              placeholder=" "
                              value={fullName}
                              onChange={(e) =>
                                this.setState({ fullName: e.target.value })
                              }
                            />
                            <label for="fullName" className="form__label">
                              Full Name<em>*</em>
                            </label>
                          </div>
                          <div className="form">
                            <input
                              className="form__input"
                              id="email"
                              type="text"
                              required
                              maxlength={250}
                              placeholder=" "
                              readOnly
                              value={email}
                              onChange={(e) => {
                                this.setState({ email: e.target.value });
                              }}
                            />
                            <label for="email" className="form__label">
                              Email Address<em>*</em>
                            </label>
                          </div>
                        </div>
                        <div className="line-inputs">
                          <div className="form">
                            <input
                              className="form__input"
                              id="address"
                              type="text"
                              required
                              maxlength={250}
                              placeholder=" "
                              value={fullAddress}
                              onChange={(e) =>
                                this.setState({ fullAddress: e.target.value })
                              }
                            />
                            <label for="address" className="form__label">
                              Full Address<em>*</em>
                            </label>
                          </div>
                        </div>
                      </form>
                      <div className="line-inputs-address">
                        <div style={{ width: "36%" }}>
                          <p className="address-type">Address Type</p>
                        </div>
                        <div
                          className="button-group-wrap"
                          onChange={(e) => {
                            this.setState({
                              selectedAddressType: e.target.value,
                            });
                          }}
                        >
                          <div
                            className="add-type"
                            style={
                              this.state.selectedAddressType === "home"
                                ? { border: "2px solid" }
                                : { border: "2px solid lightgrey" }
                            }
                          >
                            <input
                              type="radio"
                              id="home"
                              name="input-type"
                              value="home"
                              style={{ width: "20px", height: "20px" }}
                              checked={
                                this.state.selectedAddressType === "home"
                              }
                            />
                            <label
                              for="home"
                              style={
                                this.state.selectedAddressType === "home"
                                  ? { marginLeft: "7px", marginTop: "10%" }
                                  : {
                                      marginLeft: "7px",
                                      marginTop: "10%",
                                      color: "grey",
                                    }
                              }
                            >
                              Home
                            </label>
                          </div>
                          <div
                            className="add-type"
                            style={
                              this.state.selectedAddressType === "work"
                                ? { border: "2px solid" }
                                : { border: "2px solid lightgrey" }
                            }
                          >
                            <input
                              type="radio"
                              id="work"
                              name="input-type"
                              value="work"
                              style={{ width: "20px", height: "20px" }}
                              checked={
                                this.state.selectedAddressType === "work"
                              }
                            />
                            <label
                              for="work"
                              style={
                                this.state.selectedAddressType === "work"
                                  ? { marginLeft: "7px", marginTop: "10%" }
                                  : {
                                      marginLeft: "7px",
                                      marginTop: "10%",
                                      color: "grey",
                                    }
                              }
                            >
                              Work
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="shipping-wrapper">
                      <div className="shipping-method">
                        <div style={{ width: "40%", marginTop: "5%" }}>
                          <p>Shipping Method</p>
                        </div>
                        <div className="shipping-options">
                          <div className="option-group">
                            <input
                              type="radio"
                              id="1"
                              name="input-type1"
                              value="{'id':1,'min':'','price':0,'presentation_name':'Free Shipping'}"
                              style={{ width: "20px", height: "20px" }}
                              checked
                            />
                            <label
                              for="1"
                              style={{ marginLeft: "7px", marginTop: "10%" }}
                            >
                              Free Shipping @ ₹0
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>{" "}
                  </div>
                </div>
              )}
              {!mobileOTPpage && currentPage === "mobile" && (
                <div className="main-container">
                  <div className="mpi-container">
                    <div className="mpi-wrapper">
                      <div
                        className="main-content"
                        style={{ marginTop: "25%" }}
                      >
                        <h3 className="main-content_header">
                          Enter Mobile Number
                        </h3>
                        <div className="merchant-border" id="input-wrapper">
                          <span id="country-code">+91 </span>
                          <span className="vr-line"></span>
                          <input
                            type="text"
                            value={mobileNumber}
                            onChange={(e) => {
                              e.preventDefault();
                              this.setState({ mobileNumber: e.target.value });

                              if (e.target.value.length === 10) {
                                this.setState({ showLoader: true });
                                this.getOTP(e);
                              }
                            }}
                            inputmode="numeric"
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
              )}
              {mobileOTPpage && currentPage === "mobile" && (
                <div>
                  <div className="otp-container">
                    <div className="otp-input-container">
                      <div className="phone-number-change">
                        <p className="verifyMobileNumber-label">
                          Verify Mobile Number
                        </p>
                        <span className="enterOTP-label">
                          Enter the OTP received on{" "}
                        </span>
                        <span className="mobile-number">
                          {"+91- " +
                            mobileNumber.substring(0, 5) +
                            " " +
                            mobileNumber.substring(5, 10)}
                          <button
                            className="change-phoneNumber"
                            onClick={(e) => {
                              e.preventDefault();
                              this.setState({ mobileOTPpage: false });
                            }}
                          >
                            <img src="https://pdp.gokwik.co/assets/icons/change-icon.svg" />
                          </button>
                        </span>
                      </div>
                      <div className="input-otp">
                        <input
                          type="tel"
                          maxlength={4}
                          className="otp-input"
                          value={otp}
                          onChange={(e) => {
                            e.preventDefault();
                            this.setState({ otp: e.target.value });
                          }}
                        />
                        <span className="otp-box-1 otp-box"></span>
                        <span className="otp-box-2 otp-box"></span>
                        <span className="otp-box-3 otp-box"></span>
                        <span className="otp-box-4 otp-box"></span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
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
                  onClick={(e) => this.handleContinue(e)}
                  style={
                    currentPage == "pay"
                      ? { visibility: "hidden" }
                      : { visibility: "visible" }
                  }
                >
                  Continue
                  <img
                    id="arrow-img"
                    src="https://pdp.gokwik.co/assets/icons/arrow-right.png"
                  />
                </button>
              </div>{" "}
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
            <div
              style={{
                display: "flex",
                justifyContent: "end",
                padding: "20px",
              }}
            >
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
