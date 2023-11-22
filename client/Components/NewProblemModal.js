import React from 'react'
import { Modal, FAB, Portal, Text } from 'react-native-paper';
import { View } from 'react-native'

const NewProblemModal = ({ visible, setVisible}) => {


  return (
    <View>
      <Portal>
        <Modal onDismiss={() => setVisible(false)} visible={visible} className="rounded-lg bg-white top-0 bottom-0 left-0 right-0 mx-8 my-20">
          <View className="h-full w-full rounded-md">
          <Text className="mt-6 mb-4 mx-4" variant="headlineLarge">New Problem</Text>
          </View>
        </Modal>
      </Portal>
    </View>
  )
}

export default NewProblemModal;