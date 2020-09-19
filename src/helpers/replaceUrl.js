import { baseUrlImg } from './collectFullUrl';

const replaceUrl = arrData => {
  if (arrData) {
    arrData.map(el => {
      if (!el.profile_path) {
        el.profile_path =
          'https://rudnichka.ru/wp-content/uploads/2020/07/dquestion_app_widget_2_c.png';
      } else {
        el.profile_path = `${baseUrlImg}${el.profile_path}`;
      }

      return el;
    });
  }
  return arrData;
};

export default replaceUrl;
