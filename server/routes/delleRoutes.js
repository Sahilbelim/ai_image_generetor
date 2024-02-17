import express, { response } from "express";
import * as dotenv from "dotenv";

import OpenAI from "openai";
dotenv.config();

const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
});
router.route("/").get((req, res) => {
  res.send("hello from dell e !");
});


router.route("/generate").post(async (req,res) => {
   try {
     const { prompt } = req.body;
     const image = await openai.images.generate({
       prompt:
         prompt,
     });
     res.status(200).send(image);
   } catch (e) {
     console.log(e);
     res.status(500).send(e);
   }
});
router.route("/generate").get(async (req,res) => {
   try {
     const { prompt } = req.body;
     const image = await openai.images.generate({
       prompt:
         "3D render of a cute tropical fish in an aquarium on a dark blue background, digital art",
     });
     res.status(200).send(image);
   } catch (e) {
     console.log(e);
     res.status(500).send(e);
    }
});
export default router;
