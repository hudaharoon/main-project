import React from 'react'

import { useState } from 'react';
import Collapse from 'react-bootstrap/Collapse';


function Profile() {
    const [open, setOpen] = useState(false);
    return (
        <>
            <div className='card shadow p-5'>
                <div className='d-flex justify-content-between'>
                    <h2>Profile</h2>
                    <button
                        onClick={() => setOpen(!open)}
                        className='btn btn-outline-info'>
                        <i class='fa-solid fa-angle-down'></i>
                    </button>
                </div>
                <Collapse in={open}>
                    <div>
                        <label htmlFor="profile" className='mb-2 mt-3 text-center'>
                            <input type="file" id="profile" style={{ display: "none" }} />
                            <img src="https://clipground.com/images/profile-png-5.png" alt="" width={"180px"} height={"190px"}
                            />
                        </label>
                        <div>
                            <div >
                                <input type="text" className='form-control' placeholder='Github Link' />
                            </div>
                            <div className='mt-3'>
                                <input type="text" className='form-control' placeholder='Linkedin' />
                            </div>
                            <div className='mt-3'>
                                <button className='btn btn-warning rounded w-100'>Update</button>
                            </div>
                        </div>

                    </div>
                </Collapse>
            </div >
        </>
    )
}

export default Profile