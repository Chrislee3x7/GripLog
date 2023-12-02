import React, { useState, useEffect } from 'react';
import { View, Image, Animated, TouchableOpacity, TextInput } from 'react-native';
import { Card, Text, Divider, Icon, IconButton, Button } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const AttemptCard = ({ attemptId, attemptDate, attemptNotes, attemptIsSend, editAttempt, deleteAttempt }) => {
  
  const attemptDateObj = new Date(attemptDate);

  const [date, setDate] = useState(new Date(attemptDate));
  const [notes, setNotes] = useState(attemptNotes);
  const [isSend, setIsSend] = useState(attemptIsSend);
  
  const [expanded, setExpanded] = useState(false);

  const [attemptEdited, setAttemptEdited] = useState(false);

  useEffect(() => {
    if (date.toDateString() != attemptDateObj.toDateString() 
    || notes != attemptNotes || isSend != attemptIsSend) {
      setAttemptEdited(true);
    } else {
      setAttemptEdited(false);
    }
  }, [date, notes, isSend])
  
  const getDateString = (date) => {
    return date.toLocaleString(undefined, {
      month: "short", day: "numeric"
    });
  }

  const resetFields = () => {
    // return to original
    setDate(new Date(attemptDate));
    setNotes(attemptNotes);
    setIsSend(attemptIsSend);
    setExpanded(false);
  }
  
  const onSaveEditPress = () => {
    // send edited attempt data
    editAttempt(attemptId, date, notes, isSend)
    .then(() => {
      setAttemptEdited(false);
      // clearFields();
    });
  }

  const onCancelPress = () => {
    resetFields();
  }

  return (
    <View className="rounded-lg bg-slate-200 px-2 mb-2">
      <View className="items-center flex-row grow pt-2 pb-2 justify-between">
        <TouchableOpacity onPress={() => setExpanded(!expanded)} activeOpacity={0.5}>
          <View className="p-2 rounded-md bg-slate-300">
            <Text className="" variant="titleMedium">{getDateString(date)}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsSend(!isSend)}>
          <View className="flex-row">
            <MaterialCommunityIcons name="check-circle-outline" color={isSend ? "#7bb35d": "#777777"} size={32} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deleteAttempt(attemptId)}>
          <View className="flex-row">
            <MaterialCommunityIcons name="delete" size={32} color="#777777"/>
          </View>
        </TouchableOpacity>
      </View>
      <View className="flex-row items-center gap-x-2">
        <TextInput 
          className="bg-white flex-initial grow text-sm pt-1 pb-2 px-2 mb-2 border-gray-300 border-2 rounded-lg"
          placeholder="Notes"
          autoCorrect={false}
          spellCheck={false}
          editable={true}
          maxLength={250}
          multiline
          numberOfLines={10}
          onChangeText={(newNotes) => setNotes(newNotes)}
          value={notes}
          dense
        />
      </View>
      <View className="">
        {expanded ? (
          <DateTimePicker
            testID="dateTimePicker"
            maximumDate={new Date(Date.now())}
            value={date}
            mode="date"
            is24Hour={false}
            onChange={(e, newDate) => setDate(newDate)}
            display="inline"
          /> ) : null
        }
      </View>
      {attemptEdited ? (
        <View className="flex-row gap-x-2 justify-end mb-2">
          {/* <Button mode="contained-tonal" className="shrink w-1/3" onPress={() => onCancelPress()}>Cancel</Button>
          <Button mode="contained" className="shrink w-1/3" onPress={() => onSaveEditPress()}>Update</Button> */}
          <IconButton icon="close" size={20} mode="default" onPress={() => onCancelPress()}/>
          <IconButton icon="check" size={20} mode="" onPress={() => onSaveEditPress()}/>
        </View>
      ) : null}
      {/* <Divider className="mt-2 pt-0.5 rounded-full" /> */}
    </View>
  );
}; 

export default AttemptCard