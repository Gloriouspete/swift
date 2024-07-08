import axios from "axios";
const url = "http://192.168.1.154:8080/api/v1/searchuser";
const token =
  typeof window !== "undefined"
    ? window.localStorage.getItem("token")
    : false;

export async function Log(params) {
  try {
    const formData = new URLSearchParams();
    formData.append("searchtext", params);
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
      return false
    }
  } catch (error) {
    throw error
  }
}
