import React, { Component, useRef } from 'react';
import {Layout} from "./Layout";

import ReactToPrint from 'react-to-print';

export class Bill extends Component {
  static displayName = Bill.name;


  constructor(props) {
    super(props);
      this.state = { articles: [], form: {
              code: '', quantity: 0
          },
          tempArticle: null,
          name: '',

      };

  }
    componentDidMount() {
        if (!sessionStorage.getItem("username")){
            window.location.href="./"
        }
    }

    onKeyDown = async e => {
        if (e.key === "Tab") {
            if (this.state.form.code){
                const response = await fetch(`api/articles/byCode?code=${this.state.form.code}`);
                const data = await response.json();
                if (data[0]){
                    this.setState({ name: data[0].name, tempArticle: data[0]})
                }
            }
        }
    }

    handleChange = async e => {
        this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        })
    }

    addArticle = async () => {
        if (this.state.form.quantity > 0 && this.state.tempArticle){
            let billDetail = {
                id: this.state.tempArticle.id,
                code: this.state.tempArticle.code,
                name: this.state.tempArticle.name,
                price: this.state.tempArticle.price,
                iva: this.state.tempArticle.iva,
                quantity: this.state.form.quantity,
                total: this.state.tempArticle.iva ? (this.state.tempArticle.price + (this.state.tempArticle.price * 0.13)) * this.state.form.quantity : (this.state.tempArticle.price * this.state.form.quantity)
            };
            this.setState({articles: this.state.articles.concat([billDetail]), form: {
                    code: '',
                    quantity: 0,
                }, name: ''});
        }else{
            alert("Debe agregar minimo un articulo")
        }
    }
    total(){
      let total = 0;
      if (this.state.articles){
          for (const key of this.state.articles) {
              total += key.total;
          }
      }
      return total;
    }

    renderTotal(total){
      if (total > 0){
          return (
              <tr className="table-success">
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td className="fw-bold">{total}</td>
              </tr>
          );
      }
    }

    payBill = async () => {
        if (this.state.articles.length > 0) {
            let billHeader = {
                date : new Date(),
                codeBill: this.makeid(20),
                total: this.total(),
                userId: sessionStorage.getItem("id")
            }
            const requestOptions = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(billHeader)
            };
            const resHeader = await fetch('api/billHeader', requestOptions);
            const data = await resHeader.json();
            for (const article of this.state.articles) {
                let detail = {
                    quantity : article.quantity,
                    billHeaderId: data.id,
                    articleId: article.id
                }
                const requestOptions = {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(detail)
                };
                await fetch('api/billDetail', requestOptions);
            }
            alert("Pago realizado")
        } else {
            alert("Debe al menos agregar un articulo");
        }
    }

    makeid(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() *
                charactersLength));
        }
        return result;
    }

  render() {
    return (
        <Layout>
            <div>
                <h4 id="tabelLabel" >Ventas</h4>
                <div className="container">
                    <div className="row">
                        <div className="col-3">
                            <label htmlFor="code" className="form-label">Código</label>
                            <input type="text" className="form-control" id="code" name="code" onChange={this.handleChange} onKeyDown={this.onKeyDown} value={this.state.form.code}/>
                        </div>
                        <div className="col-3">
                            <label htmlFor="name" className="form-label">Nombre</label>
                            <input type="text" className="form-control" id="name" name="name" readOnly value={this.state.name}/>
                        </div>
                        <div className="col-3">
                            <label htmlFor="quantity" className="form-label">Cantidad</label>
                            <input type="number" className="form-control" id="quantity" name="quantity" onChange={this.handleChange} value={this.state.form.quantity}/>
                        </div>

                        <div className="col-3 d-grid gap-2">
                            <br/>
                            <button className="btn btn-primary" onClick={this.addArticle}>Agregar</button>
                        </div>

                    </div>
                    <div className="row mt-2">
                        <div className="col-12">
                            <table className="table" ref={el => (this.componentRef = el)}>
                                <thead>
                                <tr>
                                    <th scope="col">Código</th>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Precio</th>
                                    <th scope="col">Iva</th>
                                    <th scope="col">Cantidad</th>
                                    <th scope="col">Total</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.articles.map(detail =>
                                    <tr key={detail.id}>
                                        <td>{detail.code}</td>
                                        <td>{detail.name}</td>
                                        <td>{detail.price}</td>
                                        <td><input type="checkbox" readOnly checked={detail.iva}/></td>
                                        <td>{detail.quantity}</td>
                                        <td>{detail.total}</td>
                                    </tr>
                                )}
                                {this.renderTotal(this.total())}
                                </tbody>
                            </table>
                            <div className="text-end">
                                <button className="btn btn-primary" onClick={this.payBill}>Pagar</button>
                            </div>
                            <br/>
                            <div className="text-end">
                                <ReactToPrint content={() => this.componentRef} trigger={() => <button className="btn btn-primary">Imprimir</button> } />
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
  }
}
