import axios from "axios";
const url = "https://swiftback.onrender.com/api/v1/getmessages";
const profileurl = "https://swiftback.onrender.com/api/v1/getads";
const infourl = "https://swiftback.onrender.com/api/v1/retrievechats";
const deleteurl = "https://swiftback.onrender.com/api/v1/deletechat";
const token = window.localStorage.getItem("token")


export async function Log(params) {
  try {
    const formData = new URLSearchParams();
    formData.append("params", params);
    const response = axios.post(url, formData.toString(), {
      headers: {
        Authorization: token,
      },
    });
    const result = (await response).data;
    if (result.success) {
      return result.data;
    }
    else {
      alert(result.message)
    }
  } catch (error) {
    throw error
  }
};

export async function Profile(params) {
  try {
    const formData = new URLSearchParams();
    formData.append("params", params);
    const response = axios.post(profileurl, formData.toString());
    const result = (await response).data;
    if (result.success === true) {
      const resu = result.data;
      return resu[0];
    }
  } catch (error) {
    throw error
  }
};

export async function Info(params) {
  try {
    const response = axios.get(infourl,{
      headers:{
        "Authorization":token
      }
    });
    const result = (await response).data;
    if (result.success === true) {
      const resu = result.data;
      const real = resu.filter((items) => items.msg.chatid === params)
      return real[0];
    }
  } catch (error) {
    throw error
  }
};
export async function Deletechat(params) {
  try {
    const formData = new URLSearchParams();
    formData.append("chatid", params);
    const response = axios.post(deleteurl, formData.toString(), {
      headers: {
        Authorization: token,
      },
    });
    const result = (await response).data;
    return result;
  } catch (error) {
    if(error && error?.response.data){
      throw error.response.data
    }
  }
}