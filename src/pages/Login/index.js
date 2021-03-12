import React, { useState } from "react";
import "./styles.css";
import api from "../../services/api";

import { useHistory } from "react-router-dom";

const Login = (props) => {
  const [error, setError] = useState("");
  const [details, setDetails] = useState("");
  const history = useHistory();

  const submitForm = async (e) => {
    e.preventDefault();

    if (!details) {
      setError("E-mail ou senha inválidos");
    }

    try {
      const { data } = await api.post("/users/login", details);

      if (data.token) {
        localStorage.setItem("token", data.token);
        history.push('/list')
        setError(" ");
      }
      
    } catch (err) {
      setError("E-mail ou senha inválidos");
      console.log(err);
    }
  };

  return (
    <div className="form">
      <form>
        <div className="form-inner">
          <img src={require("../../img/logo.png").default} alt="descrição" />
          {error != "" ? <div className="error">{error}</div> : ""}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              placeholder="E-mail"
              type="email"
              name="email"
              id="email"
              onChange={(e) =>
                setDetails({ ...details, email: e.target.value })
              }
              value={details.email}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input
            placeholder="Senha"
              type="password"
              name="password"
              id="password"
              onChange={(e) =>
                setDetails({ ...details, password: e.target.value })
              }
              value={details.password}
            />
          </div>
          <button type="submit" onClick={submitForm}>Entrar</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
