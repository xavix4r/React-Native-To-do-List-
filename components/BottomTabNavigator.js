import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';

import {HomeStackNavigator} from './HomeStackNavigator';
import CalendarScreen from './CalendarStackScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator initialRouteName="Task" screenOptions={{
      tabBarStyle: {height:60},
    }}>
      <Tab.Screen
        name={'Task'}
        component={HomeStackNavigator}

        options={{
          tabBarLabel: 'Task',
          tabBarLabelStyle:{fontSize:14},
          headerShown: false,

          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="clipboard-check-multiple-outline" color={color} size={24} />
          ),

        }}
      />
      <Tab.Screen
        name={' '}
        component={CalendarScreen}

        options={{
          tabBarLabel: 'Calendar',
          tabBarLabelStyle:{fontSize:14},
          headerShown: true,
          headerStyle: {
            backgroundColor: '#5C71E6',
            height: 90
          },
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="calendar-outline"
              color={color}
              size={24}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarLabel: {
    color: '#292929',
    fontSize: 12,
  },
  
});

export default BottomTabNavigator;
