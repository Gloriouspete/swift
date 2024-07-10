import axios from "axios"
export const Log = async (displayname, username, email, password) => {

  const postData = JSON.stringify({
    displayname,
    username,
    email: email,
    password: password,
  });

  try {
    const response = await axios.post('https://swiftback.onrender.com/api/v1/register', postData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
   
    if (response.data.success === true) {
      const result = await Store(response.data)
      if (result === 'success') {
        return response.data
      }
    }
    else{
      return response.data
    }
  }
  catch (error) {
    throw error?.response.data
  }
}

export const Store = async (data) => {

  try {
    localStorage.setItem('token', data.token)
    localStorage.setItem('userid', data.userid)
    return 'success'
  }
  catch (error) {
    const idan = 'failed';
    throw idan
  }
}


