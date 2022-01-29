import './App.css';
import {BrowserRouter as Router, Routes as Switch, Route} from "react-router-dom"
import {Header} from "./components/Header/Header"
import {Authorization} from "./pages/Authorization/Authorization"
import {Registration} from "./pages/Registration/Registration"
import {Home} from "./pages/Home/Home"

function App() {
    return (
        <Router>
            <div className="App">
                <Switch>
                    <Route path="/registration" element={<Registration />}/>
                    <Route path="/authorization" element={<Authorization />} />
                    <Route path="/" element={<Home />}/>
                </Switch>
            </div>
        </Router>
    )
}

export default App;
