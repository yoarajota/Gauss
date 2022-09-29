import Input from "./input";

function Linha({linha}) {
    
    return (
        <div className="width100 flex">
            {linha && linha.map((x) => {
               return <div className="px75"><Input value={x}/></div>
            })}
        </div>
    );
}

export default Linha;