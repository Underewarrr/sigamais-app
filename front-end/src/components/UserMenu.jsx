import React, { useState } from 'react'

import { Button, Offcanvas } from 'react-bootstrap'
import { Link } from 'react-router-dom';

const UserMenu = () => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

  return (
    <><Button variant="primary" onClick={handleShow}>
          Meu do usuário
      </Button><Offcanvas show={show} onHide={handleClose}>
              <Offcanvas.Header closeButton>
                  <Offcanvas.Title>Menu do usuário</Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                 <div className="list-group">
                    <a href="#" className="list-group-item list-group-item-action">
                        
                        Meu perfil
                    </a>
                    <a href="#" className="list-group-item list-group-item-action">
                        
                        Configurações
                    </a>
                    <a className="list-group-item list-group-item-action">
                        <Link
                        style={{ color: '#0d6efd' }}
                        to ="/painel/cadastrar">
                        Cadastrar rede social
                        </Link>
                    </a>

                </div>

              </Offcanvas.Body>
          </Offcanvas></>
  )
}

export default UserMenu