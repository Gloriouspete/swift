import axios from "axios";

const token = typeof window !== "undefined" ? window.localStorage.getItem("token") : false;

export const Fetchp = async () => {
  try {
    const response = await axios.get("http://192.168.1.154:8080/api/v1/getuser", {
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

