import React from "react";

function CardForm({ front, setFront, back, setBack }) {
  return (
    <div>
      <div className="form-group">
        <label htmlFor="front">Front</label>
        <textarea
          id="front"
          className="form-control"
          placeholder="Front side of card"
          rows="3"
          required
          value={front}
          onChange={(event) => setFront(event.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="back">Back</label>
        <textarea
          id="back"
          className="form-control"
          placeholder="Back side of the card"
          rows="3"
          required
          value={back}
          onChange={(event) => setBack(event.target.value)}
        />
      </div>
    </div>
  );
}

export default CardForm;