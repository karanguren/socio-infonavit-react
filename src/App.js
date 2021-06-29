import { useLocation } from 'react-router-dom';
import Routers from "./Router/Router";
import Navbar from "./components/Navbar/navbar";
import "../node_modules/toastr/toastr.scss";
import './App.css';

function App() {
    const location = useLocation().pathname.includes("/home") === true;

    return (
        <div className="App">
            {location === true ? <Navbar /> : " "}
            <Routers />
        </div>
    );
}

export default App;