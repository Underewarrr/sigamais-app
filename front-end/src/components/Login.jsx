import React, {useEffect, useState} from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import Footer from './Footer'
import axios from "axios";
import { Alert, Container } from 'react-bootstrap'
import Header from './Header'

const Login = (props) => {
const {history} = props

    const [loadginLogin, setLoadingLogin] = useState(false);
    const [errorLogin, setErrorLogin] = useState(false);
    const [successLogin, setSuccessLogin] = useState(false);
    const [email, setEmail] = useState('');
    const [token, setToken] = useState('');


    function generateToken () {
        const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        setToken(token);
    }
    useEffect(() => {
        generateToken();
    } , [token]);

        const handleClickLogin = (values) => { 
      axios.post("http://localhost:3001/login", {
      email: values.email,
      password: values.password,
    }).then((response) => {
      if (response.data === "Login realizado com sucesso") {
        setLoadingLogin(true);
        generateToken();
        setTimeout (() => {
          setSuccessLogin(true);
        }
        , 2500);

        setTimeout(() => {
          history.push('/painel');
          localStorage.setItem("token", token);
          localStorage.setItem("email", values.email);
          setEmail(values.email);
        } , 3000);

        setTimeout(() => {
          setLoadingLogin(false);
          setSuccessLogin(false);
        }
        , 3000);
      }
    });
  };

    const validadtionSchema = Yup.object().shape({
        email: Yup.string()
            .email('Invalid email')
            .required('Required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters')
    })


  return (
    <>
    <Header />
<section className="vh-100">
  <div className="container-fluid h-custom">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-md-9 col-lg-6 col-xl-5">
        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
          className="img-fluid" alt="Sample image" />
      </div>
      <Formik
      initialValues={{}}
      onSubmit={handleClickLogin}
        validationSchema={validadtionSchema}   
      >
      <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
        <Form>
          <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
            <p className="lead fw-normal mb-0 me-3">Logue sua conta</p>
            <button type="button" className="btn btn-primary btn-floating mx-1">
              <i className="fab fa-facebook-f">Facebook</i>
            </button>

            <button type="button" className="btn btn-primary btn-floating mx-1">
              <i className="fab fa-twitter">Twitter</i>
            </button>

            <button type="button" className="btn btn-primary btn-floating mx-1">
              <i className="fab fa-linkedin-in">Linkedin</i>
            </button>
          </div>

          <div className="divider d-flex align-items-center my-4">
            <p className="text-center fw-bold mx-3 mb-0">Or</p>
          </div>

          <div className="form-outline mb-4">
            <Field name="email" className="form-control form-control-lg" placeholder="Enter a valid email address" />
            <label className="form-label" htmlFor="form3Example3">Email</label>
          </div>
          <div className="form-outline mb-3">
            <Field name="password" className="form-control form-control-lg" placeholder="Enter your password" />
            <label className="form-label" htmlFor="form3Example4">Senha</label>
            <ErrorMessage
            name="password"
            component={() => (
                <div className="alert alert-danger" role="alert">
                    <p>
                        Insira uma senha ou email valido
                    </p>
                </div>
            )}
            />
          </div>
          <div className="overlay" style={{display: loadginLogin ? 'block' : 'none'}}>
        <div className="overlay-content">
        <div className="d-flex justify-content-between">
        <div class="spinner-grow text-primary" role="status">

        </div>
        
        <Alert variant="success" show={successLogin}>
        Logado com sucesso
        </Alert>
        <div class="spinner-grow text-primary" role="status">

        </div>
        </div>
        </div>
        </div>
          <div className="d-flex justify-content-between align-items-center">
            <div className="form-check mb-0">
              <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
              <label className="form-check-label" htmlFor="form2Example3">
                Lembrar conta
              </label>
            </div>
            <a href="#!" className="text-body">Esqueceu a senha?</a>
          </div>

          <div className="text-center text-lg-start mt-4 pt-2">
            <button 
            type="submit" className="btn btn-primary btn-lg"
              style={{paddingleft: '2.5rem', paddingright: '2.5rem'}}>
                Login
            </button>
          </div>

        </Form>
            <p className="small fw-bold mt-2 pt-1 mb-0">Não tem conta? 
            {' '}
                <Link 
                to="/register"
                className="text-body"
                >
                    Cadastre-se
                </Link>
            </p>
            </div>
      </Formik>
    </div>
  </div>
  <Footer />
</section>
</>
  )
}

export default Login