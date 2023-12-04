import { useState } from "react"
import { View } from "react-native"
import { Button, Modal, Portal, TextInput } from "react-native-paper"


const NewLocationModal = ({ visible, closeModal, createLocation }) => {

  const [locationName, setLocationName] = useState("");

  return (
    <View>
      <Portal>
        <Modal visible={visible} onDismiss={() => closeModal()} className="h-3/4 w-screen">
          <View className="p-4 m-4 rounded-lg grow bg-white">
            <TextInput
              autoCapitalize="none"
              mode={'outlined'}
              label='Location Name'
              value={locationName}
              onChangeText={locationName => setLocationName(locationName)}
            />
            <View className="flex-row gap-x-2 mt-2">
              <Button mode="contained-tonal" className="shrink w-1/2" onPress={() => closeModal()}>Cancel</Button>
              <Button mode="contained" className="shrink w-1/2" onPress={() => {createLocation(locationName); closeModal()}}>Confirm</Button>
            </View>
          </View>
        </Modal>
      </Portal>
    </View>
  )
}

export default NewLocationModal;