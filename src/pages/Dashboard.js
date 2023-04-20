/** @format */

import React, { useState, useEffect } from "react";
import { Alert, Button, Empty, Logo, Modal, Task } from "../components";
import "../App.css";
import { Api } from "../api/Api";
import { Storage } from "../storage/Storage";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(Storage.get("user"));
  const [render, setRender] = useState(true);
  const [tasks, setTasks] = useState(user.todos);
  const [modal, setModal] = useState(false);
  const [filter, setFilter] = useState(user.todos);
  const [category, setCategory] = useState([]);
  const [editData, setEditData] = useState({});
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [task, setTask] = useState({
    uid: user.id,
  });
  const updateCategories = () => {
    let filteredCategories;
    filteredCategories = tasks.map((arr) => {
      return arr.category;
    });
    setCategory([...new Set(filteredCategories)]);
  };

  useEffect(() => {
    updateCategories();
  }, []);

  const deleteTask = (event, key, id) => {
    event.preventDefault();
    Api(`/todo/${id}`, null, "DELETE")
      .then((res) => res.json())
      .then((data) => {
        let val = tasks;
        val.splice(key, 1);
        user.todos = val;
        Storage.set("user", JSON.stringify(user));
        setTasks(val);
        setSuccess("Delete successful!");
        setTimeout(() => {
          setSuccess("");
        }, "3000");
        setRender(!render);
      })
      .catch((err) => console.log(err));
  };

  const addTask = () => {
    setModal(true);
  };

  const saveTask = (e) => {
    e.preventDefault();
    Api(`/todo`, task, "POST")
      .then((res) => res.json())
      .then((data) => {
        let val = tasks;
        val.unshift(data);
        user.todos = val;
        Storage.set("user", JSON.stringify(user));
        setTasks(val);
        setSuccess("You have added a new task!");
        setTimeout(() => {
          setSuccess("");
        }, "3000");
        updateCategories();
        setModal(false);
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleCheck = (status, key, id) => {
    const completionStatus = {completed: status};
    Api(`/todo/${id}`, completionStatus, "PUT")
      .then((res) => res.json())
      .then((data) => {
        let val = tasks;
        val[key] = { ...tasks[key], ...completionStatus };
        user.todos = val;
        Storage.set("user", JSON.stringify(user));
        setTasks(val);
        setSuccess("Task status updated!");
        setTimeout(() => {
          setSuccess("");
        }, "3000");
        setRender(!render);
      })
      .catch((err) => console.log(err));
  };

  const filterTasks = (e) => {
    if (e === "All") {
      setFilter(tasks);
      return;
    }
    let filteredTasks;
    filteredTasks = tasks.filter((arr) => {
      return arr.category === e;
    });
    setFilter(filteredTasks);
  };

  const logout = (e) => {
    Storage.remove();
    navigate("/");
  };

  const editTask = (e, key, id) => {
    e.preventDefault();
    Api(`/todo/${id}`, editData, "PUT")
      .then((res) => res.json())
      .then((data) => {
        let val = tasks;
        val[key] = { ...tasks[key], ...editData };
        user.todos = val;
        Storage.set("user", JSON.stringify(user));
        setTasks(val);
        setSuccess("Edit Successful!");
        setTimeout(() => {
          setSuccess("");
        }, "3000");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <header className='container header'>
        <div>
          <Logo />
          <p>{user?.email}</p>
        </div>
        <div className='flex-center'>
          <Button.Toggle />
          <Button.Sm label={"Log Out"} handleClick={logout} />
        </div>
      </header>
      <main>
        <section className='container'>
          <div className='flex-group'>
            <h1 className='heading'>My Tasks</h1>
            <Button.Icon label='Task' action={"add"} handleClick={addTask} />
          </div>

          <div className='grid'>
            <Button.Category
              handleClick={() => filterTasks("All")}
              title={"All"}
            />
            {category
              ? category.map((item, key) => {
                  return (
                    <Button.Category
                      handleClick={() => filterTasks(item)}
                      title={item}
                    />
                  );
                })
              : null}
          </div>
          {error ? <Alert status={"error"} message={error} /> : null}
          {success ? <Alert status={"success"} message={success} /> : null}
          <Task.Container>
            {filter.length > 0
              ? filter.map((item, key) => {
                  return (
                    <Task.Item
                      key={key}
                      taskId={item.id}
                      title={item.title}
                      description={item.description}
                      date={item.date}
                      time={item.time}
                      category={item.category}
                      completed={item.completed}
                      setCheck={handleCheck}
                      position={key}
                      handleChange={handleEditChange}
                      editTask={(e) => editTask(e, key, item.id)}
                      deleteTask={(e) => deleteTask(e, key, item.id)}
                    />
                  );
                })
              : (<Empty />)}
          </Task.Container>
        </section>
        <Modal
          show={modal}
          close={() => {
            setModal(false);
          }}>
          <Task.New
            handleChange={handleChange}
            submit={saveTask}
            modal={setModal}
          />
        </Modal>
      </main>
    </>
  );
}

export default Dashboard;
