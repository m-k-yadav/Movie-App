import React, { useEffect, useState } from "react";
import { Link, Navigate, Route, Routes, useParams} from "react-router-dom";

function About(){
    return <h1>About Page</h1>;
}
function Home(){
    return <h1>Home Page</h1>;
}
function Contact(){
    return <h1>Contact Page</h1>;
}
function PageNotFound(){
    return <h1>Page Not Found</h1>;
}

function Users(props){
    const params = useParams();
    const [userData, setUserData]= useState(null)
    useEffect(()=>{
        async function fetchData(){
            const resp = await fetch(`https://fakestoreapi.com/users/${params.id}`)
            const userData = await resp.json()
            console.log("userData", userData)
            setUserData(userData);
        }
        fetchData();
    },[])
    console.log(props.isAdmin)
    console.log("Params", params)
    return(
        <>
            <h3>I am a user componenet</h3>
            {userData==null ? <h3>Loading...</h3> : (
                <>
                    <h4>User Name: {userData.username}</h4>
                    <h3>Name: {userData.name.firstname+" "+userData.name.lastname}</h3>
                    <h4>Phone" {userData.phone}</h4>
                </>
            )}
        </>
    )
}

const Routing = ()=>{
    return(
        <>
            <h1>Routing Examples</h1>
            <nav>
                <ul>
                    <li>
                        <Link to="/">home</Link>
                    </li>
                    <li>
                        <Link to="/about">about</Link>
                    </li>
                    <li>
                        <Link to="/contact">contact</Link>
                    </li>
                </ul>
            </nav>
            <Routes>
                
                <Route path="/" element={<Home/>}></Route>
                <Route path="/about" element={<About/>}></Route>
                <Route path="/contact" element={<Contact/>}></Route>
                <Route path="/abc" element={<Navigate to="/"></Navigate>}></Route>
                {/* say if we want to navigate to some existing page */}
                <Route path="*" element={<PageNotFound></PageNotFound>}></Route>
                <Route path="users/:id"
                    element={<Users isAdmin={true}/>}></Route>
                

            </Routes>
        </>
    )
}

export default Routing;