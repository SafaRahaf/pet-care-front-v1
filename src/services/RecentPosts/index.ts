import envConfig from "../../config/envConfig";
import { delay } from "../../utils/delay";

export const getRecentPosts = async () => {
  const res = await fetch(
    `${envConfig.baseApi}/posts?sortBy=-createdAt&limit=9`
  );

  return res.json();
};
