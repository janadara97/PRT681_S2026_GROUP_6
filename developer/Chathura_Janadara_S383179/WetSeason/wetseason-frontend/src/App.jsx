import IncidentBoard from "./pages/IncidentBoard";
import { Routes, Route } from "react-router-dom";
import ReportIncident from "./pages/ReportIncident";
import Login from "./pages/Login";
import RequireAuth from "./components/RequireAuth";

function App() {
    return (
        <Routes>
            <Route path="/login" element={<Login />}></Route>
            <Route
                path="/incidents"
                element={
                    <RequireAuth>
                        <IncidentBoard />
                    </RequireAuth>
                }
            />
            <Route
                path="/incidents/new"
                element={
                    <RequireAuth>
                        <ReportIncident />
                    </RequireAuth>
                }
            />
        </Routes>
    );
}

export default App;
