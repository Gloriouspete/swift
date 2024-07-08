import axios from "axios";
const token = typeof window !== "undefined" ? window.localStorage.getItem("token") : false;

export const Fetchp = async (username) => {
  const formData = new URLSearchParams()
  formData.append("username",username)
  try {
    const response = await axios.post("http://192.168.1.154:8080/api/v1/fetchprofile",formData.toString(), {
      headers: {
        Authorization: token,
      },
    });
    const mydata = response.data;
    if (mydata.success === true) {
      return mydata;
    }
  } catch (error) {
    throw error;
  }
};

export const Grouplog = async (name,description,image) => {
  const formData = new URLSearchParams()
  formData.append("groupname",name)
  formData.append("description",description)
  formData.append("image",image)
  try {
    const response = await axios.post("http://192.168.1.154:8080/api/v1/creategroup",formData.toString(), {
      headers: {
        Authorization: token,
      },
    });
    const mydata = response.data;
      return mydata;
    
  } catch (error) {
    throw error?.response.data;
  }
};