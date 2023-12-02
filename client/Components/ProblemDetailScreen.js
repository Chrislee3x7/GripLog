import React, { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaViewBase, ScrollView, View, Divider, TouchableOpacity } from "react-native";
import { Text, useTheme, Card, IconButton, Icon } from "react-native-paper";
import AttemptCard from "./AttemptCard";
import EditNameModal from './EditNameModal';
import EditColorModal from './EditColorModal'
import EditGradeModal from './EditGradeModal'
import UserService from '../services/user.service';


const ProblemDetailScreen = ({ navigation, route }) => {

  const theme = useTheme();

  const id = route.params.id;
  const [name, setName] = useState(route.params.name);
  const [color, setColor] = useState(route.params.color);
  const [grade, setGrade] = useState(route.params.grade);
  const [attempts, setAttempts] = useState([])
  
  const [editNameModalOpen, setEditNameModalOpen] = React.useState(false);
  const [editColorModalOpen, setEditColorModalOpen] = useState(false);
  const [editGradeModalOpen, setEditGradeModalOpen] = useState(false);

  useEffect(() => {
    // console.log("fetching attempts...");
    fetchAttempts();
    
    return;
  }, [])

  const fetchAttempts = async () => {
    const attempts = await UserService.getAttempts(id);
    // console.log("Attempts!!!!: ", attempts.data);
    setAttempts(attempts.data);
  }

  const onNewAttemptPress = async () => {
    // create new attempt through server
    await UserService.createAttempt(id, Date.now(), "", false);
    // once created, we fetch
    fetchAttempts();
    // setAttempts(attempts => [newElement, ...attempts]);
  }

  const onEditAttempt = async (attemptId, date, notes, isSend) => {
    await UserService.editAttempt(attemptId, date, notes, isSend);
    // console.log("fetching attempts after edit...", fetched);
    fetchAttempts();
  }

  const onDeleteAttempt = async (attemptId) => {
    await UserService.deleteAttempt(attemptId);
    fetchAttempts();
  }

  const onEditProblem = async (newColor, newGrade, newName) => {
    setColor(newColor);
    setGrade(newGrade);
    setName(newName);

    await UserService.editProblem(id, newColor, newGrade, newName);
  }
 
  return (
    <View className="absolute top-0 left-0 right-0 bottom-0 mt-12 mx-4" style={{backgroundColor: theme.colors.surface}}>
      <View className="flex-row items-center">
        <IconButton icon="chevron-left" className="" size={32} onPress={() => navigation.goBack()}/>
        <TouchableOpacity onPress={() => setEditColorModalOpen(true)}>
          <View backgroundColor={color} className="w-6 h-6 rounded-full"/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setEditGradeModalOpen(true)}>
          <View className="rounded-md mx-2 bg-slate-300 px-2 py-1">
            <Text variant="headlineSmall">V{grade}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setEditNameModalOpen(true)}>
          <Text className="w-52" numberOfLines={1} ellipsizeMode="tail" variant="headlineSmall">{name}</Text>
        </TouchableOpacity>
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
          {attempts.length > 0 ? attempts.sort((a, b) => {
            if (a.date < b.date) {
              return 1;
            } else if (a.date > b.date) {
              return -1;
            } else if (a._id < b._id) {
              return 1;
            } else {
              return -1;
            }
          }).map(attempt => (
            <AttemptCard
              attemptId={attempt._id}
              attemptDate={attempt.date}
              attemptNotes={attempt.notes}
              attemptIsSend={attempt.isSend}
              editAttempt={onEditAttempt}
              deleteAttempt={onDeleteAttempt}
              key={attempt._id}
            />
            )):
            <View className="mt-2">
              <Text className="text-center">Get started by creating a new Attempt!</Text>
            </View>
          }
        </View>
      </ScrollView>
      <EditColorModal
        visible={editColorModalOpen}
        closeModal={() => {setEditColorModalOpen(false)}}
        color={color}
        setColor={(newColor) => onEditProblem(newColor, grade, name)}
      />
      <EditGradeModal
        visible={editGradeModalOpen}
        closeModal={() => {setEditGradeModalOpen(false)}}
        grade={grade}
        setGrade={(newGrade) => onEditProblem(color, newGrade, name)}
      />
      <EditNameModal
        visible={editNameModalOpen}
        closeModal={() => {setEditNameModalOpen(false)}}
        name={name}
        setName={(newName) => onEditProblem(color, grade, newName)}
      />
    </View>
  );
}

export default ProblemDetailScreen;