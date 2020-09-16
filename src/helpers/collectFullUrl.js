const baseUrlImg = 'https://image.tmdb.org/t/p/w500';

const collectFullUrl = results => {
  if (results.poster_path) {
    results.poster_path = `${baseUrlImg}${results.poster_path}`;

    if (results.poster_path === '') {
      results.poster_path =
        'https://rudnichka.ru/wp-content/uploads/2020/07/dquestion_app_widget_2_c.png';
    }

    return results;
  }

  const collectUrl = results.map(item => {
    item.poster_path = `${baseUrlImg}${item.poster_path}`;
    return item;
  });

  return collectUrl;
};

export { collectFullUrl, baseUrlImg };
