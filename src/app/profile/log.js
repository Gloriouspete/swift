import axios from "axios";

const token = window.localStorage.getItem("token");

export const Fetchp = async () => {
  try {
    const response = await axios.get("https://swiftback.onrender.com/api/v1/getuser", {
      headers: {
        Authorization: token,
      },
    });
    const mydata = response.data;
    if (mydata.success === true) {
      return mydata;
    }
  } catch (error) {
    throw error?.response.data;
  }
};

