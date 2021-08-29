import {api} from '../api/api';
import {store} from "../index";

export const FETCH_TOPUP = "FETCH_TOPUPS";
export const FETCH_P2P ="FETCH_P2P"; 
export const FETCH_PROFILE = "FETCH_PROFILE";
export const FETCH_BALANCE = 'FETCH_BALANCE';
export const CHECK_WALLET = "CHECK_WALLET";
export const CHANGE_SHOW_PIN_POPUP = "CHANGE_SHOW_PIN_POPUP";
export const CHANGE_TRANSFER_POPUP = "CHANGE_TRANSFER_POPUP";

export function loadTopups(start,end){
	api.post("http://localhost:8081/api/wallet/protected/getTopupTransactions",{start: start, end: end})
	.then(res=>{
		//alert("fetch success");
		store.dispatch({type: FETCH_TOPUP , transactions: res.data.data});
	})		
}

export function loadP2Ps(start,end){
	api.post("http://localhost:8081/api/wallet/protected/getP2PTransactions",{start: start, end: end, type : 2})
	.then(res=>{
		store.dispatch({type: FETCH_P2P , transactions: res.data.data});
	})	
}

export function loadFullProfile(){
	api.post("http://localhost:8081/api/wallet/protected/fullProfile")
	.then(res=>{
		//alert(JSON.stringify(res.data));
		store.dispatch({type: FETCH_PROFILE, profile: res.data.data})
	});
}
export function changeTransferPopup(show){
	store.dispatch({type : CHANGE_TRANSFER_POPUP, show : show });
}

export function checkWallet(){
	//alert('check wallet');
	api.get('http://localhost:8081/api/wallet/protected/checkWallet')
	.then(res=>{
		alert(JSON.stringify(res));

		if(res.data.data.code) store.dispatch({type: CHECK_WALLET, result: res.data.data.code});
	})
}

function topup(req){
	api.post('http://localhost:8081/api/wallet/protected/topup',req)
	.then(res=>{
		if(res.data.data.code) {
			alert("Topup successfully");
		}
	})
}
function sendP2P(req){
	api.post('http://localhost:8081/api/wallet/protected/sendP2P',req)
	.then(res=>{
		if(res.data.data.code) {
			alert(res.data.data.message);
		}
	})
}

function changeShowPinPopup(show){
	store.dispatch({type: "CHANGE_SHOW_PIN_POPUP", show : show});
}