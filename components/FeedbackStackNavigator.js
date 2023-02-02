import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  Modal,
  TouchableHighlight,
  Animated,
} from "react-native";
import React, { useState, useEffect } from "react";

function Input(props) {
  const [name, setName] = React.useState(null);
  const [message, setMessage] = React.useState(null);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [yTranslate] = React.useState(new Animated.Value(0));


  const handleReset = () => {
    setName("");
    setMessage("");
  };

  useEffect(() => {
    if (!modalVisible) {
      yTranslate.setValue(0);
    }
  }, [modalVisible]);


  useEffect(() => {
    if (modalVisible) {
      setTimeout(() => {
        Animated.timing(yTranslate, {
          toValue: 600,
          duration: 2500,
          useNativeDriver: true,
        }).start(() => setModalVisible(false));
      }, 750);
    }
  }, [modalVisible]);


  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.inputName}
        onChangeText={(text) => setName(text)}
        value={name}
        placeholder="Name"
      />

      <TextInput
        style={styles.inputMsg}
        onChangeText={(text) => setMessage(text)}
        value={message}
        placeholder="Message..."
        multiline
      />

      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <Animated.View
            style={[styles.modalView, { transform: [{ translateY: yTranslate }] }]}
          >
            <Text style={styles.modalText}>
              {"Feedback successfully submitted!"}
            </Text>
            <TouchableHighlight
              activeOpacity={0.6}
              underlayColor="#DDDDDD"
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableHighlight>
          </Animated.View>
        </View>
      </Modal>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
          <Text style={styles.resetButtonText}>RESET</Text>
        </TouchableOpacity>
        <View style={styles.buttonSpace} />
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => {
            if ((message === "" || message === null) && (name === "" || name === null)) {
              alert("Please input your name & feedback before submitting. Thank you!");
            } else if ( message === "" || message === null) {
              alert("Please input your feedback before submitting. Thank you!");
            } else if ( name === "" || name === null ) {
              alert("Please input your name before submitting. Thank you!");
            } else {
              setModalVisible(true);
              handleReset(true);
            }
          }}
        >
          <Text style={styles.submitButtonText}>SUBMIT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const FeedbackStackNavigator = () => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Input />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default FeedbackStackNavigator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },

  inputContainer: {
    flex: 1,
    alignItems: "center",
    paddingTop: 200,
  },

  header: {
    backgroundColor: "#5C71E6",
    height: 110,
  },

  inputName: {
    height: 50,
    margin: 10,
    borderWidth: 2,
    padding: 10,
    borderColor: "#777",
    width: 350,
    borderRadius: 7,
  },

  inputMsg: {
    height: 250,
    margin: 50,
    borderWidth: 2,
    padding: 10,
    borderColor: "#777",
    width: 350,
    borderRadius: 7,
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "83%",
    marginRight: 24,
  },

  submitButton: {
    backgroundColor: "#5c71e6",
    paddingVertical: 10,
    paddingHorizontal: 18,
    height: 40,
    borderRadius: 7,
    marginLeft: 10,
  },

  resetButton: {
    backgroundColor: "#5c71e6",
    paddingVertical: 10,
    paddingHorizontal: 18,
    height: 40,
    borderRadius: 7,
    marginRight: 10,
  },

  submitButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },

  resetButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalText: {
    fontSize: 20,
    marginBottom: 15,
    textAlign: "center",
  },
  closeButton: {
    alignSelf: "flex-end",
    marginTop: 10,
  },
  closeButtonText: {
    color: "#5c71e6",
    fontSize: 18,
    fontWeight: "bold",
  },
});
