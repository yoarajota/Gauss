import { useState } from "react";

function Input({ value, type, key1, key2, dispatch }) {
  if (type === 'vetor-b') {
    return (
      <div className="flex">
        <i style={{marginLeft: '15px'}}>
          =
        </i>
        <input
          type='number'
          className="input-values"
          value={value}
          onChange={(e) =>
            dispatch({
              type: 'unique-b',
              value: e.target.value,
              location: { key1 },
            })
          }
        />
      </div>
    );
  }
  return (
    <div className="flex">
      <input
        type='number'
        className="input-values"
        value={value}
        onChange={(e) =>
          dispatch({
            type: 'unique',
            value: e.target.value,
            location: { key1, key2 },
          })
        }
      /><i>
        x<sub>{key2 + 1}</sub>
      </i>
    </div>
  );
}

export default Input;
