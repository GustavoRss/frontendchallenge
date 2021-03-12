import React, { useState, useEffect, useCallback, useMemo } from "react";
import api from "../../services/api";
import "./styles.css";
import { Link } from "react-router-dom";
import Show from "../../components/Show";
import Modal from "../../components/Modal";
import ModalConfirm from "../../components/ModalConfirm";
import Delete from "../../components/Delete";
import Header from "../../components/Header";
import Edit from "../../pages/Edit";

// { Action tem essa estrutura
//   descricao: "listar" | "alterar" | "excluir",
//   id: //o id do naver
// }

const ListNavers = () => {
  const [navers, setNavers] = useState([]);
  const [action, setAction] = useState(undefined);
  //criar um estado com o tipo de acao

  const getUsers = useCallback(async () => {
    const { data } = await api.get("/navers?", {
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
      },
    });
    setNavers(data);
  }, []);

  useEffect(() => {
    getUsers();
  }, []);

  const handleDeleteUser = useCallback(() => {
    getUsers();
    setAction(undefined);
  }, []);

  const handleClickDelete = useCallback((id) => {
    setAction({
      action: "delete",
      id,
    });
  }, []);

  const handleClickShow = useCallback((id) => {
    setAction({
      action: "show",
      id,
    });
  }, []);

  const handleModalClose = useCallback((id) => {
    setAction(undefined);
  }, []);

  const handleChangeAction = useCallback((action) => {
    setAction(action);
  }, []);

  const renderEdit = (id) => {
    return <Edit id={id} />;
  };

  const listNavers = useMemo(() => {
    return (
      <div className="card-responsive">
        {navers.map((naver, key) => (
          <React.Fragment key={key}>
            <ul className="card-naver">
              <li
                className="img-naver"
                onClick={() => handleClickShow(naver.id)}
              >
                <img
                  onClick={() => handleClickShow(naver.id)}
                  src={naver.url}
                  alt=""
                />
              </li>
              <li className="name-naver" key={naver.id}>
                {naver.name}
              </li>
              <li className="job-naver">{naver.job_role}</li>
              <div
                style={{
                  display: "flex",
                  justifyContent: "start",
                  marginTop: "10px",
                  flexDirection: "row",
                }}
              >
                <li>
                  {" "}
                  <img
                    onClick={() => handleClickDelete(naver.id)}
                    src={require("../../img/delete.svg").default}
                    style={{
                      width: "20px",
                      marginRight: "10px",
                      cursor: "pointer",
                    }}
                  />
                </li>
                <li>
                  <Link to={`/edit/${naver.id}`}>
                    <img
                      onClick={renderEdit}
                      src={require("../../img/edit.svg").default}
                      style={{ width: "20px" }}
                    />
                  </Link>
                </li>
              </div>
            </ul>
          </React.Fragment>
        ))}
      </div>
    );
  }, [navers]);

  return (
    <>
      <Header />
      <Modal
        title="Exibir"
        open={action !== undefined && action.action === "show"}
        onClose={handleModalClose}
      >
        <Show
          id={action !== undefined && action.id}
          onChangeAction={handleChangeAction}
        />
      </Modal>
      <ModalConfirm
        title="Excluir"
        open={action !== undefined && action.action === "delete"}
        onClose={handleModalClose}
      >
        <Delete
          id={action !== undefined && action.id}
          onClickCancel={handleModalClose}
          onDelete={handleDeleteUser}
        />
      </ModalConfirm>
      <div className="list-navers">
        <div className="list-navers-create">
          <h1 className="title-navers">Navers</h1>
          <Link to={`/create`} className="link-create">
            Adicionar Naver
          </Link>
        </div>
        {listNavers}
      </div>
    </>
  );
};

export default ListNavers;
