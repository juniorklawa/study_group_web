import React, { useEffect, useState } from "react";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { Link } from "react-router-dom";
import logoImg from "../../assets/logo.png";
import { useAuth } from "../../hooks/auth";
import api from "../../services/api";
import { Groups, Title, Header } from "./styles";

interface IGroup {
  name: string;
  subject: string;
  id: string;
}

const Dashboard: React.FC = () => {
  const [groups, setGroups] = useState<IGroup[]>([]);
  const { user } = useAuth();

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
        <Link to="/">
          <FiChevronLeft size={16} />
          Sair
        </Link>
      </Header>

      <Title>Seja bem-vindo {user.name}</Title>

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

export default Dashboard;
