import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useHistory } from 'react-router-dom';
import axios from 'axios'

export default function CreateExercises() {

    const [state, setState] = useState({
        username: '',
        description: '',
        duration: '',
        date: new Date(),
        users: [],
    })

    useEffect(() => {
        axios.get('http://localhost:5000/users/')
            .then(res => {
                if (res.data.length > 0) {
                    setState({
                        users: res.data.map(user => user.username),
                        username: res.data[0].username
                    })
                }
            })
            .catch(err => console.log(err))

    }, [])
    const onChangeUserName = (e) => {
        setState(pre => ({
            ...pre,
            username: e.target.value
        }))
    }
    const onChangeDescription = (e) => {
        setState(pre => ({
            ...pre,
            description: e.target.value
        }))
    }
    const onChangeDuration = (e) => {
        setState(pre => ({
            ...pre,
            duration: e.target.value
        }))
    }

    const onChangedate = (date) => {
        setState(pre => ({
            ...pre,
            date: date
        }))
    }
    const history = useHistory();
    const handleClick = () => history.push('/');
    const onSubmit = (e) => {
        e.preventDefault();


        console.log(state);
        axios.post('http://localhost:5000/exercises/add', state)
            .then(res => console.log(res.data))
            .catch(err => console.log(err))
        // window.location = "/";
        handleClick();
    }

    return (
        <div>
            <h3>Create New Exercise Log</h3>
            <form onSubmit={(e) => onSubmit(e)}>
                <div className="form-group">
                    <label>Username: </label>
                    <select
                        required
                        className="form-control"
                        value={state.user}
                        onChange={(e) => onChangeUserName(e)}>
                        {
                            state.users.map(function (user) {
                                return (
                                    <option
                                        key={user}
                                        value={user}>{user}
                                    </option>
                                )
                            })
                        }
                    </select>
                </div>
                <div className="form-group">
                    <label>Description: </label>
                    <input type="text"
                        required
                        className="form-control"
                        value={state.description}
                        onChange={(e) => onChangeDescription(e)}
                    />
                </div>
                <div className="form-group">
                    <label>Duration (in minutes): </label>
                    <input
                        type="number"
                        className="form-control"
                        value={state.duration}
                        onChange={(e) => onChangeDuration(e)}
                    />
                </div>
                <div className="form-group">
                    <label>Date: </label>
                    <div>
                        <DatePicker
                            selected={state.date}
                            onChange={(e) => onChangedate(e)}
                        />
                    </div>
                </div>

                <div className="form-group">
                    <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
                </div>
            </form>
        </div>
    )
}