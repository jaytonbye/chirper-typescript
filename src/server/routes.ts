import * as express from "express";
import chirpstore from "./chirpstore.js";
const router = express.Router();

router.get("/hello", (req, res, next) => {
  res.json("World");
});

router.get("/chirps/:id?", (req, res) => {
  let id = req.params.id;
  if (id) {
    res.send(chirpstore.GetChirp(id));
  } else {
    res.send(chirpstore.GetChirps());
  }
});

router.post("/chirps/", (req, res) => {
  chirpstore.CreateChirp(req.body);
  res.send("your chirp has been posted");
});

export default router;
