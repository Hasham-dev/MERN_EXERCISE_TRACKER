import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../App.css'
export default function ExerciseList() {

    const [state, setState] = useState({
        exercises: []
    })

    useEffect(() => {
        axios.get('http://localhost:5000/exercises/')
            .then(res => {
                if (res.data.length > 0) {
                    setState({
                        exercises: res.data.map(exercises => exercises),
                    })
                }
            })
            .catch(err => console.log(err))

    }, [])

    const deleteExercise = (id) => {
        axios.delete('http://localhost:5000/exercises/' + id)
            .then(response => { console.log(response.data) });

        setState({
            exercises: state.exercises.filter(el => el._id !== id)
        })
    }

    const Exercise = props => (
        <tr>
            <td>{props.exercise.username}</td>
            <td>{props.exercise.description}</td>
            <td>{props.exercise.duration}</td>
            <td>{props.exercise.date.substring(0, 10)}</td>
            <td>
                <Link className="Button" to={"/edit/" + props.exercise._id}>EDIT</Link> | <a href="#"  className="Button del" onClick={() => { props.deleteExercise(props.exercise._id) }}>DELETE</a>
            </td>
        </tr>
    )

    const exerciseList = () => {
        return state.exercises.map(currentexercise => {
            return <Exercise exercise={currentexercise} deleteExercise={deleteExercise} key={currentexercise._id} />;
        })
    }

    if (state.exercises <= 0) {
        return (
            <div className="Err">
                <h4>
                    Opps! no data...
                </h4>
            </div>
        )
    } else {


        return (
            <div>
                <h3>Logged Exercises</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Username</th>
                            <th>Description</th>
                            <th>Duration</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {exerciseList()}
                    </tbody>
                </table>
            </div>
        )
    }
}