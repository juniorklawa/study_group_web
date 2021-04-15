import React, { FormEvent, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import logoImg from "../../assets/logo.png";
import { useAuth } from "../../hooks/auth";
import api from "../../services/api";
import { Error, Form, LoginText, Title } from "./styles";

const LoginPage: React.FC = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [inputError, setInputError] = useState("");
  const { setUser } = useAuth();

  async function handleLogin(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();

    if (!email) {
      setInputError("Você precisa digitar um e-mail");
      return;
    }

    try {
      const response = await api.post(`auth`, { email });
      const user = response.data;

      console.log("user", user);

      setUser(user);

      history.push("/dashboard");
      setEmail("");
      setInputError("");
    } catch (err) {
      setInputError("Esse e-mail não está cadastrado");
    }
  }
  return (
    <>
      <img src={logoImg} alt="Easy Meet Logo" />
      <Title>Encontre e crie grupos de estudos em um só lugar</Title>

      <LoginText>Fazer login</LoginText>
      <Form hasError={!!inputError} onSubmit={handleLogin}>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Digite seu e-mail"
        />
        <button type="submit">Entrar</button>
      </Form>
      {inputError && <Error>{inputError}</Error>}
      <div style={{ marginTop: 32 }}>
        <Link to="/register">Não tem login? clique aqui para se registrar</Link>
      </div>
    </>
  );
};

export default LoginPage;
