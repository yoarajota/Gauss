import Input from "./input";

function Linha({linha, dispatch, key1}) {
    return (
        <div className="width100 flex">
            {linha && linha.map((x, y) => {
               return <div className="px75"><Input dispatch={dispatch} key1={key1} key2={y} value={x}/></div>
            })}
        </div>
    );
}

export default Linha;