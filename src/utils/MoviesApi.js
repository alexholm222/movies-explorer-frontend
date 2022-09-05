class Api {
    constructor(options) {
      this._options = options;
    }
  
    getFilmInformation() {
      return fetch(`${this._options.baseUrl}`, {
        headers: {
          'Content-Type': 'application/json',
          /* 'Authorization': `Bearer ${token}` */
        }
      })
      .then(this._checkResponse)
    }
  
    _checkResponse(res) {
      if (res.ok) {
        return res.json()
      } else {
       return Promise.reject(`Ошибка: ${res.status}`)
      }
    }
  }
  
  export const apiBeatFilm = new Api ({
    baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
    headers: {
      'Content-Type': 'application/json'
    }
  });