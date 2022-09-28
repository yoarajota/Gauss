import Head from "next/head";
import Image from "next/image";
import { useEffect, useReducer, useState } from "react";
import styles from "../styles/Home.module.css";

export default function Home() {
  const initialState = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];

  function reducer(state, action) {
    console.log(state, action);
    if (action.type == "row") {
      for (let i = 0; i < state.length; i++) {
        state[i].push(0);
      }
      return state;
    } else if (action.type == "column") {
      let x = state[0];

      for (let i = 0; i < x.length; i++) {
        x[i] = 0;
      }

      state.push(x);
      return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className={styles.container}>
      <h1>Alo</h1>

      <button
        onClick={() => {
          dispatch({ type: "row" });
        }}
      >
        Adicinar Linha
      </button>
      <button
        onClick={() => {
          dispatch({ type: "column" });
        }}
      >
        Adicinar Coluna
      </button>

      <div className="body-calc">
        <div className="matriz-box"></div>
      </div>
    </div>
  );
}
