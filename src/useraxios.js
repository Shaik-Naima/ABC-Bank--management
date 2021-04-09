import React, { Fragment,useState , useEffect} from 'react';



function Useraxios(props){

    useEffect(() => {
        let user = sessionStorage.getItem("user");
         user = JSON.parse(user);
        props.history.push(`/viewuser/${user.id}`);
        console.log(user);
    }, []);

    return(
        <h1>User page</h1>
    )
}

export default Useraxios;