import axios from "axios";

const url = "http://192.168.1.154:8080/api/v1/retrievechats";
const token =
  typeof window !== "undefined"
    ? window.localStorage.getItem("token")
    : false;

export default async function Log() {
  try {
      const response = await axios.get(url,{
        headers:{
            'Authorization':token
        }
      })
      const result = response.data;
      if(result.success === true){
        console.log(result.data)
        return result.data
      }
  } catch (error) {
    throw error
  }
}
