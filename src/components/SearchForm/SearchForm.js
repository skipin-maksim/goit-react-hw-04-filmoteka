import React from 'react';

import s from './SearchForm.module.scss';

export default function SearchForm({ onSubmit, onChangeInput, inputValue }) {
  return (
    <form className={s.FormSearch} onSubmit={onSubmit}>
      <input
        className={s.Search}
        type="text"
        value={inputValue}
        onChange={({ target }) => onChangeInput(target.value)}
      />
      <button className={s.SubmitBtn} type="submit">
        Search
      </button>
    </form>
  );
}
