import './App.css';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { Navigate } from 'react-router-dom'
import Task from './Pages/views/Task/Task';
import Project from './Pages/views/Project/Project';
import User from './Pages/views/User/User';
import Register from './Pages/views/Register';
import Login from './Pages/views/Login';

function ProtectedRoute() {
  let isAuthenticated = localStorage.getItem("task_management_token")
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/task" element={<Task />} />
          <Route path="/project" element={<Project />} />
          <Route path="/user" element={<User />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;