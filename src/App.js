import './App.css';
import SettingsPage from './components/settings-dialog/SettingsPage';
import Startup from './components/startup-dialog/startup';
import { Route, Routes, BrowserRouter } from "react-router-dom";
import PKLLogo from './assets/icons/PKLLogo.png';

function App() {
  return (
    <>
      <div className="App">
        <h1> <img src={PKLLogo} alt='logo' height={60} /> Assignment</h1>
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
