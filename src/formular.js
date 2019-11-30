import React, { Component } from "react";
class Formular extends Component {
  constructor(props) {
    super(props);
    //  Initializez obiectul "state"
    this.state = this.props.oper;

    //  Functii de tratare a evenimentelor "change" si "submit"
    this.modifica = this.modifica.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  modifica(ev) {
    const { name, value } = ev.target;

    this.setState({
      [name]: value
    });
  }

  onFormSubmit(ev) {
    ev.preventDefault();
    this.props.formSubmit(this.state);
  }

  render() {
    const { nume, numePrenume, email, locatie } = this.state;
    return (
      <form onSubmit={this.onFormSubmit}>
        <div className="form-row">
          <div className="form-group col-sm-3 mb-3">
            <label htmlFor="nume">Nume</label>
            <input
              type="text"
              className="form-control"
              name="nume"
              id="nume"
              value={nume}
              onChange={this.modifica}
            />
          </div>

          <div className="form-group col-sm-4 mb-3">
            <label htmlFor="nupren">Nume și prenume</label>
            <input
              type="text"
              className="form-control"
              name="numePrenume"
              id="nupren"
              value={numePrenume}
              onChange={this.modifica}
            />
          </div>

          <div className="form-group col-sm-4 mb-3">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              className="form-control"
              name="email"
              id="email"
              value={email}
              onChange={this.modifica}
            />
          </div>

          <div className="form-group col-sm-2 mb-3">
            <label htmlFor="loc">Locație</label>
            <select
              className="form-control"
              id="loc"
              name="locatie"
              value={locatie}
              onChange={this.modifica}
            >
              <option>Alba</option>
              <option>Argeș</option>
              <option>Arad</option>
              <option>București</option>
              <option>Bacău</option>
              <option>Bihor</option>
              <option>Bistrița Năsăud</option>
              <option>Brăila</option>
              <option>Botoșani</option>
              <option>Brașov</option>
              <option>Buzău</option>
              <option>Cluj</option>
              <option>Călărași</option>
              <option>Caraș-Severin</option>
              <option>Constanța</option>
            </select>
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          Memorează
        </button>
      </form>
    );
  }
}

export default Formular;
