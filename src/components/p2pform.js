import React from 'react';
import ReactDOM from 'react';
import {Table} from 'react-bootstrap';
import {Icon} from 'antd';

class P2PForm extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		let arr = this.props.msg.split(':');

		return (<div>
			<Table striped bordered hover>
			 <thead><tr>
          <th><Icon type='transaction'/> Transfer </th>
          </tr></thead>
          <tbody>
            
            <tr><td>Transaction Code</td><td>{arr[1]}</td></tr>
            <tr><td>Sender</td><td>{arr[2]}</td></tr>
            <tr><td>Receiver</td><td>{arr[3]}</td></tr>
            <tr><td>Amount</td><td>{arr[4]}</td></tr>
            <tr><td>Time</td><td>{new Date(arr[5])}</td></tr>

          </tbody>

		</Table>
		</div>
		);//
	}
}
export default P2PForm;