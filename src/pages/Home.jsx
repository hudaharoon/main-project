import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import titleimage from '../asset/img 01.jpg'
import Projectcard from '../components/Projectcard'
import { Link } from 'react-router-dom'
import { homeProjectAPI } from '../services/allAPI'

function Home() {
    const [homeProject, setHomeProject] = useState([])
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    useEffect(() => {
        if (sessionStorage.getItem("token")) {
            setIsLoggedIn(true)
        }
    }, [])
    const getHomeProject = async () => {

        const result = await homeProjectAPI()
        console.log("result");
        console.log(result);
        setHomeProject(result.data)
    }
    useEffect(() => {
        getHomeProject()
    }, [])
    return (
        <>
            <div className='mb-5 bg-success' style={{ width: "100%", height: "80vh" }}>
                <div className='container-fluid rounded'>
                    <Row className='text-align-center p-5'>
                        <Col sm={12} md={6} lg={6}>
                            <h2 className='text-light mb-3' style={{ fontSize: "70px", fontWeight: "600" }}>Project Fair</h2>

                            <p>One stop destination for all web application projects</p>
                            {
                                isLoggedIn ?
                                    <Link to='/dashboard'>
                                        <button className='btn btn-warning rounded'>Manage Projects</button>
                                    </Link>
                                    :
                                    <Link to='/login'>
                                        <button className='btn btn-warning rounded'>Get Started</button>
                                    </Link>
                            }
                        </Col>
                        <Col sm={12} lg={6} md={6}>
                            <img src={titleimage} alt=""
                                height={"450px"}
                                style={{ marginTop: "50px " }}
                            />
                        </Col>
                    </Row>
                </div>
            </div>
            <div className='mt-5 all-porject'>
                <div className='text-center'>
                    <h1>Explore My Projects</h1>
                    <marquee scrollAmount={20}>

                        <div className='d-flex mt-5 mb-5'>
                            {
                                homeProject?.length > 0 ?
                                    homeProject?.map((item) => (
                                        <div className='ms-5' style={{ width: "400px" }}>
                                            <Projectcard project={item} />
                                        </div>
                                    )) :
                                    <p>No project to load</p>
                            }

                        </div>
                    </marquee>
                    <div className='text-center mt-5 mb-3'>
                        <h6><Link to={'/project'}> See more Projects</Link>
                        </h6>
                    </div>
                </div>
            </div>


        </>
    )
}

export default Home