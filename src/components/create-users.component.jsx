import React, { useState } from 'react';
import axios from 'axios';

export default function CreateUsers() {

    const [user, setUserName] = useState({
        username: ''
    });

    const onChangeUsername = (e) => {
        setUserName({ username: e.target.value })
    }

    const onSubmit = (e) => {
        e.preventDefault();

        console.log(user);

        axios.post('http://localhost:5000/users/add', user)
            .then(res => console.log(res.data))
            .catch(err=>console.log(err))
        setUserName({
            username: ''
        });
    }
    return (
        <div>
            <h3>Create New User</h3>
            <form onSubmit={(e) => onSubmit(e)}>
                <div className="form-group">
                    <label>Username: </label>
                    <input type="text"
                        required
                        className="form-control"
                        value={user.username}
                        onChange={(e) => onChangeUsername(e)}
                    />
                </div>
                <div className="form-group">
                    <input type="submit" value="Create User" className="btn btn-primary" />
                </div>
            </form>
        </div>
    )
}