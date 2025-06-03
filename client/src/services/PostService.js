import axios from "axios";
const API_URL = "http://localhost:8080/api/post";

class PostService {
  add(title, description) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.post(
      API_URL,
      { title, description },
      {
        headers: {
          Authorization: token, //JWT
        },
      }
    );
  }

  //獲取特定作者的貼文
  get(_id) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.get(API_URL + "/author/" + _id, {
      headers: {
        Authorization: token, //JWT
      },
    });
  }
  //編輯特定文章的貼文
  edit(title, description, postId) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.patch(
      API_URL + "/" + postId,
      { title, description },
      {
        headers: {
          Authorization: token, //JWT
        },
      }
    );
  }
  //查看所有貼文
  getAll() {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.get(API_URL, {
      headers: {
        Authorization: token, //JWT
      },
    });
  }
}
export default new PostService();
