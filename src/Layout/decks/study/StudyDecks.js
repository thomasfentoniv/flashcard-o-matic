import React, { useState, useCallback } from "react";
import { useHistory } from "react-router-dom";

function StudyDecks({ cards }) {
  const [flip, setFlip] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const history = useHistory();

  const handleNext = useCallback(() => {
    if (currentIndex === cards.length - 1) {
      const result = window.confirm(
        "Restart cards? \n\nClick 'Cancel' to return to the home page."
      );
      if (result) {
        setCurrentIndex(0);
      } else {
        history.push("/");
      }
    } else {
      setCurrentIndex((current) => current + 1);
    }
    setFlip(false);
  }, [currentIndex, cards.length, history]);

  const handleFlip = useCallback(() => setFlip((prevFlip) => !prevFlip), []);

  if (cards.length < 3) {
    return (
      <div>
        <h2>Not enough cards.</h2>
        <p>
          You need at least 3 cards to study. There are {cards.length} in this
          deck.
        </p>
      </div>
    );
  }

  return (
    <div className="card border border-primary mb-5">
      <div className="card-body">
        <h5 className="card-title">
          Card {currentIndex + 1} of {cards.length}
        </h5>
        <p className="card-text">
          {flip ? cards[currentIndex].back : cards[currentIndex].front}
        </p>
        <button
          type="button"
          className="btn btn-secondary btn mr-2"
          onClick={handleFlip}
        >
          Flip
        </button>
        {flip && (
          <button
            type="button"
            className="btn btn-primary btn"
            onClick={handleNext}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}

export default StudyDecks;
