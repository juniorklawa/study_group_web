import { shade } from "polished";
import styled from "styled-components";
export const Title = styled.h1`
  font-size: 42px;
  color: #3a3a3a;
  margin-top: 80px;
  max-width: 550px;
  line-height: 56px;
`;

export const InputTitle = styled.h3`
  font-size: 32px;
  color: #3a3a3a;
  margin-top: 32px;
  max-width: 450px;
  line-height: 56px;
`;

export const Form = styled.form``;

export const SubmitButton = styled.button`
  width: 250px;
  margin-top: 32px;
  height: 70px;
  background: #04d361;
  border-radius: 5px;
  border: 0;
  color: #fff;
  font-weight: bold;
  transition: background-color 0.2s;
  &:hover {
    background: ${shade(0.2, "#04d361")};
  }
`;

export const RegisterInput = styled.input`
  flex: 1;
  height: 70px;
  padding: 0 24px;
  width: 700px;
  border: 0;
  border-radius: 5px;
  color: #3a3a3a;
  border: 2px solid #fff;
  border-right: 0;

  &::placeholder {
    color: #a8a8b3;
  }
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  a {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: #a8a8b3;
    transition: color 0.2s;
    &:hover {
      color: #666;
    }
    svg {
      margin-right: 4px;
    }
  }
`;
