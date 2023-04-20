import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { Button } from "../Button/Button";
import { Form } from "../Form/Form";
import "./Task.css";


export const Task = {

  Container: ({ children }) => {
    return <div id='tasks'>{children}</div>;
  },
  Item: ({
    title,
    description,
    category,
    handleChange,
    date,
    time,
    completed,
    setCheck,
    position,
    editTask,
    deleteTask,
    taskId,
  }) => {
    const [done, setDone] = useState(completed);
    const handleCheck = (e) => {
      setDone(!done);
      setCheck(!done, position, taskId);
    };
    return (
      <form className='task' id={taskId}>
        <div className='flex-start'>
          <input
            type='checkbox'
            name='completed'
            onChange={handleCheck}
            checked={done}
          />
          <div className='content'>
            <input
              className={`task-title ${done ? "strike" : ""}`}
              type='text'
              name='title'
              placeholder={title}
              onChange={handleChange}
              disabled={done}
              onFocus={(e) => (e.target.value = e.target.placeholder)}
            />
            {description ? (
              <textarea
                className='task-desc'
                onChange={handleChange}
                name='description'
                disabled={done}
                rows={"auto"}>
                {description}
              </textarea>
            ) : null}
            <div className='other'>
              <div className='reminder'>
                {date ? (
                  <div className='task-tag'>
                    <Icon icon='ic:outline-date-range' width={18} />
                    <input
                      type='text'
                      className='cat'
                      name='date'
                      placeholder={date}
                      disabled={done}
                      onChange={handleChange}
                      onFocus={(e) => (e.target.value = e.target.placeholder)}
                    />
                  </div>
                ) : null}
                {time ? (
                  <div className='task-tag'>
                    <Icon
                      icon='material-symbols:nest-clock-farsight-analog-outline-rounded'
                      width={18}
                    />
                    <input
                      type='text'
                      className='cat'
                      name='time'
                      placeholder={time}
                      disabled={done}
                      onChange={handleChange}
                      onFocus={(e) => (e.target.value = e.target.placeholder)}
                    />
                  </div>
                ) : null}
              </div>
              {category ? <span className='task-cat'>#{category}</span> : null}
            </div>
          </div>
        </div>
        <div className='flex-center'>
          <Button.Icon type='submit' action={"edit"} handleClick={editTask} />
          <Button.Icon action={"delete"} handleClick={deleteTask} />
        </div>
      </form>
    );
  },

  New: ({ handleChange, submit, modal }) => {
    const [cat, setCat] = useState(false);
    return (
      <>
        <div className='flex-group'>
          <h2>New Task</h2>
          <button
            onClick={() => {
              modal(false);
            }}>
            <Icon icon='material-symbols:close-rounded' width={20} />
          </button>
        </div>
        <Form.Container>
          <Form.Input
            label={"Title"}
            type={"text"}
            name={"title"}
            handleChange={handleChange}
          />
          <Form.Input
            label={"Description"}
            type={"text"}
            name={"description"}
            handleChange={handleChange}
          />
          <div className='form-group'>
            <label>Category</label>
            <div className='auto-grid'>
              <input
                name='category'
                className='category'
                type='button'
                value={"Work"}
                onClick={handleChange}
              />
              <input
                name='category'
                className='category'
                type='button'
                value={"Fitness"}
                onClick={handleChange}
              />
              <input
                name='category'
                className='category'
                type='button'
                value={"Family"}
                onClick={handleChange}
              />
              <input
                name='newCategory'
                className='category'
                type='button'
                value={"New Tag"}
                onClick={() => {
                  setCat(!cat);
                }}
              />
            </div>
            {cat ? (
              <Form.Input
                type={"text"}
                name={"category"}
                handleChange={handleChange}
              />
            ) : null}
          </div>
          <h3 className='mt-5'>Set Reminder</h3>
          <div className='flex-group'>
            <Form.Input
              label={"Date"}
              type={"date"}
              name={"date"}
              handleChange={handleChange}
            />
            <Form.Input
              label={"Time"}
              type={"time"}
              name={"time"}
              handleChange={handleChange}
            />
          </div>
          <Button.Sm label={"Add Task"} type={"submit"} handleClick={submit} />
        </Form.Container>
      </>
    );
  },
};
