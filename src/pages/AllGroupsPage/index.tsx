import React, { useEffect, useState } from "react";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { BiGroup } from "react-icons/bi";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import logoImg from "../../assets/logo.png";
import api from "../../services/api";
import { Groups, Header, Title } from "./styles";

interface IGroup {
  name: string;
  subject: string;
  id: string;
}

const AllGroups: React.FC = () => {
  const [groups, setGroups] = useState<IGroup[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get(`group`);
        const groups = response.data;

        setGroups(groups);
      } catch (err) {
        console.error(err);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <Header>
        <img alt="logo" src={logoImg}></img>

        <Link to="/dashboard">
          <BiGroup color="#e53935" size={20} />
          Início
        </Link>

        <Link to="/">
          <AiOutlineUsergroupAdd color="#e53935" size={20} />
          Criar grupo
        </Link>

        <Link to="/">
          <FiChevronLeft size={20} />
          Sair
        </Link>
      </Header>

      <Title>Todos os grupos</Title>

      <Groups>
        {groups.map((repository) => (
          <Link key={repository.name} to={`/group/${repository.id}`}>
            <img
              src={`https://ui-avatars.com/api/?background=random&name=${repository.name}`}
              alt={"group-cover"}
            ></img>
            <div>
              <strong>{repository.name}</strong>
              <p>{repository.subject}</p>
            </div>
            <FiChevronRight size={20} />
          </Link>
        ))}
      </Groups>
    </>
  );
};

export default AllGroups;
