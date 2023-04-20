/** @format */

import { Storage } from "../storage/Storage";
import { redirect } from "react-router-dom";

export const Auth = async () => {
  const user = JSON.parse(Storage.get("user"));
  if (!user) {
    throw redirect("/login");
  }
};
