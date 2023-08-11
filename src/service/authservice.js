import axios from 'axios';

const URL = "http://localhost:8080/";

const Login = (email, password) => {
  const api = axios.create({
    baseURL: URL
  });

  return api
    .post("user/login",
      {
        email: email,
        password: password
      })
    .then((response) => {
      console.log('response');
      return response;
    })
    .catch((error) => {
      console.log(error);
      return error;
    })
    .catch((error) => {
      console.log("err---------->", error);
      return error;
    });
};
const WdgeList = () => {

  const api = axios.create({
    baseURL: URL
  });

  return api
    .get("data/wdgwheel")

    .then((response) => {
      console.log('response');
      return response;
    })
    .catch((error) => {
      console.log(error);
      return error;
    })

};

const createUser = (username, password, email, role) => {

  const api = axios.create({
    baseURL: URL
  });

  return api
    .post("user/addUser",
      {
        username: username,
        password: password,
        email: email,
        role: role,
      })
    .then((response) => {
      console.log('response');
      return response;
    })
    .catch((error) => {
      console.log(error);
      return error;
    })

};

const updateUser = (id, username, password, email, role) => {

  const api = axios.create({
    baseURL: URL
  });

  return api
    .post("user/updateUser",
      {
        username: username,
        password: password,
        email: email,
        role: role,
        id: id
      })
    .then((response) => {
      console.log('response');
      return response;
    })
    .catch((error) => {
      console.log(error);
      return error;
    })

};

const deleteUser = (id) => {

  const api = axios.create({
    baseURL: URL
  });

  return api
    .delete("user/deleteUser?id=" + id)
    .then((response) => {
      console.log('response');
      return response;
    })
    .catch((error) => {
      console.log(error);
      return error;
    })
};

const PaginationPerpage = (page, postPerPage) => {
  const aapi = axios.create({
      baseURL: URL,
  });
  return aapi
      .get("data/stockList?pgNo=" + page + "&pgSize=" + postPerPage)
      .then((response) => {
          console.log(response)
          return response
      })
      .catch
      ((error) => {
          console.log(error)
          return error
      })
};

const LineChart = (name) => {

  const api = axios.create({

      baseURL: URL

  });

  return api
      .get('/data/reliancedata?symbolname=' + name)
      .then((response) => {
          console.log('response');
          return response;
      })
      .catch((error) => {
          console.log(error);
          return error;
      });
};

const myProfile = (token) => {
  const api = axios.create({
    baseURL: URL,
    headers: { Authorization: `Bearer ${token}` },
  });
  return api
      .get('/user/account')
      .then((response) => {
          console.log('response');
          return response;
      })
      .catch((error) => {
          console.log(error);
          return error;
      });
}

const createRegisterUser = (
  firstname,
  lastname,
  email, 
  phone,
  gender,
  dob,
  country,
  capturedImage,
  recordedVideo
) => {
  var formdata = new FormData();
  formdata.append('firstname', firstname);
  formdata.append('lastname', lastname);
  formdata.append('email', email);
  formdata.append('phone', phone);
  formdata.append('gender', gender);
  formdata.append('dob', dob);
  formdata.append('country', country);
  // const image = new File([capturedImage], 'file', { type: capturedImage.type });
  // console.log(image,"img")
  formdata.append('img', capturedImage);

  console.log(recordedVideo,"kmkll")
  // const video = new File([recordedVideo], 'file.mp4', { type: recordedVideo.type })
  // console.log(video,"video")
  formdata.append('vdo', recordedVideo);

  const api = axios.create({
    baseURL: URL
  });

  return api.post("userKYC/regUser", formdata)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};

const ChangePassword = (usertoken, oldPassword, newPassword) => {
  const api = axios.create({
      baseURL: URL,
      headers: { Authorization: `Bearer ${usertoken}` },
  });
  try {
      const response = api
          .post("/user/chngPswd", {
            oldPassword: oldPassword,
            newPassword: newPassword
          })
      return response;
  } catch (error) {
      console.log(error);
      return error;
  }
};

const authservice = {
  Login,
  WdgeList,
  createUser,
  updateUser,
  deleteUser,
  PaginationPerpage,
  LineChart,
  createRegisterUser,
  myProfile,
  ChangePassword
};

export default authservice;