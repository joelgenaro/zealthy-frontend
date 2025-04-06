import React, { useEffect, useState } from "react";
import { get } from "../utils/api"; 

function DataTable() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 

  useEffect(() => {
    get("/users")
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
        setError("Failed to load user data.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>; 
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>; 
  }

  return (
    <div>
      <h2>User Data</h2>
      {users.length === 0 ? (
        <p>No users available.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Email</th>
              <th>About Me</th>
              <th>Address</th>
              <th>Birthdate</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.email}</td>
                <td>{user.aboutMe}</td>
                <td>
                  {user.address.street}, {user.address.city}, {user.address.state}, {user.address.zip}
                </td>
                <td>{user.birthdate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default DataTable;