import React, { Component } from "react";
import RandTabel from "./randtabel";
class CorpTabel extends Component {
  render() {
    const { operatori, corectezOper, stergOper } = this.props;
    const lista = operatori.map(item => (
      <RandTabel
        operator={item}
        corectezOper={corectezOper}
        stergOper={stergOper}
        key={item.id}
      />
    ));

    return lista;
  }
}

export default CorpTabel;
