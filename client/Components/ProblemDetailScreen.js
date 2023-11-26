import React, { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaViewBase, ScrollView, View } from "react-native";
import { Text, useTheme, Card, IconButton, Icon } from "react-native-paper";
import AttemptCard from "./AttemptCard"


const ProblemDetailScreen = ({ navigation, route }) => {

  const theme = useTheme();

  const { id, color, grade, name } = route.params;
  
  const [attempts, setAttempts] = useState([])
  const [newAttemptModalIsVisible, setNewAttemptModalIsVisible] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      console.log(id, color, grade, name)

      return;
    }, [newAttemptModalIsVisible])
  );

  const onNewAttemptPress = () => {
    console.log("TODO: create new attempt");
  }

  return (
    <View className="absolute top-0 left-0 right-0 bottom-0 mt-12 mx-4" style={{backgroundColor: theme.colors.surface}}>
      <View className="flex-row items-center">
        <IconButton icon="chevron-left" className="" size={32} onPress={() => navigation.goBack()}/>
        <View backgroundColor={color} className="w-8 h-8 rounded-full"/>
        <Text className="ml-4" variant="headlineMedium">V{grade} - {name}</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator="false">
        <View className="flex-col overflow-auto mt-6">
          {/* image gallery here */}
          <Card mode="" className="mb-2 border-blue-500 border-2 border-dashed"
            onPress={() => onNewAttemptPress()}>
            <View className="flex-row grow p-2">
              <Icon
                source="plus"
                color="#3b82f6"
                size={36}/>
              <Text className="text-blue-500 self-center">New Attempt</Text>
            </View>
          </Card>
          <AttemptCard
            attemptDate={0}
            notes="oh my god that was so hard."/>
          <AttemptCard
            attemptDate={0}
            notes="oh my god that was so hard."/>
          <AttemptCard
            attemptDate={0}
            notes="oh my god that was so hard."/>
          <AttemptCard
            attemptDate={0}
            notes="oh my god that was so hard."/>
          <AttemptCard
            attemptDate={0}
            notes="oh my god that was so hard."/>
          <AttemptCard
            attemptDate={0}
            notes="oh my god that was so hard."/>
            
        </View>
      </ScrollView>
    </View>
  );
}

export default ProblemDetailScreen;