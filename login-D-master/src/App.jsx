import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SigninPage from "./component/SigninPage";
import SignupPage from "./component/SignupPage";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<SigninPage />}/>
                <Route path="/signin" element={<SigninPage />} />
                <Route path="/signup" element={<SignupPage />}/>
            </Routes>
             </Router>
    )
}

export default App;