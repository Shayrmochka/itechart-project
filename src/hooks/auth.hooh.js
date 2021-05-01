import { useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getCurrentUser,
  hideLoader,
  removeCurrentUser,
  showLoader,
} from "../redux/actions";
import { useHttp } from "./http.hook";

const storageName = "userData";

export const useAuth = () => {
  const dispatch = useDispatch();

  const { request } = useHttp();

  const login = useCallback((jwtToken) => {
    localStorage.setItem(storageName, JSON.stringify({ token: jwtToken }));
  }, []);

  const logout = useCallback(() => {
    dispatch(removeCurrentUser());
    localStorage.removeItem(storageName);
  }, []);

  const checkRequest = async (data) => {
    dispatch(showLoader());
    try {
      const dataReq = await request("/api/auth/check", "POST", {
        data,
      });

      dispatch(getCurrentUser({ ...dataReq, token: data }));

      login(data);
      dispatch(hideLoader());
    } catch (e) {
      alert(e);
    }
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName));

    if (data && data.token) {
      checkRequest(data.token);
    }
  }, [login]);

  return { login, logout };
};
