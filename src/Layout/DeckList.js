import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listDecks } from "../utils/api";
import DeckCardItem from "./DeckCardItem";

// Custom hook for fetching decks
function useDecks() {
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();

    async function fetchDecks() {
      try {
        const fetchedDecks = await listDecks(abortController.signal);
        setDecks(fetchedDecks);
      } catch (error) {
        console.error(error);
      }
    }

    fetchDecks();

    return () => abortController.abort();
  }, []);

  return decks;
}

function DeckList() {
  const decks = useDecks();

  // If no decks found, show a message
  if (decks.length === 0) {
    return <p>No decks found</p>;
  }

  return (
    <div>
      <Link
        to={`/decks/new`}
        type="button"
        className="btn btn-secondary btn-lg"
      >
        <span className="bi bi-plus-lg"></span> Create Deck
      </Link>
      {decks.map((deck) => (
        <DeckCardItem deck={deck} key={deck.id || deck.name} />
      ))}
    </div>
  );
}

export default DeckList;
