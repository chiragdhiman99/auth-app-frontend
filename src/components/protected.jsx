import { Navigate } from "react-router";

const protected2 = ({ children }) => {
  const token = localStorage.getItem("token");
  const params = new URLSearchParams(window.location.search);
  const uritokens = params.get("token");
  if (!token && !uritokens) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default protected2;
