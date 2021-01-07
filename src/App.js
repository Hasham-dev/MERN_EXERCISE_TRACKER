import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/navbar.component';
import ExerciseList from './components/exercise-list.component';
import EditExercises from './components/edit-exercises.component';
import CreateExercises from './components/create-exercises.component';
import CreateUsers from './components/create-users.component';

function App() {
  return (
    <Router>

        <Navbar />
      <div className="container">
        <br />
        <Route exact path="/" component={ExerciseList} />
        <Route path="/edit/:id" component={EditExercises} />
        <Route path="/create" component={CreateExercises} />
        <Route path="/user" component={CreateUsers} />
      </div>
    </Router>
  );
}

export default App;
