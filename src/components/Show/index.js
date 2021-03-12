import React, { useCallback } from "react";
import useListNaver from "../../hooks/useListNaver";
import "./styles.css";
import deleteIcon from "../../img/delete.svg";
import { Link } from "react-router-dom";

export default function Show({ id, onChangeAction }) {
  const naver = useListNaver(id);

  const handleDeleteNaver = useCallback(() => {
    onChangeAction({
      id,
      action: "delete",
    });
  }, [onChangeAction, id]);

  function getAge(valor) {
    var x = valor.split("T")[0];
    var today = new Date();
    var birthDate = new Date(x);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  return (
    <div style={{ height: "100%" }}>
      {naver && (
        <div className="naver-overview">
          <div>
            <img src={naver.url} />
          </div>
          <div>
            <h1>{naver.name}</h1>
            <h3 style={{ fontWeight: 300, marginBottom: "30px" }}>
              {naver.job_role}
            </h3>
            <h4 style={{ fontWeight: 600 }}>Idade</h4>
            {getAge(naver.birthdate) > 0 ? (
              <p>{getAge(naver.birthdate)} anos de idade</p>
            ) : (
              <p>A idade do naver está inválida</p>
            )}
            <h4 style={{ fontWeight: 600 }}>Tempo de empresa</h4>
            {getAge(naver.admission_date) > 0 ? (
              <p>{getAge(naver.admission_date)} anos</p>
            ) : (
              <p>Alguns meses de empresa</p>
            )}
            <h4 style={{ fontWeight: 600 }}>Projetos que participou</h4>
            <p>{naver.project}</p>

            <img
              onClick={handleDeleteNaver}
              src={deleteIcon}
              style={{
                width: "20px",
                marginRight: "10px",
                cursor: "pointer",
              }}
            />

            <Link to={`/edit/${naver.id}`}>
              <img
                src={require("../../img/edit.svg").default}
                style={{ width: "20px", minHeight: "unset" }}
              />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
