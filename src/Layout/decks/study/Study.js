import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { readDeck } from "../../../utils/api";
import NavBar from "../../NavBar";
import NotFound from "../../NotFound";
import StudyDecks from "./StudyDecks";

function Study() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();

    async function fetchDeck() {
      try {
        const fetchedDeck = await readDeck(deckId, abortController.signal);
        setDeck(fetchedDeck);
      } catch (e) {
        console.error("Error inside Study.js: ", e.message);
        setError(e.message);
      }
    }

    fetchDeck();

    return () => abortController.abort();
  }, [deckId]);

  if (!deck.id || error) {
    return <NotFound />;
  }

  return (
    <div>
      <NavBar items={[deck.name, "Study"]} />
      <h2>Study: {deck.name}</h2>
      <StudyDecks cards={deck.cards} />
    </div>
  );
}

export default Study;
