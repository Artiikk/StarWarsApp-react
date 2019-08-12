import React, { Component } from 'react';

import ItemList from '../item-list';
import PersonDetails from '../item-details';
import ErrorIndicator from '../error-indicator';
import SwapiService from "../../services/swapi-service";
import Row from '../row'
import ErrorBoundry from '../error-boundry';
import './people-page.css';


export default class PeoplePage extends Component {

  swapiService = new SwapiService();

  state = {
    selectedPerson: 4,
    hasError: false
  };

  componentDidCatch() {
    this.setState({
      hasError: true
    });
  }

  onPersonSelected = (id) => {
    this.setState({
      selectedPerson: id
    });
  }

  render() {
    if (this.state.hasError) return <ErrorIndicator />;

    const itemList = (
      <ItemList
      onItemSelected={this.onPersonSelected}
      getData={this.swapiService.getAllPeople}

      renderItem={({name, gender, birthYear}) =>
      (`${name} (${gender}, ${birthYear})`)} />
    );

    const personDetails = (
      <ErrorBoundry>
        <PersonDetails personId={this.state.selectedPerson} />
      </ErrorBoundry>
    );

    return(
        <Row left={itemList} right={personDetails}/>
    );
  }
}
