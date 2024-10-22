const { axiosCommon } = require("../hooks/useAxios");

export async function getRooms() {
  const { data } = await axiosCommon("/rooms");
  return data;
}
