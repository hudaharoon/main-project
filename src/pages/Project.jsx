import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Col, Row } from 'react-bootstrap'
import Projectcard from '../components/Projectcard'
import { allProjectAPI } from '../services/allAPI'
import { Link } from 'react-router-dom'


function Project() {
  const [isToken, setIsToken] = useState(false)
  const [searchKey, setSearchKey] = useState("")
  const [allProject, setAllproject] = useState([])
  const getallProject = async () => {
    if (sessionStorage.getItem("token")) {
      const token = sessionStorage.getItem("token")
      const reqHeader = {
        "Content-Type": "application-type",
        "Authorization": `Bearer ${token}`
      }
      const result = await allProjectAPI(searchKey, reqHeader)
      console.log("==========");
      console.log(result);
      setAllproject(result.data)
    }
  }
  useEffect(() => {
    getallProject()
  }, [searchKey])
  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setIsToken(true)
    }
  })
  console.log("=========searchkey", searchKey);
  return (
    <>
      <Header />
      <div className='d-flex justify-content-center align-items-center flex-column mt-5'>
        <h2>My Project</h2>

        <div className='mt-5 w-25 d-flex'>
          <input type="text" className='form-control' placeholder='Select project using technology' onChange={(e) => setSearchKey(e.target.value)} />
          <i class="fa-solid fa-magnifying-glass fa-rotate-90" style={{ marginLeft: "-45px" }}></i>
        </div>
      </div>
      <Row className='m-5'>
        {
          allProject.length > 0 ?
            allProject.map((item) => (
              <Col sm={12} lg={4} md={4}>
                <Projectcard project={item} />
              </Col>
            )) :
            <div>
              {
                isToken ?
                  <p>no projects uploaded</p> :
                  <div className='d-flex justify-content-center align-items-center flex-column'>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWNeZFGuF8U1J_sztO1mq9Pw9HDV-uD2KZQKCCkKRYe2xwe54L10AYGrTaMkIfQPQJtR0&usqp=CAU" alt="" height={"300px"} width={"300px"} />
                    <p className='text-danger fs-4'> Please <Link style={{ textDecoration: "none" }} to={'/login'}>Login</Link>  to view Projects</p>
                  </div>
              }
            </div>

        }

      </Row>
    </>
  )
}

export default Project