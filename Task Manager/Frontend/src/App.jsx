import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import Dashboard from "./pages/admin/Dashboard";
import CreateTask from "./pages/admin/CreateTasks";
import ManageTasks from "./pages/admin/ManageTasks";
import ManageUsers from "./pages/admin/ManageUser";
import PrivateRoute from "./routes/PrivateRoute";
import UserDashboard from "./pages/user/UserDashboard";
import MyTask from "./pages/user/MyTasks";
import TaskDetails from "./pages/user/TaskDetails";

const App = () => {
  return (
    <div className="text-purple-500 text-4xl text-center font-bold underline">
      <div>Task Manager</div>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Admin Routes */}
          <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
            <Route path="admin/dashboard" element={Dashboard} />
            <Route path="admin/create-task" element={CreateTask} />
            <Route path="admin/tasks" element={ManageTasks} />
            <Route path="admin/users" element={ManageUsers} />
          </Route>

          {/* User Routes */}
          <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
            <Route path="user/dashboard" element={UserDashboard} />
            <Route path="user/dashboard" element={MyTask} />
            <Route path="user/task-details/:id" element={TaskDetails} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
