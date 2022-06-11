import './App.css';
import {Layout} from "./components/layout/Layout";
import { UsersList } from './components/users/users-list/UsersList';
import { Users } from './components/users/Users';
import { EditUser } from './components/users/edit-user/EditUser'
import { Route, Routes } from 'react-router-dom';
import { CreateUser } from './components/users/create-user/CreateUser';
import { Vehicles } from './components/vehicles/Vehicles';
import { VehicleList } from './components/vehicles/vehicleList/VehicleList';
import { CreateVehicle } from './components/vehicles/createVehicle/CreateVehicle';
import { RentalEvents } from './components/rental-events/RentalEvents';

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path='/' element={<Layout/>}>
            <Route path='customers' element={<Users/>}>
              <Route index element={<UsersList />} />
              <Route path='create' element={<CreateUser />} />
              <Route path='edit/:id' element={<EditUser />}/>
            </Route>
            <Route path='vehicles' element={< Vehicles/>}>
              <Route index element={< VehicleList/>} />
              <Route path='create' element={<CreateVehicle />} />
            </Route>
            <Route path='rental-events' element={<RentalEvents />}>

            </Route>
          </Route>
        </Routes>
    </div>
  );
}

export default App;
