import React, { Fragment, useState, useEffect } from 'react';
import { Navbar, Button, Card, Form, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';


function AddAmount() {
    const [user, setUser] = useState({
        id: '',
        name: ' ',
        username: ' ',
        email: ' ',
        phone: ' ',
    
        balance: 0,
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
        obj.accountType = "Savings";
        user.transaction.push(obj);
        user.balance = parseInt(user.balance) + parseInt(amount);
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
            <Link class='btn btn-outline-primary btnAdd' to={'/useraxios'} block >Back to Savings</Link>
            <center>

                <Card style={{ width: '22rem',backgroundColor:'green',marginLeft:'300px'}}>
                    <Form>
                        
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label >User ID: <b>{user.name}</b></Form.Label>
                           
                        </Form.Group>
                        <Form.Group controlId="formBasicEBal">
                            <Form.Label>Saving Balance: <b>{user.balance}</b></Form.Label>
                        </Form.Group>
                      
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label style={{ marginRight: "270px" }}>Amount</Form.Label>
                            <Form.Control type="number" placeholder="Enter an amount" onChange={passwordinputvalchange} />
                        </Form.Group>

                        <Button class="btn btn-outline-primary" variant="primary" onClick={onSubmit} block >Submit</Button>
                    </Form>
                </Card>
            </center>
        </div>
        </div>
    )
}


export default AddAmount;