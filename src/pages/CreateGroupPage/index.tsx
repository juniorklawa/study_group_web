import React, { FormEvent, useState } from "react";
import { FiChevronLeft } from "react-icons/fi";
import { Link, useHistory } from "react-router-dom";
import logoImg from "../../assets/logo.png";
import { IUser, useAuth } from "../../hooks/auth";
import api from "../../services/api";
import {
  Form,
  Header,
  InputTitle,
  RegisterInput,
  SubmitButton,
  Title,
} from "./styles";

const CreateGroupPage: React.FC = () => {
  const history = useHistory();
  const [groupName, setGroupName] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [link, setLink] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user, setUser } = useAuth();

  async function handleCreateGroup(
    event: FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();

    if (!groupName) {
      alert("Você precisa digitar o nome do grupo");
      return;
    }

    if (!subject) {
      alert("Você precisa digitar o nome de uma matéria");
      return;
    }

    if (!link) {
      alert("Você precisa digitar um link do grupo");
      return;
    }

    try {
      setIsLoading(true);
      const response = await api.post("group/add", {
        name: groupName,
        subject,
        whatsAppLink: link,
        creatorEmail: user.email,
      });
      const group = response.data;

      const updatedUser = { ...user, groupIds: [...user?.groupIds, group?.id] };

      console.log(updatedUser);
      setUser(updatedUser as IUser);
      history.push(`group/${group.id}`);
    } catch (err) {
      alert(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {isLoading ? (
        <Title>Carregando...</Title>
      ) : (
        <>
          <Header>
            <img alt="logo" src={logoImg}></img>
            <Link to="/dashboard">
              <FiChevronLeft size={16} />
              Voltar
            </Link>
          </Header>

          <Title>Criar grupo</Title>

          <Form onSubmit={handleCreateGroup}>
            <InputTitle>Nome do grupo</InputTitle>
            <RegisterInput
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="Digite o nome do grupo"
            />

            <InputTitle>Matéria</InputTitle>
            <RegisterInput
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Digite a matéria"
            />

            <InputTitle>Link do grupo no WhatsApp</InputTitle>
            <RegisterInput
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="Digite o link"
            />

            <SubmitButton type="submit">Criar grupo</SubmitButton>
          </Form>
        </>
      )}
    </>
  );
};

export default CreateGroupPage;
