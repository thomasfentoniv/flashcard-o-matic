import React from "react";
import DrawCard from "./DrawCard";

function DrawCards({cards}){
    if (!cards.length){
        return <h4 className="alert alert-info">There are no cards in this deck.</h4>
    }
    
    return(
        <div >
            <h2>Cards</h2>
            {cards.map((card,index)=><DrawCard key={card.id} card={card} />)}
        </div>
    );

}

export default DrawCards;