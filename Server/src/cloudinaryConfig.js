const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "dlcn4daqi",
  api_key: "178762875843482",
  api_secret: "ORHYItfAbS44bztA2kcscHtx4pU",
});

module.exports = cloudinary;
