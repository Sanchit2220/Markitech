import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";

 

// Container wrapper

const Container = styled.div`

  position: relative;

  width: 100%;

  background-color: #fff;

  min-height: 100vh;

  overflow: hidden;

 

  // ::before pseudo-element for the blue color gradient

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

 

  // If in sign-up mode, the blue background moves

  &.sign-up-mode::before {

    transform: translate(100%, -50%);

    right: 52%;

  }

 

  @media (max-width: 870px) {

    &::before {

      // Adjust the gradient positioning for smaller screens

      top: -30%;

      right: 40%;

      width: 1500px;

      height: 1500px;

    }

  }

 

  @media (max-width: 570px) {

    &::before {

      top: -50%;

      right: 35%;

      width: 1200px;

      height: 1200px;

    }

  }

`;

 

// Forms container

const FormsContainer = styled.div`

  position: absolute;

  width: 100%;

  height: 100%;

  top: 0;

  left: 0;

`;

 

// Wrapper for SignIn/SignUp forms

const SignInSignUpWrapper = styled.div`

  position: absolute;

  top: 50%;

  transform: translate(-50%, -50%);

  left: 75%;

  width: 50%;

  transition: 1s 0.7s ease-in-out;

  display: grid;

  grid-template-columns: 1fr;

  z-index: 8;

 

  @media (max-width: 870px) {

    width: 80%;

    left: 50%;

    top: 40%;

    transform: translate(-50%, -40%);

  }

 

  @media (max-width: 570px) {

    top: 30%;

    width: 90%;

  }

`;

 

// SignIn form styling

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

 

  @media (max-width: 570px) {

    padding: 1rem;

  }

`;

 

const Title = styled.h2`

  font-size: 2.2rem;

  color: #444;

  margin-bottom: 10px;

 

  @media (max-width: 570px) {

    font-size: 1.8rem;

  }

`;

 

// Input field container

const InputField = styled.div`

  max-width: 380px;

  width: 100%;

  background-color: #f0f0f0;

  margin: 10px 0;

  height: 55px;

  border-radius: 55px;

  display: grid;

  grid-template-columns: 15% 85%;

  padding: 0 0.4rem;

  position: relative;

 

  @media (max-width: 570px) {

    max-width: 90%;

  }

`;

 

const InputIcon = styled.i`

  text-align: center;

  line-height: 55px;

  color: #acacac;

  transition: 0.5s;

  font-size: 1.1rem;

`;

 

const Input = styled.input`

  background: none;

  outline: none;

  border: none;

  line-height: 1;

  font-weight: 600;

  font-size: 1.1rem;

  color: #333;

  padding-left: 10px;

 

  ::placeholder {

    color: #aaa;

    font-weight: 500;

  }

`;

 

// Submit Button

const SubmitButton = styled.input`

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

 

  @media (max-width: 570px) {

    width: 120px;

    height: 45px;

  }

`;


const Signup = () => {
const [username ,setUsername] = useState('');
const [password ,setPassword] = useState('');
const [email ,setEmail] = useState('');

const navigate = useNavigate();
const handleLogin = ()=>{
    if(username === "admin" && password === "12345678" && email === "vineet@gmail.com"){
        console.log("valid user");
        navigate('/admin');
    }
}
 
  return (

    <Container>

      <FormsContainer>

        <SignInSignUpWrapper>

          <SignUpFormWrapper className="sign-up-form">

            <Title>Sign up</Title>

            <InputField>

              <InputIcon className="fas fa-user"></InputIcon>

              <Input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />

            </InputField>
            <InputField>

<InputIcon className="fas fa-email"></InputIcon>

<Input type="text" placeholder="email" onChange={(e) => setEmail(e.target.value)} />

</InputField>

            <InputField>

              <InputIcon className="fas fa-lock"></InputIcon>

              <Input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />

            </InputField>

            <SubmitButton type="submit" value="Login" className="btn solid" onClick={handleLogin}/>

          </SignUpFormWrapper>

        </SignInSignUpWrapper>

      </FormsContainer>

    </Container>

  );

};

 

export default Signup;

