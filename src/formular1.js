import React, { Component } from "react";

class Formular extends Component {
  constructor(props) {
    super(props);
    this.rnume = React.createRef();
    this.rnumePrenume = React.createRef();
    this.remail = React.createRef();
    this.rlocatie = React.createRef();

    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onFormSubmit(ev) {
    ev.preventDefault();
    console.log(`   in onFormSubmit nume: ${this.props.oper.nume}`);
    //  Verific daca este editare sau operator nou
    if (this.props.oper.nume) {
      //  Preiau valorile
      const nume = this.rnume.current.value;
      const numePren = this.rnumePrenume.current.value;
      const email = this.remail.current.value;
      const locatie = this.rlocatie.current.value;
      const valori = {
        id: this.props.oper.id,
        nume: nume,
        numePrenume: numePren,
        email: email,
        locatie: locatie
      };
      this.props.corectezOpForm(valori);
      console.log(`   in Formular, submit, oper.id: ${valori.id}`);
      this.rnume.current.value = "";
      this.rnumePrenume.current.value = "";
      this.remail.current.value = "";
      this.rlocatie.current.value = "Alba";
    } else {
    }
  }

  render() {
    const { nume, numePrenume, email, locatie } = this.props.oper;

    return (
      <form onSubmit={this.onFormSubmit}>
        <div className="form-row">
          <div className="form-group col-sm-3 mb-3">
            <label htmlFor="nume">Nume</label>
            <input
              type="text"
              className="form-control"
              id="nume"
              defaultValue={nume || ""}
              ref={this.rnume}
            />
          </div>

          <div className="form-group col-sm-4 mb-3">
            <label htmlFor="nupren">Nume și prenume</label>
            <input
              type="text"
              className="form-control"
              name="numePrenume"
              id="nupren"
              defaultValue={numePrenume || ""}
              ref={this.rnumePrenume}
            />
          </div>

          <div className="form-group col-sm-4 mb-3">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              className="form-control"
              name="email"
              id="email"
              defaultValue={email || ""}
              ref={this.remail}
            />
          </div>

          <div className="form-group col-sm-2 mb-3">
            <label htmlFor="loc">Locație</label>
            <select
              className="form-control"
              id="loc"
              defaultValue={locatie || "Alba"}
              name="locatie"
              ref={this.rlocatie}
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
