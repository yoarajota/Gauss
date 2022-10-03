import Input from "./input";

function Linha({ linha, type, dispatch, key1 }) {

    if (type === 'vetor-b') {
        return (
            <div className="width100 flex">
                <div className="px75"><Input type={'vetor-b'} dispatch={dispatch} value={linha} key1={key1} /></div>
            </div>
        )
    }

    return (
        <div className="width100 flex">
            {linha && linha.map((x, y) => {
                return <div className="px75"><Input dispatch={dispatch} key1={key1} key2={y} key={y} value={x} /></div>
            })}
        </div>
    );
}

export default Linha;