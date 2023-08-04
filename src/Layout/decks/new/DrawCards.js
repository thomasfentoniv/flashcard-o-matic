import React from "react";
import DrawCard from "./DrawCard";

function DrawCards({ cards }) {
  if (!cards.length) {
    return <h5>There are no cards.</h5>;
  }

  return (
    <div>
      <h2>Cards</h2>
      {cards.map((card, index) => (
        <DrawCard key={card.id} card={card} />
      ))}
    </div>
  );
}

export default DrawCards;
