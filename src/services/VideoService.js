import axios from "axios";

export default class VideoService {
  static async getVideoList(searchValue, maxResult, orderBy) {
    return axios.get(`https://www.googleapis.com/youtube/v3/search/?key=AIzaSyDvXlJniF1q8q-cLhJkiUvD4DYwJnoQ20I&q=${searchValue}&maxResults=${maxResult}&order=${orderBy}&type=video&part=snippet`)
  }
}
