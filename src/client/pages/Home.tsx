import * as React from "react";
import { json } from "express";
//import React, {useState} from "react" // How do I import usestate? I chose to use React.useState

const Home = (props: HomeProps) => {
  const [chirps, setChirps] = React.useState([]);
  const [username, setUsername] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [chirpNumber, setChirpNumber] = React.useState("");

  React.useEffect(() => {
    fetch("/api/chirps")
      .then((res) => res.json())
      .then((data) => {
        setChirps(data);
      });
  });

  const handleAddChirp = () => {
    fetch("/api/chirps", {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username, message: message }),
    });
  };

  /*const handleDelete = () => {
    fetch(`/api/chirps/${singleChirp.id}`, {
      method: "Delete",
    });
  };*/

  return (
    <>
      <div className="min-vh-100 d-flex justify-content-center align-items-center">
        <h1 className="display-4">Welcome to my chirper app!</h1>
      </div>
      <h2 className="display-4">Click here to add a chirp:</h2>
      <label htmlFor="">username</label>
      {/*This is a controled react input. As I type, it updates the state automatically*/}
      <input
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />
      <label htmlFor="">message</label>
      <input
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
        }}
      />
      <button onClick={handleAddChirp}>Add a chirp</button>
      <h2>or select the chirp you would like to update</h2>
      <label htmlFor="">Chirp Number</label>
      <input
        value={chirpNumber}
        onChange={(e) => {
          setChirpNumber(e.target.value);
        }}
      />
      <button
        onClick={() => {
          fetch(`/api/chirps/${chirpNumber}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: username,
              message: message,
            }),
          });
          fetch("/api/chirps")
            .then((res) => res.json())
            .then((data) => {
              setChirps(data);
            });
        }}
      >
        Update the chirp
      </button>
      <h2 className="display-4">
        or checkout these fresh Chrips, hot off the presses:
      </h2>
      {chirps.map((singleChirp) => {
        return (
          <div className="card" key={singleChirp.id}>
            <p>chirp Number: {singleChirp.id}</p>
            <div className="card-body">
              <h5 className="card-title">{singleChirp.username}</h5>
              <p className="card-text">{singleChirp.message}</p>
              <button
                onClick={() => {
                  fetch(`/api/chirps/${singleChirp.id}`, {
                    method: "PUT",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      username: "test edit",
                      message: "It works!",
                    }),
                  });
                  fetch("/api/chirps")
                    .then((res) => res.json())
                    .then((data) => {
                      setChirps(data);
                    });
                }}
              >
                Edit Chirp (currently has delete functionality)
              </button>
              <button
                onClick={() => {
                  fetch(`/api/chirps/${singleChirp.id}`, {
                    method: "Delete",
                  });
                  fetch("/api/chirps")
                    .then((res) => res.json())
                    .then((data) => {
                      setChirps(data);
                    });
                }}
              >
                Delete Chirp
              </button>
            </div>
          </div>
        );
      })}
    </>
  );
};

interface HomeProps {}

export default Home;
