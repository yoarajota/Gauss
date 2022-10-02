import Head from "next/head";
import Image from "next/image";
import { useEffect, useReducer, useState } from "react";
import Linha from "../public/comp/linha";
import styles from "../styles/Home.module.css";
import _ from "lodash";

const stateType = {
  row: "row",
  delrow: "delete-row",
  collumn: "collumn",
  delcollumn: "delete-collumn",
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
    if (action.type === "collumn") {
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
    } else if (action.type === "delete-row") {
      let x = _.clone(state);
      x.pop();

      return x;
    } else if (action.type === "delete-collumn") {
      let newState = _.clone(state);

      for (let i = 0; i < newState.length; i++) {
        newState[i].pop();
      }

      return newState;
    } else if (action.type === 'unique') {
      let key1 = action.location.key1
      let key2 = action.location.key2
      let x = _.clone(state)

      x[key1][key2] = action.value;

      return x;
    }
  }


  useEffect(() => {
    console.log(state)
  }, [state]);

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
          {state?.map((a, b) => {
            return <Linha dispatch={dispatch} linha={a} key1={b} />;
          })}
        </div>
      </div>
    </div>
  );
}
