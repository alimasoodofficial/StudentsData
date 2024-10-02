import axios from "axios";

export default async function getAPIdata(){
    const api = `https://64dc92e1e64a8525a0f6b640.mockapi.io/student`;
    

    try {
      var response = await axios.get(api);
      const reversedData = [...response.data].reverse();
      setData(reversedData);
    } catch (error) {
      console.log(error);
      response.data.avatar = 'https://www.svgrepo.com/show/384674/account-avatar-profile-user-11.svg'
    }
  };