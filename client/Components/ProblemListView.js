import React, { useState } from 'react';
import { Card, Text, Button, FAB } from 'react-native-paper';
import { ScrollView, View, Image } from 'react-native'
import NewProblemModal from './NewProblemModal';
import { useTheme } from 'react-native-paper';
import UserService from '../services/user.service';


const ProblemListView = ({ navigation }) => {

  const titleVariant = "titleMedium";
  const theme = useTheme();

  const [problems, setProblems] = useState([]);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async (e) => {
      // Do something
      console.log("in listener");
      const problems = await UserService.getProblems();
      console.log(problems.data);
      
    });
  
    return unsubscribe;
  }, [navigation]);

  return (
    <View className="absolute top-0 left-0 right-0 bottom-0 mt-12 mx-4" style={{backgroundColor: theme.colors.surface}}>
      {/* <NewProblemModal/> */}
      <Text className="mt-6 mb-4 mx-4" variant="headlineLarge">Problems</Text>
      <ScrollView showsVerticalScrollIndicator="false">
        <View className="grid gap-3 grid-cols-1 overflow-auto">
          <Card mode="contained" className="">
            <View className="flex-row content-start">
              {/* <View className="bg-cover h-full w-30" style="background-image: url(https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/SNice.svg/1200px-SNice.svg.png)"></View> */}
              <Image
                className="rounded-lg w-1/5 grow m-1"
                source={{
                  uri: 'https://wallpapers.com/images/hd/vertical-sunset-shade-mountain-i3d1yb2udkq9rn59.jpg'
                }}/>
              <View className="flex-col shrink p-2">
                {/* <Card.Title variant={titleVariant} title="V1 - Sneak Attack"/> */}
                <Text variant={titleVariant} className="my-1">V1 - Sneak Attack</Text>
                <Text variant="bodySmall">Heheheheafjdsl fsdajfasdflksdj fs afsadkl fasdjklfsda lk</Text>
              </View>
            </View>
          </Card>

          <Card mode="contained" className="p-2">
            <Card.Title titleVariant={titleVariant} title="V2 - 80085"/>
            <Card.Content>
              <Text variant="bodySmall">Heheheheafjdsl fsdajfasdflksdj fs afsadkl fasdjklfsda lk</Text>
            </Card.Content>
          </Card>

          <Card mode="contained" className="p-2">
            <Card.Title titleVariant={titleVariant} title="V5 - Paradise"/>
            <Card.Content>
              <Text variant="bodySmall">Heheheheafjdsl fsdajfasdflksdj fs afsadkl fasdjklfsda lk</Text>
            </Card.Content>
          </Card>
          <Card mode="contained" className="p-2">
            <Card.Title titleVariant={titleVariant} title="V1 - Sneak Attack"/>
            <Card.Content>
              <Text variant="bodySmall">Heheheheafjdsl fsdajfasdflksdj fs afsadkl fasdjklfsda lk</Text>
            </Card.Content>
          </Card>

          <Card mode="contained" className="p-2">
            <Card.Title titleVariant={titleVariant} title="V2 - 80085"/>
            <Card.Content>
              <Text variant="bodySmall">Heheheheafjdsl fsdajfasdflksdj fs afsadkl fasdjklfsda lk</Text>
            </Card.Content>
          </Card>

          <Card mode="contained" className="p-2">
            <Card.Title titleVariant={titleVariant} title="V5 - Paradise"/>
            <Card.Content>
              <Text variant="bodySmall">Heheheheafjdsl fsdajfasdflksdj fs afsadkl fasdjklfsda lk</Text>
            </Card.Content>
          </Card>
          <Card mode="contained" className="p-2">
            <Card.Title titleVariant={titleVariant} title="V2 - 80085"/>
            <Card.Content>
              <Text variant="bodySmall">Heheheheafjdsl fsdajfasdflksdj fs afsadkl fasdjklfsda lk</Text>
            </Card.Content>
          </Card>

          <Card mode="contained" className="p-2">
            <Card.Title titleVariant={titleVariant} title="V5 - Paradise"/>
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