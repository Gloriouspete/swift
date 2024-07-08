import axios from "axios";
export default async function Log(username, password) {
  const formData = new URLSearchParams();
  formData.append("username", username.toLowerCase());
  formData.append("password", password);
  try {
    const response = await axios.post(
      "http://192.168.1.154:8080/api/v1/login",
      formData.toString()
    );
    const result = response.data;
    if (result.success) {
      localStorage.setItem("token", result.token);
      localStorage.setItem("userid", result.userid);
    }
    return result;
  } catch (error) {
    throw error?.response.data;
  }
}
