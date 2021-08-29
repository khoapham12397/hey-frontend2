import {FETCH_TOPUP, FETCH_P2P, FETCH_PROFILE ,
 CHECK_WALLET, CHANGE_PIN_POPUP, CHANGE_TRANSFER_POPUP,CHANGE_REQUEST,CHANGE_TOPUP_POPUP
 , CHANGE_TRANSFER,CHANGE_GIFT_POPUP,CHANGE_BALANCE,CHANGE_REGISTER_POPUP,
CHANGE_TRANS_CONTROL_POPUP
} from  '../actions/walletAction2';

const initState={
	transactions	: [],
	typeTs 			: null,
	profile 		: null,
	balance 		: null,
	existWallet		: false,
	request 		: null,
	pinPopup 		: false,
	transferPopup 	: false,
	topupPopup 		: false,
	transfer: {userId: null, name : null},
	giftPopup 		: false,
	registerPopup	: false,
	transControlPopup: false
}

export default function reduce(state=initState , action){
	switch(action.type){
		case FETCH_TOPUP:
			return{
			...state,
			transactions : action.transactions,
			typeTs : 0
			};
		case FETCH_P2P:
			return {
			...state,
			transactions : action.transactions,
			typeTs : 1
			};
		case FETCH_PROFILE:
			return{
				...state,
				profile : action.profile
			}
		case CHECK_WALLET:
			return {
				...state,
				existWallet : action.result
			}
		case CHANGE_PIN_POPUP:
			return{
				...state, 
				pinPopup : action.state
			}
		case CHANGE_TRANSFER_POPUP:
			return{
				...state,
				transferPopup: action.state
			}
		case CHANGE_TOPUP_POPUP:
			return {
				...state,
				topupPopup: action.state
			}
		case CHANGE_TRANSFER:
			return{
				...state,
				transfer : action.transfer
			}
		case CHANGE_REQUEST:
			return{
				...state,
				request :action.request
			}
		case CHANGE_GIFT_POPUP:
			return {
				...state,
				giftPopup : action.state
			}
		case CHANGE_BALANCE:
			return {
				...state,
				balance : action.balance
			}
		case CHANGE_REGISTER_POPUP:
			return{
				...state,
				registerPopup: action.state
			}
		case CHANGE_TRANS_CONTROL_POPUP:
			return{
				...state,
				transControlPopup : action.state
			}
		default :
		return state;

	}
}
