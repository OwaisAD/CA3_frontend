const Button = ({ text, onClick }) => {
  return (
    <div className="login-container">
      <button className="glow-on-hover" onClick={onClick}>
        {text}
      </button>
    </div>
  );
};

export default Button;
