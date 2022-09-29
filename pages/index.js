import Head from "next/head";
import Image from "next/image";
import { useEffect, useReducer, useState } from "react";
import Linha from "../public/comp/linha";
import styles from "../styles/Home.module.css";
import _ from "lodash";

const stateType = {
  row: "row",
  deleterow: "delete-row",
  collumn: "collumn",
  delcollumn: "del-collumn",
};

export default function Home() {
  const initialState = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];

  const [state, dispatch] = useReducer(reducer, initialState);

  function reducer(state, action) {
    if (action.type === "column") {
      let newState = _.clone(state);

      for (let i = 0; i < newState.length; i++) {
        newState[i].push("0");
      }

      return newState;
    } else if (action.type === "row") {
      let x = _.clone(state[0]);

      for (let i = 0; i < x.length; i++) {
        x[i] = 0;
      }

      let newState = _.clone(state);
      newState.push(x);

      return newState;
    } else if (action.type === "del-row") {
      let x = _.clone(state);
      x.pop();

      return x;
    } else if (action.type === "del-column") {
      let newState = _.clone(state);

      for (let i = 0; i < newState.length; i++) {
        newState[i].pop();
      }

      return newState;
    }
  }

  return (
    <div className={styles.container}>
      <h1>Alo</h1>

      <button
        onClick={() => {
          dispatch({ type: stateType.row });
        }}
      >
        Adicinar Linha
      </button>
      <button
        onClick={() => {
          dispatch({ type: stateType.collumn });
        }}
      >
        Adicinar Coluna
      </button>
      <button
        onClick={() => {
          dispatch({ type: stateType.delrow });
        }}
      >
        Deletar Linha
      </button>
      <button
        onClick={() => {
          dispatch({ type: stateType.delcollumn });
        }}
      >
        Deletar Coluna
      </button>

      <div className="body-calc">
        <div className="matriz-box">
          {state?.map((a) => {
            return <Linha linha={a} />;
          })}
        </div>
      </div>
    </div>
  );
}
