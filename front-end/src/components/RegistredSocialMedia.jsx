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
    useEffect(() => {
        // get username from localhost3001:3001/painel/get/users_instagram
        axios.get('http://localhost:3001/painel/get/users_instagram')
            .then(function (response) {
                console.log(response.data);
                if (response.data.status === "success") {
                    localStorage.setItem('users', JSON.stringify(response.data))
                    setLoading(true);
                    setTimeout(() => {
                            setRegistredSocial(false);
                            setUsers(response.data.users);
                        }
                        , 3000);
                }
                else {
                    setLoading(true);
                    setError(true);
                }
            })
            .catch(function (error) {
                console.log(error);
            }
            );
    }, [users]);

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
    {users.map((user, index) => (
        <tr key={index}>
        <td>{index + 1}</td>
        <td>{user.email}</td>
        <td>{user.username}</td>
        <td>{user.codsecurity}</td>
        </tr>
    ))}
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