import React from 'react';
import ReactDOM from 'react-dom';
import {Button, Icon, Input, Layout, Menu} from 'antd';
import {loadTopups, loadP2Ps, loadFullProfile, setTopupPopup} from '../actions/walletAction2';
import TopupForm from './topup-form';
import {RegisterWallet} from './register-wallet';
import {connect} from 'react-redux';
import TransferP2P from './transfer-p2p';
import "font-awesome/css/font-awesome.min.css";

class NormalWalletMenu extends React.Component{
	
	constructor(props){
		super(props);
		this.handleMainMenuChange = this.handleMainMenuChange.bind(this);
	}

	componentDidMount(){
	
	}

	handleMainMenuChange(e){
		switch(e.key){
			case "1":
				if(this.props.balance!=null) this.props.setChangePanel(2);
				break;
		
			case "2": 
				let end = new Date().getTime();
				this.props.getTopups(end- 24*3600*1000,end);
				this.props.setChangePanel(1);
				break;
			
			case "3":
				end = new Date().getTime();
				this.props.getP2Ps(end-24*3600*1000,end);
				this.props.setChangePanel(1);
				break;
			
			
			default: 
				break;
		}
	}
	render(){
		var x;
		if(this.props.balance != null)
			x = (<div><Menu theme="bright" mode="inline" defaultSelectedKeys={['1']} onSelect={this.handleMainMenuChange}>
           
           	<Menu.Item key="1">
                <Icon type="profile" style={{fontSize: 30}}/> 
                Profile
            </Menu.Item>
    		<Menu.Item key="2">
                <Icon type="money-collect" style={{fontSize: 30}}/>
                Topup History
            </Menu.Item>
            <Menu.Item key="3"> 
                <Icon type="transaction" style={{fontSize: 30}}/> 
                Transaction History
            </Menu.Item>
           
          	</Menu>
          	<TransferP2P/>
          	</div>
          	);
		else {
			x = (<Menu theme="bright" mode="inline" defaultSelectedKeys={['1']} onSelect={this.handleMainMenuChange}>
           	<Menu.Item key="1">
            	<RegisterWallet/>
            </Menu.Item>
        	</Menu>);
		}
		return (<div>
			{x}
		</div>);//
	}
}

function mapStateToProps(state){
	return {
		existWallet : state.walletReducer.existWallet,
		balance : state.walletReducer.balance
	}
}
function mapDispatchToProps(dispatch){
	return{
		getTopups 	: (start,end) => dispatch(loadTopups(start,end)),
		getP2Ps		: (start,end) => dispatch(loadP2Ps(start,end)),
		changeTopupPopup : state => dispatch(setTopupPopup(state))
	}
}

export const WalletMenu = connect(mapStateToProps,mapDispatchToProps)(NormalWalletMenu);