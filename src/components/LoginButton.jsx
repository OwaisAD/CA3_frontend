import { useNavigate } from "react-router-dom";

const Login = ({ setCreateAccountClicked }) => {
  const navigate = useNavigate();

  return (
    <div className="login-container">
      <button
        className="glow-on-hover"
        onClick={() => {
          setCreateAccountClicked(false);
          navigate("login");
        }}
      >
        Login
      </button>
    </div>
  );
};

export default Login;
