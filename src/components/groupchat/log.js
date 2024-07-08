import axios from "axios";
const url = "https://swiftback.onrender.com/api/v1/searchgroups";
const joinurl = "https://swiftback.onrender.com/api/v1/joingroup";
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

export async function Join(params) {
  try {
    const formData = new URLSearchParams();
    formData.append("params", params);
    const response = axios.post(joinurl, formData.toString(), {
      headers: {
        Authorization: token,
      },
    });
    const result = (await response).data;
    return result
  } catch (error) {
    throw error?.response.data
  }
}
