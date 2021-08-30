import React, {Component} from 'react';
import {Icon,Modal, message, Input, Avatar} from 'antd';
import {api} from  '../api/api';
import md5 from 'js-md5';
import {setTransferPopup,changeRequest,setPinPopup } from '../actions/walletAction2';
import $ from 'jquery';
import {connect} from 'react-redux';

class SendP2PForm extends Component{
	constructor(props){
		super(props);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }
  

  handleOk(event){
    var amount = $('#amount_transfer').val();
    var request = {userId: this.props.transfer.userId, amount: amount ,message : $('#message_transfer').val(),
      type: 'transfer', name : this.props.transfer.name };    
    if(this.props.balance < amount) {
      message.error("Your balance is not enought");
    }
    else{
      this.props.changeRequest(request);
      this.props.changeTransferPopup(false);
      this.props.changePinPopup(true);
    }
  }

  handleCancel(event){
    this.props.changeTransferPopup(false);
  }

	render(){
		return (
	     <Modal
          width="420px"
          title="Transfer"
          visible={this.props.transferPopup}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText="Transfer"
          cancelText="Cancel"
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Avatar
              style={{
                color: "#ffffff",
                verticalAlign: "middle",
                backgroundColor: "#87d068",
              }}
              size="large"
            >
            {this.props.transfer.avatar}
            </Avatar>
            <div style={{ overflow: "hidden", paddingTop: 5 }}>
              <div className="user-name">{this.props.transfer.name}</div>
            </div>
          </div>
          <p className="model-label"> Please enter amount money (VNĐ): </p>
          <Input
            type="number"
            id="amount_transfer"
            min="10000"
            max="20000000"
            onPressEnter={this.handleOk}
            focus="true"
          />
          <p className="model-label"> Message (maximum 280 characters): </p>
          <Input
            type="text"
            id="message_transfer"
            maxLength="280"
            onPressEnter={this.handleOk}
          />
        </Modal>   	
			);//
	}
}

function mapStateToProps(state){
  return {
    balance : state.walletReducer.balance,
    transfer: state.walletReducer.transfer,
    transferPopup : state.walletReducer.transferPopup
  }
}

function mapDispatchToProps(dispatch){
  return {
    changeTransferPopup : state   => dispatch(setTransferPopup(state)),
    changePinPopup      : state   => dispatch(setPinPopup(state)),
    changeRequest       : request => dispatch(changeRequest(request))
  };
}

export const TransferForm = connect(mapStateToProps,mapDispatchToProps)(SendP2PForm);