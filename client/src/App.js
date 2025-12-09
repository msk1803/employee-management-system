import { useState, useEffect } from "react";
import "./App.css";
import Axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [position, setPosition] = useState("");
  const [wage, setWage] = useState(0);

  const [userList, setUserList] = useState([]);
  const [analytics, setAnalytics] = useState([]);
  const [editId, setEditId] = useState(null);

  const refreshData = () => {
    Axios.get("http://localhost:3001/users").then((res) =>
      setUserList(res.data)
    );
    Axios.get("http://localhost:3001/users/analytics").then((res) =>
      setAnalytics(res.data)
    );
  };

  useEffect(() => {
    refreshData();
  }, []);

  const addUser = () => {
    Axios.post("http://localhost:3001/users/create", {
      name,
      email,
      location,
      position,
      wage,
    }).then(() => {
      alert("User Added!");
      clearForm();
      refreshData();
    });
  };

  const startEditing = (val) => {
    setEditId(val.id);
    setName(val.name);
    setEmail(val.email);
    setLocation(val.location);
    setPosition(val.position);
    setWage(val.wage);

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const updateUser = () => {
    Axios.put("http://localhost:3001/users/update", {
      id: editId,
      name,
      email,
      location,
      position,
      wage,
    }).then(() => {
      alert("User Updated!");
      clearForm();
      refreshData();
    });
  };

  const clearForm = () => {
    setName("");
    setEmail("");
    setLocation("");
    setPosition("");
    setWage("");
    setEditId(null);
  };

  const deleteUser = (id) => {
    if (window.confirm("Are you sure?")) {
      Axios.delete(`http://localhost:3001/users/delete/${id}`).then(() =>
        refreshData()
      );
    }
  };

  const sendEmail = (email, name) => {
    Axios.post("http://localhost:3001/users/notify", { email, name }).then(() =>
      alert(`Notification sent to ${name}`)
    );
  };

  return (
    <div className="App">
      <header>
        <h1>Admin Dashboard</h1>
      </header>

      <div className="container">
        {/* --- ANALYTICS --- */}
        <div className="analytics-panel">
          <h2>📊 Analytics: Users by Location</h2>
          <div className="stats-row">
            {analytics.length === 0 ? (
              <p>No data available</p>
            ) : (
              analytics.map((item, key) => (
                <div className="stat-card" key={key}>
                  <h3>{item.location}</h3>
                  <h1>{item.count}</h1>
                  <p>Users</p>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="content-row">
          <div className="form-panel">
            {/* Change Title based on mode */}
            <h2>{editId ? "Edit User Details" : "Add New Employee"}</h2>

            <div className="inputs">
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="text"
                placeholder="Location (City)"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <input
                type="text"
                placeholder="Position"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
              />
              <input
                type="number"
                placeholder="Wage"
                value={wage}
                onChange={(e) => setWage(e.target.value)}
              />

              {editId ? (
                <div className="edit-actions">
                  <button className="btn-add btn-update" onClick={updateUser}>
                    Update Profile
                  </button>
                  <button className="btn-cancel" onClick={clearForm}>
                    Cancel
                  </button>
                </div>
              ) : (
                <button className="btn-add" onClick={addUser}>
                  Create Profile
                </button>
              )}
            </div>
          </div>

          <div className="list-panel">
            <h2>Employee List</h2>
            {userList.map((val, key) => (
              <div className="user-card" key={key}>
                <div className="info">
                  <h3>
                    {val.name} <span className="tag">{val.position}</span>
                  </h3>
                  <p>
                    📍 {val.location} | 📧 {val.email}
                  </p>
                  <p>
                    <p>💰 Wage: ₹{val.wage.toLocaleString("en-IN")}</p>
                  </p>
                </div>
                <div className="actions">
                  {/* Edit button now loads data into the top form */}
                  <button className="btn-upd" onClick={() => startEditing(val)}>
                    Edit
                  </button>
                  <button
                    className="btn-del"
                    onClick={() => deleteUser(val.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn-ntf"
                    onClick={() => sendEmail(val.email, val.name)}
                  >
                    Notify
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
