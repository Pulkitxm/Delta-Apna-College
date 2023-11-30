const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const express = require("express");
const multer = require("multer");
require("dotenv").config();
const app = express();

cloudinary.config({
    cloud_name: process.env.Cloud_Name,
    api_key: process.env.Cloud_API_Key,
    api_secret: process.env.Cloud_API_Secret,
})
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "wanderlustListingsImages",
    allowedFormats: ["png", "jpeg", "jpg"],
    public_id: (req, file) => "computed-filename-using-request",
  },
});

module.exports = { cloudinary,storage }