import axios from "axios";
const url = "https://swiftback.onrender.com/api/v1/deletemsg";
const token = window.localStorage.getItem("token")
 
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
