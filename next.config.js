/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({
  dest: "public",
});

module.exports = withPWA({
  images: {
    domains: [
      "links.papareact.com",
      "res.cloudinary.com",
      "lh3.googleusercontent.com",
      "firebasestorage.googleapis.com",
      "google.com",
    ],
  },
});
