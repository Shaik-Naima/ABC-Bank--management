import React, { Fragment, useState, useEffect } from 'react';
import { Navbar, Button, Card, Form } from 'react-bootstrap';
import axios from 'axios';
import './App.css';

function UserLogin(props) {

    useEffect(() => {
        loadUsers();
    }, []);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const usernameinputvalchange = (e) => {

        setUsername(e.target.value);

    }
    const passwordinputvalchange = (e) => {
        setPassword(e.target.value);

    }
    const [users, setUser] = useState([]);
    const loadUsers = async () => {
        await axios.get('http://localhost:3000/users')
            .then(response => {
                setUser(response.data);
            });
    }

    const onSubmit = () => {

        const usernameRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
        const isUsernameValid = usernameRegex.test(username);
        const isPasswordValid = passwordRegex.test(password);

        if (isUsernameValid) {
            for (let i = 0; i < users.length; i++) {
                debugger
                if (username == users[i].email && password == users[i].password && users[i].role == 'Admin') {
                    return props.history.push('/adminaxios');
                } else if (username == users[i].email && password == users[i].password && users[i].role == 'User') {
                    sessionStorage.setItem("user", JSON.stringify(users[i]));
                    return props.history.push('/useraxios');

                } else {
                    if (i == users.length - 1) {
                        alert("User name and password not matched");
                    }
                }
            }
        }
        else {
            alert("Invalid Credentials");
        }

    }
    return (
        <Fragment>

<div
               style={{
                backgroundImage: `url("https://th.bing.com/th/id/R4289cb782cefcc30845799b1af8f1551?rik=lOWUeJOBK05PqA&riu=http%3a%2f%2fgetwallpapers.com%2fwallpaper%2ffull%2fb%2f3%2fd%2f101391.jpg&ehk=sQSXnaxgTuPYIdREEJkpq9YfvRH8ojdk9yIgwlxDTbE%3d&risl=&pid=ImgRaw")`, backgroundRepeat: 'no-repeat', width: '1500px', height: '550px'
            }}>

            <Card className="UserCard" style={{ width: '18rem' ,backgroundColor:"blue"}}>
                <Card.Body>
                    <Card.Title className="UserTitle">Login</Card.Title><br />
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label style={{ marginRight: "170px" }}>Username</Form.Label>
                            <Form.Control type="email" placeholder="Enter Username" onChange={usernameinputvalchange} />

                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label style={{ marginRight: "270px" }}>Password</Form.Label>
                            <Form.Control type="password" placeholder="Enter Password" onChange={passwordinputvalchange} />
                        </Form.Group>

                        <Button variant="primary" block onClick={onSubmit}>Login</Button>
                    </Form>
                </Card.Body>

            </Card>


    </div>

        </Fragment>
    )
}
export default UserLogin;

