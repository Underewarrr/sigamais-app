import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import UserMenu from './UserMenu';

function Header() {

  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');

  useEffect(() => {
    //Get email
    const email = localStorage.getItem('email');
    if (email) {
      setEmail(email);
    }
  } , [email]);
  useEffect(() => {
    //Get token
    const token = localStorage.getItem('token');
    if (token) {
      setToken(token);
    }
  } , [token]);


  return (
    <>
      
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Growup Media</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Novidade</Nav.Link>
            <Nav.Link href="#features">Ferramentas</Nav.Link>
            <Nav.Link href="#pricing">Preços</Nav.Link>
          </Nav>
          <Nav>
          <Nav.Link>
             {
               token.length > 1 ?
               <>
              <UserMenu />
              <span className="text-white">{email}</span>
              <span className="text-white">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
              <span className="text-white">Sair</span>
              </>
              :
              <>
              <span className="text-white">
              <Link
              style={{ color: 'white' }}
              to ="/login">
              Login
              </Link>
              </span>
              <span className="text-white">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
              <span className="text-white">
                <Link 
                style={{ color: 'white' }}
                to ="/register">
                Cadastro
                </Link>
                </span>

              </>
            }
          </Nav.Link>
       
              </Nav>

        </Container>
      </Navbar>

    </>
  );
}

export default Header;