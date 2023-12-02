import { useState } from "react"
import { View } from "react-native"
import { Button, Modal, Portal, TextInput } from "react-native-paper"


const EditNameModal = ({ visible, closeModal, name, setName }) => {

  const [newName, setNewName] = useState(name);

  return (
    <View>
      <Portal>
        <Modal visible={visible} onDismiss={() => closeModal()} className="h-1/2 w-screen">
          <View className="p-4 m-4 rounded-lg grow bg-white">
            <TextInput
              autoCapitalize="none"
              mode={'outlined'}
              label='New Name'
              value={newName}
              onChangeText={newName => setNewName(newName)}
            />
            <View className="flex-row gap-x-2 mt-2">
              <Button mode="contained-tonal" className="shrink w-1/2" onPress={() => closeModal()}>Cancel</Button>
              <Button mode="contained" className="shrink w-1/2" onPress={() => {setName(newName); closeModal()}}>Confirm</Button>
            </View>
          </View>
        </Modal>
      </Portal>
    </View>
  )
}

export default EditNameModal;