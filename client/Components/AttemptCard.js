import React, { useState, useEffect } from 'react';
import { View, Image, Animated, TouchableOpacity } from 'react-native';
import { Card, Text, TextInput, Divider, Icon, IconButton, Button } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const AttemptCard = ({ attemptId, attemptDate, attemptNotes, attemptIsSend, editAttempt }) => {
  
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

  const clearFields = () => {
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
    clearFields();
  }

  return (
    <View className="gap-y-2">
      {/* <Card mode="outlined" onPress={() => setExpanded(!expanded)}>
        <View className="flex-col grow pt-1 px-4 pb-2">
          <Text variant="titleMedium" className="my-1">{dateString}</Text>
          <Text variant="bodySmall" className="">{notes}</Text>
        </View>
        <ExpandableView expanded={expanded}></ExpandableView>
      </Card> */}
      {/* <TouchableOpacity onPress={() => setExpanded(!expanded)} activeOpacity={1}> */}
        <View className="items-center flex-row grow pt-4 pb-2">
          {/* <View className=" mt-2"> */}
            <TouchableOpacity onPress={() => setExpanded(!expanded)} activeOpacity={0.5}>
              <View className="bg-gray-300 p-2 rounded-md">
                <Text className="" variant="titleSmall">{getDateString(date)}</Text>
              </View>
            </TouchableOpacity>
            {/* <IconButton className="" icon="calendar" onPress={() => setExpanded(!expanded)}/> */}
          {/* </View> */}
          <TextInput 
            className=" whitespace-normal flex-initial grow mx-2"
            mode="outlined"
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
          <TouchableOpacity onPress={() => setIsSend(!isSend)}>
            <View className="">
              <MaterialCommunityIcons name="check-circle-outline" color={isSend ? "#7bb35d": "#777777"} size={26} />
            </View>
          </TouchableOpacity>
          
        </View>
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
        {/* <ExpandableDateTimePicker expanded={expanded} date={date} onChange={onChange}></ExpandableDateTimePicker> */}
        {attemptEdited ? (
          <View className="flex-row gap-x-2 justify-end">
            {/* <Button mode="contained-tonal" className="shrink w-1/3" onPress={() => onCancelPress()}>Cancel</Button>
            <Button mode="contained" className="shrink w-1/3" onPress={() => onSaveEditPress()}>Update</Button> */}
            <IconButton icon="close" mode="contained-tonal" onPress={() => onCancelPress()}/>
            <IconButton icon="check" mode="contained" onPress={() => onSaveEditPress()}/>
          </View>
        ) : null}
        <Divider />

      {/* </TouchableOpacity> */}
    </View>
  );
}; 

export default AttemptCard