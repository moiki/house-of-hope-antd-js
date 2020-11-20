export const logout = (history) => {
  localStorage.clear();
  history.push("/auth/login");
};

export const login = (token, history) => {
  localStorage.clear();
  localStorage.setItem("refreshToken", token.refreshToken);
  localStorage.setItem("accessToken", token.accessToken);
  history.push("/admin/dashboard");
};
