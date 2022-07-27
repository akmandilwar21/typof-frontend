import React, { Component } from "react";
import "./ShowAlertMessage.css";

class ShowAlertMessage extends Component {
  render() {
    let {
      messageText,
      messageAlertColor,
      messageAlertWidth,
      hideMessageAlert,
      style,
      crossIcon,
    } = this.props;
    return (
      <React.Fragment>
        {messageText === "Something went wrong. Please try again later !" ? (
          <div className={`messageAlert bg-danger `}>
            <div style={{ display: "flex" }}>
              <label
                htmlFor="crss"
                className="text-danger"
                style={{ fontWieght: "900" }}
              >
                x
              </label>
              <span className="messageAlert__text" style={{ color: "white" }}>
                {messageText}
              </span>
            </div>
          </div>
        ) : (
          <div
            className={`messageAlert ${messageAlertColor}  ${
              messageAlertWidth && "messageAlertWidthForUndo"
            } `}
            style={style && style}
          >
            <div style={{ display: "flex" }}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.3334 9.2333V9.99997C18.3324 11.797 17.7505 13.5455 16.6745 14.9848C15.5986 16.4241 14.0862 17.477 12.3629 17.9866C10.6396 18.4961 8.7978 18.4349 7.11214 17.8121C5.42648 17.1894 3.98729 16.0384 3.00922 14.5309C2.03114 13.0233 1.56657 11.24 1.68481 9.4469C1.80305 7.65377 2.49775 5.94691 3.66531 4.58086C4.83288 3.21482 6.41074 2.26279 8.16357 1.86676C9.91641 1.47073 11.7503 1.65192 13.3918 2.3833"
                  stroke="#006100"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M18.3333 3.33331L10 11.675L7.5 9.17498"
                  stroke="#006100"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <span className="messageAlert__text">{messageText}</span>
            </div>
            <div onClick={hideMessageAlert} style={{ cursor: "pointer" }}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g opacity="0.4">
                  <path
                    d="M15 5L5 15"
                    stroke="#006100"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M5 5L15 15"
                    stroke="#006100"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </g>
              </svg>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default ShowAlertMessage;
