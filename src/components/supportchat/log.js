import axios from "axios";
const url = "https://swiftback.onrender.com/api/v1/searchuser";
const token = window.localStorage.getItem("token");

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
