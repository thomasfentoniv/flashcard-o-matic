import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { createDeck } from "../../../utils/api";
import NavBar from "../../NavBar";

function CreateDeck() {
  const [deckName, setDeckName] = useState("");
  const [deckDescription, setDeckDescription] = useState("");
  const history = useHistory();
  const [abortControllers, setAbortControllers] = useState([]);

  const abortPreviousCall = () => {
    if (abortControllers.length) {
      const lastIndex = abortControllers.length - 1;
      const lastAbortController = abortControllers[lastIndex];
      lastAbortController.abort();
      setAbortControllers((prevControllers) =>
        prevControllers.slice(0, lastIndex)
      );
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    abortPreviousCall();
    const newAbortController = new AbortController();
    setAbortControllers((prevControllers) => [
      ...prevControllers,
      newAbortController,
    ]);

    const deck = {
      name: deckName,
      description: deckDescription,
    };

    try {
      const { id } = await createDeck(deck, newAbortController.signal);
      history.push("/decks/" + id);
    } catch (error) {
      console.error("Error creating deck:", error);
    }
  };

  useEffect(() => {
    return () => {
      abortPreviousCall();
    };
  }, []);

  return (
    <div>
      <NavBar items={["Create Deck"]} />
      <h2>Create Deck</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="deckName">Name</label>
          <input
            type="text"
            className="form-control"
            id="deckName"
            aria-describedby="newDeck"
            placeholder="Deck Name"
            required
            value={deckName}
            onChange={({ target: { value } }) => {
              setDeckName(value);
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control"
            id="description"
            placeholder="Brief description of the deck"
            rows="3"
            required
            value={deckDescription}
            onChange={({ target: { value } }) => {
              setDeckDescription(value);
            }}
          />
        </div>
        <button type="reset" className="btn btn-secondary btn mr-2">
          Cancel
        </button>
        <button type="submit" className="btn btn-primary btn">
          Submit
        </button>
      </form>
    </div>
  );
}

export default CreateDeck;
