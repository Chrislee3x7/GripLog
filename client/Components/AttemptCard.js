import React, { useState, useEffect, useRef } from 'react';
import { View, Image, Animated, TouchableOpacity, TextInput } from 'react-native';
import { Card, Text, Divider, Icon, IconButton, Button } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Swipeable } from 'react-native-gesture-handler';

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
      setExpanded(false);
    });
  }

  const onCancelPress = () => {
    resetFields();
  }

  // help with closing swipeable
  const swipeableRef = useRef(null);

  const renderRightActions = (progress, dragX) => {

    return (
      <TouchableOpacity className="rounded-xl ml-2" activeOpacity={0.7}>
        <Button className="rounded-xl items-center" variant="contained" 
          buttonColor="#ef4444" 
          onPress={() => deleteAttempt(attemptId)}>
          <View className="justify-center items-center grow">
            <Text>Delete</Text>
          </View>
        </Button>
      </TouchableOpacity>
    );
  };

  return (
    <View className="mb-2">
      <Swipeable ref={swipeableRef} renderRightActions={renderRightActions}>
        <View className="rounded-xl bg-slate-200 px-2">
          <TouchableOpacity onPress={() => {}} onLongPress={() => {deleteAttempt(attemptId)}} activeOpacity={0.5}>
            <View className="items-center flex-row grow pt-2 pb-2 justify-between">
              <TouchableOpacity onPress={() => setExpanded(!expanded)} activeOpacity={0.5}>
                <View className="p-2 rounded-md bg-slate-300">
                  <Text variant="titleMedium">{getDateString(date)}</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setIsSend(!isSend)}>
                <View className="flex-row items-center p-1 rounded-full bg-slate-300">
                  <Text className="ml-2" variant="labelLarge">{isSend ? "Sent": "Unsuccessful"} </Text>
                  <Icon
                    source="check-circle-outline"
                    color={isSend ? "#7bb35d": "#777777"} 
                    size={32}
                  />
                </View>
              </TouchableOpacity>
              {/* <TouchableOpacity onPress={() => deleteAttempt(attemptId)}>
                <View className="flex-row">
                  <MaterialCommunityIcons name="delete" size={24} color="#aaaaaa"/>
                </View>
              </TouchableOpacity> */}
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
                <IconButton icon="close" size={20} mode="outlined" onPress={() => onCancelPress()}/>
                <IconButton icon="check" size={20} mode="outlined" onPress={() => onSaveEditPress()}/>
              </View>
            ) : null}
            {/* <Divider className="mt-2 pt-0.5 rounded-full" /> */}
          </TouchableOpacity>
        </View>
      </Swipeable>
    </View>
  );
}; 

export default AttemptCard