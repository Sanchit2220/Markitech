import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

// Styled Components for Styling
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

  &.sign-up-mode::before {
    transform: translate(100%, -50%);
    right: 52%;
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
  left: 75%;
  transform: translate(-50%, -50%);
  width: 50%;
  transition: 1s 0.7s ease-in-out;
  display: grid;
  grid-template-columns: 1fr;
  z-index: 8;
`;

const SignUpFormWrapper = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 2rem;
  transition: all 0.2s 0.7s;
  overflow: hidden;
  grid-column: 1 / 2;
  grid-row: 1 / 2;
`;

const Title = styled.h2`
  font-size: 2.2rem;
  color: #444;
  margin-bottom: 10px;
`;

const InputField = styled.div`
  max-width: 380px;
  width: 100%;
  background-color: #f0f0f0;
  margin: 10px 0;
  height: 55px;
  border-radius: 55px;
  display: flex;
  align-items: center;
  padding: 0 0.4rem;
`;

const Input = styled.input`
  background: none;
  outline: none;
  border: none;
  flex: 1;
  font-size: 1.1rem;
  color: #333;
  padding-left: 10px;

  ::placeholder {
    color: #aaa;
    font-weight: 500;
  }
`;

const SubmitButton = styled.button`
  width: 150px;
  background-color: #5995fd;
  border: none;
  outline: none;
  height: 49px;
  border-radius: 49px;
  color: #fff;
  text-transform: uppercase;
  font-weight: 600;
  margin: 10px 0;
  cursor: pointer;
  transition: 0.5s;

  &:hover {
    background-color: #4d84e2;
  }
`;

const Message = styled.p`
  color: ${(props) => (props.type === "error" ? "red" : "green")};
  font-size: 0.9rem;
  margin-top: 10px;
`;

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!username || !email || !password || !confirmPassword) {
      setMessage({ text: "All fields are required!", type: "error" });
      return;
    }

    if (password !== confirmPassword) {
      setMessage({ text: "Passwords do not match!", type: "error" });
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/signup", {
        username,
        email,
        password,
      });

      setMessage({ text: response.data.message, type: "success" });

      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setMessage({
        text: err.response?.data?.message || "Signup failed",
        type: "error",
      });
    }
  };

  return (
    <Container>
      <FormsContainer>
        <SignInSignUpWrapper>
          <SignUpFormWrapper onSubmit={handleSignup}>
            <Title>Sign up</Title>

            <InputField>
              <Input
                type="text"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </InputField>

            <InputField>
              <Input
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </InputField>

            <InputField>
              <Input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </InputField>

            <InputField>
              <Input
                type="password"
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </InputField>

            <SubmitButton type="submit">Sign Up</SubmitButton>

            {message.text && <Message type={message.type}>{message.text}</Message>}
          </SignUpFormWrapper>
        </SignInSignUpWrapper>
      </FormsContainer>
    </Container>
  );
};

export default Signup;
