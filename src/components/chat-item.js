import React from 'react';
import CustomAvatar from "./custom-avatar";
import {Popover} from "antd";
import {SlideDown} from "react-slidedown";

class ChatItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDate: false
    };
    this.handleItemClick = this.handleItemClick.bind(this);
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
  // con 1 dang nua la duoc :
  // dung vay do :
  // diue na 
  render() {
    var cssClass;  var cssContentClass;
    var type= this.props.type;
    // = this.props.type == 1 ? 'chat-item-owner' : 'chat-item-other';
    if(type==1) {cssClass = 'chat-item-owner'; cssContentClass = 'chat-item-content-owner';}
    if(type==2) {cssClass = 'chat-item-other'; cssContentClass = 'chat-item-content-other';}
    if(type==3) {cssClass = 'chat-item-system'; cssContentClass = 'chat-item-content-system';}
    // = this.props.type == 1 ? 'chat-item-content-owner' : 'chat-item-content-other';
    var result =(<div></div>);//
    if(type==1 || type==2 || type==3){
      result = ( <div onClick={this.handleItemClick} className={'chat-item chat-item-outer ' + cssClass}>
        <div className={'chat-item ' + cssClass}>
          <CustomAvatar type="chat-avatar" avatar={this.props.avatar} show={this.props.showavatar}/>
          <div className={'chat-item-content ' + cssContentClass}>{this.props.value}</div>
        </div>
        {this.state.showDate ?
          <SlideDown>
          <div className={'chat-item-date'}>{this.props.date}</div>
          </SlideDown>
          : ''}
      </div>);//
    }
    return (

      <div onClick={this.handleItemClick} className={'chat-item chat-item-outer ' + cssClass}>
        <div className={'chat-item ' + cssClass}>
          <CustomAvatar type="chat-avatar" avatar={this.props.avatar} show={this.props.showavatar}/>
          <div className={'chat-item-content ' + cssContentClass}>{this.props.value}</div>
        </div>
        {this.state.showDate ?
          <SlideDown>
          <div className={'chat-item-date'}>{this.props.date}</div>
          </SlideDown>
          : ''}
      </div>
    )
  }
};

export default ChatItem;