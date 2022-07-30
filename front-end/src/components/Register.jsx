import React from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup'
import Footer from './Footer'
import axios from "axios";
import { Link } from 'react-router-dom';
import { Alert, Container } from 'react-bootstrap';
import Header from './Header';
const Register = () => {



    const [loadginRegister, setLoadingRegister] = React.useState(false);
    const [errorRegister, setErrorRegister] = React.useState(false);
    const [successRegister, setSuccessRegister] = React.useState(false);

    function handleClickRegister (values) {
        axios.post('http://localhost:3001/register', {
            email: values.email,
            password: values.password,

        })
        .then(function (response) {
            console.log(response.data);
            if (response.data.status === "success") {
                setLoadingRegister(true);
                setTimeout (() => {
                setSuccessRegister(true);
                }
                , 2500);
                    setTimeout(() => {
                        setLoadingRegister(false);
                        setSuccessRegister(false);
                    } , 3000);
            }
            else {
                setLoadingRegister(true);
                setErrorRegister(true);
                    setTimeout(() => {
                        setLoadingRegister(false);
                        setErrorRegister(false);
                    } , 3000);
                    
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    const validadtionSchema = Yup.object().shape({
        email: Yup.string()
            .email(' Invalid email')
            .required(' Required'),
        password: Yup.string().min(6, ' Password must be at least 6 characters')
        
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
        onSubmit={handleClickRegister}
            validationSchema={validadtionSchema}
        >
        <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <Form>
                <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                    <p className="lead fw-normal mb-0 me-3">Crie sua conta</p>
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
                    <p className="text-center fw-bold mx-3 mb-0">Ou</p>
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
                    />
                </div>
                <div className="overlay" style={{display: loadginRegister ? 'block' : 'none'}}>
                <div className="overlay-content">
                <Container>
                <div className="d-flex justify-content-between">
                <div class="spinner-grow text-primary" role="status">

                </div>

                <Alert variant="success" show={successRegister}>
                Usuário criado com sucesso
                </Alert>
                <div class="spinner-grow text-primary" role="status">

                </div>
                </div>
                </Container>
                </div>
    </div>
                <div 
                
                className="d-flex flex-row justify-content-center">
                    <button 
                    type="submit" className="btn btn-primary">Criar Conta</button>
                </div>

                <div className="d-flex flex-row justify-content-center">
                    <p className="text-center fw-bold mx-3 mb-0">Já tem uma conta?</p>
                       
                            <Link to="/login">Login</Link>
                        
                </div>
                </Form>
            </div>
        </Formik>      
    </div>
</div>
  <Footer />
</section>
  </>
    )
} 

export default Register