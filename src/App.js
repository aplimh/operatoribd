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

    return (
      fetch("http://localhost/operatoribd/api/listaop.php")
        .then(rezultat => {
          return rezultat.json();
        })
        //  .then(lista => {
        //    this.setState({ operatori: lista });
        //  })
        .catch(error => console.log("Request failed", error))
    );
  }

  componentDidMount() {
    this.reincarc().then(lista => {
      this.setState({ operatori: lista });
    });
  }

  //  In tabel s-a selectat stergere
  stergOper(ev) {
    //  Construiesc sirul de caractere care se trimite scriptului PHP
    const dateScript = `id=${ev.target.id}`;
    const config = {
      method: "POST",
      headers: { "Content-type": "application/x-www-form-urlencoded" },
      body: dateScript // body data type must match "Content-Type" header
    };

    //  Corectez in baza de date
    fetch("http://localhost/operatoribd/api/delop.php", config)
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
    console.log(`idOper: ${idOper}`);
    if (idOper == this.state.cheie) {
      //  Voi corecta ultimul articol introdus. Pun cheie pe 0!
      idOper = 0;
    }

    this.setState({
      opedit: oper,
      cheie: idOper //  Important!!! Provoaca reconstruirea componentei "Formular"
    });
  }

  //  In formular s-a selectat submit

  formSubmit(oper) {
    const dateScript =
      `id=${parseInt(oper.id)}` +
      `&nume=${oper.nume}` +
      `&numePrenume=${oper.numePrenume}` +
      `&email=${oper.email}` +
      `&locatie=${oper.locatie}`;
    const config = {
      method: "POST",
      headers: { "Content-type": "application/x-www-form-urlencoded" },
      body: dateScript // body data type must match "Content-Type" header
    };
    if (parseInt(oper.id) === 0) {
      //  Este o adaugare. Incarc contactul in baza de date
      const url = "http://localhost/operatoribd/api/adaop.php";
      let id = 0;
      fetch(url, config)
        .then(rezultat => {
          return rezultat.json();
        })
        .then(raspuns => {
          id = raspuns[1].id;
        });
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
          cheie: id
        });
      });
    } else {
      //  Este o editare
      const url = "http://localhost/operatoribd/api/modiop.php";
      fetch(url, config).then(rezultat => {
        return rezultat.json();
      });
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
    }
  }

  render() {
    //  in Formular folosesc this.props.edit (contact de editat)
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
