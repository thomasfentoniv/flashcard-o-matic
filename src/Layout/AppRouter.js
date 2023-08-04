import React from "react";
import { Route, Switch } from "react-router-dom";
import CreateDeck from "./decks/new/CreateDeck";
import Study from "./decks/study/Study";
import DeckList from "./DeckList";
import NotFound from "./NotFound";
import DeckAndCards from "./decks/new/DeckAndCards";
import EditDeck from "./decks/edit/EditDeck";
import AddCard from "./cards/AddCard";
import EditCard from "./cards/EditCard";

function AppRouter() {
  return (
    <Switch>
      <Route exact path="/" component={DeckList} />
      <Route path="/decks/new" component={CreateDeck} />
      <Route path="/decks/:deckId/study" component={Study} />
      <Route path="/decks/:deckId/edit" component={EditDeck} />
      <Route path="/decks/:deckId/cards/new" component={AddCard} />
      <Route path="/decks/:deckId/cards/:cardId/edit" component={EditCard} />
      <Route path="/decks/:deckId" component={DeckAndCards} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default AppRouter;
