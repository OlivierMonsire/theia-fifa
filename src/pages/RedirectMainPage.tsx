import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RedirectMainPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/round-robin");
  }, [navigate]);
  return null;
};

export default RedirectMainPage;
