import axios from "axios";
const url = "https://swiftback.onrender.com/api/v1/deleteforummessage";
const blockurl = "https://swiftback.onrender.com/api/v1/blockuser";
const token =
  typeof window !== "undefined"
    ? window.localStorage.getItem("token")
    : false;

export async function Log(id) {
    const formData = new URLSearchParams()
    formData.append('id', id)
  try {
      const response = await axios.post(url,formData.toString(),{
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
export async function Block(sender,groupid) {
  const formData = new URLSearchParams()
  formData.append('sender', sender)
  formData.append('groupid', groupid)
try {
    const response = await axios.post(blockurl,formData.toString(),{
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
