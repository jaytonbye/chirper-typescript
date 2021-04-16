// const fs = require("fs");
// let chirps = { nextid: 0 };

// if (fs.existsSync("chirps.json")) {
//   chirps = JSON.parse(fs.readFileSync("chirps.json"));
// }

// let getChirps = () => {
//   return Object.assign({}, chirps); //create a copy and return it
// };

// let getChirp = (id) => {
//   return Object.assign({}, chirps[id]); //create a copy and return it
// };

// let createChirp = (chirp) => {
//   chirps[chirps.nextid++] = chirp;
//   writeChirps();
// };

// let updateChirp = (id, chirp) => {
//   chirps[id] = chirp;
//   writeChirps();
// };

// let deleteChirp = (id) => {
//   delete chirps[id];
//   writeChirps();
// };

// let writeChirps = () => {
//   fs.writeFileSync("chirps.json", JSON.stringify(chirps));
// };

// export default {
//   CreateChirp: createChirp,
//   DeleteChirp: deleteChirp,
//   GetChirps: getChirps,
//   GetChirp: getChirp,
//   UpdateChirp: updateChirp,
// };

import * as fs from "fs";

/*
{
    1: {
        username: string;
        message: string;
    },
    2: {
        username: string;
        message: string;
    },
    nextid: number;
}
*/

interface IChirp {
  username: string;
  message: string;
}

interface ChirpData {
  [key: number]: IChirp;
  nextid: number;
}

let chirps: ChirpData = { nextid: 0 };

if (fs.existsSync("chirps.json")) {
  chirps = JSON.parse(fs.readFileSync("chirps.json").toString());
}

let getChirps = () => {
  return Object.assign({}, chirps); //create a copy and return it
};

let getChirp = (id: number) => {
  return Object.assign({}, chirps[id]); //create a copy and return it
};

let createChirp = (chirp: IChirp) => {
  chirps[chirps.nextid++] = chirp;
  writeChirps();
};

let updateChirp = (id: number, chirp: IChirp) => {
  chirps[id] = chirp;
  writeChirps();
};

let deleteChirp = (id: number) => {
  delete chirps[id];
  writeChirps();
};

let writeChirps = () => {
  fs.writeFileSync("chirps.json", JSON.stringify(chirps));
};

export default {
  CreateChirp: createChirp,
  DeleteChirp: deleteChirp,
  GetChirps: getChirps,
  GetChirp: getChirp,
  UpdateChirp: updateChirp,
};
