import React, { Fragment, useState, useEffect } from 'react';
import { Navbar, Button, Card, Form, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import './App.css';


function CurrentBalence() {
    const [user, setUser] = useState({
        id: '',
        name: ' ',
        username: ' ',
        email: ' ',
        phone: ' ',
        
        currentBalance:0,
        transaction: []

    });
    const [amount, setAmount] = useState('');

    const { id } = useParams();
    useEffect(() => {
        const res = sessionStorage.getItem('user');
        let user = JSON.parse(res);
        getUser(user.id);
    }, []);

    const getUser = async (id) => {
        const res = await axios.get(`http://localhost:3000/users/${id}`);
        setUser(res.data);
    }

    const onSubmit = async e => {
        e.preventDefault();
        let date = new Date;
        let obj= {
            "type": '',
            "accountType": '',
            "dateTime": date,
            "amount":0
        };
        obj.amount = amount;
        if(parseInt(amount) > 0){
            obj.type = "Credit";
        }else {
            obj.type = "Debit";
        }
        obj.accountType = "Current";
        user.transaction.push(obj);
        user.currentBalance = parseInt(user.currentBalance) + parseInt(amount);
        await axios.put(`http://localhost:3000/users/${user.id}`, user);
        getUser(user.id);
        alert('Amount added successfully');

    }
    const passwordinputvalchange = (e) => {
        setAmount(e.target.value);

    }
    return (
        <div
        style={{
            backgroundImage: `url("https://th.bing.com/th/id/R4289cb782cefcc30845799b1af8f1551?rik=lOWUeJOBK05PqA&riu=http%3a%2f%2fgetwallpapers.com%2fwallpaper%2ffull%2fb%2f3%2fd%2f101391.jpg&ehk=sQSXnaxgTuPYIdREEJkpq9YfvRH8ojdk9yIgwlxDTbE%3d&risl=&pid=ImgRaw")`, backgroundRepeat: 'no-repeat', width: '1300px', height: '550px'
        }}>
        <div>
       <Link class='btn btn-outline-primary btnAdd' to={'/useraxios'} block >Back to Current</Link>
        
           
                <Card className="currentcard" style={{ width: '20rem',backgroundColor:'green',marginLeft:'500px' }}>
                    <Form>
                       <center>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label >User ID:<b>{user.name}</b></Form.Label>

                        </Form.Group>
                        <Form.Group controlId="formBasicEBal">
                            <Form.Label>Current Balance: <b>{user.currentBalance}</b></Form.Label>
                        </Form.Group>
                        </center>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label style={{ paddingLeft:"10px" }}>Amount</Form.Label>
                            <Form.Control type="number" placeholder="Enter an amount" onChange={passwordinputvalchange} />
                        </Form.Group>

                        <Button class="btn btn-outline-primary" variant="primary" onClick={onSubmit} block >Submit</Button>
                    </Form>
                </Card>
            
          </div>
        </div>
    )
}


export default CurrentBalence;