import React, { useState, useContext } from "react";
import {
  View, Text, StyleSheet, Pressable, KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import moment from "moment";
import Modal from "react-native-modal";
import AddTaskModalButtons from "./AddTaskModalButtons";
import { TextInput } from "react-native-paper";
import { Calendar } from "react-native-calendars";
import { TaskContext } from "./Context";

const Task = (props) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [text, onChangeText] = React.useState(props.text);
  const [descriptionText, onChangeDescriptionText] = React.useState(props.description);
  const [date, setDate] = React.useState(props.datetext);
  const [isCalendar, setCalendarVisible] = useState(false);
  const {
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
  } = useContext(TaskContext);

  function DatePicker({ visible, onDateSelected }) {

    return (
      <Modal isVisible={visible} transparent={true} animationType="fade">
        <View style={styles.overlay}>
          <Calendar style={{ borderRadius: 20, overflow: 'hidden', padding: 20, borderWidth: 4, borderColor: '#4757B3', elevation: 4 }} enableSwipeMonths={true} minDate={moment().format("YYYY-MM-DD")} onDayPress={onDateSelected}
            theme={{

            arrowColor:'#4757B3',
              todayTextColor:"#5C71E6",
              monthTextColor:'#fff',
              
              'stylesheet.calendar.header': {
                headerContainer: {
                  flexDirection: 'row',
                  
                  backgroundColor: '#5C71E6',
                  borderRadius: 12,
                },
                
                dayTextAtIndex0: {
                  color: 'red'
                },
                dayTextAtIndex6: {
                  color: 'green'
                }
              }
            }}

          />
        </View>
      </Modal>
    );
  }

  const toggleCalendar = () => {
    setCalendarVisible(!isCalendar);
  };

  const addDate = (day) => {

    setDate(moment(day.dateString).format("YYYY-MM-DD"));

    setCalendarVisible(!isCalendar);
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);

  };

  const updateTask = (newText, descriptionText, date, ischecked, id) => {

    if(newText.length == 0){
      return Alert.alert('Error', 'Task Name cannot be empty');
    }

    if (props.datetext == moment().format("YYYY-MM-DD") &&
      props.isChecked == false) {
      updateTodayTask(newText, descriptionText, date, ischecked, id)
    }

    else if (date == moment().add(1, "days").format("YYYY-MM-DD") &&
    props.isChecked == false) {
      updateTomorrowTask(newText, descriptionText, date, ischecked, id)
    }

    else if (date > moment().add(1, "days").format("YYYY-MM-DD") &&
    props.isChecked == false) {
      updateUpcomingTask(newText, descriptionText, date, ischecked, id)
    }

    else {
      updateCompletedTask(newText, descriptionText, date, ischecked, id)
    }

    setModalVisible(!isModalVisible);
  }

  
  const completeTask = (todoId) => {
    if (
      props.datetext == moment().format("YYYY-MM-DD") &&
      props.isChecked == false
    ) {
      const filteredItem = todayTask.find((item) => item.id === todoId);

      const newTodosItem = todayTask.filter((item) => item.id !== todoId);

      setTodayTask(newTodosItem);

      const completedItem = {
        taskName: filteredItem.taskName,
        taskDescription: filteredItem.taskDescription,
        date: filteredItem.date,
        isCompleted: true,
        id: filteredItem.id,
      };

      setCompletedTask([...completedTask, completedItem]);
    } else if (
      props.datetext == moment().add(1, "days").format("YYYY-MM-DD") &&
      props.isChecked == false
    ) {
      const filteredItem = tomorrowTask.find((item) => item.id === todoId);

      const newTodosItem = tomorrowTask.filter((item) => item.id !== todoId);

      setTomorrowTask(newTodosItem);

      const completedItem = {
        taskName: filteredItem.taskName,
        taskDescription: filteredItem.taskDescription,
        date: filteredItem.date,
        isCompleted: true,
        id: filteredItem.id,
      };

      setCompletedTask([...completedTask, completedItem]);
    } else if (
      props.datetext > moment().add(1, "days").format("YYYY-MM-DD") &&
      props.isChecked == false
    ) {
      const filteredItem = upcomingTask.find((item) => item.id === todoId);

      const newTodosItem = upcomingTask.filter((item) => item.id !== todoId);

      setUpcomingTask(newTodosItem);

      const completedItem = {
        taskName: filteredItem.taskName,
        taskDescription: filteredItem.taskDescription,
        date: filteredItem.date,
        isCompleted: true,
        id: filteredItem.id,
      };

      setCompletedTask([...completedTask, completedItem]);
    } else {
      const filteredItem = completedTask.find((item) => item.id === todoId);

      const newTodosItem = completedTask.filter((item) => item.id !== todoId);
      setCompletedTask(newTodosItem);

      const completedItem = {
        taskName: filteredItem.taskName,
        taskDescription: filteredItem.taskDescription,
        date: filteredItem.date,
        isCompleted: false,
        id: filteredItem.id,
      };

      if (completedItem.date == moment().format("YYYY-MM-DD")) {

        setTodayTask([...todayTask, completedItem]);
      } else if (
        completedItem.date == moment().add(1, "days").format("YYYY-MM-DD")
      ) {
        setTomorrowTask([...tomorrowTask, completedItem]);
      } else if (
        completedItem.date > moment().add(1, "days").format("YYYY-MM-DD")
      ) {
        setUpcomingTask([...upcomingTask, completedItem]);
      }
    }
  };

  const deleteTodo = (todoId) => {
    if (
      props.datetext == moment().format("YYYY-MM-DD") &&
      props.isChecked == false
    ) {
      const newTodosItem = todayTask.filter((item) => item.id != todoId);
      setTodayTask(newTodosItem);
    } else if (
      props.datetext == moment().add(1, "days").format("YYYY-MM-DD") &&
      props.isChecked == false
    ) {
      const newTodosItem = tomorrowTask.filter((item) => item.id != todoId);
      setTomorrowTask(newTodosItem);
    } else if (
      props.datetext > moment().add(1, "days").format("YYYY-MM-DD") &&
      props.isChecked == false
    ) {
      const newTodosItem = upcomingTask.filter((item) => item.id != todoId);
      setUpcomingTask(newTodosItem);
    } else {
      const newTodosItem = completedTask.filter((item) => item.id != todoId);

      setCompletedTask(newTodosItem);
    }
  };

  return (
    <View style={styles.item}>
      <Text style={{ textAlign: "center" }}>{moment(props.datetext).format("DD MMM")}</Text>
      <View style={styles.task}>
        <BouncyCheckbox
          size={28}
          fillColor="#A4AEEA"
          unfillColor="#FFFFFF"
          innerIconStyle={{ borderWidth: 2 }}
          textStyle={{
            fontFamily: "sans-serif",
            color: props.isChecked ? "#808486" : "#222B45",
            fontSize: 18,
          }}
          isChecked={props.isChecked}
          onPress={() => completeTask(props.id)}
          text={props.text}
        ></BouncyCheckbox>
      </View>

      <View style={styles.button}>
        <Pressable onPress={toggleModal}>
          <MaterialCommunityIcons name="pencil" color={"#222B45"} size={25} />

        </Pressable>

        <Modal isVisible={isModalVisible}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
          >
            <TouchableWithoutFeedback
              onPress={Keyboard.dismiss}
              accessible={false}
            >
              <View style={styles.modal}>
                <View style={styles.modalHeader}>
                  <Text style={styles.addTaskTitle}>Edit Task</Text>
                </View>
                <View style={styles.inputSection}>
                  <TextInput
                    mode="outlined"
                    textColor="rgba(0, 0, 0, 0.6)"
                    theme={{
                      colors: {
                        background: "white",
                        onSurfaceVariant: "rgba(0, 0, 0, 0.6)",
                      },
                    }}
                    outlineStyle={{ borderRadius: 8 }}
                    outlineColor="#A4AEEA"
                    activeOutlineColor="#A4AEEA"
                    placeholder="Enter Task Name..."
                    value={text}
                    onChangeText={onChangeText}
                  />

                  <TextInput
                    mode="outlined"
                    textColor="rgba(0, 0, 0, 0.6)"
                    theme={{
                      colors: {
                        background: "white",
                        onSurfaceVariant: "rgba(0, 0, 0, 0.6)",
                      },
                    }}
                    style={{ marginTop: 14 }}
                    multiline={true}
                    numberOfLines={8}
                    outlineStyle={{ borderRadius: 8 }}
                    outlineColor="#A4AEEA"
                    activeOutlineColor="#A4AEEA"
                    placeholder="Enter Task Description (Optional)"
                    value={descriptionText}
                    onChangeText={onChangeDescriptionText}
                  />
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={styles.dateButton}>
                    <Pressable onPress={toggleCalendar}>
                      <Text style={styles.dateText}>Select Date</Text>
                      <DatePicker
                        visible={isCalendar}
                        onDateSelected={(day) => addDate(day)}
                      />
                    </Pressable>

                  </View>
                  <Text style={{ marginLeft: 20, fontSize: 20, marginTop: 18 }}>{moment(date).format("DD MMM YYYY")}</Text>
                </View>
                </View>

                <View style={styles.buttonSection}>
                  <AddTaskModalButtons
                    style={{
                      marginRight: 20,
                      backgroundColor: "transparent",
                      color: "black",
                    }}
                    onPress={toggleModal}
                    Text={"Cancel"}
                  />
                  <AddTaskModalButtons onPress={() => updateTask(text, descriptionText, date, props.isChecked, props.id)} Text={"Done"} />
                </View>
              </View>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </Modal>

        <Pressable
          style={styles.secondButton}
          onPress={() => deleteTodo(props.id)}
        >
          <MaterialCommunityIcons name="delete" color={"#222B45"} size={25} />
        </Pressable>
      </View>
    </View>
  );
};

export default Task;

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#fff",
    padding: 15,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#A4AEEA",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 28,
    elevation: 3,
  },
  button: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },

  task: {
    flex: 1,
    flexDirection: "row",
    marginLeft: 20,
  },

  secondButton: {
    marginLeft: 10,
  },

  tasktext: {
    marginLeft: 20,
  },

  modal: {
    height: "auto",
    width: 350,

    backgroundColor: "white",

    alignSelf: "center",
    borderRadius: 10,
  },

  modalHeader: {
    backgroundColor: "#5C71E6",
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  addTaskTitle: {
    fontSize: 30,
    color: "white",
  },

  buttonSection: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },

  buttons: {
    marginRight: 20,
  },

  dateButton: {
    alignSelf: "flex-start",
    justifyContent: "center",
    height: 40,
    borderRadius: 13,
    paddingHorizontal: 10,
    backgroundColor: "#5C71E6",
    marginTop: 20,
  },

  dateText: {
    color: "white",
  },

  overlay: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
  },

  inputSection: {
    flexDirection: "column",
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
});
