import {api} from '../api/api';
import {store} from "../index";
import {message } from 'antd';

export const CHANGE_TRANSFER_POPUP 	= 'CHANGE_TRANSFER_POPUP';
export const CHANGE_PIN_POPUP 		= 'CHANGE_PIN_POPUP';
export const CHANGE_TOPUP_POPUP 	= 'CHANGE_TOPUP_POPUP';
export const CHANGE_REQUEST 		= 'CHANGE_REQUEST';
export const CHANGE_BALANCE 		= 'CHANGE_BALANCE';
export const CHANGE_TRANSFER 	 	= 'CHANGE_TRANSFER';
export const CHANGE_GIFT_POPUP 		= 'CHANGE_GIFT_POPUP';
export const CHANGE_REGISTER_POPUP  = 'CHANGE_REGISTER_POPUP';
export const CHANGE_TRANS_CONTROL_POPUP = 'CHANGE_TRANS_CONTROL_POPUP';

export const FETCH_TOPUP 	= 'FETCH_TOPUP_TRANSACTION';
export const FETCH_P2P 		= 'FETCH_P2P_TRANSACTION';
export const FETCH_PROFILE 	= 'FETCH_PROFILE';

export const REQUEST_TOPUP  = 'REQUEST_TOPUP';
export const REQUEST_P2P 	= 'REQUEST_P2P';
export const CHECK_WALLET   = 'CHECK_WALLET';


export function changePinPopup(state){
	return function(dispatch){
		dispatch(setPinPopup(state));
	}
}

export function changTransferPopup(state){
	return function(dispatch){
		dispatch(setTransferPopup(state));
	}
}

export function changeTopupPopup(state){
	return function(dispatch){
		dispatch(setTopupPopup(state));
	}
}

export function changeTransfer(transfer){
	// cia nay can
}

export function registerWallet(req){
	api.post('http://localhost:8081/api/wallet/protected/registerWallet', req)
	.then( res=> {
		if('data' in res.data) {
			if(res.data.data.code) {
			message.success('Register successfully');
			store.dispatch({type : CHANGE_BALANCE, balance: 0});

			}
			else message.error(res.data.data.message);
		}
		else message.error(res.data.error);
	})
}

function cmp(a,b){
	if(a.timestamp>b.timestamp) return -1;
	return 1;
}

export function loadTopups(startTime , endTime){
	return function(dispatch){
		getTopups(startTime,endTime)
		.then(res=> {
			let x = res.data.data;
			if(x!=null) x.sort(cmp);
			dispatch({type : FETCH_TOPUP, transactions : x});
		});
	}
}

export function loadP2Ps(startTime, endTime,type){
	return function(dispatch){
		getP2Ps(startTime,endTime,type)
		.then(res=> {
				let x = res.data.data; 
				if(x!=null) x.sort(cmp);
				dispatch({type : FETCH_P2P, transactions : x});
			});
	}
}

export function loadBalance(){
	return function(dispatch){
		getBalance()
		.then( res => dispatch(setBalance(res.data.data.balance)))
	}
}

export function loadFullProfile(){
	return function(dispatch){
		callFullProfile()
		.then(res => dispatch({type : FETCH_PROFILE, profile : res.data.data}));
	}
}

export function changeRequest(request){
	return function(dispatch){
		dispatch(setRequest(request));
	}
}

export function topup(request){
	return function(dispatch){
		callTopup(request)
		.then(res=>{
			if('data' in res.data ) message.success(res.data.data.message);
			else message.error(res.data.error); 
		});
	}
}

export function transferP2P(request){
	return function(dispatch){
		callTransferP2P(request)
		.then(res=>{
			if('data' in res.data ) message.success(res.data.data.message);
			else message.error(res.data.error);
		})
	}
}

export function sendGift(request){
	return function(dispatch){
		callSendGift(request)
		.then(res=> {
			if('data' in res.data) message.success("Create LuckyMoney Successfully");
			else message.error(res.data.error);

		})
	}
}	

export function receiveGift(request){
	return function(dispatch){
		getGift(request)
		.then(res=>{
			if('data' in res.data){
				let am = res.data.data.amount;
				if(res.data.data.code) message.success(res.data.data.message + ' amount: '+am);
				else message.error(res.data.data.message); 
			}
			else message.error(res.data.error);
		})
	}
}

export function checkWallet(){
	//alert('check wallet');
	api.get('http://localhost:8081/api/wallet/protected/checkWallet')
	.then(res=>{
		if(res.data.data.code) store.dispatch({type: CHECK_WALLET, result: res.data.data.code});
	})
}

function callTopup(request){
	//alert("call request");
	var promise = new Promise(function(resolve,reject){
		api.post('http://localhost:8081/api/wallet/protected/topup', request)
		.then(res => {resolve(res);})
	});
	return promise;
}

function callTransferP2P(request){
	var promise = new Promise(function(resolve,reject){
		api.post('http://localhost:8081/api/wallet/protected/sendP2P',request)
		.then(res=> {resolve(res);})
	});
	return promise;
}

function callSendGift(request){
	var promise = new Promise(function(resolve,reject){
		api.post('http://localhost:8081/api/wallet/protected/sendPresent',request)
		.then(res=>{resolve(res);})
	});
	return promise;
}

function getGift(request){
	var promise = new Promise(function(resolve,reject){
		api.post('http://localhost:8081/api/wallet/protected/receivePresent')
		.then(res=> resolve(res));
	});
	return promise;
}

function callFullProfile(){
	var promise = new Promise(function(resolve,reject){
		api.get('http://localhost:8081/api/wallet/protected/profile')
		.then(res => {
			resolve(res);
		})
	});
	return promise;
}
function getBalance(){
	var promise = new Promise(function(resolve,reject){
		api.get('http://localhost:8081/api/wallet/protected/getBalance')
		.then(res => {
			resolve(res);
		})
	});
	return promise;
}
function getTopups(startTime, endTime){
	var promise = new Promise(function(resolve, reject){
		api.post('http://localhost:8081/api/wallet/protected/getTopupTransactions', {start : startTime, end : endTime})
		.then(res=>{
			resolve(res);
		})
	})
	return promise;
}


function getP2Ps(startTime, endTime,type){
	var promise = new Promise(function(resolve,reject){
		api.post('http://localhost:8081/api/wallet/protected/getP2PTransactions',{start: startTime, end : endTime, type: type})
		.then(res=>{
			resolve(res);
		})
	});	
	return promise;
}


export function setPinPopup(state){
	return {type : CHANGE_PIN_POPUP, state : state};
}

export function setTransferPopup(state){
	return {type : CHANGE_TRANSFER_POPUP, state : state};
}

export function setTopupPopup(state){
	return {type: CHANGE_TOPUP_POPUP, state : state};
}

export function setGiftPopup(state){
	return {type : CHANGE_GIFT_POPUP , state : state}
}

export function setRequest(request){
	return {type: CHANGE_REQUEST, request: request};
}

export function setTransfer(transfer){
	return {type : CHANGE_TRANSFER, transfer: transfer};
}

export function setBalance(balance){
	return {type : CHANGE_BALANCE, balance : balance};
}	

export function setRegisterPopup(state){
	return {type: CHANGE_REGISTER_POPUP , state: state};
}

export function setTransControlPopup(state){
	return {type : CHANGE_TRANS_CONTROL_POPUP , state: state};
}