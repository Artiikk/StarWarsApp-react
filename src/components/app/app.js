import React, { Component } from "react";

import Header from "../header";
import RandomPlanet from "../random-planet";
import SwapiService from "../../services/swapi-service";
import ErrorBoundry from "../error-boundry";

import ItemList from "../item-list";
import PersonDetails from "../person-details";
import PeoplePage from "../people-page";

import "./app.css";

export default class App extends Component {
  state = {
    selectedPerson: 4
  };

  swapiService = new SwapiService();

  render() {
    return (
      <ErrorBoundry>
        <div className="stardb-app">
          <Header />
          <RandomPlanet />

          <PeoplePage />

          <div className="row mb2">
            <div className="col-md-6">
              <ItemList
                onItemSelected={this.onPersonSelected}
                getData={this.swapiService.getAllPlanets}
                renderItem={item => (
                  <span>
                    {item.name} <button>!</button>
                  </span>
                )}/>
            </div>
            <div className="col-md-6">
              <PersonDetails personId={this.state.selectedPerson} />
            </div>
          </div>

          <div className="row mb2">
            <div className="col-md-6">
              <ItemList
                onItemSelected={this.onPersonSelected}
                getData={this.swapiService.getAllStarships}
                renderItem={item => item.name} />
            </div>
            <div className="col-md-6">
              <PersonDetails personId={this.state.selectedPerson} />
            </div>
          </div>
        </div>
      </ErrorBoundry>
    );
  }
}
