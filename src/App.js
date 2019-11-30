import React, { Component } from "react";
import LOperatori from "./operatori";
import CorpTabel from "./corptabel";
import Formular from "./formular";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      operatori: LOperatori,
      opedit: { id: 0, nume: "", numePrenume: "", email: "", locatie: "" },
      cheie: 0
    };

    this.stergOper = this.stergOper.bind(this);
    this.corectezOper = this.corectezOper.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
  }

  //  In tabel s-a selectat stergere
  stergOper(ev) {
    const { operatori } = this.state;
    const sirNou = operatori.filter(item => {
      return parseInt(item.id) !== parseInt(ev.target.id);
      //  Obiectul care are id === idSup nu se copiaza in noul sir
    });
    this.setState({
      operatori: sirNou
    });
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
      operatori: lOperatori,
      opedit: oper,
      cheie: idOper //  Important!!! Provoaca reconstruirea componentei "Formular"
    });
  }

  //  In formular s-a selectat submit

  formSubmit(oper) {
    const idOper = parseInt(oper.id);
    let op;
    if (parseInt(oper.id) === 0) {
      //  Este o adaugare
      oper.id = 1000; //  De fapt va fi un id adevarat, venit din baza de date!
      op = [...this.state.operatori, oper];
    } else {
      //  Este o editare
      const opEd = this.state.operatori;
      op = opEd.map(item => {
        if (parseInt(item.id) === idOper) {
          return oper;
        } else {
          return item;
        }
      });
    }
    //  Refac "state"
    this.setState({
      operatori: op,
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
