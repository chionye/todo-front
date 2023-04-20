/** @format */

import { Storage } from "../storage/Storage";
const API_URL = "https://todo-api-z3zf.onrender.com";

export const Api = (endpoint, payload, method) => {
  const token = Storage.get("user")
    ? JSON.parse(Storage.get("user"))
    : { accessToken: null };
  const options =
    payload != null
      ? {
          method: method,
          mode: "cors",
          cache: "no-cache",
          credentials: "same-origin",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "x-access-token": token.accessToken,
          },
          body: JSON.stringify(payload),
        }
      : {
          method: method,
          mode: "cors",
          cache: "no-cache",
          credentials: "same-origin",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "x-access-token": token.accessToken,
          }
        };
  return fetch(`${API_URL}${endpoint}`, options);
};
