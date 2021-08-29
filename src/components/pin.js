import React from "react";
import { Modal, message } from "antd";
import PinInput from "react-pin-input";
import { connect } from "react-redux";
import md5 from 'js-md5';

import {
  setPinPopup, setTransfer, topup , transferP2P , sendGift
} from "../actions/walletAction2";



class Pin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      pin: 0,
    };
    this.onChange = this.onChange.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.showModal = this.showModal.bind(this);
  }

  showModal = () => {
    this.props.changePinPopup(true);
  };

  onChange = (value, index) => {
    this.setState({ pin: value });
  };

  handleOk = (e) => {
    if (this.state.pin.toString().length !== 6) {
      message.error("Please input 6 digit PIN");
      this.pin.focus();
      return;
    }
    const request = {
        ...this.props.request,
        "pin": md5(this.state.pin)
    }
    alert(this.props.request.amount +" "+ this.props.request.type);
    const type = request.type
    delete request.type;
    switch (type){
        case "topUp":
            this.props.topUpWallet(request);
            break;
        case "transfer":
          this.props.transferWallet(request);
          break;
        case "sendLuckyMoney":
          this.props.sendLuckyMoney(request);
          break;
        default:
            break;
    }
    console.log(request)
    this.pin.clear();
    this.props.changePinPopup(false);
  };

  handleCancel = (e) => {
    this.props.changePinPopup(false);
  };

  render() {
    return (
      <div>
        <Modal
          width="420px"
          title="PIN"
          visible={this.props.pinPopup}
          onOk={this.handleOk}
          okText="Ok"
          onCancel={this.handleCancel}
          cancelText="Cancel"
        >
          <PinInput
            focus
            length={6}
            secret
            type="numeric"
            ref={(p) => (this.pin = p)}
            onChange={this.onChange}
            onComplete={this.handleOk}
          />
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    pinPopup: state.walletReducer.pinPopup,
    request: state.walletReducer.request,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changePinPopup : show    => dispatch(setPinPopup(show)),
    changeTransfer : transfer=> dispatch(setTransfer(transfer)),
    topUpWallet    : request => dispatch(topup(request)),
    transferWallet : request => dispatch(transferP2P(request)),
    sendLuckyMoney : request => dispatch(sendGift(request))
  };
}

export const PinForm = connect(mapStateToProps, mapDispatchToProps)(Pin);
