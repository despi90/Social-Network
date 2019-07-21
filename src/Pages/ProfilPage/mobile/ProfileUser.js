import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Widget } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';


import LandingPage     from 'components/common/LandingPage';
import Avatar          from 'components/common/Avatar';
import Info            from 'components/common/Info';
import InputSearchList from 'components/common/InputSearchList';
import ButtonList      from 'components/common/ButtonList';
import WallMessage     from './components/WallMessage';

import { colors } from 'styles';

import { friendRequest, recommendRequest } from 'store/actions/friends';
import { messageRequest, deleteMessage, responseRequest, deleteResponse } from 'store/actions/walls';
import { status } from 'constants/status';

const Container = styled.div`
  display        : flex;
  flex-direction : column;
  margin-top     : 50px;
`;

const Head = styled.div`
  display        : flex;
  flex-direction : column;
`;

const ContainerAvatar = styled.div`
  text-align : center;
`;

const AvatarProfil = styled(Avatar)`
  text-align : center;
  height     : 80px;
  width      : 80px;
`;

const Informations = styled.div`
  display         : flex;
  flex-direction  : column;
  justify-content : flex-start;
`;

const Row = styled.div`
  display         : flex;
  flex-drection   : row;
  justify-content : space-between;
  margin-top      : 10px;
`;

const ContainerButton = styled.div`
  display        : flex;
  flex-direction : row;
  justify-content: space-around;
  margin-top     : 10px;
`;

const Status = styled.div`
  padding          : 10px 20px;
  background-color : ${colors.blueElectron};
  border-radius    : 5px;
  cursor           : pointer;
`;

const Recommend = styled.div`
  padding          : 10px 20px;
  background-color : ${colors.blueElectron};
  border-radius    : 5px;
  cursor           : pointer;
`;

const Wall = styled.div`
  flex             : 1;
  border-radius    : 5px;
`;

const ZoneText = styled.div`
  display : flex;
  flex-direction : row;
`;

const TextArea = styled.textarea`
  width : 100%;
`;

const PublishButton = styled.div`
  width : 70px;
  background-color : red;
`;

const Messages = styled.div``;

