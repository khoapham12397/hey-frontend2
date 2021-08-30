import React from 'react';
import CustomAvatar from "./custom-avatar";
import {Icon,message} from "antd";
import {SlideDown} from "react-slidedown";
import {api} from '../api/api';
import {Table} from 'react-bootstrap';
import P2PForm from './p2pform';
import {formatMoney} from '../utils/myutils';

class ChatItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDate: false
    };
    this.handleItemClick = this.handleItemClick.bind(this);
    this.receivePresent = this.receivePresent.bind(this);
  };
  
  handleItemClick(e) {
    let newState = this.state.showDate;

    if (newState) {
      newState = false
    } else {
      newState = true;
    }
    this.setState({
      showDate: newState
    })
  }

  receivePresent(arr){
    
    var del = Date.now() - parseInt(arr[5]);
    
    if(del > 86400000) {
      alert("This present id expired");
      return;
    }
  
    var payload = {presentId : arr[1], sessionId: arr[2]};
    var url = 'http://localhost:8081/api/wallet/protected/receivePresent';
    api.post(url, JSON.stringify(payload))
    .then(res=>{

        if('data' in res.data) {
          let msg = 'Congratulation ! You have received '+res.data.data.amount +' VND';
          message.success(msg);
        }
        else message.success(res.data.error);
    });
    
  }
  
  render() {
    var cssClass;  var cssContentClass;
    var type= this.props.type;

    if(type==1) {cssClass = 'chat-item-owner'; cssContentClass = 'chat-item-content-owner';}
    if(type==2) {cssClass = 'chat-item-other'; cssContentClass = 'chat-item-content-other';}
    if(type==3 || type == 4) {cssClass = 'chat-item-system'; cssContentClass = 'chat-item-content-system';}

    var result =(<div></div>);//
    let content,note;
    if(type<=2) {
      content = (<div onClick={this.handleItemClick}>{this.props.value}</div>);//
   
      note = this.props.date;
    }  
    if(type==3){
      let arr= this.props.value.split(':');

      content = (<div>
      <Table striped bordered hover>
      <thead><tr ><td colspan="2"><Icon style={{fontSize : "150%"}} type="transaction"/>  Transfer Info</td></tr></thead>
      <tbody>

      <tr><td style= {{}}>Transaction Code</td><td>{arr[1]}</td></tr>
      <tr><td>Sender</td><td>{arr[2]}</td></tr>
      <tr><td>Receiver</td><td>{arr[3]}</td></tr>
      <tr><td>Amount</td><td>{formatMoney(parseInt(arr[4]))} VND</td></tr>
      <tr><td>DateTime</td><td>{this.props.date}</td></tr>
      </tbody>
      </Table>
      </div>);//
      note = '';
    }
    if(type==4){
      let arr = this.props.value.split(':');
      content = (<div className={'chat-item-content ' + cssContentClass} style={{width:200}}>
        <div>
        <div onClick={e => this.receivePresent(arr)}> 
        <img src={require("../gift.svg")}/>
        </div>
        <div onClick ={this.handleItemClick}> From {arr[3]}
        <div><span style={{fontSize : 13}}> click to detail </span></div>
        </div>
        </div>
        </div>);///
      note = 'Total gift ' + formatMoney(parseInt(arr[4])) + ' VND start '+ this.props.date;
    }

    result = (<div className={'chat-item chat-item-outer ' + cssClass}>
        <div className={'chat-item ' + cssClass}>
          <CustomAvatar type="chat-avatar" avatar={this.props.avatar} show={this.props.showavatar}/>
          {(type==4)?(content):( <div className={'chat-item-content ' + cssContentClass} >{content}</div>)}
         
        </div>
        {(this.state.showDate)?
          <SlideDown>
          <div className={'chat-item-date'}>{note}</div>
          </SlideDown>
          :''}
      </div>);//
   
  
    return result;
  }
};

export default ChatItem;