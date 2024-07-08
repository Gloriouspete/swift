import axios from "axios";
const url = "http://192.168.1.154:8080/api/v1/fetchgroupmsg";
const groupurl = "http://192.168.1.154:8080/api/v1/getgroups";
const fetchurl = "http://192.168.1.154:8080/api/v1/getuser";
const token =
  typeof window !== "undefined" ? window.localStorage.getItem("token") : false;

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
    return result.data;
  } catch (error) {
    throw error;
  }
}

export async function Profile() {
  try {
    const response = axios.get(fetchurl, {
      headers: {
        Authorization: token,
      },
    });
    const result = (await response).data;
    return result;
  } catch (error) {
    throw error;
  }
}

export async function Groups(params) {
  try {
    const formData = new URLSearchParams();
    formData.append("params", params);
    const response = axios.post(groupurl, formData.toString(), {
      headers: {
        Authorization: token,
      },
    });
    const result = (await response).data;
    return result;
  } catch (error) {
    throw error;
  }
}