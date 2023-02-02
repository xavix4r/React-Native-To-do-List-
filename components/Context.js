

import React, { useState, createContext, useContext, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from "moment";
export const TaskContext = createContext();

export const TaskProvider = (props) => {
  const [todayTask, setTodayTask] = React.useState([]);
  const [tomorrowTask, setTomorrowTask] = React.useState([]);
  const [upcomingTask, setUpcomingTask] = React.useState([]);
  const [completedTask, setCompletedTask] = React.useState([]);



  React.useEffect(() => {
    getTodayTask();
  }, []);

  React.useEffect(() => {
    getTomorrowTask();
  }, []);

  React.useEffect(() => {
    getUpcomingTask();
  }, []);

  React.useEffect(() => {
    getCompletedTask();
  }, []);

  React.useEffect(() => {
    saveTodayTasks(todayTask);
  }, [todayTask]);

  React.useEffect(() => {
    saveTomorrowTasks(tomorrowTask);
  }, [tomorrowTask]);

  React.useEffect(() => {
    saveUpcomingTasks(upcomingTask);
  }, [upcomingTask]);

  React.useEffect(() => {
    saveCompletedTasks(completedTask);
  }, [completedTask]);

  const saveTodayTasks = async todayTask => {
    try {
      const stringifyToday = JSON.stringify(todayTask);
      await AsyncStorage.setItem('Today', stringifyToday);
    } catch (error) {
      console.log(error);
    }
  };

  const saveTomorrowTasks = async tomorrowTask => {
    try {
      const stringifyTomorrow = JSON.stringify(tomorrowTask);
      await AsyncStorage.setItem('Tomorrow', stringifyTomorrow);
    } catch (error) {
      console.log(error);
    }
  };


  const saveUpcomingTasks = async upcomingTask => {
    try {
      const stringifyUpcoming = JSON.stringify(upcomingTask);
      await AsyncStorage.setItem('Upcoming', stringifyUpcoming);
    } catch (error) {
      console.log(error);
    }
  };

  const saveCompletedTasks = async completedTask => {
    try {
      const stringifyCompleted = JSON.stringify(completedTask);
      await AsyncStorage.setItem('Completed', stringifyCompleted);
    } catch (error) {
      console.log(error);
    }
  };

  const getTodayTask = async () => {
    try {
      const today = await AsyncStorage.getItem('Today');
      if (today != null) {
        setTodayTask(JSON.parse(today));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getTomorrowTask = async () => {
    try {
      const tomorrow = await AsyncStorage.getItem('Tomorrow');
      if (tomorrow != null) {
        setTomorrowTask(JSON.parse(tomorrow));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getUpcomingTask = async () => {
    try {
      const upcoming = await AsyncStorage.getItem('Upcoming');
      if (upcoming != null) {
        setTodayTask(JSON.parse(upcoming));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getCompletedTask = async () => {
    try {
      const completed = await AsyncStorage.getItem('Completed');
      if (completed != null) {
        setTodayTask(JSON.parse(completed));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateTodayTask = (newText, descriptionText, date, ischecked, id) => {
    
    var Task = {
      taskName: newText,
      taskDescription: descriptionText,
      date: date,
      isCompleted: ischecked,
      id: id
    }
  
    const index = todayTask.findIndex(task => task.id === id);
    const newTodosItem = todayTask.filter((task) => task.id !== id);

    let newTask = [];
    

    if(date == moment().format("YYYY-MM-DD") &&
    ischecked == false) {

      newTask = [...todayTask];
    newTask[index] = Task
    setTodayTask(newTask);
    }

    else if(
      date == moment().add(1, "days").format("YYYY-MM-DD") &&
      ischecked == false
    ){
      
      setTodayTask(newTodosItem)

     newTask = [...tomorrowTask, Task]
      setTomorrowTask(newTask)
    }

    else if(
      date > moment().add(1, "days").format("YYYY-MM-DD") &&
      ischecked == false
    ){
      
      setTodayTask(newTodosItem)

     newTask = [...upcomingTask, Task]
      setUpcomingTask(newTask)
    }

    else{
      newTask = [...completedTask];
    newTask[index] = Task
    setCompletedTask(newTask);
    }

  }

  const updateTomorrowTask = (newText, descriptionText, date, ischecked, id) => {
    
    var Task = {
      taskName: newText,
      taskDescription: descriptionText,
      date: date,
      isCompleted: ischecked,
      id: id
    }

    const index = tomorrowTask.findIndex(task => task.id === id);
    const newTodosItem = tomorrowTask.filter((task) => task.id !== id);

    if(date == moment().format("YYYY-MM-DD") &&
    ischecked == false) {

      setTomorrowTask(newTodosItem)

      newTask = [...todayTask, Task]
       setTodayTask(newTask)
    }

    else if(
      date == moment().add(1, "days").format("YYYY-MM-DD") &&
      ischecked == false
    ){
      
      let newTask = [];

    newTask = [...tomorrowTask];
    newTask[index] = Task
    setTomorrowTask(newTask);
    }

    else if(
      date > moment().add(1, "days").format("YYYY-MM-DD") &&
      ischecked == false
    ){
      console.log("nigger")
      setTomorrowTask(newTodosItem)

     newTask = [...upcomingTask, Task]
      setUpcomingTask(newTask)
    }

    else{
      newTask = [...completedTask];
    newTask[index] = Task
    setCompletedTask(newTask);
    }


    

  }

  const updateUpcomingTask = (newText, descriptionText, date, ischecked, id) => {
    
    var Task = {
      taskName: newText,
      taskDescription: descriptionText,
      date: date,
      isCompleted: ischecked,
      id: id
    }

    const index = upcomingTask.findIndex(task => task.id === id);
    const newTodosItem = upcomingTask.filter((task) => task.id !== id);

    let newTask = [];

    if(date == moment().format("YYYY-MM-DD") &&
    ischecked == false) {

      setUpcomingTask(newTodosItem)

      newTask = [...upcomingTask, Task]
       setTodayTask(newTask)
    }

    else if(
      date == moment().add(1, "days").format("YYYY-MM-DD") &&
      ischecked == false
    ){
      
      let newTask = [];

    newTask = [...tomorrowTask];
    newTask[index] = Task
    setTomorrowTask(newTask);
    }

    else if(
      date > moment().add(1, "days").format("YYYY-MM-DD") &&
      ischecked == false
    ){
      
     newTask = [...upcomingTask];
    newTask[index] = Task
    setUpcomingTask(newTask);
    }

    else{
      newTask = [...completedTask];
    newTask[index] = Task
    setCompletedTask(newTask);
    }

    

  }

  const updateCompletedTask = (newText, descriptionText, date, ischecked, id) => {
    
    var Task = {
      taskName: newText,
      taskDescription: descriptionText,
      date: date,
      isCompleted: ischecked,
      id: id
    }

    const index = completedTask.findIndex(task => task.id === id);

    let newTask = [];

    newTask = [...completedTask];
    newTask[index] = Task
    setCompletedTask(newTask);

  }
  

  return (
    <TaskContext.Provider
      value={{
        todayTask,
        setTodayTask,
        tomorrowTask,
        setTomorrowTask,
        upcomingTask,
        setUpcomingTask,
        completedTask,
        setCompletedTask,
        updateTodayTask,
        updateTomorrowTask,
        updateUpcomingTask,
        updateCompletedTask
      }}
    >
      {props.children}
    </TaskContext.Provider>
  );
};