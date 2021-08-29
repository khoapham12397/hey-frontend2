import React from  'react';
import ReactDOM from 'react-dom';
import {api} from '../api/api';
import {connect} from 'react-redux';
import {Table,Icon,Button } from 'antd';
import {formatMoney} from '../utils/myutils';

import {setTransControlPopup} from '../actions/walletAction2';
import TransactionControl from './transaction-control';

const TOPUP_TRANSACTION = 0;
const P2P_TRANSACTION  =1;
const PRESENT_SEND = 2;

class Transactions extends React.Component{
	constructor(props){
		super(props);

		this.state ={
			startDate: new Date(), endDate : new Date()
		}
		this.setDate = this.setDate.bind(this);
	}

	componentDidUpdate(){
	}
	
	setDate(date, type){
		if(type==0) this.setState({startDate: date});
		else this.setState({endDate: date});
	}


	render(){

		let lst=null,cols=null;
		let ds = this.props.transactions;
		if(ds==null) ds = [];
		if(this.props.typeTs == TOPUP_TRANSACTION) {

			lst = ds.map((tsx,index)=>{
				let time = new Date(tsx.timestamp);
				let am  = formatMoney(tsx.amount);
				return {key: index, id : tsx.id, amount: am, timestamp: time.toLocaleString()}
			});
			cols = [{key: 'id', title :'Transaciton Code', dataIndex : 'id'}
					,{key : 'amount', title : 'Amount', dataIndex: 'amount'}
					,{key: 'timestamp',title :'Time', dataIndex:'timestamp'}
				 ];
		}
		if(this.props.typeTs == P2P_TRANSACTION) {
			lst= ds.map((tsx,index)=>{
				let time = new Date(tsx.timestamp);
				let am  = formatMoney(tsx.amount);
				let dr; 
				if(this.props.userName == tsx.sender ) dr = (<Icon type="arrow-up" />);
				else dr =(<Icon type="arrow-down" />);

				return {key: index, id : tsx.transactionId, amount: am, timestamp: time.toLocaleString(),
				sender : tsx.sender, receiver: tsx.receiver, direction : dr }
			});
			cols = [{key: 'id', title :'Transaciton Code', dataIndex : 'id'}
					,{key : 'amount', title : 'Amount', dataIndex: 'amount'}
					,{key: 'sender', title : 'Sender' , dataIndex : 'sender'}
					,{key: 'receiver', title : 'Receiver' , dataIndex : 'receiver'}
					,{key: 'timestamp',title :'Time', dataIndex:'timestamp'}
					,{key: 'direction',title :'Direction', dataIndex:'direction'}
				 ];
		}				
		
		return (
			<div className='chat-container'>
			<Table dataSource ={lst} columns ={cols}/>	
			
			<div>
  			<Button style={{marginLeft : "20px"}} type="primary" shape="round" size="large"
  				onClick = {(e)=> {
  					this.props.changeControlPopup(true);
				}}

  			>Control</Button>
  			</div>
			<TransactionControl/>
			</div>);//
	}
	
}
function mapStateToProps(state){
	return{
		transactions : state.walletReducer.transactions,
		typeTs : state.walletReducer.typeTs,
		userName: state.userReducer.userName
	}
}
function mapDispatchToProps(dispatch){
	return {
		changeControlPopup : state => dispatch(setTransControlPopup(state))
	}
}
export default connect(mapStateToProps,mapDispatchToProps)(Transactions);