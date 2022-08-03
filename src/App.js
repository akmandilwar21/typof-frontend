import React, { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button } from "react-bootstrap";
import Cart from "./Cart";
import ShowAlertMessage from "./ShowAlertMessage";
import axios from "axios";
class App extends React.Component {
  state = {
    show: false,
    image: [
      "https://cdn.shopify.com/s/files/1/2428/5565/products/Neemans-EbonyBlack-Tree-Sneakers-FrontLeftLogo-Comfortable-Shoes_240x.jpg?v=1657202741",
      "https://cdn.shopify.com/s/files/1/2428/5565/products/Neemans-DawnBlue-ReLive-Knits-SlipOn-FrontRightLogo-Comfortable-Shoes_400x.jpg?v=1650197778",
      "https://cdn.shopify.com/s/files/1/2428/5565/products/Neemans-TitanGrey-ReLive-Knits-Jogger-FrontRightLogo-Comfortable-Shoes_240x.jpg?v=1647171669",
      "https://cdn.shopify.com/s/files/1/2428/5565/products/Neemans-TitanGrey-ReLive-Knits-Jogger-FrontRightLogo-Comfortable-Shoes_400x.jpg?v=1647171669",
    ],
    data: [],
    selectedItem: [],
    showMessageAlert: false,
  };
  async componentDidMount() {
    await fetch(
      "http://127.0.0.1:8000/fetchAllProduct?store_id=1&website=3fca26bf0e1d0898135f2d3ccb4c987a&api_key=d0ffee856e7ac3aa17e29172487ab16d"
    )
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({ data: result.product });
        },
        (error) => {
          console.log(error);
        }
      );
  }
  disableMessage = () => {
    setTimeout(() => {
      this.setState({ showMessageAlert: false });
    }, 2000);
  };
  ClickOnAddToCart = (image, item) => {
    let { selectedItem } = this.state;
    console.log(item);
    const Url =
      "http://127.0.0.1:8000/addToCart?store_id=1&website=3fca26bf0e1d0898135f2d3ccb4c987a&api_key=d0ffee856e7ac3aa17e29172487ab16d";
    const postBody = {
      customer_id: "2",
      product_id: item.product_id,
      selected_size: "",
      quantity: "1",
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
      .then((res) => console.log(res));

    // let index = selectedItem.findIndex((n) => n.product_id === item.product_id);
    // console.log(index);
    // if (index === -1) {
    //   item.quantity = 1;
    //   item.image = image;
    //   item.mrp = "Rs. 3999";
    //   item.discount = "25%";
    //   item.size = "UK 6";
    //   item.color = "Ebony Black";
    //   selectedItem.push(item);
    // } else {
    //   selectedItem[index].quantity = selectedItem[index].quantity + 1;
    // }
    // this.setState({ selectedItem });
    this.setState({ showMessageAlert: true });
    this.disableMessage();
  };
  hideMessageAlert = () => {
    this.setState({ showMessageAlert: false });
  };
  close = () => {
    this.setState({ show: false });
  };
  render() {
    let { show, data, image, showMessageAlert, selectedItem } = this.state;

    return (
      <>
        <div style={{ zIndex: "1" }}>
          {showMessageAlert && (
            <ShowAlertMessage
              messageText="Items has been added in your cart."
              messageAlertColor=""
              messageAlertWidth="true"
              hideMessageAlert={this.hideMessageAlert}
            />
          )}
          <div
            style={{
              display: "flex",
              justifyContent: "end",
              marginRight: "15.5%",
              marginTop: "2%",
              marginBottom: "1%",
            }}
          >
            <button
              style={{
                background: "#faebd7",
                padding: "5px",
                fontSize: "20px",
                fontWeight: "700",
                borderRadius: "5px",
              }}
              onClick={() => {
                this.setState({ show: true });
              }}
            >
              <img src="cart.svg" style={{ width: "25px" }} />
              Your Cart
            </button>
          </div>
          <div
            id="container"
            className="container"
            style={{ width: "100%", height: "89vh" }}
          >
            <div
              className="row"
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              {data.length
                ? data.map((n, index) => {
                    return (
                      <div
                        key={index}
                        style={{
                          width: "24%",
                          border: "1px solid #dcdcdc",
                          marginRight: "1%",
                          marginTop: "1%",
                          borderRadius: "8px",
                          padding: "0",
                        }}
                      >
                        <div style={{ padding: "10px" }}>
                          <div
                            style={{
                              width: "100%",
                            }}
                          >
                            <img
                              src={image[index % 4] ? image[index % 4] : ""}
                              style={{ width: "100%" }}
                            />
                          </div>
                          <div>
                            <h1>{n.product_name ? n.product_name : ""}</h1>
                          </div>
                          <div>
                            <h3>
                              {n.price !== undefined ? "Rs. " + n.price : ""}
                            </h3>
                          </div>
                        </div>
                        <div style={{ width: "100%" }}>
                          <button
                            style={{
                              width: "100%",
                              backgroundColor: "#ceb38e",
                              fontWeight: "800",
                              fontSize: "18px",
                              borderRadius: "8px",
                              padding: "8px",
                            }}
                            onClick={() =>
                              this.ClickOnAddToCart(image[index % 4], n)
                            }
                          >
                            ADD TO CART
                          </button>
                        </div>
                      </div>
                    );
                  })
                : ""}
            </div>
            <div className="col-lg-6"></div>
          </div>

          {show && <Cart close={this.close} />}
        </div>
      </>
    );
  }
}
export default App;
