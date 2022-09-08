import {DURATION_SHORT_FILM} from "./Сonstants"

function Filter (films) {
  const result = films.filter(film => film.duration <= DURATION_SHORT_FILM);
  return result
  }
  export default Filter