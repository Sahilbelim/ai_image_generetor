import express from "express";
import * as dotenv from 'dotenv';
import { v2 as cloudinary } from "cloudinary";

import Post from '../module/post.js'

dotenv.config();

const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_CLOUD_APIKEY,
  api_secret: process.env.CLOUDINARY_CLOUD_SECRET,
});

//get all post

router.route('/').get(async (req, res) => {
    
    try {
        const post = await Post.find({});
           res.status(200).json({ success: true, data: post });
    } catch (e) {
         res.status(500).json({ success: false, message: e });
    }
})


router.route("/").post(async (req, res) => {

   try {
     const { name, prompt, photo } = req.body;
     const photourl = await cloudinary.uploader.upload(photo);

     const newPost = await Post.create({
       name,
       prompt,
       photo: photourl.url,
     });

     res.status(201).json({ success: true, data: newPost });
   } catch (e) {
       console.log(e);
       res.status(500).json({ success: false, message: e });
   }
});
export default router;