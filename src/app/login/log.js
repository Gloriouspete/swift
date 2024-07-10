import axios from "axios";
export default async function Log(username, password) {
  const formData = new URLSearchParams();
  formData.append("username", username.toLowerCase());
  formData.append("password", password);
  try {
    const response = await axios.post(
      "https://swiftback.onrender.com/api/v1/login",
      formData.toString()
    );
    const result = response.data;
    if (result.success) {
      await Store(result);
    }
    return result;
  } catch (error) {
    throw error?.response.data;
  }
}

async function Store(data) {
  const { token, userid } = data;
  try {
    Promise.resolve(
      localStorage.setItem("token", token),
      localStorage.setItem("userid", userid)
    );
    return true;
  } catch (error) {
    console.log(error);
  }
}
