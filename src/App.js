import React, { Component } from "react";
import CorpTabel from "./corptabel";
import Formular from "./formular";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      operatori: [],
      opedit: { id: 0, nume: "", numePrenume: "", email: "", locatie: "" },
      cheie: 0
    };

    this.stergOper = this.stergOper.bind(this);
    this.corectezOper = this.corectezOper.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
    this.reincarc = this.reincarc.bind(this);
  }

  reincarc() {
    //  reincarc lista de contacte din baza de date

    return fetch("http://localhost/operatoribd/api/operatori.php")
      .then(rezultat => {
        return rezultat.json();
      })
      .catch(error => console.log("Request failed: ", error));
  }

  componentDidMount() {
    this.reincarc().then(lista => {
      this.setState({ operatori: lista });
    });
  }

  //  In tabel s-a selectat stergere
  stergOper(ev) {
    //  Construiesc sirul de caractere care se trimite serviciului REST
    const dateScript = JSON.stringify({ id: parseInt(ev.target.id) });
    const config = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: dateScript
    };

    //  Corectez in baza de date
    fetch("http://localhost/operatoribd/api/operatori.php", config)
      .then(this.reincarc) //  this.reincarc a returnat lista decodficata
      .then(lista => this.setState({ operatori: lista }));
  }

  //  In tabel s-a selectat editare
  corectezOper(ev) {
    //  Caut operatorul in lista operatorilor
    let idOper = parseInt(ev.target.id);
    const lOperatori = this.state.operatori;
    const oper = lOperatori.find(item => {
      return parseInt(item.id) === idOper;
    });
    // console.log(`idOper: ${idOper}`);
    if (idOper === this.state.cheie) {
      //  Voi corecta ultimul articol introdus. Pun cheie pe 0!
      idOper = 0;
    }

    this.setState({
      opedit: oper,
      cheie: idOper //  Reconstruiesc componenta "Formular"
    });
  }

  //  In formular s-a selectat butonul "submit"

  formSubmit(oper) {
    const dateScript = JSON.stringify(oper);
    let config = {
      headers: { "Content-Type": "application/json" },
      body: dateScript
    };
    const url = "http://localhost/operatoribd/api/operatori.php";
    if (parseInt(oper.id) === 0) {
      //  Este o adaugare. Incarc contactul in baza de date
      config.method = "POST";
      fetch(url, config)
        .then(rezultat => {
          return rezultat.json();
        })
        .then(raspuns => {
          return raspuns[1].id;
        })
        .then(ident => {
          this.reincarc().then(lista => {
            this.setState({
              operatori: lista,
              opedit: {
                id: 0,
                nume: "",
                numePrenume: "",
                email: "",
                locatie: ""
              },
              cheie: ident
            });
          });
        });
    } else {
      //  Este o editare
      config.method = "PUT";
      fetch(url, config)
        .then(rezultat => {
          return rezultat.json();
        })
        .then(() => {
          this.reincarc().then(lista => {
            this.setState({
              operatori: lista,
              opedit: {
                id: 0,
                nume: "",
                numePrenume: "",
                email: "",
                locatie: ""
              },
              cheie: 0
            });
          });
        });
    }
  }

  render() {
    return (
      <div className="container">
        <h2 className="text-center mt-5 mb-3">
          Lista operatorilor aplicației <em>ALEGERI</em>
        </h2>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th scope="col">Nume login</th>
              <th scope="col">Nume și prenume</th>
              <th scope="col">Email</th>
              <th scope="col">Locație</th>
              <th scope="col">Operații</th>
            </tr>
          </thead>
          <tbody>
            <CorpTabel
              operatori={this.state.operatori}
              stergOper={this.stergOper}
              corectezOper={this.corectezOper}
            />
          </tbody>
        </table>
        <hr></hr>
        <Formular
          key={this.state.cheie}
          oper={this.state.opedit}
          formSubmit={this.formSubmit}
        />
      </div>
    );
  }
}

export default App;
