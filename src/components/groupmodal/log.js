import axios from "axios";

const url = "https://swiftback.onrender.com/api/v1/retrievegroups";
const token = window.localStorage.getItem("token")


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
