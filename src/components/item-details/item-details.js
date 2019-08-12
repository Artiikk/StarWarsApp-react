import React, { Component } from "react";

import SwapiService from "../../services/swapi-service";
import ErrorButton from '../error-button';
import Spinner from "../spinner";

import "./item-details.css";

export default class PersonDetails extends Component {

  swapiService = new SwapiService();

  state = {
    person: {},
    loading: true
  }

  componentDidUpdate(prevProps) {
    if (this.props.personId !== prevProps.personId) {
      this.setState({ loading: true });
      this.updatePerson();
    }
  }

  componentDidMount() {
    this.updatePerson();
  }

  updatePerson() {
    const { personId } = this.props;
    if (!personId) return;

    this.swapiService
    .getPerson(personId)
    .then((person) => {
      this.setState({
        person: person,
        loading: false
      });
    });
  }


  render() {
    const { person, loading } = this.state;

    const content = loading ? <Spinner /> : <PersonView person={person}/>;
    return (
      <React.Fragment>
        {content}
      </React.Fragment>
    );
  }
}

const PersonView = ({ person }) => {
  const { id, name, gender, birthYear, eyeColor, mass } = person;
  return (
    <React.Fragment>
      <div className="person-details card">
        <img
          className="person-image"
          src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
          alt="Star wars character" />

        <div className="card-body">
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="term">Gender:</span>
              <span>{gender}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Birth Year:</span>
              <span>{birthYear}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Eye Color:</span>
              <span>{eyeColor}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Mass:</span>
              <span>{mass}</span>
            </li>
          </ul>
           <ErrorButton />
        </div>
      </div>
    </React.Fragment>
  );
}
