import React from 'react';
import {Modal,Input,Icon} from 'antd';
import md5 from 'js-md5';
import {api} from '../api/api';
import {connect} from 'react-redux';
import {setPinPopup, setTopupPopup,setRequest} from '../actions/walletAction2';
import $ from 'jquery';

class TopupForm extends React.Component{
	constructor(props){
		super(props);
		this.handleOk = this.handleOk.bind(this);
    this.handleCancel =this.handleCancel.bind(this);
  }
  
  handleOk(event){
    var am = $("#amount_topUp").val();
    var rq = {amount: am, type : 'topUp'};
    this.props.changeRequest(rq);
    this.props.changeTopupPopup(false);
    this.props.changePinPopup(true);
  }
	handleCancel(event){
    $('#amount_topUp').val(0);
    this.props.changeTopupPopup(false);
  }
	render(){
		return (<div>
        <Modal
          width="420px"
          title="Topup"
          visible={this.props.topUpPopup}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText="Top Up"
          cancelText="Cancel"
        >
          <p className="model-label"> Please enter amount money (VNĐ): </p>
          <Input
            type="number"
            id="amount_topUp"
            min="10000"
            max="20000000"
            onPressEnter={this.handleOk}
            focus="true"
          />
        </Modal>
      </div>);
	
	}
}

function mapStateToProps(state){
  return{
    topUpPopup : state.walletReducer.topupPopup
  }
}

function mapDispatchToProps(dispatch){
  return{
    changePinPopup: state => dispatch(setPinPopup(state)),
    changeTopupPopup : state => dispatch(setTopupPopup(state)),
    changeRequest : request => dispatch(setRequest(request))
  }
}
export const Topup = connect(mapStateToProps,mapDispatchToProps)(TopupForm);
