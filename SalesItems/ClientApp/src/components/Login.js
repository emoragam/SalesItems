import React, { Component } from 'react'
import '../css/Login.css'

export class Login extends Component {
  state={
    form: {
      username: '',
      password: ''
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

  login = async  () => {
    const response = await fetch(`api/user/login?username=${this.state.form.username}&password=${this.state.form.password}`);
    const data = await response.json();
    if (data[0]){
      sessionStorage.setItem("username", this.state.form.username);
      sessionStorage.setItem("password", this.state.form.password);
      sessionStorage.setItem("id", data[0].id);
      window.location.href="./home"
    }else {
      alert("El usuario o contraseña es incorrecto");
    }
  }

  componentDidMount() {
    if (sessionStorage.getItem("username")){
      window.location.href="./home"
    }
  }

  render() {
    return (
      <div className="containerPrincipal">
        <div className="containerSecundario">
          <label>Usuario: </label>
          <br/>
          <input type="text" className="form-control" name="username" onChange={this.handleChange}/>
          <br/>
          <label>Contraseña: </label>
          <br/>
          <input type="password" className="form-control" name="password" onChange={this.handleChange}/>
          <br/>
          <button className="btn btn-primary" onClick={this.login}>Iniciar sesión</button>
        </div>
      </div>
    )
  }
}