class ProfileUser extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      message : '',
      response : '',
      connect : 'en attente de connection'
    }
    this.handleClickRequestFriend   = this.handleClickRequestFriend.bind(this); 
    this.handleClickRecommendFriend = this.handleClickRecommendFriend.bind(this); 
    this.handleSendMessage          = this.handleSendMessage.bind(this); 
    this.handleMessageChange        = this.handleMessageChange.bind(this);
    this.handleDeleteMessage        = this.handleDeleteMessage.bind(this);
    this.handleResponseChange       = this.handleResponseChange.bind(this);
    this.handleSendResponse         = this.handleSendResponse.bind(this);
    this.handleDeleteResponse       = this.handleDeleteResponse.bind(this);
  }
  
  handleClickRequestFriend(){
    const { location, user, users } = this.props;
    const id = location.pathname.split('/')[2];
    const email = users[id].email;
    this.props.friendRequest(user._id, id, 2, 4, email);
  }

  handleClickRecommendFriend(idRecommend){
    const { location, user, users } = this.props;
    const id = location.pathname.split('/')[2];
    const email = users[id].email;
    this.props.recommendRequest(user._id, id, idRecommend, 6, email);
  }
  
  handleSendMessage(){
    const { user, location, users, walls={} } = this.props;
    const id = location.pathname.split('/')[2];
    const email = users[id].email;
    const messageId = ((walls[id] || {}).messages || []).length+1;
    this.props.messageRequest(user._id, id, this.state.message, messageId, email);
  }

  handleMessageChange(event){
    this.setState({ message : event.target.value });
  }

  handleDeleteMessage(user, messageId){
    this.props.deleteMessage(user, messageId);
  }

  handleResponseChange(event){
    this.setState({ response : event.target.value });
  }

  handleSendResponse(senderId, recipientId, messageId, subMessageId){
    const { user, users, location } = this.props;
    const id = location.pathname.split('/')[2];
    const email = users[recipientId].email;
    this.props.responseRequest(id, senderId, recipientId, this.state.response, messageId, subMessageId, email);
  }

  handleDeleteResponse(user, messageId, subMessageId){
    this.props.deleteResponse(user, messageId, subMessageId);
  }

  handleNewUserMessage = (newMessage) => {
    console.log(`New message incomig! ${newMessage}`);
    // Now send the message throught the backend API
  }

  render(){
    const { users, user, friends, location, walls={} } = this.props;
    const id = location.pathname.split('/')[2];
    const userProfil = id ? users[id] : '';
    const myFriends = friends ? friends.filter(friend => friend.id === user._id) : [];
    const myFriendsConfirmed = ((myFriends[0] || []).userId || []).filter(friend => friend.statusId === 3);
    const friendProfil = myFriends.length >= 1 ? myFriends[0].userId.filter(friend => friend.id === userProfil._id) : [];
    const myMessages = ((walls || [])[id] || []).messages || [];
    return(
      <LandingPage>
        <Container>
          <Head>
            <ContainerAvatar>
              <AvatarProfil user={userProfil}/>
            </ContainerAvatar>
            <Informations>
              <Row>
                <Info label="Pseudo">{userProfil.pseudo}</Info>
                <Info label="Prénom">{userProfil.firstName}</Info>
                <Info label="Nom">{userProfil.lastName}</Info>
              </Row>
              <Row>
                <Info>{userProfil.email}</Info>
              </Row>
              <Row>
                <Info>{userProfil.genre}</Info>
                <Info label="Age">{userProfil.age} ans</Info>
                <Info>{userProfil.preferences}</Info>
              </Row>
              <Row>
                <Info>{userProfil.presentation}</Info>
                <Info>{userProfil.contactInformation}</Info>
              </Row>
            </Informations>
            <ContainerButton>
            <Status onClick={this.handleClickRequestFriend}>
              {
                friendProfil.length >= 1 ?
                status[friendProfil[0].statusId].name :
                status[1].name
              }
            </Status>
            {
              friendProfil.length >= 1 && friendProfil[0].statusId === 3 ?
                <ButtonList
                  placeholder="Recommander"
                  items={myFriendsConfirmed}
                  users={users}
                  onClick={this.handleClickRecommendFriend}
                />: null
            }
            </ContainerButton>
            <InputSearchList 
              placeholder="Liste d'amis"
            />
          </Head>
          <Wall>
            {
              user.role === "admin" || user._id === id || (status[(friendProfil[0] || []).statusId] || []).name === "Ami" ?
                <ZoneText>
                  <TextArea 
                    onChange={this.handleMessageChange}
                    value={this.state.message}
                  />
                  <PublishButton onClick={this.handleSendMessage}>Envoyer</PublishButton>
                </ZoneText> : null
            }
            <Messages>
              {
                myMessages.map((message, index) => 
                  <WallMessage
                  key={index}
                  walls={walls} 
                  message={message} 
                  users={users}
                  user={userProfil}
                  deleteMessage={this.handleDeleteMessage}
                  value={this.state.value}
                  onChange={this.handleResponseChange}
                  sendResponse={this.handleSendResponse}
                  deleteResponse={this.handleDeleteResponse}
                  />
                )
              }
            </Messages>
            <Widget 
              title="Messagerie Privée"	
              handleNewUserMessage={this.handleNewUserMessage}
              subtitle={this.state.connect}
            />
          </Wall>
        </Container>
      </LandingPage>
    );
  }
}

export default connect( 
  state => ({
    user    : state.user,
    users   : state.users,
    friends : state.friends,
    walls   : state.walls
  }), 
  {
    friendRequest,
    recommendRequest,
    messageRequest,
    deleteMessage,
    responseRequest,
    deleteResponse
  }
)(ProfileUser);