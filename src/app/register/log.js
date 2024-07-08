import axios from "axios"
export const Log = async (displayname, username, email, password) => {

  const postData = JSON.stringify({
    displayname,
    username,
    email: email,
    password: password,
  });

  try {
    const response = await axios.post('http://localhost:8080/api/v1/register', postData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
   
    if (response.data.success === true) {
      const result = await Store(response.data.token)
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

export const Store = async (token) => {

  try {
    localStorage.setItem('token', token)
    return 'success'
  }
  catch (error) {
    const idan = 'failed';
    throw idan
  }
}





/*

balance: "673.00"
bonus: "0.00"
created_at: "2023-11-02T11:22:07.000000Z"
id: 3
package: "smart"
pin: null
reserved_accounts: "[{\"bankCode\":\"035\",\"bankName\":\"Wema bank\",\"accountNumber\":\"9512724587\",\"accountName\":\"Dev\"},{\"bankCode\":\"50515\",\"bankName\":\"Moniepoint Microfinance Bank\",\"accountNumber\":\"6417608328\",\"accountName\":\"Dev\"}]"
updated_at: "2023-11-11T23:03:47.000000Z"
user_id: "3"


created_at: "2023-11-02T11:22:07.000000Z"
email: "peterninyo4@gmail.com"
email_verified_at: null
id: 3
last_ip: "102.88.33.245"
last_login: "2023-11-12 05:03:11"
name: "Developer Glo"
phone: "08123456789"
ref_code: "864536"
referrer: null
role: "user"
status: "active"
updated_at: "2023-11-12T10:11:12.000000Z"
username: "devglo"

*/