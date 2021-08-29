import React from 'react';
import {Alert, Button, Input, Modal, Tag} from 'antd';
import CustomAvatar from '../components/custom-avatar';
import $ from 'jquery';
import {connect} from "react-redux";
import {addNewUserChatGroup, removeUserChatGroup, startNewChatGroup} from "../actions/chatAction";

class StartChatGroup extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
    this.addMoreUsername = this.addMoreUsername.bind(this);
    this.handleRemoveUsername = this.handleRemoveUsername.bind(this);
    this.handleOk = this.handleOk.bind(this);
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = (e) => {
    this.setState({
      visible: false,
    });
    this.props.startNewChatGroup();
  }

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  }

  addMoreUsername = (e) => {
    var un = $('#add-user-name').val();
    $('#add-user-name').val('');
    this.props.addNewUserChatGroup(un);

  }

  handleRemoveUsername = (item) => {
    this.props.removeUserChatGroup(item);
  }

  render() {
    return (
      <div>
        <div className="new-action-menu" onClick={this.showModal}>
          <a href="#">
            <CustomAvatar type="new-avatar"/>
            <div className="new-text">Start New Group Chat</div>
          </a>
        </div>
        <Modal
          width="420px"
          title="Start New Chat Group"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText="Start"
          cancelText="Cancel" className="start-chat-group-modal"
        >
          {this.props.startChatGroupError ?
          < Alert message={this.props.startChatGroupErrorMessage} type="error" />
            : ''
          }
          <p className="model-label">Please enter user name:</p>
          <div className="first-line">
            <Input ref={(ref) => {
              this.ref = ref;
            }} id="add-user-name" className="add-user-name" onPressEnter={this.addMoreUsername}/> <Button
            onClick={this.addMoreUsername} type="primary"
            shape="circle" icon="plus"/>
          </div>
          {this.props.startChatGroupList.length > 0 ?
          <p className="model-label" style={{marginBottom: 3, marginTop: 10}}>Selected:</p>
            : ''}
          {this.props.startChatGroupList.map((item, index) =>
            <Tag key={index} closable onClose={(e) => {
              this.handleRemoveUsername(item);
              e.preventDefault();
            }} color="#f50">{item}</Tag>
          )}

        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    startChatGroupList: state.chatReducer.startChatGroupList,
    startChatGroupError: state.chatReducer.startChatGroupError,
    startChatGroupErrorMessage: state.chatReducer.startChatGroupErrorMessage,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addNewUserChatGroup(username) {
      dispatch(addNewUserChatGroup(username))
    },
    removeUserChatGroup(username) {
      dispatch(removeUserChatGroup(username))
    },
    startNewChatGroup() {
      dispatch(startNewChatGroup())
    }
  }
}
// diem dac biet la no van nam ben trong cua thang nay dung la vay:
// tu do the nai ??
// may cai nay cung kha la dac biet dung :
// tu do the nao ??
// dung vya d

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StartChatGroup);
// chuc nang do chua dung duoc :

// component nay no co 1 thu goi la visible cho cai modal ??
// do do the nao ?
// co the hien dang lich su giao dich dung ya :
// tu do co the lam duoc ??
// dung vya :
//  van co the dung jquery duoc dung vya :
// sau do the nao ??
// dung do :
