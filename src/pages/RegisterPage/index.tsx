import React, { FormEvent, useState } from "react";
import { FiChevronLeft } from "react-icons/fi";
import { Link, useHistory } from "react-router-dom";
import logoImg from "../../assets/logo.png";
import api from "../../services/api";
import {
  Form,
  Header,
  InputTitle,
  RegisterInput,
  SubmitButton,
  Title,
} from "./styles";

const RegisterPage: React.FC = () => {
  const history = useHistory();
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [ra, setRA] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function handleRegister(
    event: FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();

    if (!name) {
      alert("Você precisa digitar um nome");
      return;
    }

    if (!email) {
      alert("Você precisa digitar um e-mail");
      return;
    }

    if (!ra) {
      alert("Você precisa digitar um RA");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      alert("Você precisa digitar um e-mail válido");
      return;
    }

    try {
      setIsLoading(true);
      const response = await api.post("student/add", { name, email, ra });
      const user = response.data;

      console.log("user", user);

      history.push("/dashboard");
      setEmail("");
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

          <Title>Registrar-se</Title>

          <Form onSubmit={handleRegister}>
            <InputTitle>Nome</InputTitle>
            <RegisterInput
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Digite seu nome"
            />

            <InputTitle>E-mail</InputTitle>
            <RegisterInput
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu e-mail"
            />

            <InputTitle>RA</InputTitle>
            <RegisterInput
              value={ra}
              onChange={(e) => setRA(e.target.value)}
              placeholder="Digite seu RA"
            />

            <SubmitButton type="submit">Criar conta</SubmitButton>
          </Form>
        </>
      )}
    </>
  );
};

export default RegisterPage;
