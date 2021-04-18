import React, { useEffect, useState } from "react";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { BiGroup } from "react-icons/bi";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { Link } from "react-router-dom";
import logoImg from "../../assets/logo.png";
import { useAuth } from "../../hooks/auth";
import api from "../../services/api";
import { getFirstName } from "../../utils/getFirstName";
import { Groups, Title, Header, MyGroups, EmptyGroups } from "./styles";

interface IGroup {
  name: string;
  subject: string;
  id: string;
}

const Dashboard: React.FC = () => {
  const [groups, setGroups] = useState<IGroup[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user } = useAuth();

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        for await (const groupId of user.groupIds) {
          const { data } = await api.get(`group/${groupId}`);
          setGroups((prevState) => [...prevState, data]);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [user]);

  if (isLoading) {
    return <h1>Carregando...</h1>;
  }

  return (
    <>
      <Header>
        <img alt="logo" src={logoImg}></img>

        <Link to="/all-groups">
          <BiGroup color="#e53935" size={20} />
          Todos os grupos
        </Link>

        <Link to="/create-group">
          <AiOutlineUsergroupAdd color="#e53935" size={20} />
          Criar grupo
        </Link>

        <Link to="/">
          <FiChevronLeft size={20} />
          Sair
        </Link>
      </Header>

      <Title>Seja bem-vindo, {getFirstName(user.name)}.</Title>

      <MyGroups>Meus grupos</MyGroups>
      {groups.length > 0 ? (
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
      ) : (
        <EmptyGroups>
          Você ainda não tem nenhum grupo, que tal entrar em um?
        </EmptyGroups>
      )}
    </>
  );
};

export default Dashboard;
