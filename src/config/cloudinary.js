import { Cloudinary } from "cloudinary-core";

const cloudinary = new Cloudinary({
  cloud_name: import.meta.env.VITE_CLOUD_NAME,
});
export default cloudinary;
