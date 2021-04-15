import { shade } from "polished";
import styled, { css } from "styled-components";
export const Title = styled.h1`
  font-size: 42px;
  color: #3a3a3a;
  margin-top: 80px;
  max-width: 550px;
  line-height: 56px;
`;

export const LoginText = styled.h3`
  font-size: 32px;
  color: #3a3a3a;
  margin-top: 80px;
  max-width: 450px;
  line-height: 56px;
`;

interface FormProps {
  hasError: boolean;
}

export const Form = styled.form<FormProps>`
  margin-top: 32;
  max-width: 700px;
  display: flex;
  input {
    flex: 1;
    height: 70px;
    padding: 0 24px;
    border: 0;
    border-radius: 5px 0 0 5px;
    color: #3a3a3a;
    border: 2px solid #fff;
    border-right: 0;
    ${(props) =>
      props.hasError &&
      css`
        border-color: #c53030;
      `}
    &::placeholder {
      color: #a8a8b3;
    }
  }
  button {
    width: 100px;
    height: 70px;
    background: #04d361;
    border-radius: 0px 5px 5px 0px;
    border: 0;
    color: #fff;
    font-weight: bold;
    transition: background-color 0.2s;
    &:hover {
      background: ${shade(0.2, "#04d361")};
    }
  }
`;

export const Error = styled.span`
  display: block;
  color: #c53030;
  margin-top: 8px;
`;
