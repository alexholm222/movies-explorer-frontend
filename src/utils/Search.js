function Search (films, query) {
  const result = films.filter(film => film.nameRU.concat(film.nameEN).toLowerCase().indexOf(query.toLowerCase()) !== -1);
  return result
}
export default Search