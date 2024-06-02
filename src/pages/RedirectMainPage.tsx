import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RedirectMainPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/ranking");
  }, [navigate]);
  return null;
};

export default RedirectMainPage;
