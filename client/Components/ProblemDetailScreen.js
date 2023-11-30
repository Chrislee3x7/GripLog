import React, { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaViewBase, ScrollView, View, Divider, TouchableOpacity } from "react-native";
import { Text, useTheme, Card, IconButton, Icon } from "react-native-paper";
import AttemptCard from "./AttemptCard";
import UserService from '../services/user.service';


const ProblemDetailScreen = ({ navigation, route }) => {

  const theme = useTheme();

  const { id, color, grade, name } = route.params;
  
  const [attempts, setAttempts] = useState([])

  useFocusEffect(
    React.useCallback(() => {
      // console.log(id, color, grade, name)
      console.log("fetching attempts...");
      fetchAttempts();
      // Make request to get problem attempts

      return;
    }, [])
  );

  const fetchAttempts = async () => {
    const attempts = await UserService.getAttempts(id);
    console.log("Attempts!!!!: ", attempts.data);
    setAttempts(attempts.data);
  }

  const onNewAttemptPress = async () => {
    // create new attempt through server
    const newAttempt = await UserService.createAttempt(id, Date.now(), "", false);
    // once created, we fetch
    fetchAttempts();
    // setAttempts(attempts => [newElement, ...attempts]);
  }

  return (
    <View className="absolute top-0 left-0 right-0 bottom-0 mt-12 mx-4" style={{backgroundColor: theme.colors.surface}}>
      <View className="flex-row items-center">
        <IconButton icon="chevron-left" className="" size={32} onPress={() => navigation.goBack()}/>
        <View backgroundColor={color} className="w-6 h-6 rounded-full"/>
        <Text className="ml-4 w-60" numberOfLines={1} ellipsizeMode="tail" variant="headlineSmall">V{grade} - {name}</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator="false">
        <View className="flex-col overflow-auto mt-2">
          {/* image gallery here */}
          <TouchableOpacity onPress={() => onNewAttemptPress()} activeOpacity={0.5}>
            <Card mode="" className="mb-2 border-blue-500 border-2 border-dashed">
              <View className="flex-row grow p-2">
                <Icon
                  source="plus"
                  color="#3b82f6"
                  size={36}/>
                <Text className="text-blue-500 self-center">New Attempt</Text>
              </View>
            </Card>
          </TouchableOpacity>
          {attempts.length > 0 ? attempts.map(attempt => (
            <AttemptCard
              attemptDate={attempt.date}
              notes={attempt.notes}
              isSend={attempt.isSend}
              key={attempt._id}
            />
            )):
            <View className="mt-2">
              <Text className="text-center">Get started by creating a new Attempt!</Text>
            </View>
          }
        </View>
      </ScrollView>
      {/* <NewAttemptModal visible={newAttemptModalIsVisible} setVisible={setNewAttemptModalIsVisible}/> */}
    </View>
  );
}

export default ProblemDetailScreen;