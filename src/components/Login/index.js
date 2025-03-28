import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

// Styled Components
const Container = styled.div`
  position: relative;
  width: 100%;
  background-color: #fff;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background: white;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  width: 350px;
`;

const Title = styled.h2`
  font-size: 2rem;
  color: #444;
  margin-bottom: 15px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
  border: 1px solid #ddd;
`;

const Button = styled.button`
  width: 100%;
  background-color: #5995fd;
  border: none;
  height: 45px;
  border-radius: 5px;
  color: white;
  text-transform: uppercase;
  font-weight: 600;
  cursor: pointer;
  margin-top: 10px;
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
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/admin"); // Redirect if already logged in
    }
  }, [navigate]);

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
        username,
        password,
      });

      localStorage.setItem("token", response.data.token);
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
      <FormWrapper onSubmit={handleLogin}>
        <Title>Sign In</Title>
        <Input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </Button>
        {message.text && <Message error={message.error}>{message.text}</Message>}
      </FormWrapper>
    </Container>
  );
};

export default Login;
