import React, { useState } from 'react';
import { Card, Text, Button, FAB } from 'react-native-paper';
import { ScrollView, View, Image } from 'react-native'
import NewProblemModal from './NewProblemModal';


const ProblemListView = ({ navigation }) => {

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', (e) => {
      // Do something
      console.log("in listener");
      
    });
  
    return unsubscribe;
  }, [navigation]);

  return (
    <View className="absolute top-0 left-0 right-0 bottom-0 mt-12 mx-4 ">
      {/* <NewProblemModal/> */}
      <Text className="mt-6 mb-4 mx-4" variant="headlineLarge">Problems</Text>
      <ScrollView showsVerticalScrollIndicator="false">
        <View className="grid gap-3 grid-cols-1 overflow-auto">
          <Card mode="contained" className="p-2">
            <View className="flex-row content-start">
              <Image
                className="w-1/5 grow"
                source={{
                  uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/SNice.svg/1200px-SNice.svg.png'
                }}/>
              <View className="flex-col shrink content-start">
                <Card.Title titleVariant="headlineSmall" title="V1 - Sneak Attack"/>
                <Card.Content>
                  <Text variant="bodySmall">Heheheheafjdsl fsdajfasdflksdj fs afsadkl fasdjklfsda lk</Text>
                </Card.Content>
              </View>
            </View>
            
          </Card>

          <Card mode="contained" className="p-2">
            <Card.Title titleVariant="headlineSmall" title="V2 - 80085"/>
            <Card.Content>
              <Text variant="bodySmall">Heheheheafjdsl fsdajfasdflksdj fs afsadkl fasdjklfsda lk</Text>
            </Card.Content>
          </Card>

          <Card mode="contained" className="p-2">
            <Card.Title titleVariant="headlineSmall" title="V5 - Paradise"/>
            <Card.Content>
              <Text variant="bodySmall">Heheheheafjdsl fsdajfasdflksdj fs afsadkl fasdjklfsda lk</Text>
            </Card.Content>
          </Card>
          <Card mode="contained" className="p-2">
            <Card.Title titleVariant="headlineSmall" title="V1 - Sneak Attack"/>
            <Card.Content>
              <Text variant="bodySmall">Heheheheafjdsl fsdajfasdflksdj fs afsadkl fasdjklfsda lk</Text>
            </Card.Content>
          </Card>

          <Card mode="contained" className="p-2">
            <Card.Title titleVariant="headlineSmall" title="V2 - 80085"/>
            <Card.Content>
              <Text variant="bodySmall">Heheheheafjdsl fsdajfasdflksdj fs afsadkl fasdjklfsda lk</Text>
            </Card.Content>
          </Card>

          <Card mode="contained" className="p-2">
            <Card.Title titleVariant="headlineSmall" title="V5 - Paradise"/>
            <Card.Content>
              <Text variant="bodySmall">Heheheheafjdsl fsdajfasdflksdj fs afsadkl fasdjklfsda lk</Text>
            </Card.Content>
          </Card>
          <Card mode="contained" className="p-2">
            <Card.Title titleVariant="headlineSmall" title="V2 - 80085"/>
            <Card.Content>
              <Text variant="bodySmall">Heheheheafjdsl fsdajfasdflksdj fs afsadkl fasdjklfsda lk</Text>
            </Card.Content>
          </Card>

          <Card mode="contained" className="p-2">
            <Card.Title titleVariant="headlineSmall" title="V5 - Paradise"/>
            <Card.Content>
              <Text variant="bodySmall">Heheheheafjdsl fsdajfasdflksdj fs afsadkl fasdjklfsda lk</Text>
            </Card.Content>
          </Card>
        </View>
      </ScrollView>
    </View>
  )
}

export default ProblemListView;