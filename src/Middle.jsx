import React from 'react';
import { BrowserRouter as Router, Routes,Route, Link} from "react-router-dom";
import App from './App';
import Home from './Home';


function Middle() {
    return (
        <div>
            <Router>
 
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/quiz" element={<App/>}/>
                
            </Routes>             

            </Router>
        </div>
    )
}

export default Middle
