import { useCallback, useEffect, useState } from "react";
import api from "../services/api";

export default function useListNaver(id) {
  const [naver, setNaver] = useState(undefined);

  const list = useCallback(async () => {
    const naver = await api.get(`/navers/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
      },
    });
    if (naver.data) {
      setNaver(naver.data);
    }
  }, [id]);
  useEffect(() => {
    if (id) {
      list();
    }
  }, [id]);

  return naver;
}
