import React from 'react'
import Footer from './Footer'
import Header from './Header'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import { Alert, Container } from 'react-bootstrap'
import * as Yup from 'yup'
import axios from 'axios'




const RegisterSocialMedia = () => {

    const [loadginRegister, setLoadingRegister] = React.useState(false);
    const [errorRegister, setErrorRegister] = React.useState(false);
    const [successRegister, setSuccessRegister] = React.useState(false);


   const handleClickRegister = (values) => {
        axios.post('http://localhost:3001/register/users_instagram', {
            email: values.email,
            username: values.username,
            codsecurity: values.codsecurity,
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
            .email(' Insira um email valido')
            .required('Campo obrigatório'),
        username: Yup.string()
            .required('Campo obrigatório'),
        codsecurity: Yup.string()
            .required('Campo obrigatório'),
    })

    return (
        <>
        <Header />
        <section className="vh-100">
        <div className="container">
        <div className="row">
        <div className="col-md-6 mx-auto">
        <div className="card">
        <div className="card-header">
        <h3 className="card-title">Registre sua conta do instagram</h3>
        </div>
        <div className="card-body">
        <Formik
        initialValues={{
        }}
        validationSchema={validadtionSchema}
        onSubmit={(values, {setSubmitting}) => {
            setTimeout(() => {
                setSubmitting(false);
                handleClickRegister(values);
            }, 400);
        }
        }
        >
        {({isSubmitting}) => (
        <Container>
            <Form>
            <div className="form-group">
            <label htmlFor="email">Email</label>
            <Field type="email" name="email" className="form-control" />
            <ErrorMessage name="email" component="div" className="text-danger" />
            </div>
            <div className="form-group">
            <label htmlFor="username">Username</label>
            <Field type="text" name="username" className="form-control" />
            <ErrorMessage name="username" component="div" className="text-danger" />
            </div>
            <div className="form-group">
            <label htmlFor="codsecurity">Código de segurança</label>
            <Field type="text" name="codsecurity" className="form-control" />
            <ErrorMessage name="codsecurity" component="div" className="text-danger" />
            </div>
            <div className="form-group">
            <center>
                <button type="submit" className="btn btn-primary btn-lg btn-block" disabled={isSubmitting}>
            {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
            Registrar
            </button>
            </center>
            </div>
            </Form>
        </Container>
        )}
        </Formik>
        </div>
        </div>
        </div>
        </div>
        </div>
        </section>
        {loadginRegister && <Alert variant="success">
            <Alert.Heading>Registrando...</Alert.Heading>
            <p>
            Aguarde...
            </p>
            </Alert>}
        {errorRegister && <Alert variant="danger">
        <Alert.Heading>Erro</Alert.Heading>
        <p>
            Ocorreu um erro ao registrar sua conta.
            </p>
            </Alert>}
        {successRegister && <Alert variant="success">
        <Alert.Heading>Sucesso</Alert.Heading>
        <p>
        Sua conta foi registrada com sucesso.
        </p>
        </Alert>}
        <Footer />
        </>
    )}



export default RegisterSocialMedia