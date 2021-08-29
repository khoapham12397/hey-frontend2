import React from 'react';
import {connect} from "react-redux";
import CustomAvatar from "./custom-avatar";
import {Icon,Button} from 'antd';
import {api} from '../api/api';

import {setTransferPopup, setTransfer ,setGiftPopup, loadBalance } from '../actions/walletAction2';

class ChatHeader extends React.Component {
  constructor(props){
    super(props);
    this.showPopup = this.showPopup.bind(this);
    this.transfer = {userId : null, name :null};
  }
  showPopup(type){
   
    if(!type) {
      this.props.changeTransfer(this.transfer);
      this.props.changeTranserPopup(true);
    }
    else {
      this.props.getBalance();
      this.props.changeGiftPopup(true);
    }
  }
  render() {
    var groupchat=false;
    var sessionId = '';
    var userId = null;
    for(let i=0;i<this.props.chatList.length;i++){
            if(this.props.chatList[i].sessionId == this.props.currentSessionId) {
              groupchat = this.props.chatList[i].groupchat;
              sessionId = this.props.chatList[i].sessionId;
              userId = this.props.chatList[i].userId;
              let name = this.props.chatList[i].name;
             if(!groupchat) {
                this.transfer = {userId : userId ,name : name,avatar : this.props.chatList[i].avatar};
                 
              }
              break;
            }
    }
    return (
      <div className='chat-header'>
        <div style={{width: 50}}>
          {this.props.header.groupchat ?
            <CustomAvatar type="panel-group-avatar"/>
            :
            <CustomAvatar type="panel-avatar" avatar={this.props.header.avatar}/>
          }
        </div>
        <div style={{overflow: 'hidden', paddingTop: 5}}>
          <div className="panel-message">{this.props.header.title}</div>
        </div>
        <div style={{marginLeft: "auto" , cursor :"pointer"}} > 
          {!groupchat?( <Button type="primary" shape="round" icon="container" size="large" onClick = {(e) => this.showPopup(false)}>Transfer Money</Button>):
          (<Button type="danger" shape="round" icon="container" size="large" onClick = {(e) => this.showPopup(true)}>Send Luckey Money</Button>)}
        </div>
      </div>
    );
  }
}//

function mapStateToProps(state) {
  return {
    header: state.chatReducer.messageHeader,
    currentSessionId : state.chatReducer.currentSessionId,
    chatList: state.chatReducer.chatList,
    transfer : state.walletReducer.transfer
  }
}

function mapDispatchToProps(dispatch) {
  return {
    changeTranserPopup : state => dispatch(setTransferPopup(state)),
    changeTransfer : transfer => dispatch(setTransfer(transfer)),
    changeGiftPopup : state => dispatch(setGiftPopup(state)),
    getBalance : () => dispatch(loadBalance())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatHeader);