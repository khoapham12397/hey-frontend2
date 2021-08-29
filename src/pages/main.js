import React from 'react';
import {Button, Icon, Input, Layout, Menu} from 'antd';
import CustomAvatar from '../components/custom-avatar';
import ChatList from "../components/chat-list";
import AddressBook from "../components/address-book";
import ChatHeader from "../components/chat-header";
import Profile from "../components/profile";
import MessagePanel from "../components/message-panel"
import {closeWebSocket, initialWebSocket, loadChatContainer, submitChatMessage} from "../actions/chatAction";
import {connect} from "react-redux";
import {isAuthenticated, isEmptyString} from "../utils/utils";
import {Redirect} from "react-router-dom";
import $ from "jquery";
import {api} from '../api/api';
import {WalletMenu} from  '../components/wallet-menu.js';
import Transactions from '../components/transactions.js';
import FullProfile from '../components/full-profile';
import {Topup} from '../components/topup-form';
import {RegisterWallet} from '../components/register-wallet'; 
import {TransferForm} from '../components/sendp2pform';
import {PinForm} from '../components/pin';
import {SendGift } from '../components/send-present-form';
import {setTopupPopup,setRegisterPopup} from '../actions/walletAction2';
import {RegisterWalletForm} from '../components/register-wallet-form';

const {Header, Content, Footer, Sider} = Layout;
const {TextArea} = Input;

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuaction: 1, mainPanel : 0 , tsxType : null
    };
    this.handleMainMenuChange = this.handleMainMenuChange.bind(this);
    this.handleMessageEnter = this.handleMessageEnter.bind(this);
    this.handleSendClick = this.handleSendClick.bind(this);
    this.setChangePanel = this.setChangePanel.bind(this);
  };

  componentDidMount() {
    this.props.initialWebSocket();
  }

  componentDidUpdate() {

  }
  
  handleMainMenuChange(e) {
    
    let panel = 0;
    if(e.key == 1 || e.key ==2) panel = 0;
    if(e.key == 3) {
        if(this.props.balance!=null) panel =2;
        else {
          this.props.changeRegisterPopup(true);
        }
    }

    
    this.setState({menuaction: e.key, mainPanel : panel});
  }

  setChangePanel(x){
    this.setState({mainPanel : x});
  }
  handleMessageEnter(e) {
    let charCode = e.keyCode || e.which;
    if (!e.shiftKey) {
      e.preventDefault();
      let message = e.target.value;
      if (!isEmptyString(message)) {
        this.props.submitChatMessage(message);
      }
      e.target.value = "";
    }

  }

  handleSendClick(e) {
    let message = $('#messageTextArea').val();
    if (!isEmptyString(message)) {
      this.props.submitChatMessage(message);
    }
    $('#messageTextArea').val('');
  }

  render() {
    if (isAuthenticated()) {
      return <Redirect to="/login" />;
    }
    let menuComp = (<div></div>);//
    let panelComp = (<div></div>);//
    if(this.state.menuaction ==1) menuComp = (<ChatList/>);
    if(this.state.menuaction ==2) menuComp =(<AddressBook/>);
    if(this.state.menuaction ==3) menuComp =(<WalletMenu setChangePanel = {this.setChangePanel} />);
    if(this.state.mainPanel == 0) panelComp = (<div className='chat-container' style={{padding: 0}}>
            <ChatHeader/>
            <MessagePanel/>
            <div className='chat-footer'>
              <TextArea id="messageTextArea" onPressEnter={this.handleMessageEnter} rows={1} placeholder="Type a new message" ref="messageTextArea"/>
              <Button type="primary" onClick={this.handleSendClick}>Send</Button>
            </div>
            </div>);//
    if(this.state.mainPanel ==1) panelComp = (<Transactions/>);
    if(this.state.mainPanel ==2) panelComp = (<FullProfile/>);
    return (
      <div style={{height: 100 + 'vh'}}>
        <Layout>
          <Sider width
                 breakpoint="lg"
                 collapsedWidth="0"
                 onBreakpoint={(broken) => {
                 }}
                 onCollapse={(collapsed, type) => {
                 }} width="80" id="main-side-menu"
          >
            <CustomAvatar type="main-avatar" avatar={this.props.userName}/>
            <div className="menu-separation"/>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} onSelect={this.handleMainMenuChange}>
              <Menu.Item key="1">
                <Icon type="message" style={{fontSize: 30}}/>
              </Menu.Item>
              <Menu.Item key="2">
                <Icon type="bars" style={{fontSize: 30}}/>
              </Menu.Item>
              <Menu.Item key="3">
                <Icon type="wallet" style={{fontSize: 30}}/>
              </Menu.Item>
              {(this.props.balance!=null)?(
                <div style={{marginLeft : '15px'}}>
                <div onClick = {e => {
                this.props.changeTopupPopup(true)
                  }
                }>
                <Icon type="arrow-down" style={{fontSize: "30px",marginLeft: "10px" , cursor : "pointer"}} />
                </div>
                </div>):(<div/>)
              }
              {(this.props.balance!=null)?(<Topup/>):(<div/>)}

              <TransferForm/>
              <PinForm/>
              <SendGift/>
              <RegisterWalletForm/>
            </Menu>
          </Sider>
          <Sider
            breakpoint="lg"
            collapsedWidth="0"
            theme="light"
            onBreakpoint={(broken) => {
            }}
            onCollapse={(collapsed, type) => {
            }} width="300" id="sub-side-menu"
          >
            <Profile/>
            <div className="menu-separation"/>
            {menuComp}
            
            
          </Sider>
          {panelComp}
         
        </Layout>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
      userName: state.userReducer.userName,
      balance : state.walletReducer.balance
  }
}

function mapDispatchToProps(dispatch) {
  return {
    initialWebSocket() {
      dispatch(initialWebSocket())
    },
    closeWebSocket() {
      dispatch(closeWebSocket())
    },
    loadChatContainer(sessionId) {
      dispatch(loadChatContainer(sessionId))
    },
    submitChatMessage(message) {
      dispatch(submitChatMessage(message))
    },
    changeTopupPopup : state => dispatch(setTopupPopup(state)),
    changeRegisterPopup :state => dispatch(setRegisterPopup(state))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
