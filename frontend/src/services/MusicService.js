import axios from "axios";

export const getAllMusic = async (search, limit) => {
  let res = {};
  if (search?.length > 0) {
    res = await axios.get(
      `http://localhost:3002/api/music/get-all?filter=name&filter=${search}&limit=${limit}`
    );
  } else {
    res = await axios.get(
      `http://localhost:3002/api/music/get-all?limit=${limit}`
    );
  }
  return res.data;
};

export const getDetailsMusic = async (id) => {
  const res = await axios.get(
    `http://localhost:3002/api/music/get-details/${id}`
  );
  return res.data;
};

export const updateProduct = async (id, data) => {
  const res = await axios.put(
    `http://localhost:3002/api/music/update/${id}`,
    data
  );
  return res.data;
};
