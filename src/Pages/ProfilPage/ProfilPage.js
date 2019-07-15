import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import socketIOClient from "socket.io-client";

import { updateDatas } from 'store/update';
import { updateFriendRequest, validRecommendRequest } from 'store/actions/friends';

import { loadTopics } from 'store/actions/topics';

import ProfilPageMobile from './mobile/ProfilPageMobile';

export var socket = socketIOClient('http://localhost:8000/');

const Container = styled.div`
  height : 100%;
`;



class ProfilPage extends React.Component{
  constructor(props){
    super(props);
    this.handleAcceptRequest      = this.handleAcceptRequest.bind(this);
    this.handleIgnoreRequest      = this.handleIgnoreRequest.bind(this);
    this.handleClickValidRecommendFriend   = this.handleClickValidRecommendFriend.bind(this); 
    this.handleClickIgnoreRecommendFriend   = this.handleClickIgnoreRecommendFriend.bind(this); 

    /* socket = socketIOClient('http://localhost:8000/'); */
  }

  componentDidMount(){
    this.props.updateDatas();
  }
 
  handleAcceptRequest(friendId){
    console.log('accept', friendId)
    const { user } = this.props;
    this.props.updateFriendRequest(user._id, friendId, 3, 3);
  }

  handleIgnoreRequest(friendId){
    const { user } = this.props;
    this.props.updateFriendRequest(user._id, friendId, 4, 4);
  }

  handleClickValidRecommendFriend(id){
    const { user, users } = this.props;
    const email = users[id].email;
    this.props.validRecommendRequest(user._id, id, 2, 5, email);
  }

  handleClickIgnoreRecommendFriend(id){
    const { user, users } = this.props;
    const email = users[id].email;
    this.props.validRecommendRequest(user._id, id, 4, 4, email);
  }

  handleClick

  render(){
    socket.on('topicsData', (datas) =>{
      console.log(datas)
      localStorage.setItem('topics', JSON.stringify(datas));
      this.props.loadTopics(datas);
    });
    const { users, user, friends } = this.props;
    return(
      <Container>
        <ProfilPageMobile 
          users={users}
          user={user}
          friends={friends}
          accepteRequest={this.handleAcceptRequest}
          ignoreRequest={this.handleIgnoreRequest}
          valideRecommendRequest={this.handleClickRequestFriend}
          ignoreRecommendRequest={this.handleClickIgnoreRecommendFriend}
        />
      </Container>
    );
  }
}


export default connect( state => ({
  users : state.users,
  user  : state.user,
  friends : state.friends
}), {
  updateDatas,
  updateFriendRequest,
  validRecommendRequest,
  loadTopics
})(ProfilPage);