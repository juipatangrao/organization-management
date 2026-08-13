import http from "./http";

// Departments
export const getDepartments = () =>
  http.get("/departments").then((res) => res.data); // { count, departments }

export const getMyDepartments = () =>
  http.get("/departments/my").then((res) => res.data.departments);

export const getDepartmentById = (id) =>
  http.get(`/departments/${id}`).then((res) => res.data); // { department, statistics }

export const createDepartment = (data) =>
  http.post("/departments", data).then((res) => res.data);

export const updateDepartment = (id, data) =>
  http.put(`/departments/${id}`, data).then((res) => res.data);

export const deleteDepartment = (id) =>
  http.delete(`/departments/${id}`).then((res) => res.data);

// Dashboard
export const getDashboardStats = () =>
  http.get("/dashboard/stats").then((res) => res.data); // { stats: {...} }

// Members
export const getDepartmentMembers = (id) =>
  http.get(`/departments/${id}/members`).then((res) => res.data.members); // array directly

export const addDepartmentMember = (id, data) =>
  http.post(`/departments/${id}/members`, data).then((res) => res.data);

export const updateDepartmentMember = (id, userId, data) =>
  http.put(`/departments/${id}/members/${userId}`, data).then((res) => res.data);

export const removeDepartmentMember = (id, userId) =>
  http.delete(`/departments/${id}/members/${userId}`).then((res) => res.data);

// Teams
export const getDepartmentTeams = (id) =>
  http.get(`/departments/${id}/teams`).then((res) => res.data.teams); // array directly

export const getDepartmentTeamById = (id, teamId) =>
  http.get(`/departments/${id}/teams/${teamId}`).then((res) => res.data);

export const createDepartmentTeam = (id, data) =>
  http.post(`/departments/${id}/teams`, data).then((res) => res.data);

export const updateDepartmentTeam = (id, teamId, data) =>
  http.put(`/departments/${id}/teams/${teamId}`, data).then((res) => res.data);

export const deleteDepartmentTeam = (id, teamId) =>
  http.delete(`/departments/${id}/teams/${teamId}`).then((res) => res.data);

// Audit logs
export const getDepartmentAuditLogs = (id) =>
  http.get(`/departments/${id}/audit-logs`).then((res) => res.data); // { logs, count, page, totalPages }