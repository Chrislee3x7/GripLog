import React, { useState } from 'react';
import ProblemListView from './ProblemListView';
import { View } from 'react-native';
import { FAB } from 'react-native-paper';
import NewProblemModal from './NewProblemModal';


const ProblemScreen = ({ navigation }) => {

  const [newProblemModalIsVisible, setNewProblemModalIsVisible] = React.useState(false);

  

  return (
    <View className="relative h-full">
      <ProblemListView navigation={navigation} newProblemModalIsVisible={newProblemModalIsVisible}/>
      <FAB className="absolute bottom-4 right-4" variant="tertiary" size="medium" icon="plus" onPress={() => setNewProblemModalIsVisible(true)}/>
      <NewProblemModal visible={newProblemModalIsVisible} setVisible={setNewProblemModalIsVisible}/>
    </View>
  )
}

export default ProblemScreen;