import * as express from "express";
import chirpstore from "./chirpstore";
import App from "../client/App";
const router = express.Router();

router.get("/hello", (req, res, next) => {
  res.json("World, it works!");
});

//this is the get request that will either specify a specific chirp to get, or it will return all chirps if no chirp was specified.
router.get("/chirps/:id?", (req, res) => {
  let id = Number(req.params.id);
  if (id) {
    res.json(chirpstore.GetChirp(id));
  } else {
    let rawData = chirpstore.GetChirps();
    //this is how we take our object of objects and return it as an array of objects. We are now getting data in the form consistent with most API requests.
    let allChirps = Object.keys(rawData).map((key) => {
      return {
        id: key,
        username: rawData[key].username,
        message: rawData[key].message,
      };
    });
    allChirps.pop(); //removes the next chirp id, which isn't a chirp.
    res.json(allChirps);
  }
});

router.post("/chirps/", (req, res) => {
  chirpstore.CreateChirp(req.body);
  res.json("your chirp has been posted");
});

router.delete("/chirps/:id", (req, res) => {
  let id = Number(req.params.id); //by default this is a string, so we coerce it to a number
  chirpstore.DeleteChirp(id);
  res.json("your chirp was deleted");
});

router.put("/chirps/:id", (req, res) => {
  let id = Number(req.params.id);
  chirpstore.UpdateChirp(id, req.body);
  res.json("your chirp was updated");
  console.log("hey jay");
  console.log(req.body);
});

export default router;
