import React from "react";
import { Menu} from "antd";
import { connect } from "react-redux";
import {
  setRequest,
  setTransferPopup,
  setTransfer,
} from "../actions/walletAction2";
import "font-awesome/css/font-awesome.min.css";
import CustomAvatar from "./custom-avatar";
import {
  handleChangeAddressBook,
  loadAddressBookList,
} from "../actions/addressBookAction";
import { Scrollbars } from "react-custom-scrollbars";
import { changeMessageHeader } from "../actions/chatAction";


const { SubMenu } = Menu;

class TransferP2P extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: [],
    };
  }

  componentDidMount() {
    this.props.loadAddressBookList();
  }

  handleCurrentChange = (event) => {
    this.setState({
      ...this.state,
      current: [event.key],
    });
    this.props.changeTransfer({
      name: this.props.addressBookList[event.key].name,
      avatar: this.props.addressBookList[event.key].avatar,
      userId: this.props.addressBookList[event.key].userId
    })
    if (!this.props.addressBookList[event.key].wallet) {
      this.props.changeMessageHeader(
        this.props.addressBookList[event.key].name,
        this.props.addressBookList[event.key].avatar,
        false,
        this.props.addressBookList[event.key].wallet,
      );
      this.props.handleChangeAddressBook(
        this.props.addressBookList[event.key].userId
      );
      return;
    }
    this.setState({
      ...this.state,
      current: []
    });
    this.props.changeTransferPopup(true);
  };

  render() {
    return (
      <div>
        <Scrollbars style={{height: 400 , width: 300}}
         autoHide autoHideTimeout={500} autoHideDuration={200}
       
        >
        <Menu
            theme="light"
            mode="inline"
            defaultSelectedKeys={[]}
            selectedKeys={this.state.current}
            onSelect={this.handleCurrentChange}
          >
          
            <SubMenu
              key="sub"
              title={
                <a href="#">
                  <i className="fa fa-exchange" aria-hidden="true">
                    <strong> Transfer</strong>
                  </i>
                </a>
              }
            >
              {this.props.addressBookList.map((item, index) => (
                <Menu.Item key={index}>
                  <div style={{ width: 60 }}>
                    <CustomAvatar type="user-avatar" avatar={item.avatar} />
                  </div>
                  {item.wallet ? (
                    <div className="status-point zalopay" />
                  ) : (
                    <div />
                  )}
                  <div style={{ overflow: "hidden", paddingTop: 5 }}>
                    <div className="user-name">{item.name}</div>
                  </div>
                </Menu.Item>
              ))}
            </SubMenu>
          </Menu>
          </Scrollbars>
       </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    addressBookList: state.addressBookReducer.addressBookList,
    pinPopup: state.walletReducer.pinPopup,
    transferPopup: state.walletReducer.transferPopup,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeRequest(request) {
      dispatch(setRequest(request));
    },
    changeTransferPopup(state) {
      dispatch(setTransferPopup(state));
    },
    loadAddressBookList() {
      dispatch(loadAddressBookList());
    },
    changeMessageHeader(avatar, title, groupchat, wallet) {
      dispatch(changeMessageHeader(avatar, title, groupchat, wallet));
    },
    handleChangeAddressBook(userId) {
      dispatch(handleChangeAddressBook(userId));
    },
    changeTransfer(transfer){
      dispatch(setTransfer(transfer));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TransferP2P);
