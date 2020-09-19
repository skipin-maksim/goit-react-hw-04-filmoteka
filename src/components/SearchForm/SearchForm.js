import React from 'react';

export default function SearchForm({ onSubmit, onChangeInput, inputValue }) {
  return (
    <form className="FormSearch" onSubmit={onSubmit}>
      <input
        className="Search"
        type="text"
        value={inputValue}
        onChange={({ target }) => onChangeInput(target.value)}
      />
      <button className="SubmitBtn" type="submit">
        Search
      </button>
    </form>
  );
}
