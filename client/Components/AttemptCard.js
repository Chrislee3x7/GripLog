import React, { useState, useEffect } from 'react';
import { View, Image, Animated } from 'react-native';
import { Card, Text, TextInput, Divider, Icon } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';



const ExpandableView = ({ expanded = false }) => {
  const [height] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(height, {
      toValue: expanded ? 200 : 0,
      duration: 250,
      useNativeDriver: false
    }).start();
  }, [expanded, height]);

  return (
    <Animated.View
      style={{ height, backgroundColor: "" }}
    />
  );
};

const AttemptCard = ({ attemptDate, notes, isSend }) => {
  
  const [expanded, setExpanded] = useState(false);
  
  const [date, setDate] = useState(new Date(attemptDate));
  const dateString = date.toLocaleDateString();

  const [open, setOpen] = useState(false);

  const onChange = (event, selectedDate) => {
    console.log("in onChange!")
    if (event?.type === 'dismissed') {
      console.log("in dismissed!", selectedDate)
      setDate(selectedDate);
      return;
    }
    const currentDate = selectedDate ? selectedDate : Date.now();
    setDate(selectedDate);

  };

  return (
    <View className="">
      {/* <Card mode="outlined" onPress={() => setExpanded(!expanded)}>
        <View className="flex-col grow pt-1 px-4 pb-2">
          <Text variant="titleMedium" className="my-1">{dateString}</Text>
          <Text variant="bodySmall" className="">{notes}</Text>
        </View>
        <ExpandableView expanded={expanded}></ExpandableView>
      </Card> */}
      <View className="items-center flex-row grow pb-2">
        <View className=" mt-1">
          {/* <Text className="" variant="titleLarge">Date: </Text> */}
          <DateTimePicker
            testID="dateTimePicker"
            maximumDate={new Date(Date.now())}
            value={date}
            mode="date"
            is24Hour={false}
            onChange={onChange}
          />
        </View>
        <TextInput 
          className="whitespace-normal flex-initial grow m-2"
          mode="outlined"
          autoCorrect={false}
          spellCheck={false}
          editable
          maxLength={250}
          multiline
          numberOfLines={10}
          label="Notes"
          multiline
          dense
        />
        <View className="mt-1">
          {isSend ? <Icon source="check" size={32}/> : <Icon source="close" size={32}/>}
        </View>
        
      </View>
      <Divider />
    </View>
  );
}; 

export default AttemptCard