import axios from "axios";

const instance = axios.create({
  baseURL: "https://react-my-burger-bf0c7.firebaseio.com/",
});

export default instance;
