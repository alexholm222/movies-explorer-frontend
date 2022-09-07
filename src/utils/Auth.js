const BASE_URL = 'https://movies.nomoredomains.sbs';
export const register = ({name, email, password}) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        name: name,
        password: password,
        email: email
    })
  })
  .then((response) => {
    if(response.ok) {
      return response.json()
    } else {
      return Promise.reject(response)
    }
  })
  .then((res) =>{
    return res
  })
}

export const authorize = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          email, 
          password
        })
    })
    .then(response => {
      if(response.ok) {
        return response.json()
    } else {
        return Promise.reject(response)
    }})
    .then((data) => {
      if (data.token){
        localStorage.setItem('token', data.token);
        return data;
      }
    })
  }; 

  export const getContent = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
    .then(response => {
      if(response.ok) {
        return response.json()
    } else {
        return Promise.reject(response)
    }
    })
    .then(data => data)
    .catch(err => console.log(err))
  } 