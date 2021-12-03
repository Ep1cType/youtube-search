import axios from "axios";

const config = {
  apiKey: process.env.REACT_APP_APIKEY
}

export default class VideoService {
  static async getVideoList(searchValue, maxResult, orderBy) {
    return axios.get(`https://www.googleapis.com/youtube/v3/search/?key=${config.apiKey}&q=${searchValue}&maxResults=${maxResult}&order=${orderBy}&type=video&part=snippet`)
  }
}
