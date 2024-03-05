import React, { useContext, useEffect, useState } from 'react'
import Addproject from './Addproject'
import { deleteProjectAPI, userprojectAPI } from '../services/allAPI'
import { addProjectResponseContext } from '../context/ContextShare'
import Editproject from './Editproject'

function Myprojects() {
    const { addProjectResponse, setAddProjectResponse } = useContext(addProjectResponseContext)
    const { editProjectResponse, setEditProjectResponse } = useContext(editProjectResponse)
    const [userProject, setUserProject] = useState([])
    const getUserProject = async () => {
        const token = sessionStorage.getItem("token")
        const reqHeader = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
        const result = await userprojectAPI(reqHeader)
        console.log("----------");
        console.log(result.data);
        setUserProject(result.data)
    }
    useEffect(() => {
        getUserProject()
    }, [addProjectResponse, editProjectResponse])
    const handleDelete = async (id) => {
        const token = sessionStorage.getItem("token")
        const reqHeader = {
            "Content-Type": "application/json",
            "Authorization": `Bearer${token}`
        }
        const result = await deleteProjectAPI(id, reqHeader)
        if (result.status === 200) {
            alert("project deleted successfully")
            getUserProject();
        }
    }

    return (
        <>
            <div className='card shadow mt-3 ms-3 me-5 mb-5 p-5 '>
                <div className='d-flex'>
                    <h3 className='text-success'>My Projects</h3>
                    <div className='ms-auto'>
                        <Addproject />
                    </div>
                </div>
                <div>
                    {
                        userProject?.length > 0 ?
                            userProject?.map((item) => (
                                <div className='border d-flex align-items-center rounded p-3 mb-3'>
                                    <h5>{item.title}</h5>
                                    <div className='ms-auto'>
                                        <Editproject project={item} />
                                        <a href={item.github}
                                            className='btn'>
                                            <i class="fa-brands fa-github text-success"></i></a>
                                        <button className='btn'><i class="fa-solid fa-trash text-danger" onClick={() => {
                                            handleDelete(item._id)
                                        }}></i></button>
                                    </div>
                                </div>
                            )) :
                            <p className='text-danger fw-bolder mt-3 fs-4'>No Projects Uploaded Yet</p>
                    }



                </div>
            </div>
        </>
    )
}

export default Myprojects