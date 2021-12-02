import axios from "axios";

export default class VideoService {
  static async getVideoList(searchValue, maxResult) {
    return axios.get(`https://www.googleapis.com/youtube/v3/search/?key=AIzaSyAagdouzW51CZt-tgJZj6S7hrKyGOUvFg0&q=${searchValue}&maxResults=${maxResult}&type=video&part=snippet`)
  }
}
