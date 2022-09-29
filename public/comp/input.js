import { useState } from "react";

function Input({value}) {
    const [state, setState] = useState(value)
    
    return (
        <input className="input-values" value={state} onChange={(e) => {setState(e.target.value)}}/>
    );
}

export default Input;