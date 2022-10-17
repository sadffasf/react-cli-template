import http from "src/utils/request";
export const getUserInfo = (config) =>
  http.get("/api/cUser/getCUserInfo/1", config);
