import React from 'react';
import styled from 'styled-components';

import {colors, typography, shadows} from 'styles';

const InputBox = styled.input.attrs(({disabled, wrongValue, error, sizeInputBig}) => ({
  style : {
    backgroundColor : disabled ? colors.disabledInputBackground : '',
    color           : disabled ? colors.disabledInputText : '',
    border          : error ? `2px solid ${colors.redElectron}` : '',
    boxShadow       : error ? shadows.inputError : '',
    padding         : error ? '8px' : '9px 0px 9px 9px'

    }
}))`
  min-width      : 50px;
  margin         : 0;
  border         : 1px solid ${colors.bordersInput};
  border-radius  : 4px;
  padding        : 2%;
  display        : inline-block;
  vertical-align : middle;
  white-space    : normal;
  background     : white;
  line-height    : 2;
  font-size      : ${typography.medium}em;
  overflow       : initial;
  caret-color    : ${colors.buttonLogin};

  :focus {
    outline : none;
    border : 1px solid ${colors.buttonLogin};
    box-shadow: 0px 0px 18px 0px rgba(35,210,157,0.25);
  }
`;

const InputContainer = styled.div`
  display        : flex;
  flex-direction : column;
  width          : 100%
`;

const Label = styled.label.attrs(({mediumSizeLabel, darkLabel})=> ({
  style : {
        fontSize : mediumSizeLabel ? typography.large+'em' : typography.large+'em',
        color : darkLabel ? colors.darkBlue : colors.textColorHeadTable
  } 
}))`
  margin-top    : 4%;
  margin-bottom : 10px;

    @media(max-width : 600px){
        font-size : ${typography.xlarge}em;
    }
`;

const ErrorMessage = styled.div`
  color       : red;
  font-size   : ${typography.medium}em;
  margin-top  : 10px;
  font-weihgt : 500;
`;

class Input extends React.Component{
  render() {
    const {
            placeholder,
            label,
            type,
            id,
            value,
            error,
            onChange,
            disabled,
            wrongValue,
            errorMessage,
            sizeInputBig,
            mediumSizeLabel,
            darkLabel,
            className
          } = this.props;

    return (
      <InputContainer className={className}>
        <Label
         mediumSizeLabel={mediumSizeLabel}
         darkLabel={darkLabel}
         >{label}</Label>
        <InputBox
          disabled={disabled}
          id={id}
          placeholder={placeholder}
          type={type}
          value={value}
          onChange={onChange}
          wrongValue={wrongValue}
          active={true}
          sizeInputBig={sizeInputBig}
          className={className}
          error={error}
          
        />
        {
          wrongValue ?
          <ErrorMessage>{errorMessage}</ErrorMessage> : null
        }
      </InputContainer>
    );
  }
}

export default Input;