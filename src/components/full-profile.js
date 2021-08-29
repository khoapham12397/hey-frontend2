import React from 'react';
import {Icon} from 'antd';
import {loadTopups, loadP2Ps} from '../actions/walletAction';
import {Row} from 'react-bootstrap';
import {Form,Input,Button } from 'antd';

import {connect} from 'react-redux';
import {formatMoney} from '../utils/myutils';
import {api} from '../api/api';
import {loadBalance} from  '../actions/walletAction2';

class FullProfile extends React.Component{
	constructor(props){
		super(props);
		this.handleSubmit =this.handleSubmit.bind(this);
		this.state= {
			fullName : null,
			identityNumber : null,
			email : null,
			address : null,
			phone : null,
			dateOfBirth : null,
		}
		this.onChangeHandle = this.onChangeHandle.bind(this);
	}
	

	componentDidMount(){
		this.props.getBalance();
	}

	onChangeHandle(e){
		var name = e.target.name;
		var val  = e.target.value;
		this.setState({[name]:val});
	}
	handleSubmit(e){
		alert('Are you ok to change ?');
    var profile = {
		    fullName : this.state.fullName,
        	identityNumber : this.state.identityNumber,
        	email : this.state.email,
        	address : this.state.address,
        	phone : this.state.phone,
        	gender :this.state.gender,
        	dateOfBirth : this.state.dateOfBirth,
        };
    
    api.post('http://localhost:8081/api/wallet/protected/changeProfile',JSON.stringify(profile))
    .then(res=>{alert(JSON.stringify(res.data))});
	}
	
	render(){

    	return (
		<div className='chat-container'>
		
    	<div style={{marginLeft : '250px', marginTop: '20px', width: '600px', border: '1px solid', borderRadius : '30px',
			borderColor: '#D3D3D3',borderWidht: '0.5px' , backgroundColor: '#fff' , float : 'left'}}>
		<div style ={{borderBottom: '0.5px solid', borderWidth:'0.5px' ,borderColor: '#D3D3D3'}}>
 	   	<Row>
      		<h3 style={{marginLeft:'40px',marginTop : '20px'}}><Icon style={{fontSize:'200%'}} type='dollar'/>  Balance: {formatMoney(this.props.balance)} VND</h3>
    	</Row>
    
    	</div>
         
    	</div>

    	</div>
	);//
	}
}

function mapStateToProps(state){
	return {
		profile : state.walletReducer.profile,
    	balance : state.walletReducer.balance
	}
}
function mapDispatchToProps(dispatch){
  return {
  	getBalance : () => dispatch(loadBalance())
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(FullProfile);