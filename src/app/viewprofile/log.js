import axios from "axios";
const token = window.localStorage.getItem("token")

export const Fetchp = async (username) => {
  const formData = new URLSearchParams()
  formData.append("username",username)
  try {
    const response = await axios.post("https://swiftback.onrender.com/api/v1/fetchprofile",formData.toString(), {
      headers: {
        Authorization: token,
      },
    });
    const mydata = response.data;
    if (mydata.success === true) {
      return mydata;
    }
  } catch (error) {
    throw error;
  }
};

export const Chat = async (name,friendid) => {
  const formData = new URLSearchParams()
  formData.append("friendname",name)
  formData.append("friendid",friendid)
  try {
    const response = await axios.post("https://swiftback.onrender.com/api/v1/createmsg",formData.toString(), {
      headers: {
        Authorization: token,
      },
    });
    const mydata = response.data;
   
      return mydata;
    
  } catch (error) {
    throw error;
  }
};

export const Block = async (friendid) => {
  const formData = new URLSearchParams()
  formData.append("friendid",friendid)
  try {
    const response = await axios.post("https://swiftback.onrender.com/api/v1/block",formData.toString(), {
      headers: {
        Authorization: token,
      },
    });
    const mydata = response.data;
   
      return mydata;
    
  } catch (error) {
    throw error;
  }
};
export const Unblock = async (friendid) => {
  const formData = new URLSearchParams()
  formData.append("friendid",friendid)
  try {
    const response = await axios.post("https://swiftback.onrender.com/api/v1/unblock",formData.toString(), {
      headers: {
        Authorization: token,
      },
    });
    const mydata = response.data;
   
      return mydata;
    
  } catch (error) {
    throw error;
  }
};