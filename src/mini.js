import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import {Card, Table } from 'react-bootstrap';


function MiniStatement() {

    const [user, setUser] = useState({

        username: ' ',
        balance: ' ',
        transaction: []

    });
    const from = sessionStorage.getItem('from');
    const { id } = useParams();

    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {
        const res = await axios.get(`http://localhost:3000/users/${id}`);
        setUser(res.data);
    }
    return (
        <div
        style={{
            backgroundImage: `url("https://th.bing.com/th/id/R4289cb782cefcc30845799b1af8f1551?rik=lOWUeJOBK05PqA&riu=http%3a%2f%2fgetwallpapers.com%2fwallpaper%2ffull%2fb%2f3%2fd%2f101391.jpg&ehk=sQSXnaxgTuPYIdREEJkpq9YfvRH8ojdk9yIgwlxDTbE%3d&risl=&pid=ImgRaw")`, backgroundRepeat: 'no-repeat', width: '1300px', height: '1100px'
        }}>
        <div>
            <h3><center>Mini Statement</center></h3>
        <Link class='btn btn-outline-primary btnAdd' to={'/useraxios'} block >Previous</Link>
            <Card className="miniCard" style={{backgroundColor:"aqua"}}>
                <p><center>Account Holder Name: <b>{user.name}</b></center></p>
                {from === 'Current' ? <p><center>Account Balance: <b>{user.currentBalance}</b></center></p>: <p><center>Account Balance: <b>{user.balance}</b></center></p>   }
                

                <Table>
                    <thead>
                        <tr>
                            
                            <th>Transaction Type</th>
                            <th>Amount</th>
                            <th>Account Type</th>
                            <th>Date and Time</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            user.transaction.map(tran => tran.accountType === from ?  (
                                <tr>
                                    <td>{tran.type}</td>
                                    <td>{tran.amount}</td>
                                    <td>{tran.accountType}</td>
                                    <td>{tran.dateTime}</td>
                                </tr>
                            ) :  (<tr>
                                
                            </tr>)
                             ) }
                    </tbody>
                </Table>
               
            </Card>

        </div>
        </div>
    )

}
export default MiniStatement;