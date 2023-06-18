import React, { useState } from "react";
import { graphql } from "react-apollo";
import {
  getAuthorsQuery,
  addBookMutation,
  getBooksQuery
} from "../queries/queries.js";
import { flowRight as compose } from "lodash";
const AddBookComponent = (props) => {
  //  console.log(props)
  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [authorId, setAuthorId] = useState("");
  function displayAuthors() {
    var data = props.getAuthorsQuery;
    if (data.loading) {
      return <option>Loading authors...</option>;
    } else {
      return data.authors.map((author, idx) => {
        return (
          <option key={idx} value={author.id}>
            {author.name}
          </option>
        );
      });
    }
  }

  function submit(e) {
    e.preventDefault();
    /* console.log(name);
    console.log(genre);
    console.log(authorId); */
    props.addBookMutation({
      variables: {
        name,
        genre,
        authorId
      },
      refreshQueries: [{ query: getBooksQuery }]
    });
  }

  return (
    <form id="add-book-form" onSubmit={submit}>
      <div className="field">
        <label> Book name </label>
        <input
          required
          type="text"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </div>
      <div className="field">
        <label> Book genre </label>
        <input
          required
          type="text"
          onChange={(e) => {
            setGenre(e.target.value);
          }}
        />
      </div>
      <div className="field">
        <label> Author </label>
        <select
          required
          onChange={(e) => {
            setAuthorId(e.target.value);
            /* console.log("hey"); */
          }}
        >
          <option>Select author</option>
          {displayAuthors()}
        </select>
      </div>
      <button type="submit">+</button>
    </form>
  );
};

export default compose(
  graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
  graphql(addBookMutation, { name: "addBookMutation" })
)(AddBookComponent);
