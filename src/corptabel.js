import React, { Component } from "react";
import RandTabel from "./randtabel";
class CorpTabel extends Component {
  render() {
    const { operatori, corectezOpTabel, stergOper } = this.props;
    const lista = operatori.map(item => (
      <RandTabel
        operator={item}
        corectezOpTabel={corectezOpTabel}
        stergOper={stergOper}
        key={item.id}
      />
    ));

    return lista;
  }
}

export default CorpTabel;
