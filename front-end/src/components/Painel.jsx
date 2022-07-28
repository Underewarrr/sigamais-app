import React from 'react'
import { Button, Card } from 'react-bootstrap'
import Footer from './Footer'
import Header from './Header'
import UserMenu from './UserMenu'

const Painel = () => {
  return (
    <div>
        <Header />
        <section className="vh-100">
        <div className="container-fluid h-custom">
            <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-md-9 col-lg-6 col-xl-5">
                </div>
            </div>
        </div>
        </section>
        <Footer />
    </div>
  )
}

export default Painel