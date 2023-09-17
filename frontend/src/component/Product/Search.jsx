import React, { Fragment, useState } from "react";
import "./Search.css";
import {  } from "react-router-dom";

const Search = () => {
  const [keyword, setKeyword] = useState("");

  const onSubmitHendler = (e) => {
    e.preventDefault();
    if(keyword.trim()){
        window.location.replace(`/products?name=${keyword}`);
    }
    else{
        window.location.replace('/products');
    }
  };

  return (
    <Fragment>
      <form className="SearchBox" onSubmit={onSubmitHendler}>
        <input
          type="text"
          placeholder="Search Product Name..."
          onChange={(e) => setKeyword(e.target.value)}
          className="search"
        />
        <input type="submit" value="Search" className="submit" />
      </form>
    </Fragment>
  );
};

export default Search;