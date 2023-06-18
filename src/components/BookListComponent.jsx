import React, { useEffect, useRef, useState } from "react";
import { graphql } from "react-apollo";
import { getBooksQuery } from "../queries/queries.js";

const BookListComponent = (props) => {
  const [bookList, setBookList] = useState([]);
  const loadingBRef = useRef();

  function displayBooks() {}

  useEffect(() => {
    //displayBooks();
    console.log(props);
    var data = props.data;

    if (!data.loading) {
      var array = data.books.map((book, idx) => {
        return <li key={book.id}>{book.name}</li>;
      });

      setBookList(array);

      const loadingLI = loadingBRef.current.firstChild;
      if (loadingLI) {
        loadingBRef.current.removeChild(loadingLI);
      }
    }
  }, []);

  return (
    <div>
      <ul ref={loadingBRef}>
        <li>Loading books...</li>
        {bookList}
      </ul>
    </div>
  );
};

export default graphql(getBooksQuery)(BookListComponent);
