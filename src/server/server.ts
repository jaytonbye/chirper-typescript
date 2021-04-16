//this file handles routing on the backend. It is different than routing on the front end (which specifies which HTML page to serve up). Backend routing is how our server sends information/data that was requested.

import * as express from "express";
import * as path from "path";
//because the top 2 imports are importing libraries, we use: import * as __ from ___
//this next import is my own, and can be written this way:
import apiRouter from "./routes";

const app = express();
app.use(express.json()); //allows us to work with json data, but i'm not exactly sure how/why?

//this is telling express to serve the static files found in the public folder. This is the entrypoint for our React website.
app.use(express.static("public"));

//this says that if we navigate to /api, we will use the routing setup in apiRouter.
app.use("/api", apiRouter);

//this handles routing for everything else. We are telling it to serve the html file which is the entrypoint for our react app. Notice that the path uses the javascript file (located in the dist folder), NOT this typescript file.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

//i'm not sure what this line does, I haven't learned about environment variables yet.
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port: ${port}`));
