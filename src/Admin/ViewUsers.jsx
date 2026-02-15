import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../config";

function ViewUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${config.API_URL}/userdata`);
        const dataArray = res.data._embedded?.users || [];
        setUsers(dataArray);
      } catch (error) {
        console.error("Failed to fetch users", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="container mt-4">
      <h2>User List</h2>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <table className="table table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Password</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={idx}>
                <td>{user.uname}</td>
                <td>{user.email}</td>
                <td>{user.password}</td>
                <td>{new Date(user.createAT).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ViewUsers;
