import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddPatients from './AddPatients';
import axios from 'axios';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer } from 'react-notifications';

axios.defaults.baseURL = "http://127.0.0.1:8000";

export default function App() {
    return (
	<Router>
          <div class="min-h-screen flex flex-col">
            <div class="main flex-grow">
              <NotificationContainer/>
	        <Routes>
                  <Route path="/add-patients" element={<AddPatients/>}> </Route>
	        </Routes>
            </div>
          </div>
	</Router>        
    );
}
