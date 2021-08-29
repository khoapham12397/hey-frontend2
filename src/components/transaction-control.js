import React from  'react';
import {connect} from 'react-redux';
import {setTransControlPopup,
loadTopups,
loadP2Ps } from '../actions/walletAction2';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import {Button, Modal,Input,Radio} from 'antd';

class TransactionControl extends React.Component{

	constructor(props){
		super(props);

		this.state = {
			startDate : new Date(), endDate : new Date(),
			typeSR : 2
		}

		this.handleOk = this.handleOk.bind(this);
		this.handleCancel = this.handleCancel.bind(this);
		this.onChange = this.onChange.bind(this);
	}
	componentDidMount(){

	}
	setDate(date,type){
		if(type==0) this.setState({startDate : date});
		else this.setState({endDate : date});
	}
	onChange(e){
		this.setState({typeSR : e.target.value});
	}
	handleOk(event){
		if(this.props.typeTs == 0){
			this.props.getTopups(this.state.startDate.getTime(),this.state.endDate.getTime());
		}
		else {
			this.props.getP2Ps(this.state.startDate.getTime(),this.state.endDate.getTime(),this.state.typeSR);
		}
		this.props.changeControlPopup(false);
	}
	handleCancel(event){
		this.props.changeControlPopup(false);
	}
	render(){
		return (<div>
		<Modal
          width="530px"
          title="Transaction History"
          visible={this.props.transControlPopup}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText="Find"
          cancelText="Cancel"
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
         	>
            </div>
            {(this.props.typeTs== 1)?(
            	<Radio.Group onChange={this.onChange} defaultValue={2}>
              		<Radio value={0}>Sender </Radio>
              		<Radio value={1}>Receiver </Radio>
              		<Radio value={2}>All</Radio>
           		</Radio.Group>
            ):(<div/>)}

          	<div style={{ display: "flex", maxWidth: "200px" ,marginTop :20 }}>
          	<p className="model-label" style={{marginRight : 10}}> Start  </p>
          	
			<DatePicker
				selected={this.state.startDate} 
      			onChange={date => this.setDate(date,0)}
  			/>
  			
  			<p className="model-label" style={{marginRight : 10 , marginLeft : 20}}> End </p>

  			<DatePicker
				selected={this.state.endDate} 
      			onChange={date => this.setDate(date,1)}
  			/>
  			
  			</div>

          
        </Modal>

		</div>);
	} 
}//

function mapStateToProps(state){
	return{
		transControlPopup : state.walletReducer.transControlPopup,
		typeTs : state.walletReducer.typeTs
	}
}

function mapDispatchToProps(dispatch){
	return {
		changeControlPopup : state => dispatch(setTransControlPopup(state)),
		getTopups : (start,end) => dispatch(loadTopups(start,end)),
		getP2Ps : (start,end,type) => dispatch(loadP2Ps(start,end,type))  
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionControl);