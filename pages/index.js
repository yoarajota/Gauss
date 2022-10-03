import Head from "next/head";
import Image from "next/image";
import { useEffect, useReducer, useState } from "react";
import Linha from "../public/comp/linha";
import styles from "../styles/Home.module.css";
import _ from "lodash";
import gausJacobi from "../public/functions/gaus";

const stateType = {
  row: "row",
  delrow: "delete-row",
  collumn: "collumn",
  delcollumn: "delete-collumn",
};

export default function Home() {
  const initialState = {
    a: [
      [10, 2, 1],
      [1, 5, 1],
      [2, 3, 10],
    ],
    b: [7, -8, 6],
    c: 10,
    d: 0.01,
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const [log, setLog] = useState('');

  function reducer(state, action) {
    if (action.type === "collumn") {
      let newState = _.clone(state);

      for (let i = 0; i < newState.a.length; i++) {
        newState.a[i].push("0");
      }

      return newState;
    } else if (action.type === "row") {
      let x = _.clone(state.a[0]);

      for (let i = 0; i < x.length; i++) {
        x[i] = 0;
      }

      let newState = _.clone(state);
      newState.a.push(x);
      newState.b.push(0)

      return newState;
    } else if (action.type === "delete-row") {
      let x = _.clone(state);
      x.a.pop();
      x.b.pop();

      return x;
    } else if (action.type === "delete-collumn") {
      let newState = _.clone(state);

      for (let i = 0; i < newState.a.length; i++) {
        newState.a[i].pop();
      }

      return newState;
    } else if (action.type === 'unique') {
      let key1 = action.location.key1
      let key2 = action.location.key2
      let x = _.clone(state)

      x.a[key1][key2] = action.value;

      return x;
    } else if (action.type === 'unique-b') {
      let key1 = action.location.key1
      let x = _.clone(state)

      x.b[key1] = action.value;

      return x;
    } else if (action.type === 'unique-c') {
      let x = _.clone(state)
      x.c = action.value
      return x;
    } else if (action.type === 'unique-d') {
      let x = _.clone(state)
      x.d = action.value
      return x;
    }
  }

  return (
    <div className={styles.container}>
      <h1>Gaus Jacobi</h1>

      <button
        onClick={() => {
          dispatch({ type: stateType.row });
        }}
      >
        add row
      </button>
      <button
        onClick={() =>
          dispatch({ type: stateType.collumn })
        }
      >
        add collumn
      </button>
      <button
        onClick={() =>
          dispatch({ type: stateType.delrow })
        }
      >
        delete row
      </button>
      <button
        onClick={() =>
          dispatch({ type: stateType.delcollumn })
        }
      >
        delete collumn
      </button>

      <div className="body-calc">
        <div className="flex margin-auto width100">
          <div>
            {state?.a.map((a, b) => {
              return <Linha dispatch={dispatch} key={b} linha={a} key1={b} />;
            })}
          </div>
          <div>
            {state?.b.map((c, d) => {
              return <Linha type={'vetor-b'} dispatch={dispatch} key={d} linha={c} key1={d} />;
            })}
          </div>
        </div>
        <div className="flex center doublebutton">
          <label>maximum iter</label>
          <input
            type='number'
            className="input-values wid-20"
            value={state.c}
            onChange={(e) =>
              dispatch({
                type: 'unique-c',
                value: e.target.value,
              })
            }
          />
          <label>precision</label>
          <input
            type='number'
            className="input-values wid-20"
            value={state.d}
            onChange={(e) =>
              dispatch({
                type: 'unique-d',
                value: e.target.value,
              })
            }
          />
        </div>
        <button className="resolve-button" onClick={() => setLog(gausJacobi(state))}>
          Resolve
        </button>
        <div>
          {log?.LOG?.map((x) => {
            let string = undefined;
            if (typeof x == 'object') {
              string = x.join(" | ")
            }
            return <p className="log"> {string ?? x} </p>
          })}
        </div>
        <h4>
          {log?.x?.join(" | ")}
        </h4>
        {log && <button onClick={(() => { setLog() })}>Clean Log</button>}
      </div>
    </div>
  );
}