import { shade } from "polished";
import styled from "styled-components";

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

export const NoteContainer = styled.div`
  background: #fff;
  border-radius: 5px;
  margin-top: 16px;
  padding: 12px;
  display: block;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s;
`;

export const Notes = styled.div`
  margin-top: 80px;
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

  svg {
    margin-left: auto;
    color: #cbcbd6;
  }
`;

export const NotesInfo = styled.section`
  margin-top: 80px;
  header {
    display: flex;
    align-items: center;
    img {
      width: 120px;
      height: 120px;
      border-radius: 50%;
    }
    div {
      margin-left: 24px;
      strong {
        font-size: 32px;
        color: #3d3d4d;
      }
      p {
        font-size: 18px;
        color: #737380;
        margin-top: 4px;
      }
    }
  }
  ul {
    display: flex;
    list-style: none;
    margin-top: 40px;
    li {
      & + li {
        margin-left: 80px;
      }
    }
    strong {
      display: block;
      font-size: 36px;
      color: #3d3d4d;
    }
    span {
      display: block;
      margin-top: 4px;
      color: #6c6c80;
    }
  }
`;

export const DeleteNoteButton = styled.button`
  width: 130px;
  margin-top: 16px;
  height: 40px;
  margin-left: 16px;
  background: #d32f2f;
  border-radius: 5px;
  border: 0;
  color: #fff;
  font-weight: bold;
  transition: background-color 0.2s;
  &:hover {
    background: ${shade(0.2, "#d32f2f")};
  }
`;
