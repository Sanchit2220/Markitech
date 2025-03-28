import React, { useState, useRef } from "react";

import styled from "styled-components";
import JoditEditor from 'jodit-react';

const FullScreenContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f4f4f4;
  padding: 2rem;
`;

const FormWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background: white;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 1.5rem;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 1rem;
`;

const Label = styled.label`
  font-weight: bold;
  margin-top: 1rem;
`;

const Row = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const HalfWidthInput = styled.input`
  flex: 1;
  min-width: 25%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
`;

const EditorContainer = styled.div`
  flex-grow: 1;
  width: 100%;
  background: #fff;
  border: 1px solid #ccc;
  padding: 10px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const StyledButton = styled.button`
  background-color:rgb(255, 42, 0);
  color: white;
  padding: 1rem;
  font-size: 1.2rem;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  margin-top: 1rem;
  width: 30%;
  align-self: center;

  &:hover {
    background-color: #0056b3;
  }
`;

const AddBlog = () => {
  const [formData, setFormData] = useState({
    title: "",
    seoUrl: "",
    metaTitle: "",
    metaDescription: "",
    header: "",
    footer: "",
    publishedBy: "",
    content: "",
    image: null,
  });
  const editor = useRef(null);
  const [content, setContent] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    console.log("Editor Data: ", data);
    setFormData({ ...formData, content: data });
  };

  const handleImageUpload = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
  };

  return (
    <FullScreenContainer>
      <FormWrapper>
        <Title>ADD NEW BLOG</Title>
        <StyledForm onSubmit={handleSubmit}>
          <Row>
            <HalfWidthInput type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} />
            <HalfWidthInput type="text" name="seoUrl" placeholder="SEO URL" value={formData.seoUrl} onChange={handleChange} />
          </Row>
          <Row>
            <HalfWidthInput type="text" name="metaTitle" placeholder="Meta Title" value={formData.metaTitle} onChange={handleChange} />
            <HalfWidthInput type="text" name="metaDescription" placeholder="Meta Description" value={formData.metaDescription} onChange={handleChange} />
          </Row>
          <Row>
            <HalfWidthInput type="text" name="header" placeholder="Header Section" value={formData.header} onChange={handleChange} />
            <HalfWidthInput type="text" name="footer" placeholder="Footer Section" value={formData.footer} onChange={handleChange} />
          </Row>
          <Row>
            <HalfWidthInput type="text" name="publishedBy" placeholder="Published By" value={formData.publishedBy} onChange={handleChange} />
          </Row>

          <Label>Image Upload:</Label>
          <input type="file" accept="image/*" onChange={handleImageUpload} />

          <Label>Content:</Label>
          <EditorContainer>
            <JoditEditor 
              ref={editor}
              value={content}
              config={{ minHeight: 400 }} // Adjust height as needed
              tabIndex={1}
              onBlur={newContent => setContent(newContent)}
              onChange={newContent => {}}
            />
          </EditorContainer>

          <StyledButton type="submit">Submit</StyledButton>
        </StyledForm>
      </FormWrapper>
    </FullScreenContainer>
  );
};

export default AddBlog;
