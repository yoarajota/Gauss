import { useState } from "react";

function Input({ value, key1, key2, dispatch }) {
    console.table({ value, key1, key2, dispatch })

    return (
    <input
      className="input-values"
      value={value}
      onChange={(e) =>
        dispatch({
          type: 'unique',
          value: e.target.value,
          location: { key1, key2 },
        })
      }
    />
  );
}

export default Input;
