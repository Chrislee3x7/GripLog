import Slider from "@react-native-community/slider";
import { useState } from "react"
import { View, ScrollView } from "react-native"
import { Button, Modal, Portal, Text, TextInput, ToggleButton } from "react-native-paper"


const EditColorModal = ({ visible, closeModal, color, setColor }) => {

  const selectedIconColor = "#e7e0ec";
  const selectedIconName = "check";

  const [newColor, setNewColor] = useState(color);

  return (
    <View>
      <Portal>
        <Modal visible={visible} onDismiss={() => closeModal()} className="h-1/2 w-screen">
          <View className="p-4 m-4 rounded-lg grow bg-white">
            <Text variant="titleMedium" className="mx-4 mt-2">Color</Text>
            <ScrollView showsHorizontalScrollIndicator="false" horizontal className="">
              <View className="flex-row gap-x-2 mt-2 mb-4 mx-2">
                <ToggleButton icon={newColor == "#c4342d" ? selectedIconName : ""} iconColor={selectedIconColor} backgroundColor="#c4342d" onPress={() => setNewColor("#c4342d")} className="w-10 h-10 border-blue-500 rounded-full"/>
                <ToggleButton icon={newColor == "#f67200" ? selectedIconName : ""} iconColor={selectedIconColor} backgroundColor="#f67200" onPress={() => setNewColor("#f67200")} className="w-10 h-10 border-blue-500 rounded-full"/>
                <ToggleButton icon={newColor == "#f8e115" ? selectedIconName : ""} iconColor={selectedIconColor} backgroundColor="#f8e115" onPress={() => setNewColor("#f8e115")} className="w-10 h-10 border-blue-500 rounded-full"/>
                <ToggleButton icon={newColor == "#7bb35d" ? selectedIconName : ""} iconColor={selectedIconColor} backgroundColor="#7bb35d" onPress={() => setNewColor("#7bb35d")} className="w-10 h-10 border-blue-500 rounded-full"/>
                <ToggleButton icon={newColor == "#69abce" ? selectedIconName : ""} iconColor={selectedIconColor} backgroundColor="#69abce" onPress={() => setNewColor("#69abce")} className="w-10 h-10 border-blue-500 rounded-full"/>
                <ToggleButton icon={newColor == "#7c609c" ? selectedIconName : ""} iconColor={selectedIconColor} backgroundColor="#7c609c" onPress={() => setNewColor("#7c609c")} className="w-10 h-10 border-blue-500 rounded-full"/>
                <ToggleButton icon={newColor == "#ffbdc4" ? selectedIconName : ""} iconColor={selectedIconColor} backgroundColor="#ffbdc4" onPress={() => setNewColor("#ffbdc4")} className="w-10 h-10 border-blue-500 rounded-full"/>
                <ToggleButton icon={newColor == "#644117" ? selectedIconName : ""} iconColor={selectedIconColor} backgroundColor="#644117" onPress={() => setNewColor("#644117")} className="w-10 h-10 border-blue-500 rounded-full"/>
                <ToggleButton icon={newColor == "#141414" ? selectedIconName : ""} iconColor={selectedIconColor} backgroundColor="#141414" onPress={() => setNewColor("#141414")} className="w-10 h-10 border-blue-500 rounded-full"/>
                <ToggleButton icon={newColor == "#fcfdf5" ? selectedIconName : ""} iconColor={selectedIconColor} backgroundColor="#fcfdf5" onPress={() => setNewColor("#fcfdf5")} className="w-10 h-10 border-blue-500 rounded-full"/>
              </View>
            </ScrollView>
            <View className="flex-row gap-x-2 mt-2">
              <Button mode="contained-tonal" className="shrink w-1/2" onPress={() => closeModal()}>Cancel</Button>
              <Button mode="contained" className="shrink w-1/2" onPress={() => {setColor(newColor); closeModal()}}>Confirm</Button>
            </View>
          </View>
        </Modal>
      </Portal>
    </View>
  )
}

export default EditColorModal;