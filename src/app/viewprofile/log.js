import axios from "axios";
const token = typeof window !== "undefined" ? window.localStorage.getItem("token") : false;

export const Fetchp = async (username) => {
  const formData = new URLSearchParams()
  formData.append("username",username)
  try {
    const response = await axios.post("http://192.168.1.154:8080/api/v1/fetchprofile",formData.toString(), {
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
    const response = await axios.post("http://192.168.1.154:8080/api/v1/createmsg",formData.toString(), {
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