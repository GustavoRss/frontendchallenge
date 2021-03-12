import React, { useCallback } from "react";
import useListNaver from "../../hooks/useListNaver";
import api from "../../services/api";
import "./styles.css";

export default function Delete({ id, onClickCancel, onDelete }) {

  
  const deleteUser = useCallback(async () => {
    await api.delete(`/navers/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
      },
    });
    onDelete();
  }, [id]);

  const naver = useListNaver(id);

  return (
    <div className="delete-naver">
      {naver && (
        <div>
          <h1 style={{ marginBottom: "30px" }}>Excluir Naver</h1>
          <p>
            Tem certeza que deseja excluir o naver{" "}
            <strong> {naver.name} </strong>?
          </p>
          <div>
            <button onClick={onClickCancel} className="btn-cancel">
              Cancelar
            </button>
            <button onClick={() => deleteUser()} className="btn-delete">
              Excluir
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
