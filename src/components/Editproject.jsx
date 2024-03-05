import React, { useContext, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { BASE_URL } from '../services/baseUrl';
import { editUserProjectAPI } from '../services/allAPI';
import { editProjectResponseContext } from '../context/ContextShare';


function Editproject({ project }) {
    const { editProjectResponse, setEditProjectResponse } = useContext(editProjectResponseContext)

    const [preview, setPreview] = useState("")
    console.log("project details in edit project");
    console.log(project);

    const [projectDetails, setprojectDetails] = useState({
        title: project._id,
        language: project.language,
        github: project.github,
        website: project.website,
        overview: project.overview,
        projectImage: ""
    })
    useEffect(() => {
        if (projectDetails.projectImage) {
            setPreview(URL.createObjectURL(projectDetails.projectImage))
        }
    }, [projectDetails.projectImage])

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleReset = () => {
        setprojectDetails({
            title: project.title,
            language: project.language,
            github: project.github,
            website: project.website,
            overview: project.overview,
            projectImage: ""
        })
        setPreview("")
    }
    const handleUpdate = async (e) => {
        e.preventDefault()
        const { title, language, github, website, overview, projectImage, id } = projectDetails
        if (!title || !language || !github || !website || !overview || !id) {
            alert("please fill the form completly")
        }
        else {
            const reqBody = new FormData();
            reqBody.append("title", title)
            reqBody.append("language", language)
            reqBody.append("github", github)
            reqBody.append("website", website)
            reqBody.append("overview", overview)
            preview ? reqBody.append("projectImage", projectImage) :
                reqBody.append("projectImage", project.projectImage)

            const token = sessionStorage.getItem("token")
            if (preview) {
                const reqHeader = {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${token}`
                }
                const result = await editUserProjectAPI(id, reqBody, reqHeader)
                console.log(result);
                if (result.status === 200) {
                    setEditProjectResponse(result)
                    alert("project updated successfully")
                    handleClose()
                }
                else {
                    alert(result.response.data)
                }
            }


            else {
                const reqHeader = {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${token}`
                }
                const result = await editUserProjectAPI(id, reqBody, reqHeader)
                if (result.status === 200) {
                    setEditProjectResponse(result)
                    alert("project updated successfully")
                    handleClose()
                }
                else {
                    alert(result.response.data)
                }
            }
        }
    }

    return (
        <>
            <button className='btn'><i class="fa-solid fa-pen-to-square text-info" onClick={handleShow}></i></button>
            <Modal show={show} onHide={handleClose} size='lg'>
                <Modal.Header closeButton>
                    <Modal.Title>Add Project</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='row'>
                        <div className='col-lg-6'>
                            <label htmlFor="projectImageupload">
                                <input
                                    onChange={(e) => setprojectDetails({ ...projectDetails, projectImage: e.target.files[0] })} type="file"
                                    style={{ display: "none" }}
                                    id='projectImageupload'
                                />
                                <img
                                    height={"200px"}
                                    width={"100%"}
                                    src={preview ? preview : `${BASE_URL}/uploads/${project.projectImage}`} />
                            </label>
                        </div>
                        <div className='col-lg-6 col-md-6 d-flex justify-content-center align-items-center flex-column'>
                            <div>
                                <input
                                    value={projectDetails.title}
                                    onChange={(e) => setprojectDetails({ ...projectDetails, title: e.target.value })}
                                    type="text" className='form-control' placeholder='Project title' />
                            </div>
                            <div className='mt-3 w-100'>

                                <input
                                    value={projectDetails.language}
                                    onChange={(e) => setprojectDetails({ ...projectDetails, language: e.target.value })} type="text " className='form-control ' placeholder='Languages used' />
                            </div>
                            <div className='mt-3 w-100'>
                                <input
                                    value={projectDetails.github}
                                    onChange={(e) => setprojectDetails({ ...projectDetails, github: e.target.value })}
                                    type="text " className='form-control ' placeholder='Github Url' />
                            </div>
                            <div className='mt-3 w-100'>
                                <input
                                    value={projectDetails.website}
                                    onChange={(e) => setprojectDetails({ ...projectDetails, website: e.target.value })}
                                    type="text " className='form-control ' placeholder='Website Url' />
                            </div>
                            <div className=' mt-3 w-100'>
                                <textarea
                                    value={projectDetails.overview}
                                    onChange={(e) => setprojectDetails({ ...projectDetails, overview: e.target.value })}
                                    placeholder='overview' className='form-control'></textarea>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleReset}>
                        Reset
                    </Button>
                    <Button variant="primary" onClick={handleUpdate} >
                        Update project
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Editproject