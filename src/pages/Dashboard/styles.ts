import styled from "styled-components";
export const Title = styled.h1`
  font-size: 48px;
  color: #3a3a3a;
  margin-top: 80px;
  max-width: 450px;
  line-height: 56px;
`;

export const Groups = styled.div`
  margin-top: 32px;
  max-width: 700px;
  img {
    width: 64px;
    height: 64px;
    border-radius: 50%;
  }
  div {
    margin-left: 16px;
    flex: 1;
    strong {
      font-size: 20px;
      color: #3d3d4d;
    }
    p {
      font-size: 18px;
      color: #a8a8b3;
      margin-top: 4px;
    }
  }
  a {
    background: #fff;
    border-radius: 5px;
    width: 100%;
    padding: 24px;
    display: block;
    text-decoration: none;
    display: flex;
    align-items: center;
    transition: transform 0.2s;
    & + a {
      margin-top: 16px;
    }
    &:hover {
      transform: translateX(10px);
    }
  }
  svg {
    margin-left: auto;
    color: #cbcbd6;
  }
`;

export const Error = styled.span`
  display: block;
  color: #c53030;
  margin-top: 8px;
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
