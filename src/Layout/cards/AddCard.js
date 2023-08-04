import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { createCard, readDeck } from "../../utils/api";
import NavBar from "../NavBar";
import NotFound from "../NotFound";
import CardForm from "./CardForm";

function AddCard() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState({});
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");

  useEffect(() => {
    const abortController = new AbortController();
    readDeck(deckId, abortController.signal)
      .then(setDeck)
      .catch((error) => {
        console.error("Error fetching deck:", error);
        return <NotFound />;
      });
    return () => abortController.abort();
  }, [deckId]);

  if (!deck.id) {
    return <NotFound />;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const card = {
      front,
      back,
    };
    createCard(deckId, card)
      .then(() => {
        window.alert("New card added");
        setFront("");
        setBack("");
      })
      .catch((error) => {
        console.error("Error creating card:", error);
      });
  };

  return (
    <div>
      <NavBar items={[deck.name, "Add Card"]} />
      <h2>{deck.name}: Add Card</h2>
      <form onSubmit={handleSubmit}>
        <CardForm
          front={front}
          setFront={setFront}
          back={back}
          setBack={setBack}
        />

        <Link
          to={`/decks/${deckId}`}
          className="form-button btn btn-secondary btn-lg mr-2"
        >
          Done
        </Link>
        <button type="submit" className="btn btn-primary btn-lg">
          Save
        </button>
      </form>
    </div>
  );
}

export default AddCard;
