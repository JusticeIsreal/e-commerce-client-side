// import cloudinary from "cloudinary";

// cloudinary.config({
//   cloud_name: process.env.YOUR_CLOUD_NAME,
//   api_key: process.env.YOUR_API_KEY,
//   api_secret: process.env.YOUR_API_SECRET,
// });

// export default cloudinary;

import { Cloudinary } from "@cloudinary/base";

const cloudinary = new Cloudinary({
  cloud: {
    cloudName: process.env.YOUR_CLOUD_NAME,
    apiKey: process.env.YOUR_API_KEY,
    api_secret: process.env.YOUR_API_SECRET,
  },
});
export default cloudinary;
