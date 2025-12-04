export const saveSession = (session) => {
  localStorage.setItem("session", JSON.stringify(session));
};

export const getSession = () => {
  const data = localStorage.getItem("session");
  return data ? JSON.parse(data) : null;
};

export const clearSession = () => {
  localStorage.removeItem("session");
};
