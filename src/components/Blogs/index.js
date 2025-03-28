import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

// Styled Components
const PageHeader = styled.section`
  text-align: center;
  padding: 50px;
  color: white;
  background-image: url(${require("../../assets/b19.jpg")});
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100%;
`;

const BlogSection = styled.section`
  padding: 80px 10%;
`;

const BlogBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-bottom: 50px;
  border-bottom: 1px solid #ddd;
  margin-bottom: 40px;
`;

const BlogImage = styled.div`
  width: 100%;
  max-width: 800px;
  img {
    width: 100%;
    height: auto;
    object-fit: cover;
    border-radius: 10px;
  }
`;

const BlogDetails = styled.div`
  width: 100%;
  max-width: 800px;
  text-align: left;

  h4 {
    font-size: 22px;
    font-weight: bold;
    margin: 10px 0;
  }

  p {
    font-size: 16px;
    color: #555;
    line-height: 1.6;
    text-align: justify;
    white-space: pre-line;
  }

  a {
    display: inline-block;
    margin-top: 10px;
    text-decoration: none;
    font-size: 14px;
    color: #008178;
    font-weight: 700;
    transition: 0.3s;
    cursor: pointer;
  }

  a:hover {
    color: #005f5b;
  }
`;

const BlogDate = styled.h1`
  font-size: 50px;
  font-weight: 700;
  color: #c9cbce;
  margin-top: -20px;
`;

// **Blog Post Component**
const BlogPost = ({ post }) => {
  const [readMore, setReadMore] = useState(false);
  const previewText = post.description.split(" ").slice(0, 50).join(" ") + "...";

  return (
    <BlogBox>
      <BlogImage>
        <img src={post.image || "https://via.placeholder.com/800"} alt={post.title} />
      </BlogImage>
      <BlogDetails>
        <h4>{post.title}</h4>
        <p>{readMore ? post.description : previewText}</p>
        <a onClick={() => setReadMore(!readMore)}>
          {readMore ? "Show Less" : "Continue Reading"}
        </a>
      </BlogDetails>
      <BlogDate>{post.date}</BlogDate>
    </BlogBox>
  );
};

// **Main Blog Component**
const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch blogs from MongoDB API using Axios
  useEffect(() => {
    axios
      .get("http://localhost:3000/get-blogs")
      .then((response) => {
        console.log("Fetched Blogs:", response.data); // Debugging
        setBlogs(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("❌ Error fetching blogs:", error);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <PageHeader>
        <h1>Blog</h1>
      </PageHeader>
      <BlogSection>
        {loading ? (
          <p>Loading blog posts...</p>
        ) : blogs.length > 0 ? (
          blogs.map((post) => <BlogPost key={post._id} post={post} />)
        ) : (
          <p>No blog posts found.</p>
        )}
      </BlogSection>
    </>
  );
};

export default Blog;
