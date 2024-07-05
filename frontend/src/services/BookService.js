import axios from "axios";

export const getAllBook = async (search, limit) => {
  let res = {};
  if (search?.length > 0) {
    res = await axios.get(
      `http://localhost:3002/api/book/get-all?filter=name&filter=${search}&limit=${limit}`
    );
  } else {
    res = await axios.get(
      `http://localhost:3002/api/book/get-all?limit=${limit}`
    );
  }
  return res.data;
};

export const getDetailsBook = async (id) => {
  const res = await axios.get(
    `http://localhost:3002/api/book/get-details/${id}`
  );
  return res.data;
};

export const updateProduct = async (id, data) => {
  const res = await axios.put(
    `http://localhost:3002/api/book/update/${id}`,
    data
  );
  return res.data;
};
