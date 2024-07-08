import axios from "axios";
const url = "http://192.168.1.154:8080/api/v1/deletemsg";
const token =
  typeof window !== "undefined"
    ? window.localStorage.getItem("token")
    : false;

export default async function Log(id) {
    const formData = new URLSearchParams()
    formData.append('id', id)
  try {
      const response = await axios.post(url,formData,{
        headers:{
            'Authorization':token
        }
      })
      const result = response.data;
     // console.log(result)
      if(result.success === true){
       return true
      }
  } catch (error) {
    throw error
  }
}
