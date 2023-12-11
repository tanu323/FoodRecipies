import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Auth from "./pages/auth.js";
import CreateRecipies from "./pages/createRecipies.js";
import ReadRecipies from "./pages/readRecipies.js";
import Navbar from "./components/navbar.js";


const App = () => {
    return (
        <div className="App">
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/auth" element={<Auth />} />
                    <Route path="/readRecipies" element={<ReadRecipies />} />
                    <Route path="/createRecipies" element={<CreateRecipies />} />
                </Routes>
            </Router>
        </div>
    )
}

export default App;
