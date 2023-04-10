class Api {
    constructor(options) {
      this._options = options;
    }
    getFilmInformation(token) {
      return fetch(`${this._options.baseUrl}/movies`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      })
      .then(this._checkResponse)
    }
    saveMovie(movie, token) {
      return fetch(`${this._options.baseUrl}/movies`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          country: movie.country,
          director: movie.director,
          duration: movie.duration,
          year: movie.year,
          description: movie.description,
          image: `https://api.nomoreparties.co${movie.image.url}`,
          trailerLink: movie.trailerLink,
          nameRU: movie.nameRU,
          nameEN: movie.nameEN,
          thumbnail: `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
          movieId: movie.id,
        })
      })
      .then(this._checkResponse)
    }

    deleteMovies(id, token) {return fetch(`${this._options.baseUrl}/movies/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
    .then(this._checkResponse)
    }

    submitUserInform(name, email, token) {return fetch(`${this._options.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: name,
        email: email
      })
    })
    .then(this._checkResponse)
    }

    _checkResponse(res) {
      if (res.ok) {
        return res.json()
      } else {
       return Promise.reject(res)
      }
    }
  }
  
  export const apiSavedFilm = new Api ({
    baseUrl: 'https://project-movies.online',
    headers: {
      'Content-Type': 'application/json',
    }
  });
  