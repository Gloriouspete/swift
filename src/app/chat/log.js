import axios from "axios";
const url = "http://192.168.1.154:8080/api/v1/getmessages";
const profileurl = "http://192.168.1.154:8080/api/v1/getads";
const infourl = "http://192.168.1.154:8080/api/v1/retrievechats";
const token =
  typeof window !== "undefined"
    ? window.localStorage.getItem("token")
    : false;

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
