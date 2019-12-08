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

    fetch("http://localhost/operatoribd/api/listaop.php")
      .then(rezultat => {
        return rezultat.json();
      })
      .then(lista => {
        this.setState({ operatori: lista });
      })
      .catch(error => console.log("Request failed", error));
  }

  componentDidMount() {
    this.reincarc();
  }

  //  In tabel s-a selectat stergere
  stergOper(ev) {
    const idSup = ev.target.id;
    //  Construiesc un obiect FormData
    const formData = new FormData();
    formData.append("id", parseInt(idSup));
    //  Corectez in baza de date
    fetch("http://localhost/operatoribd/api/delop.php", {
      body: formData,
      method: "post"
    }).then(this.reincarc);
  }

  //  In tabel s-a selectat editare
  corectezOper(ev) {
    //  Caut operatorul in lista operatorilor
    const idOper = parseInt(ev.target.id);
    const lOperatori = this.state.operatori;
    const oper = lOperatori.find(item => {
      return parseInt(item.id) === idOper;
    });
    this.setState({
      opedit: oper,
      cheie: idOper //  Important!!! Provoaca reconstruirea componentei "Formular"
    });
  }

  //  In formular s-a selectat submit

  formSubmit(oper) {
    //  Construiesc un obiect FormData
    const formData = new FormData();
    formData.append("id", parseInt(oper.id));
    formData.append("nume", oper.nume);
    formData.append("numePrenume", oper.numePrenume);
    formData.append("email", oper.email);
    formData.append("locatie", oper.locatie);
    if (parseInt(oper.id) === 0) {
      //  Este o adaugare. Incarc contactul in baza de date
      fetch("http://localhost/operatoribd/api/adaop.php", {
        body: formData,
        method: "post"
      }).then(this.reincarc);
    } else {
      //  Este o editare
      fetch("http://localhost/operatoribd/api/modiop.php", {
        body: formData,
        method: "post"
      }).then(this.reincarc);
    }
    //  Refac "state"
    this.setState({
      opedit: { id: 0, nume: "", numePrenume: "", email: "", locatie: "" },
      cheie: 0
    });
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
