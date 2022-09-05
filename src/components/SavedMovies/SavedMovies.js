import React, {useState, useEffect} from "react";
import './SavedMovies.css';
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import Search from "../../utils/Search";
import Filter from "../../utils/Filter";

function SavedMovies({SavedMovies, isPreloader, isSearchErr, onMovieDelete}) {
  const [isNotFound, setIsNotFound] = useState(false);
  const [isCheckBox, setIsCheckBox] =useState(false);
  const [isFilterSavedMovies, setIsFilterSavedMovies] = useState([]);
  const [isSearchResultSaved, setIsSearchResultSaved] = useState([]);
  const [query, setQuery] = React.useState("");
  //Очистка инпута от введеных данных по нажатию ESC
  useEffect(() => {function handleEscClose(e) {
    if(e.key === 'Escape') {
      setQuery('');
    }}
    document.addEventListener('keydown', handleEscClose);
    return () => {
      document.removeEventListener('keydown', handleEscClose)
    }
  }, [])
  //Сброс результата пойска при удалении поискового запроса
  useEffect(() => {
    if(query === "") {
      setIsNotFound(false);
      setIsSearchResultSaved(SavedMovies);
      setIsFilterSavedMovies(Filter((SavedMovies)));
    } 
  },[SavedMovies, query])

  function handleSearchValue(e) {
    setQuery(e.target.value)
  }
  //функция пойска фильмов на странцице SavedMovies
 function handleSearchFilm({query}) {
    setIsNotFound(false)
    setIsSearchResultSaved(Search(SavedMovies, query));
    setIsFilterSavedMovies(Filter(Search(SavedMovies, query)));
  }
  //функция переключения короткометражек
  function handleFilterSavedFilm() {
    if(!isCheckBox) {
      setIsCheckBox(true);
    } else {
      setIsCheckBox(false);
    }
  }
  return (
    <>
      <SearchForm onSearchSavedFilm={handleSearchFilm} onFilterFilm={handleFilterSavedFilm} isCheckBox={isCheckBox} query={query} SearchValue={handleSearchValue}/>
      {isPreloader ? 
      <Preloader/> : 
      <MoviesCardList searchResult={isCheckBox ? isFilterSavedMovies : isSearchResultSaved} notFound={isNotFound} searchErr={isSearchErr} setNoFound={setIsNotFound} onMovieDelete={onMovieDelete} query={query}/>
      }
    </>
  )
}

export default SavedMovies