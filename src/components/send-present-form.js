import React, {Component} from 'react';
import {Icon, message, Input, Radio,Modal } from 'antd';
import {api} from  '../api/api';
import md5 from 'js-md5';
import {connect} from 'react-redux';
import {setGiftPopup,setRequest,setPinPopup} from '../actions/walletAction2';
import $ from 'jquery';

class SendPresentForm extends Component{
	constructor(props){
	  super(props);
	  const messageList = ["Please input amount money:", "Please input amount money every envelope:"];
    this.state = {
      ...this.state,
      message: "Please input amount money:",
      value: false,
      total: 0,
    }
	}
	showModal = () => {
    this.props.changeGiftPopup(true);
  };
  handleCancel = (e) => {
    this.props.changeGiftPopup(false);
  };
  handleOk = (e) => {
    if ($("#amountLuckyMoney").val().length === 0) {
      message.error("Please input amount money");
      $("#amountLuckyMoney").focus();
      return;
    }
    let amount = parseInt($("#amountLuckyMoney").val()) || 0;
    const envelope = parseInt($("#amountEnvelope").val()) || 0;
    $("#amountLuckyMoney").val(0);
    $("#amountEnvelope").val(0);
    if (envelope<1){
      message.error("Minimum amount envelopes is 1");
      $("#amountEnvelope").focus();
      return;
    }
    if (envelope>1000){
      message.error("Maximum amount envelopes is 1000");
      $("#amountEnvelope").focus();
      return;
    }
    if (this.state.value)
      amount = amount * envelope
    else {
      if (amount < 100*envelope){
        message.error(`Maximum amount envelopes is ${100*envelope}`);
        $("#amountLuckyMoney").focus();
        return;
      }
    }
    if (amount < 1000) {
      message.error("Minimum amount money is 1.000đ");
      $("#amountLuckyMoney").focus();
      return;
    }
    if (amount > 20000000) {
      message.error("Maximum amount money is 20.000.000đ");
      $("#amountLuckyMoney").focus();
      return;
    }
    if (amount > this.props.balance) {
      message.error("The amount money sender is greater than the balance");
      return;
    }
    var sendLuckyMoney = {
      type: "sendLuckyMoney",
      sessionId: this.props.currentSessionId,
      amount,
      envelope,
      equal: this.state.value,
    };
    this.props.changeRequest(sendLuckyMoney);
    
    this.props.changeGiftPopup(false);
    this.props.changePinPopup(true);
  };
  onChange = (e) => {
    if (e.target.value){
      this.setState({
        ...this.state,
        message: "Please input amount money every envelope:",
        value: true,
      })
    }else{
      this.setState({
        ...this.state,
        message: "Please input amount money:",
        value: false,
      })
    }
  };
	render(){
		return (<div>
        <Modal
          width="420px"
          title="Lucky Money"
          visible={this.props.giftPopup}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText="Send lucky money"
          cancelText="Cancel"
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Radio.Group onChange={this.onChange} defaultValue={false}>
              <Radio value={false}>Randomly split</Radio>
              <Radio value={true}>Equally split</Radio>
            </Radio.Group>
          </div>
          <p className="model-label">{this.state.message}</p>
          <Input
            type="number"
            id="amountLuckyMoney"
            min="10000"
            max="20000000"
            focus="true"
            onChange = {this.changeTotal}
          />
          <p className="model-label">Amount envelope: </p>
          <Input
            type="number"
            id="amountEnvelope"
            min="1"
            max="1000"
            onChange = {this.changeTotal}
          />
          {(this.state.value) ? <p className="model-label">Total money: <strong>{this.state.total}đ</strong></p> : <div></div>}
        </Modal>
      </div>);
	}
}//

function mapStateToProps(state){
  return {
    currentSessionId : state.chatReducer.currentSessionId,
    giftPopup        : state.walletReducer.giftPopup,
    balance          : state.walletReducer.balance
  }
}

function mapDispatchToProps(dispatch){
  return{
    changePinPopup : state => dispatch(setPinPopup(state)),
    changeRequest       : request => dispatch(setRequest(request)),
    changeGiftPopup     : state => dispatch(setGiftPopup(state))    
  }
}
//
export const SendGift = connect(mapStateToProps,mapDispatchToProps)(SendPresentForm); 