import React, {Component} from 'react';
import {Layout} from './Layout';

export class Home extends Component {
  static displayName = Home.name;

    constructor(props) {
        super(props);
        this.state = { articles: [], loading: true,
            form: {
                id: 0,
                code: '',
                name: '',
                price: 0,
                iva: false
            }
        };
    }


  componentDidMount() {
      if (!sessionStorage.getItem("username")){
          window.location.href="./"
      }else{
          this.articlesData();
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

    handleChangeCheckbox = async e => {
        this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: !!e.target.checked
            }
        })
    }

    save = async  () => {
        let article = {
            code: this.state.form.code,
            name: this.state.form.name,
            price: this.state.form.price,
            iva: this.state.form.iva,
        }
        if (this.state.form.id > 0) {
            article = {
                id: this.state.form.id,
                code: this.state.form.code,
                name: this.state.form.name,
                price: this.state.form.price,
                iva: this.state.form.iva,
            }
        }
        if (this.state.form.code && this.state.form.name && this.state.form.price > 0){
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(article)
            };
            const response = await fetch('api/articles', requestOptions);
            this.articlesData();
            this.setState({ form: {
                    id: 0,
                    code: '',
                    name: '',
                    price: 0,
                    iva: false,
                } })
        }else {
            alert("Ingresar todos los datos requeridos");
        }

    }

    edit = async article => {
        let temp = {
            id: article.id,
            code: article.code,
            name: article.name,
            price: article.price,
            iva: article.iva
        }
        this.setState({form: temp });
    }

    delete = async id => {
        const requestOptions = {
            method: 'DELETE',
        }
        const response = await fetch(`api/articles/${id}`, requestOptions);
        this.articlesData();
    }

     totalIva(article) {
        if (article.iva){
            let iva = article.price * 0.13;
            return article.price + iva
        }else {
            return article.price;
        }
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Cargando...</em></p>
            : <div className="container">
                <div className="row">
                    <div className="col-6">
                        <table className="table table-bordered">
                            <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Código</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Precio</th>
                                <th scope="col">Iva</th>
                                <th scope="col">Total</th>
                                <th scope="col">Acción</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.articles.map(article =>
                                <tr key={article.id}>
                                    <td>{article.id}</td>
                                    <td>{article.code}</td>
                                    <td>{article.name}</td>
                                    <td>{article.price}</td>
                                    <td>
                                        <input type="checkbox" readOnly checked={article.iva}/>
                                    </td>
                                    <td>{this.totalIva(article)}</td>
                                    <td>
                                        <button type="button" className="btn btn-primary m-1" onClick={() => this.edit(article)}>edit
                                        </button>
                                        <button type="button" className="btn btn-danger m-1" onClick={() => this.delete(article.id)}>delete
                                        </button>
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                    <div className="col-6">
                        <h4>Agregar articulo</h4>
                        <div className="form-text">
                            <label htmlFor="code" className="form-label">Código </label>
                            <input type="text" className="form-control" id="code" name="code" onChange={this.handleChange} value={this.state.form.code}/>
                        </div>
                        <div className="form-text">
                            <label htmlFor="name" className="form-label">Nombre</label>
                            <input type="text" className="form-control" id="name" name="name" onChange={this.handleChange} value={this.state.form.name}/>
                        </div>
                        <div className="form-text">
                            <label htmlFor="price" className="form-label">Precio</label>
                            <input type="number" className="form-control" id="price" name="price" onChange={this.handleChange} value={this.state.form.price}/>
                        </div>
                        <div className="form-text">
                            <label htmlFor="iva" className="form-label">IVA</label>
                            <input type="checkbox" className="form-check-input" id="iva" name="iva" onChange={this.handleChangeCheckbox} checked={this.state.form.iva}/>
                        </div>

                        <div className="form-text">
                            <button className="btn btn-primary" onClick={this.save}>Guardar</button>
                        </div>
                    </div>
                </div>
            </div>
        return (
            <Layout>
                <div>
                    <h1 id="tabelLabel" >Articulos</h1>
                    <p>Lista de ariculos</p>
                    {contents}
                </div>
            </Layout>
        );
  }

    async articlesData() {
        const response = await fetch('api/articles');
        const data = await response.json();
        this.setState({ articles: data, loading: false });
    }
}
