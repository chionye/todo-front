/** @format */

import React, { useState, useEffect } from "react";
import { Button, Empty, Logo, Modal, Task } from "../components";
import "../App.css";
import { Api } from "../api/Api";
import { Storage } from "../storage/Storage";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(Storage.get("user"));
  const [tasks, setTasks] = useState(user.todos);
  const [render, setRender] = useState(true);
  const [modal, setModal] = useState(false);
  const [title, setTitle] = useState();
  const [desc, setDesc] = useState();
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [filter, setFilter] = useState([]);
  const [category, setCategory] = useState([]);
  const [task, setTask] = useState({
    uid: user.id,
  });

  useEffect(() => {
    let filteredCategories;
    filteredCategories = tasks.map((arr) => {
      return arr.category;
    });
    setCategory([...new Set(filteredCategories)]);
  }, []);

  const deleteTask = (event, key, id) => {
    Api(`/todo/${id}`, null, "DELETE")
      .then((res) => res.json())
      .then((data) => {
        let val = tasks;
        val.splice(key, 1);
        user.todos = val;
        Storage.set("user", JSON.stringify(user));
        setTasks(val);
        setRender(!render);
      })
      .catch((err) => console.log(err));
  };

  const openModal = () => {
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
        setModal(false);
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
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
    let edit = {};
    if (title) edit.title = title;
    if (desc) edit.description = desc;
    if (date) edit.date = date;
    if (time) edit.time = time;
    let val = tasks[key];
    console.log(val, { ...val, ...edit });
  };

  const dd = (e) => {
    return console.log(e.target.value);
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
          <Button.Sm label={"Log Out"} onClick={logout} />
        </div>
      </header>
      <main>
        <section className='container'>
          <div className='flex-group'>
            <h1 className='heading'>My Tasks</h1>
            <Button.Icon label='Task' action={"add"} handleClick={openModal} />
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
                      setTitle={setTitle}
                      setDesc={setDesc}
                      setDate={setDate}
                      setTime={setTime}
                      done={item.completed}
                      f={dd}
                      editTask={(e) => editTask(e, key, item.id)}
                      deleteTask={(e) => deleteTask(e, key, item.id)}
                    />
                  );
                })
              : tasks.map((item, key) => {
                  return (
                    <Task.Item
                      key={key}
                      taskId={item.id}
                      title={item.title}
                      description={item.description}
                      date={item.date}
                      time={item.time}
                      category={item.category}
                      done={item.completed}
                      deleteTask={(e) => deleteTask(e, key, item.id)}
                    />
                  );
                })}
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
