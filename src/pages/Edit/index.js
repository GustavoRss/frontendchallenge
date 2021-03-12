import React, { useCallback, useState } from "react";
import { useHistory, useParams } from "react-router";
import useListNaver from "../../hooks/useListNaver";
import Header from "../../components/Header";
import "./styles.css";
import MaskedInput from "react-text-mask";

import api from "../../services/api";
import ModalConfirm from "../../components/ModalConfirm";

const Edit = () => {
  const { id } = useParams();
  const history = useHistory();
  const naver = useListNaver(id);
  const [user, setUser] = useState("");
  const [error, setError] = useState("");
  const [action, setAction] = useState(undefined);

  const submitForm = useCallback(
    async (e) => {
      e.preventDefault();

      try {
        await api.put(`/navers/${id}`, user, {
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
          },
        });

        setError("");
        handleClickEdit();
      } catch (err) {
        console.log(err);
        setError("Você deve preencher todos os dados");
      }
    },
    [user]
  );

  const handleBack = useCallback(() => {
    history.goBack();
  }, []);

  const handleClickEdit = useCallback((id) => {
    setAction({
      action: "edit",
      id,
    });
  }, []);

  const handleModalClose = useCallback((id) => {
    setAction(undefined);
    history.push("/list");
  }, []);

  return (
    <div>
      <Header />
      {naver && (
        <div className="container">
            <div className="page-title" onClick={() => handleBack()}>
            <img
            src={require("../../img/left-arrow.svg").default}
            width={"20px"} />
          <h1>Editar Naver</h1>
          
          </div>
          <form style={{ border: "unset" }}>
            <div className="naver-informations">
              {error != "" ? (
                <div
                  className="error"
                  style={{ position: "absolute", top: "-40px" }}
                >
                  {error}
                </div>
              ) : (
                ""
              )}
              <div className="col-1">
                <label>Nome</label>

                <input
                  placeholder="Nome"
                  type="text"
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                />
                <label>Idade</label>
                <MaskedInput
                  placeholder="Data de nascimento"
                  mask={[
                    /\d/,
                    /\d/,
                    "/",
                    /\d/,
                    /\d/,
                    "/",
                    /\d/,
                    /\d/,
                    /\d/,
                    /\d/,
                  ]}
                  type="text"
                  onChange={(e) =>
                    setUser({ ...user, birthdate: e.target.value })
                  }
                />
                <label>Projetos que participou</label>

                <input
                  placeholder="Projetos que participou"
                  type="text"
                  onChange={(e) =>
                    setUser({ ...user, project: e.target.value })
                  }
                />
              </div>
              <div className="col-2">
                <label>Cargo</label>
                <input
                  placeholder="Cargo"
                  type="text"
                  onChange={(e) =>
                    setUser({ ...user, job_role: e.target.value })
                  }
                />

                <label>Tempo de empresa</label>
                <MaskedInput
                  mask={[
                    /\d/,
                    /\d/,
                    "/",
                    /\d/,
                    /\d/,
                    "/",
                    /\d/,
                    /\d/,
                    /\d/,
                    /\d/,
                  ]}
                  placeholder="Tempo de empresa"
                  type="text"
                  onChange={(e) =>
                    setUser({ ...user, admission_date: e.target.value })
                  }
                />
                <label>URL da foto do Naver</label>

                <input
                  placeholder="URL da foto do Naver"
                  type="text"
                  placeholder={naver.url}
                  onChange={(e) => setUser({ ...user, url: e.target.value })}
                />

                <button
                  className="btn-submit"
                  type="submit"
                  onClick={submitForm}
                >
                  Salvar
                </button>

                <ModalConfirm
                  title="Excluir"
                  open={action !== undefined && action.action === "edit"}
                  onClose={handleModalClose}
                >
                  <div style={{ padding: "20px" }}>
                    <h1 style={{ margin: "30px 10px" }}>Naver Atualizado</h1>
                    <p style={{ margin: "10px" }}>Naver atualizado com sucesso!</p>
                  </div>
                </ModalConfirm>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Edit;
