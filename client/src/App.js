import "./App.css";
import { Route, Routes } from "react-router-dom";
import Admin from "./Pages/Admin/Admin";
import Home from "./Pages/Admin/Home";
import Approved from "./Pages/Admin/Approved";
import Rejected from "./Pages/Admin/Rejected";
import Slots from "./Pages/Admin/Slots";
import Progress from "./Pages/Admin/Progress";
import AdminLogin from "./Pages/Admin/Login";
import Application from "./Pages/User/Application";
import Login from "./Pages/User/Login";
import Register from "./Pages/User/Register";
import Nocomponent from "./Pages/Nocomponent";
import Createslot from "./Pages/Admin/Createslot";
import Userhome from "./Pages/User/Userhome";
import User from "./context/userContext";

function App() {
  return (
    <div>
      <User >
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/userhome" element={<Userhome />} />

        <Route path="/" element={<Application />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>

      <Routes>
        <Route path="/admin" exact element={<Admin />}>
          <Route path="/admin/home" element={<Home />} />
          <Route path="/admin/approved" element={<Approved />} />
          <Route path="/admin/rejected" element={<Rejected />} />
          <Route path="/admin/booking_slots" element={<Slots />} />
          <Route path="/admin/progress" element={<Progress />} />
          <Route path="/admin/slots" element={<Createslot />} />
        </Route>
      </Routes>
      </User>
      {/* <Routes>
        <Route path='*' exact={true} component={Nocomponent} />

        <Route path='*' element={<Nocomponent />} />
      </Routes> */}
    </div>
  );
}

export default App;
