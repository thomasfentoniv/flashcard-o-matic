import React, { useEffect, useState } from "react";
import { useHistory, useParams, useRouteMatch } from "react-router";
import { Link } from "react-router-dom";
import { deleteDeck, readDeck } from "../../../utils/api";
import DrawCards from "./DrawCards";
import NavBar from "../../NavBar";
import NotFound from "../../NotFound";

function DeckAndCards() {
  const [deck, setDeck] = useState({});
  const { deckId } = useParams();
  const { url } = useRouteMatch();
  const history = useHistory();

  useEffect(() => {
    const abortController = new AbortController();
    readDeck(deckId, abortController.signal)
      .then(setDeck)
      .catch((e) => console.log(e.message));
    return () => abortController.abort();
  }, [deckId]);

  const handleDeckDelete = () => {
    if (
      window.confirm("Delete this deck?\n\nYou will not be able to recover it.")
    ) {
      deleteDeck(deckId).then(() => {
        history.push("/");
      });
    }
  };

  if (!deck.id) {
    return <NotFound />;
  }

  return (
    <div>
      <div className="mb-5">
        <NavBar items={[deck.name]} />
        <h2>{deck.name}</h2>
        <p>{deck.description}</p>
        <Link
          to={`${url}/edit`}
          type="button"
          className="btn btn-secondary mr-2"
        >
          <span className="bi bi-pencil"></span> Edit
        </Link>
        <Link to={`${url}/study`} className="btn btn-primary mr-2">
          <span className="bi bi-book"></span> Study
        </Link>
        <Link
          to={`${url}/cards/new`}
          type="button"
          className="btn btn-primary mr-2"
        >
          <span className="bi bi-plus"></span> Add Cards
        </Link>
        <button
          type="button"
          onClick={handleDeckDelete}
          className="btn btn-danger mr-2 float-right"
        >
          <span className="bi bi-trash "></span>
        </button>
      </div>
      <div>
        <DrawCards cards={deck.cards} />
      </div>
    </div>
  );
}

export default DeckAndCards;
