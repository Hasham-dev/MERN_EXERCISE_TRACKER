import React, { useState, useEffect } from 'react';
import axios from 'axios'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useHistory } from 'react-router-dom';

export default function EditExercises(props) {
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
                    })
                }
            })
            .catch(err => console.log(err))

        axios.get('http://localhost:5000/exercises/' + props.match.params.id)
            .then(res => {
                setState(prev => ({
                    ...prev,
                    username: res.data.username,
                    description: res.data.description,
                    duration: res.data.duration,
                    date: new Date(res.data.date),
                }))
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
    // const handleClick = () => history.push('/');
    const onSubmit = (e) => {
        e.preventDefault();


        axios.post('http://localhost:5000/exercises/update/' + props.match.params.id, state)
            .then(res => console.log(res.data))
            .catch(err => console.log(err))
        window.location = "/";
        // handleClick();
    }

    return (
        <div>
            <h3>Edit Exercise Log</h3>
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
                    <input type="submit" value="Edit Exercise Log" className="btn btn-primary" />
                </div>
            </form>
        </div>
    )
}