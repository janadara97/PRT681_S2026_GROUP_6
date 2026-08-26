import IncidentBoard from "./pages/IncidentBoard";
import { Routes, Route } from "react-router-dom";
import ReportIncident from "./pages/ReportIncident";

function App() {
    return (
        <Routes>
            <Route path="/" element={<IncidentBoard />} />
            <Route path="/incidents/new" element={<ReportIncident />} />
        </Routes>
    );
}

export default App;
