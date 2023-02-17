import React, { useState, useEffect } from 'react'
import axios from 'axios'

const UserDashboard = () => {
    //STATES====================
    const [data, setData] = useState([{}])

    const [updateData, setUpdateData] = useState({
        name: "",
        mobile: "",
        email: "",
        password: "",
        id:""
    })

    //GET DATA ====================
    const getData = async () => {
        await axios
            .get("http://localhost:5000/posts")
            .then((res) => setData(res.data))
    }

    //DELETE PERSON ====================
    const handleDelete = async (id) => {
        await axios.delete("http://localhost:5000/posts/" + id)
        getData()
    }
    
    //UPDATE PERSON ====================
    const handleUpdate = async(id)=>{
        await axios.put(`http://localhost:5000/posts/${updateData.id}`, updateData)
        getData()
    }

    useEffect(() => {
        getData()
    }, [data])



    return (
        <div>
            <h1>User Dashboard</h1>
            <table className="table table-dark table-hover">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Phone</th>
                        <th scope="col">E-mail</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.map((user) => (
                        <tr>
                            <th scope="row">{user.id}</th>
                            <td>{user.name}</td>
                            <td>{user.mobile}</td>
                            <td>{user.email}</td>
                            <td style={{ display: "flex", justifyContent: "pace-between" }}>
                                <button className='btn btn-info' data-bs-toggle="modal" data-bs-target="#exampleModal"
                                onClick={()=>setUpdateData({
                                    name:user.name,
                                    mobile:user.mobile,
                                    email:user.email,
                                    password:user.password,
                                    id:user.id
                                })}>Edit</button>
                                <button className='btn btn-danger' onClick={() => handleDelete(user.id)}>Delete</button>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>

            {/* MODAL ========= */}
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">User Update</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label">Full Name</label>
                                <input
                                    type="email"
                                    class="form-control"
                                    id="exampleFormControlInput1"
                                    value={updateData.name}
                                    onChange={(e) => setUpdateData({ ...updateData, name: e.target.value })}
                                />
                            </div>
                            <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label">Mobil No.</label>
                                <input
                                    type="number"
                                    class="form-control"
                                    id="exampleFormControlInput1"
                                    value={updateData.mobile}
                                    onChange={(e) => setUpdateData({ ...updateData, mobile: e.target.value })}
                                />
                            </div>
                            <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label">Email address</label>
                                <input
                                    type="email"
                                    class="form-control"
                                    id="exampleFormControlInput1"
                                    value={updateData.email}
                                    onChange={(e) => setUpdateData({ ...updateData, email: e.target.value })}
                                />
                            </div>
                            <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label">Password</label>
                                <input
                                    type="password"
                                    class="form-control"
                                    id="exampleFormControlInput1"
                                    value={updateData.password}
                                    onChange={(e) => setUpdateData({ ...updateData, password: e.target.value })}
                                />
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={()=>handleUpdate()}>Update User</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserDashboard