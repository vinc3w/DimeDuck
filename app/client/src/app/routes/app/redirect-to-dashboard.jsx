import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function RedirectToDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/dashboard", { replace: true });
  }, []);

  return <></>;
}

export default RedirectToDashboard;
