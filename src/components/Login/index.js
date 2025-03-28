import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

// Styled Components (NO CHANGES HERE)
const Container = styled.div`
  position: relative;
  width: 100%;
  background-color: #fff;
  min-height: 100vh;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    height: 2000px;
    width: 2000px;
    top: -10%;
    right: 48%;
    transform: translateY(-50%);
    background-image: linear-gradient(-45deg, #4481eb 0%, #04befe 100%);
    transition: 1.8s ease-in-out;
    border-radius: 50%;
    z-index: 6;
  }
`;

const FormsContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
`;

const SignInSignUpWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40%;
  transition: 1s 0.7s ease-in-out;
  display: grid;
  z-index: 8;

  @media (max-width: 870px) {
    width: 80%;
  }
`;

const SignInFormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background: white;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  font-size: 2rem;
  color: #444;
  margin-bottom: 15px;
`;

const InputField = styled.div`
  width: 100%;
  background-color: #f0f0f0;
  margin: 10px 0;
  height: 50px;
  border-radius: 25px;
  display: flex;
  align-items: center;
  padding: 0 1rem;
  position: relative;
`;

const Input = styled.input`
  flex: 1;
  background: none;
  border: none;
  outline: none;
  font-size: 1rem;
  color: #333;
  padding-left: 10px;

  ::placeholder {
    color: #aaa;
    font-weight: 500;
  }
`;

const TogglePassword = styled.span`
  cursor: pointer;
  position: absolute;
  right: 15px;
  color: #666;
  font-size: 1rem;
  user-select: none;
`;

const SubmitButton = styled.button`
  width: 150px;
  background-color: #5995fd;
  border: none;
  outline: none;
  height: 45px;
  border-radius: 25px;
  color: white;
  text-transform: uppercase;
  font-weight: 600;
  margin: 15px 0;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: #4d84e2;
  }
`;

const Message = styled.p`
  color: ${(props) => (props.error ? "red" : "green")};
  font-size: 0.9rem;
  text-align: center;
`;

const Login = () => {
  const [username, setUsername] = useState(""); 
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState({ text: "", error: false });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage({ text: "", error: false });
    setLoading(true);

    if (!username || !password) {
      setMessage({ text: "Please enter username and password", error: true });
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        username, // Now sending username instead of email
        password,
      });

      localStorage.setItem("user", JSON.stringify(response.data.user));
      setMessage({ text: "Login successful! Redirecting...", error: false });

      setTimeout(() => navigate("/admin"), 1500);
    } catch (error) {
      setMessage({
        text: error.response?.data?.message || "Login failed",
        error: true,
      });
    }

    setLoading(false);
  };

  return (
    <Container>
      <FormsContainer>
        <SignInSignUpWrapper>
          <SignInFormWrapper onSubmit={handleLogin}>
            <Title>Sign In</Title>

            <InputField>
              <Input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </InputField>

            <InputField>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <TogglePassword onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? "🙈" : "👁️"}
              </TogglePassword>
            </InputField>

            <SubmitButton type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </SubmitButton>

            {message.text && <Message error={message.error}>{message.text}</Message>}
          </SignInFormWrapper>
        </SignInSignUpWrapper>
      </FormsContainer>
    </Container>
  );
};

export default Login;
