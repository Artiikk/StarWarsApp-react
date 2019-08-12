export default class SwapiService {
  _apiBase = `https://swapi.co/api`;

  getResponse = async (url) => {
    const response = await fetch(`${this._apiBase}${url}`);
    if (!response.ok) throw new Error(`Could not fetch ${url}`);
    return response.json();
  };

  getAllPeople = async () => {
    const response = await this.getResponse(`/people/`);
    return response.results.map(this._transformPerson);
  };

  getPerson = async (id) => {
    const person = await this.getResponse(`/people/${id}/`);
    return this._transformPerson(person);
  };

  getAllPlanets = async () => {
    const response = await this.getResponse(`/planets/`);
    return response.results.map(this._transformPlanet);
  };

  getPlanet = async (id) => {
    const planet = await this.getResponse(`/planets/${id}/`);
    return this._transformPlanet(planet);
  };

  getAllStarships = async () => {
    const response = await this.getResponse(`/starships/`);
    return response.results.map(this._transformStarship);
  };

  getStarship = async (id) => {
    const starship = await this.getResponse(`/starships/${id}/`);
    return this._transformStarship(starship);
  };

  _extractId = (item) => {
    const id = /\d+/;
    return item.url.match(id)[0];
  }

  _transformPlanet = (planet) => {
    return {
      id: this._extractId(planet),
      name: planet.name,
      population: planet.population,
      rotationPeriod: planet.rotation_period,
      diameter: planet.diameter
    }
  }

  _transformStarship = (starship) => {
    return {
      id: this._extractId(starship),
      name: starship.name,
      model: starship.model,
      manufacturer: starship.manufacturer,
      costInCredits: starship.contInCredits,
      length: starship.length,
      crew: starship.crew,
      passengers: starship.passengers,
      cargoCapacity: starship.cargoCapacity
    }
  }

  _transformPerson = (person) => {
    return {
      id : this._extractId(person),
      name: person.name,
      gender: person.gender,
      birthYear: person.birth_year,
      eyeColor: person.eye_color,
      mass: person.mass
    }
  }
}
