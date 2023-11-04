import axios from 'axios';
// const baseUri = 'https://bhimloans.herokuapp.com/app';
// export const baseUri = 'http://localhost:8000/app';
export const baseUri = '/app';
export const todayCount = async () => {
  const { data } = await axios.get(`${baseUri}/todayCount`);
  return data;
};

export const monthCount = async () => {
  const { data } = await axios.get(`${baseUri}/monthCount`);
  return data;
};

export const totalCount = async () => {
  const { data } = await axios.get(`${baseUri}/totalCount`);
  return data;
};

export const approved = async () => {
  const { data } = await axios.get(`${baseUri}/approvedRequest`);
  return data;
};

export const pendingApproval = async () => {
  const { data } = await axios.get(`${baseUri}/pendingApproval`);
  return data;
};

export const pendingVerification = async () => {
  const { data } = await axios.get(`${baseUri}/unverified`);
  return data;
};

export const monthlyRequest = async () => {
  const { data } = await axios.get(`${baseUri}/monthlyRequest`);
  return data;
};

export const stateRequest = async () => {
  const { data } = await axios.get(`${baseUri}/stateRequest`);
  return data;
};

export const fetchRequest = () => axios.get(`${baseUri}/users`);

export const fetchRequestPage = async (skip, limit) => {
  const { data } = await axios.get(`${baseUri}/usersPage?skip=${skip}&limit=${limit}`);
  return data;
}

export const updateApproval = async (query) => {
  const { data } = await axios.patch(`${baseUri}/updateApproval`, query);
  return data;
}

export const updateApprovalAll = async () => {
  const { data } = await axios.patch(`${baseUri}/updateApprovalAll`);
  return data;
}

export const fetchById = async (query) => {
  const { data } = await axios.get(`${baseUri}/userById/${query}`);
  return data;
};

export const fetchByName = async (query) => {
  const { data } = await axios.get(`${baseUri}/userByName/${query}`);
  return data;
};

export const fetchByNumber = async (query) => {
  const { data } = await axios.get(`${baseUri}/userByPhoneNumber/${query}`);
  return data;
};

export const fetchByDate = async (query) => {
  const { data } = await axios.get(`${baseUri}/userByDate/${query}`);
  return data;
};

export const fetchQuery = async () => {
  const { data } = await axios.get(`${baseUri}/contact/`);
  return data;
}

export const postQuery = async (query) => {
  const { data } = await axios.post(`${baseUri}/contact/`, query);
  return data;
}

export const signIn = async (admin) => {
  const { data } = await axios.post(`${baseUri}/adminSignin`, admin);
  return data;
};

export const getCookie = () => {
  const data = axios.get(`${baseUri}/get-cookie`);
  return data;
};

export const fetchAdmin = async () => {
  const { data } = await axios.get(`${baseUri}/admin`);
  return data;
};

export const postAdmin = async (admin) => {
  const { data } = axios.post(`${baseUri}/admin`, admin);
  return data
}

export const updateAdmin = async (id, admin) => {
  const { data } = await axios.patch(`${baseUri}/admin/${id}`, admin);
  return data;
};

export const adminUpdateAuth = async (id, admin) => {
  const { data } = await axios.patch(`${baseUri}/adminUpdateAuth/${id}`, admin);
  return data;
};

export const fetchTask = async() => {
  const { data } = await axios.get(`${baseUri}/task`);
  return data
}

export const postTask = async (task) => {
  const { data } = await axios.post(`${baseUri}/task`, task);
  return data
}

export const updateTask = async(id, task) => {
  const { data } = await axios.patch(`${baseUri}/task/${id}`, task);
  return data
}

export const deleteTask = async(id) => {
  const { data } = await axios.delete(`${baseUri}/task/${id}`);
  return data
}

export const uploadImage = async (image) => {
    const { data } = await axios.post(`${baseUri}/upload`, image);
    return data;
}

export const createUserRequest = async (data) => {
    const { data: response } = await axios.post(`${baseUri}/usersRequest`, data);
    return response;
}

export const getUserRequest = async (skip, limit) => {
    const {data: response} = await axios.get(`${baseUri}/usersRequestPage?skip=${skip}&limit=${limit}`);
    return response;
}
export const getRejectedUsersRequest = async (approval) => {
  const {data: response} = await axios.get(`${baseUri}/rejectedUsers?approval=${approval}`);
  return response;
}

export const totalUserRequestCount = async() => {
    const {data: response}  = await axios.get(`${baseUri}/userRequestCount`);
    return response
}

export const fetchReviews = async () => {
    const { data } = await axios.get(`${baseUri}/reviews`);
    return data;
}

export const topReviews = async () => {
    const { data } = await axios.get(`${baseUri}/reviews_web`);
    return data;
}

export const postReview = async (review) => {
    const { data } = await axios.post(`${baseUri}/reviews`, review);
    return data;
}

export const deleteReview = async (id) => {
    const { data } = await axios.delete(`${baseUri}/reviews/${id}`);
    return data;
}


