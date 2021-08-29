import {connect} from "react-redux";
import React from 'react';
import { Button, Input, Form, Icon,Modal} from 'antd';
import {CHECK_WALLET, registerWallet, setRegisterPopup} from  '../actions/walletAction2';
import md5 from 'js-md5';

const FormItem = Form.Item;

function validateEmail(email){
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
}

function validatePhone(phone){
	var re = /[0-9]{10}/;
	return re.test(phone);
}

function validateIdentity(identity){
	var re = /[0-9]{9}/;
	if(re.test(identity)) return true;
	var re2= /[0-9]{12}/;
	return re2.test(identity);
}

function validatePin(pin){
	var re = /[0-9]{6}/;
	return re.test(pin);
}

class NormalRegisterForm extends React.Component{
	constructor(props){
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleCancel = this.handleCancel.bind(this);
	}
	handleCancel(e){
		this.props.changeRegisterPopup(false);
	}

	handleSubmit(e){
		//alert(this.props.form.getFieldValue('identity'));
		var form = this.props.form;
		var identity = form.getFieldValue('identity');
		var email= form.getFieldValue('email');
		var phone =form.getFieldValue('phone');
		var pin = form.getFieldValue('pin');

		if(!validateIdentity(identity)) {
			alert('Identity is not correct fortmat');
			return;
		}
		if(!validatePhone(phone)) {
			alert('Phone is not correct fortmat');
			return;
		}
		if(!validateEmail(email)) {
			alert('Email is not correct fortmat');
			return;
		}
		if(!validatePin(pin)){
			alert('Pin is not correct fortmat');
			return;
		}

		if(this.props.form.getFieldValue('pin')== this.props.form.getFieldValue('rePin')){
			let payload =  {identity: identity, email : email, phone: phone, hashedPin : md5(pin)};
			registerWallet(JSON.stringify(payload));
			this.props.changeRegisterPopup(false);
		}
		else alert('not match');
	}

	
	
	render(){
		const { getFieldDecorator } = this.props.form;
    	return (
    	<Modal 
    	width="420px"
          title="Register Wallet"
          visible={this.props.registerPopup}
          onOk={this.handleSubmit}
          onCancel={this.handleCancel}
          okText="Register"
          cancelText="Cancel"
    	>
      	<Form onSubmit={this.handleSubmit} >
        <FormItem>
          {getFieldDecorator('identity', {
            rules: [{ required: true, message: 'Please input your Identity!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Identity" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('phone', {
            rules: [{ required: true, message: 'Please input your Phone!' }],
          })(
            <Input prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />} type="phone" placeholder="Phone" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('email', {
            rules: [{ required: true, message: 'Please input your Email!' },{validator : this.validateEmail}],
          })(
            <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} type="email" placeholder="Email" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('pin', {
            rules: [{ required: true, message: 'Please input your PIN!' } ],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="PIN(6 digits)" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('rePin', {
            rules: [{ required: true, message: 'Please confirm your PIN!' }, { validator: this.compareToPin}],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Confirm PIN" />
          )}
        </FormItem>
       
      </Form>
      </Modal>
    );
	}
}//
function mapStateToProps(state){
	return {
		registerPopup : state.walletReducer.registerPopup
	}
}

function mapDispatchToProps(dispatch){
	return{
		setWalletExist 		: () => dispatch({type : CHECK_WALLET , result : true}),
		changeRegisterPopup : state => dispatch(setRegisterPopup(state))
	}
}
export const RegisterWalletForm = connect(mapStateToProps,mapDispatchToProps)(Form.create()(NormalRegisterForm));