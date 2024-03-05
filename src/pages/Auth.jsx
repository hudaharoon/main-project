import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import titleimage from '../asset/img 01.jpg'
import { Form } from 'react-bootstrap';
import { loginAPI, registerAPI } from '../services/allAPI';
import { isAuthTokenContext } from '../context/ContextShare';


function Auth({ register }) {
    const { isAuthToken, setIsAuthToken } = useContext(isAuthTokenContext)

    const registerForm = register ? true : false

    console.log("registerForm", registerForm);
    const navigate = useNavigate()


    const [userData, setUserData] = useState({
        username: "",
        email: "",
        password: ""
    })

    const handleRegister = async (e) => {
        e.preventDefault()
        console.log(userData);
        const { username, email, password } = userData
        if (!username || !email || !password) {
            alert("please fill the form completly")
        }
        else {
            const result = await registerAPI(userData)
            console.log(result);
            if (result.status === 200) {
                alert("user registration successfully")
                setUserData({
                    username: "",
                    email: "",
                    password: ""
                })
                navigate('/login')
            }
            else {
                alert(result.response.data)
            }
        }

    }
    const handleLogin = async (e) => {
        e.preventDefault()
        const { email, password } = userData;
        if (!email || !password) {
            alert("Please fill the form completly")
        }
        else {
            const result = await loginAPI(userData)
            console.log(result);
            if (result.status === 200) {
                console.log(result);
                sessionStorage.setItem("existinguser", JSON.stringify(result.data.existingUser));
                sessionStorage.setItem("token", result.data.token);
                setIsAuthToken()
                alert("Successfully logged in");
                setUserData({
                    username: "",
                    email: "",
                    password: ""
                });
                navigate('/')
            }
            else {
                alert(result.response.data)
            }

        }
    }





    return (
        <>
            <div className='d-flex justify-content-center align-items-center ' style={{ height: "100vh", width: "100%" }}>
                <div className='w-75 container'>
                    <Link to="/" style={{ textDecoration: "none" }}>
                        <i class='fa-solid fa-arrow-left me-2'></i>Back to Home</Link>
                    <div className='card bg-success mt-3'>
                        <div className=' row align-items-center'>
                            <div className='col-lg-6 col-md-6'>
                                <img src={titleimage} alt="" width={"100%"} />
                            </div>
                            <div className='col-lg-6 col-md-6'>
                                <div className='d-flex align-items-center flex-column'>
                                    <h1 ><i class='fa-brands fa-stack-overflow'> Project Fair</i></h1>
                                    <h5>
                                        {
                                            registerForm ? "sign up your account" : "sign into your account"
                                        }
                                    </h5>
                                    <Form>
                                        {
                                            registerForm &&
                                            <Form.Group md="4" controlId="validationCustom01">
                                                <Form.Label>Username</Form.Label>
                                                <Form.Control
                                                    value={userData.username}
                                                    onChange={(e) => setUserData({ ...userData, username: e.target.value })}
                                                    type="text"
                                                    placeholder="user name"

                                                />

                                            </Form.Group>
                                        }

                                        <Form.Group md="4" controlId="validationCustom01">
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control
                                                value={userData.email}
                                                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                                                type="text"
                                                placeholder="email"

                                            />

                                        </Form.Group>
                                        <Form.Group md="4" controlId="validationCustom01">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control
                                                value={userData.password}
                                                onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                                                type="Password"
                                                placeholder="Password"

                                            />

                                        </Form.Group>
                                        {
                                            registerForm ?
                                                <div>
                                                    <button className='btn btn-warning rounded mt-3' onClick={handleRegister}>Register</button>
                                                    <p className='ms-3'>Already a user? click here to <Link to='/login' style={{ textDecoration: 'none', color: '#62a1ff' }}> Login</Link> </p>
                                                </div> :
                                                <div className="text-light">

                                                    <button className='btn btn-warning rounded mt-3' onClick={handleLogin} >Login</button>
                                                    <p>Already a user? click here to <Link to='/register' style={{ textDecoration: "none", color: '#62a1ff' }}> Register</Link> </p>
                                                </div>
                                        }
                                    </Form>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Auth