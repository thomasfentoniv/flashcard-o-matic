import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { deleteDeck } from "../utils/api";

function DeckCardItem({ deck }) {
  const history = useHistory();
  const { id, cards } = deck; // destructure id and cards from deck

  const [isDeleting, setDeleting] = useState(false); // Renamed 'deleting' to 'isDeleting'

  const handleDeckDelete = async () => {
    if (
      window.confirm("Delete this card?\n\nYou will not be able to recover it.")
    ) {
      try {
        setDeleting(true);
        await deleteDeck(id);
        setDeleting(false);
        history.push("/");
      } catch (error) {
        console.error(error); // log error for debug
        history.push("/NotFound");
      }
    }
  };

  return (
    <div className="card border border-primary mt-3">
      <div className="card-body">
        <h5 className="card-title">
          {deck.name}{" "}
          <small className="float-right">{cards.length} cards</small>
        </h5>
        <p className="card-text">{deck.description}</p>
        <Link
          to={`/decks/${id}`}
          type="button"
          className="btn btn-secondary btn-lg mr-1"
        >
          <span className="oi oi-eye"></span> View
        </Link>
        <Link
          to={`/decks/${id}/study`}
          type="button"
          className="btn btn-primary btn-lg"
        >
          <span className="oi oi-book"></span> Study
        </Link>
        <button
          type="button"
          onClick={handleDeckDelete}
          className="btn btn-danger mr-2 float-right"
          disabled={isDeleting} // Updated the variable name here
        >
          <span className="oi oi-trash"></span>{" "}
          {isDeleting ? "Deleting..." : "Delete"}{" "}
          {/* Updated the variable name here */}
        </button>
      </div>
    </div>
  );
}

export default DeckCardItem;
