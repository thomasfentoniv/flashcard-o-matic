import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router";
import { Link } from "react-router-dom";
import { updateCard, readDeck } from "../../utils/api";
import NavBar from "../NavBar";
import NotFound from "../NotFound";
import CardForm from "./CardForm";

function EditCard() {
  const { deckId, cardId } = useParams();
  const [deck, setDeck] = useState({});
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const history = useHistory();

  useEffect(() => {
    const abortController = new AbortController();
    readDeck(deckId, abortController.signal)
      .then((deck) => {
        setDeck(deck);
        const card = deck.cards.find((card) => card.id === parseInt(cardId));
        setFront(card.front);
        setBack(card.back);
      })
      .catch((error) => {
        console.error("Error fetching deck:", error);
        return <NotFound />;
      });
    return () => abortController.abort();
  }, [deckId, cardId]);

  if (!deck.id) {
    return <NotFound />;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const card = {
      id: cardId,
      front,
      back,
    };
    updateCard(card)
      .then(() => {
        window.alert("Card was updated");
        history.push(`/decks/${deckId}`);
      })
      .catch((error) => {
        console.error("Error updating card:", error);
      });
  };

  return (
    <div>
      <NavBar items={[deck.name, "Edit Card " + cardId]} />
      <form onSubmit={handleSubmit}>
        <CardForm
          front={front}
          setFront={setFront}
          back={back}
          setBack={setBack}
        />

        <Link to={`/decks/${deckId}`} className="btn btn-secondary btn-lg mr-2">
          Cancel
        </Link>
        <button type="submit" className="btn btn-primary btn-lg">
          Submit
        </button>
      </form>
    </div>
  );
}

export default EditCard;
