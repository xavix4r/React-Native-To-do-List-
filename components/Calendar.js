// Wong Wei Jun Daniel
// P2243564
// DIT/1B/02

import React, { useContext } from "react";
import { SafeAreaView, StyleSheet, View, Text } from "react-native";
import { Agenda } from "react-native-calendars";
import moment from "moment";
import { TaskContext } from "./Context";

moment().format();

function CalendarPicker() {
  const {
    todayTask,
    tomorrowTask,
    upcomingTask,
    completedTask,

  } = useContext(TaskContext);

  allTasks = [];

  allTasks = allTasks.concat(todayTask, tomorrowTask, upcomingTask, completedTask);
  const items = {};

  allTasks.forEach((task) => {
    if (!items[task.date]) {
      items[task.date] = [];
    }
    items[task.date].push({
      taskName: task.taskName,
      isCompleted: task.isCompleted,
      date: task.date,
      id: task.id,
    });
  });

  return (
    <SafeAreaView style={styles.container}>
      <Agenda
        theme={{
          agendaTodayColor: '#5C71E6',
        }}
        showClosingKnob={true}
        renderEmptyDate={() => {
          return (
            <View>

            </View>
          );
        }}
        renderEmptyData={() => {
          return (
            <View>

            </View>
          );
        }}
        selected={moment().format("YYYY-MM-DD")}
        items={items}

        renderItem={(item) => {

          return (
            <View style={styles.item}>
              <Text
                style={[
                  styles.itemText,
                  {
                    textDecorationLine: item.isCompleted
                      ? "line-through"
                      : "none",
                  },
                ]}
              >
                {item.taskName}
              </Text>
            </View>
          );
        }}
        reservationsKeyExtractor={(item) => {
          return item?.reservation?.id;
        }}
      />
    </SafeAreaView>
  );
}

export default CalendarPicker;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  item: {
    backgroundColor: "white",
    flex: 1,

    elevation: 4,
    marginRight: 10,
    marginTop: 17,
    marginBottom: 5,
    justifyContent: "center",
    alignItems: "center",
    padding: 14,
  },
  itemText: {
    color: "black",
    fontSize: 24,
  },
});
