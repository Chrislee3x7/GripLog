import Slider from "@react-native-community/slider";
import { useState } from "react"
import { View, ScrollView } from "react-native"
import { Button, Modal, Portal, Text, TextInput, ToggleButton } from "react-native-paper"


const EditGradeModal = ({ visible, closeModal, grade, setGrade }) => {

  const selectedIconColor = "#e7e0ec";
  const selectedIconName = "check";

  const [newGrade, setNewGrade] = useState(grade);

  return (
    <View>
      <Portal>
        <Modal visible={visible} onDismiss={() => closeModal()} className="h-1/2 w-screen">
          <View className="p-4 m-4 rounded-lg grow bg-white">
            <View className="flex-row justify-between">
              <Text variant="titleMedium" className="mx-4 mt-2">Grade</Text>
              <Text variant="titleMedium" className="self-center mx-4 mt-2">{newGrade}</Text>
            </View>
            <View className="mx-4 my-2">
              <Slider
                className=""
                minimumValue={0}
                maximumValue={17}
                step={1}
                tapToSeek={true}
                value={newGrade}
                onValueChange={(pos) => setNewGrade(pos)}
              />
            </View>
            <View className="flex-row gap-x-2 mt-2">
              <Button mode="contained-tonal" className="shrink w-1/2" onPress={() => {setNewGrade(grade); closeModal()}}>Cancel</Button>
              <Button mode="contained" className="shrink w-1/2" onPress={() => {setGrade(newGrade); closeModal()}}>Confirm</Button>
            </View>
          </View>
        </Modal>
      </Portal>
    </View>
  )
}

export default EditGradeModal;