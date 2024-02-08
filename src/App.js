import './App.css';
import SettingsPage from './components/settings-dialog/SettingsPage';
import Startup from './components/startup-dialog/startup';
import { Route, Routes, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <>
      <div className="App">
        <h1>Perkin-Elmer-Assignment</h1>
        <BrowserRouter>
          <Routes >
            <Route exact path='/' element={<Startup />} />

            <Route exact path='/settings' element={<SettingsPage />} />

          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
