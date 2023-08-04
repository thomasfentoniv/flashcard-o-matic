import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { deleteCard } from "../../../utils/api";

function DrawCard({ card }) {
  const { url } = useRouteMatch(); //  /decks/1

  const deleteHandler = async () => {
    const result = window.confirm("Delete this card?\n\nYou will not be able to recover it.");
    if (result) {
      try {
        await deleteCard(card.id);
        // Optionally, you can show a success message or handle the deletion in the parent component.
      } catch (error) {
        console.error("Error deleting card:", error);
        // Optionally, you can show an error message or handle the error in the parent component.
      }
    }
  };

  return (
    <div className="row border border-secondary">
      <div className="col col-6">
        <p>{card.front}</p>
      </div>
      <div className="col col-6">
        <p>{card.back}</p>
        <section className="d-flex justify-content-end mb-2">
          <Link to={`${url}/cards/${card.id}/edit`} className="btn btn-secondary btn mr-2">
            <span className="oi oi-pencil"></span> Edit
          </Link>
          <button className="btn btn-danger float-right" onClick={deleteHandler}>
            <span className="oi oi-trash"></span>
          </button>
        </section>
      </div>
    </div>
  );
}

export default DrawCard;