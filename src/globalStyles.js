import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`

:root{
   --background: #eff7f9;
   --black:#0a0b10;
   --purple:#803bec;
   --pink:#e5a1f8;
   --white:#fff;
   --nav:#35353f;
   --nav2:#3f3d56;
}


*,*::before,*::after{
    margin:0;
    padding:0;
    box-sizing:border-box;
    font-family: 'Poppins', sans-serif;
}
html{
  ${"" /* overflow-y: scroll; */}
  scroll-behavior:smooth;
  
}
  
    body,
    html,
    a {
        font-family: 'Poppins', sans-serif;
            }
    body {

        margin:0;
        padding:0;
        border: 0;
        outline: 0;
        background: var(--background);

        overflow-x: hidden;
    }
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        margin:0;
        padding:0;
    }
    a {

        text-decoration: none;
        outline: none;
    }
    button{
        border:none;
        outline:none;
        &:focus{
            outline:none;
        }
    }

    *:focus {
        outline: none;
    }

    img,svg{
        width:100%;
        height:auto;
    }

/* width */
::-webkit-scrollbar {
  width: 6px;
 
 
 
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey;
  border-radius: 15px;
     margin: 18vw;
      padding: 20px; /* creates space between content and scrollbar */
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: black;
  border-radius: 10px;
}
`;

//  /* Colors */
