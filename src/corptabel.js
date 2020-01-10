import React, { Component } from "react";
import RandTabel from "./randtabel";
class CorpTabel extends Component {
  render() {
    const { operatori, corectezOper, stergOper } = this.props;
    if (operatori) {
      const lista = operatori.map(item => (
        <RandTabel
          operator={item}
          corectezOper={corectezOper}
          stergOper={stergOper}
          key={item.id}
        />
      ));

      return lista;
    } else return null;
  }
}

export default CorpTabel;
