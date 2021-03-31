import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createBook } from "../actions/productActions";

const CreateBookScreen = (props) => {
  //   const [password, setPassword] = useState("");
  //   const [username, setUsername] = useState("");
  //   const userSignin = useSelector((state) => state.userSignin);
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [publishedDate, setPublishedDate] = useState(Date.now());
  const [image, setImage] = useState("");
  const [price, setPrice] = useState(0);
  const [oldPrice, setOldPrice] = useState(0);
  const [author, setAuthor] = useState("");
  const [publisher, setPublisher] = useState("");
  const [description, setDescription] = useState("");

  //   const redirect = props.location.search
  //     ? props.location.search.split("=")[1]
  //     : "/";

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createBook(
        title,
        genre,
        publishedDate,
        image,
        price,
        oldPrice,
        author,
        publisher,
        description,
        userInfo
      )
    );
  };

  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Create book</h1>
        </div>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            placeholder="Enter title"
            required
            onChange={(e) => setTitle(e.target.value)}
          ></input>
          <label htmlFor="genre">Genre</label>
          <input
            type="text"
            id="genre"
            placeholder="Enter genre"
            required
            onChange={(e) => setGenre(e.target.value)}
          ></input>
          <label htmlFor="publishedDate">publishedDate</label>
          <input
            type="date"
            id="publishedDate"
            placeholder="Enter published date"
            required
            onChange={(e) => setPublishedDate(e.target.value)}
          ></input>
          <label htmlFor="image">image</label>
          <textarea
            type="text"
            id="image"
            placeholder="Enter image"
            required
            onChange={(e) => setImage(e.target.value)}
          ></textarea>
          <label htmlFor="price">price</label>
          <input
            type="number"
            id="price"
            placeholder="Enter price"
            required
            onChange={(e) => setPrice(e.target.value)}
          ></input>
          <label htmlFor="oldPrice">oldPrice</label>
          <input
            type="number"
            id="oldPrice"
            placeholder="Enter oldPrice"
            required
            onChange={(e) => setOldPrice(e.target.value)}
          ></input>
          <label htmlFor="author">author</label>
          <input
            type="text"
            id="author"
            placeholder="Enter author"
            required
            onChange={(e) => setAuthor(e.target.value)}
          ></input>
          <label htmlFor="publisher">publisher</label>
          <input
            type="text"
            id="publisher"
            placeholder="Enter publisher"
            required
            onChange={(e) => setPublisher(e.target.value)}
          ></input>
          <label htmlFor="description">description</label>
          <textarea
            type="text"
            id="description"
            placeholder="Enter description"
            required
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          ></textarea>
        </div>
        <div>
          <label />
          <button className="primary" type="submit">
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateBookScreen;
