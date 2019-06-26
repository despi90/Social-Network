import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { LOST_PASSWORD_PATH } from 'Routes/Paths';


import Checkbox from 'components/common/Checkbox';
import TextPresentation from './TextPresentation';
import Input from 'components/common/Input';

import { colors, shadows, dimensions, typography} from 'styles.js';

import { FORM_CONNECTION_PATH } from 'Routes/Paths';


const Content = styled.div`
  flex            : 1;
  width           : 100%;
  display         : flex;
  flex-direction  : row;
  justify-content : center;
  align-items     : center;

  @media(max-width: 800px) {
    flex-wrap       : wrap;
  }

`;

const Form = styled.form`
  flex           : 0;
  display        : flex;
  flex-direction : column;
  margin         : auto 0;
  color          : white;
  @media(max-width: 600px) {
    flex      : 1;
  }
    label {
      color : ${colors.purpleElectron};
  
        @media(max-width : 361px) {
          margin-top : 5px;
        }
    }
`;

const HeadTitleForm = styled.div`
  font-size     : ${typography.xxlarge}em;
  font-weight   : 500;
  color         : ${colors.yellowElectron};
`;

const Button = styled.input`
  width            : 340px;
  padding          : 5%;
  margin           : 7% 0px 0px;
  border           : none;
  border-radius    : 5px;
  color            : white;
  font-weight      : 500;
  background-color : ${colors.blueElectron};
  font-size        : 18px;
  cursor           : pointer;
  outline          : 0;

  :hover {
    background-color : ${colors.buttonLoginHover};
  }

  :active {
    background-color : white;
    color            : ${colors.buttonHighlighText};
    border           : 1px solid ${colors.buttonHighlighText};
  }
  @media(max-width : 601px) {
    width : 100%;
  }
  @media(max-width : 601px) {
    padding          : 3%;
  }
`;

const FormOptions = styled.div`
  display         : flex;
  flex-direction  : row;
  justify-content : space-between;
  margin-top      : 25px;
    @media(max-width:360px){
      font-size : 1.5em;
    }
`;

const LostPasswordLink = styled(Link)`
  font-size       : ${typography.medium}em;
  text-decoration : none;
  color           : white;
  margin-right    : 5px;

  :hover {
    color : ${colors.buttonLogin};
  }
`;

const LinkCreateAccount = styled.div`
  display        : flex;
  flex-direction : column;
  font-size      : ${typography.medium}em;
  margin-top     : 8%;
  font-weight    : 400;
    @media(max-width:360px){
      font-size : 1.5em;
    }
`;

const TryLabel = styled.p`
  margin : 5px 0;
`;

const LinkTry = styled(Link)`
  text-decoration : none;
  color           : ${colors.buttonLogin};
  text-decoration  : none;
`;


class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleEmailChange    = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit         = this.handleSubmit.bind(this);
    this.handleRemember       = this.handleRemember.bind(this);

    this.state = {
      email : '',
      password : '',
      remember : false
    };
  }

  handleEmailChange(event) {
    this.setState({email : event.target.value});
  }

  handlePasswordChange(event) {
    this.setState({password : event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();

    const { onSubmit } = this.props;
    let { email, password } = this.state;

    email = email.trim();
    password = password.trim();

    if (email && password) {
    }
    onSubmit({email, password});
  }


  handleRemember() {
    this.setState({remember : !this.state.remember});
  }

  render() {
    const { errorMessage = ''} = this.props;
    return (
      <Content>
        <TextPresentation/>
        <Form onSubmit={this.handleSubmit}>
          <HeadTitleForm>Enter the Javascript</HeadTitleForm>
          <Input 
            label="Email"
            mediumSizeLabel={true}
            onChange={this.handleEmailChange}
          />
          <Input
            label="Mot de passe"
            mediumSizeLabel={true}
            onChange={this.handlePasswordChange}
            type="password"
          />
          <Button type="submit" value="Log in" />
          <FormOptions>
            <Checkbox
              checked={this.state.remember}
              onToggle={this.handleRemember}
              label="se souvenr de moi"
              />
            <LostPasswordLink to={LOST_PASSWORD_PATH}>mot de passe oublié ?</LostPasswordLink>
          </FormOptions>
          <LinkCreateAccount>
            <TryLabel>Vous n'avez pas encore de compte ?</TryLabel>
            <LinkTry to={FORM_CONNECTION_PATH}>Rempli le formulaire d'inscription en cliquant ici</LinkTry>
          </LinkCreateAccount>
        </Form>
      </Content>
    );
  }
}

export default LoginForm;
