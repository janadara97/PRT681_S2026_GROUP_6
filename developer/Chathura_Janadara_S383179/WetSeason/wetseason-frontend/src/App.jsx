import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RequireAuth from "./components/RequireAuth";
import Dashboard from "./pages/Dashboard";

function App() {
    return (
        <Routes>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route
                path="/incidents"
                element={
                    <RequireAuth>
                        <Dashboard />
                    </RequireAuth>
                }
            />
        </Routes>
    );
}

export default App;
