import React, { useEffect } from 'react'
import Footer from './Footer'
import Header from './Header'
import axios from 'axios'
import { Card } from 'react-bootstrap'

const RegistredSocialMedia = () => {
    const [users, setUsers] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [registredSocial, setRegistredSocial] = React.useState(false);
    const [registredInstagram, setRegistredInstagram] = React.useState(false);
    
// get users from database
    useEffect(() => {
        setLoading(true);
        axios.get('http://localhost:3001/painel/users')
        .then(function (response) {
            console.log(response.data);
            setUsers(response.data.result);
            setLoading(false);
        })
        .catch(function (error) {
            console.log(error);
        }
        );
    }, []);



  return (
    <>
    <div className="container">
    <div className="row">
    <div className="col-md-12">
    <Card>
    <Card.Header>
    <Card.Title>
    <h1>Usuários Cadastrados</h1>
    </Card.Title>
    </Card.Header>
    <Card.Body>
    <Card.Text>
    <table className="table table-striped">
    <thead>
    <tr>
    <th>#</th>
    <th>Email</th>
    <th>Username</th>
    <th>Cod. Segurança</th>
    </tr>
    </thead>
    <tbody>
   
    {
        users.map((user, index) => {
            return (
                <tr key={index}>
                <td>{index + 1}</td>
                <td>{user.email}</td>
                <td>{user.username}</td>
                <td>{user.codsecurity}</td>
                </tr>
            )
        }
        )
        
    }
    </tbody>
    </table>
    </Card.Text>
    </Card.Body>
    </Card>
    </div>
    </div>
    </div>
    </>

  )

}

export default RegistredSocialMedia