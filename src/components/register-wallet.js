import React from 'react';
import {CHECK_WALLET ,loadTopups, loadP2Ps, loadFullProfile} from '../actions/walletAction';
import {connect} from 'react-redux';
import {Icon,Modal} from 'antd';
import {RegisterWalletForm} from './register-wallet-form';
class NormalRegisterWallet extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			show: false
		};
		this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleOk = this.handleOk.bind(this);
	}
	handleSubmit(e){
		//e.preventDefault();
    	
	}
  handleCancel(e){
    this.setState({show: false});
  }
  handleOk(e){
    this.setState({show: false});
  }
	render(){

   	return (<div>
      <div onClick={e=> this.setState({show:true})}>
          <Icon type='transaction' style={{fontSize : '230%', cursor: 'pointer'}}/>
          <span>  RegisterWallet</span>
        </div>
        <Modal
          width="420px"
          title="Register Wallet"
          visible={this.state.show}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText="Start"
          cancelText="Cancel" className="start-chat-group-modal"
        >
          <RegisterWalletForm/>
        </Modal>   	 	
    </div>);//
	}
}


export const RegisterWallet = connect(null,null)(NormalRegisterWallet);