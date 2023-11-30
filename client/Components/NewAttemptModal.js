import { useState } from "react"
import { View } from "react-native"
import { Button, IconButton, Modal, Portal, Text, TextInput } from "react-native-paper"
import DateTimePicker from '@react-native-community/datetimepicker';
import { useTheme } from "react-native-paper"

const NewProblemModal = ({ visible, setVisible}) => {
  
  const theme = useTheme();

  const [date, setDate] = useState(new Date(Date.now()));
  const [notes, setNotes] = useState('');
  let tempDate = date;

  // date modal
  const [open, setOpen] = useState(false)

  const clearFields = () => {
    setDate('');
    setNotes('');
    setOpen(false)
  }
  
  const onCancelPress = () => {
    setVisible(false);
    clearFields();
  }

  const onChange = (event, selectedDate) => {
    console.log("in onChange!")
    if (event?.type === 'dismissed') {
      console.log("in dismissed!", selectedDate)
      setDate(selectedDate);
      return;
    }
    const currentDate = selectedDate ? selectedDate : Date.now();
    setOpen(false);
    setDate(selectedDate);
  };

  return (
    <View>
      <View className=" rounded-lg flex px-2 py-4 gap-y-2" style={{backgroundColor: theme.colors.surface}}>
        <View className="flex-row grow">
          <Text className="my-2 ml-6 self-center" variant="headlineSmall">New Attempt</Text>
          {/* <IconButton icon="close" size={24} className=" shrink self-start mt-4 mr-4" onPress={() => onCancelPress()}/> */}
        </View>
        <View className="items-center flex-row shrink m-2">
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
          className="whitespace-normal m-2"
          mode="outlined"
          editable
          maxLength={250}
          multiline
          numberOfLines={10}
          label="Notes"
          multiline
          dense
        />
        <View className="flex-row gap-x-2 mx-2">
          <Button mode="contained-tonal" className="shrink w-1/2" onPress={() => onCancelPress()}>Cancel</Button>
          <Button mode="contained" className="shrink w-1/2" onPress={() => onCreatePress()}>Create</Button>
        </View>
      </View>
    </View>
  )
}

export default NewProblemModal;