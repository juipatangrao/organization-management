import http from "./http";

export const getOrganization = () =>
  http.get("/organization").then((res) => res.data.organization);

export const updateOrganization = (data) =>
  http.put("/organization", data).then((res) => res.data.organization);