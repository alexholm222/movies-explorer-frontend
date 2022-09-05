function Filter (films) {
    const result = films.filter(film => film.duration <= 40);
    return result
  }
  export default Filter