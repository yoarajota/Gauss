function Linha({linha}) {
    
    return (
        <div className="width100 flex">
            {linha && linha.map((x) => {
               return <div className="width100">{x}</div>
            })}
        </div>
    );
}

export default Linha;