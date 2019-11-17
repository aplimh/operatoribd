import React, { Component } from "react";
import LOperatori from "./operatori";
import CorpTabel from "./corptabel";
import Formular from "./formular1";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      operatori: LOperatori,
      oper: { id: -1, nume: "", numePrenume: "", email: "", locatie: "" }
    };
    this.adaugOper = this.adaugOper.bind(this);
    this.corectezOpTabel = this.corectezOpTabel.bind(this);
    this.stergOper = this.stergOper.bind(this);
    this.corectezOpForm = this.corectezOpForm.bind(this);
  }

  //  In tabel s-a selectat editare
  corectezOpTabel(ev) {
    const idSup = parseInt(ev.target.id); //  id e convertit in intreg
    console.log(`App oper id: ${idSup}`);
    //  Preiau in state.oper datele operatorului
    const op = this.state.operatori;
    let oper;
    for (let x in op) {
      if (op[x].id === idSup) {
        oper = op[x];
        break;
      }
    }
    console.log(`App oper nume: ${oper.nume}`);
    this.setState({
      operatori: this.state.operatori,
      oper: oper
    });
    const opp = this.state.oper;
    console.log(`App opp keys: ${Object.keys(opp)}`);
  }

  //  In tabel s-a selectat stergere
  stergOper(ev) {
    const idSup = parseInt(ev.target.id); //  id e convertit in intreg
    const { operatori } = this.state;
    const sirNou = operatori.filter(item => {
      return item.id !== idSup;
      //  Obiectul care are id === idSup nu se copiaza in noul sir
    });
    this.setState({
      operatori: sirNou,
      oper: { id: -1, nume: "", numePrenume: "", email: "", locatie: "" }
    });
  }

  //  In formular s-a selectat submit si era o editare
  corectezOpForm(oper) {
    //  Inlocuiesc in state datele operatorului
    console.log(`   in corectezOper oper.nume: ${oper.nume}`);
    const op = this.state.operatori;
    const opnou = op.map(item => {
      if (item.id === oper.id) {
        return oper;
      } else {
        return item;
      }
    });
    this.setState({
      operatori: opnou,
      oper: { id: -1, nume: "", numePrenume: "", email: "", locatie: "Alba" }
    });
  }

  adaugOper(oper) {
    // Voi preiau datele din fomular si creez un obiect nou
    const op = [...this.state.operatori, oper];
    this.setState({ operatori: op });
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
              corectezOpTabel={this.corectezOpTabel}
              stergOper={this.stergOper}
            />
          </tbody>
        </table>
        <Formular
          corectezOpForm={this.corectezOpForm}
          adaugOper={this.adaugOper}
          oper={this.state.oper}
        />
      </div>
    );
  }
}

export default App;
