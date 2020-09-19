const baseUrlImg = 'https://image.tmdb.org/t/p/w500';

const collectFullUrlInArrayMovies = results => {
  const collectUrl = results.map(item => {
    if (!item.poster_path) {
      item.poster_path =
        'https://rudnichka.ru/wp-content/uploads/2020/07/dquestion_app_widget_2_c.png';
    } else {
      item.poster_path = `${baseUrlImg}${item.poster_path}`;
    }

    return item;
  });

  return collectUrl;
};

const collectFullUrlInOneMovie = results => {
  if (results.poster_path) {
    results.poster_path = `${baseUrlImg}${results.poster_path}`;
  } else {
    results.poster_path =
      'https://rudnichka.ru/wp-content/uploads/2020/07/dquestion_app_widget_2_c.png';
  }

  if (results.release_date) {
    results.release_date = results.release_date.slice(0, 4);
  }

  return results;
};

export { collectFullUrlInArrayMovies, baseUrlImg, collectFullUrlInOneMovie };
