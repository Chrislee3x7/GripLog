import { View, Image, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { Button, Card, Icon, Text } from 'react-native-paper'
import { BaseButton, RectButton, Swipeable } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import { useRef } from 'react';

const ProblemCard = ({ id, grade, color, name, imageUri, sendCount, attemptCount, lastAttemptDate, onPress, deleteProblem }) => {
  const date = new Date(lastAttemptDate);
  const nullDate = new Date("9000-01-01");
  const dateString = date.valueOf() == nullDate.valueOf() ? "N/A" : date.toLocaleDateString();

  // gesture stuff (nice things)

  const onDeletePressed = () => {
    Alert.alert(`Delete "${name}"`, 
      "All associated data with this problem will be deleted. You cannot undo this action.", 
      [
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: () => swipeableRef.current.close()
        },
        {
          text: 'Delete', 
          onPress: () => { deleteProblem(id); swipeableRef.current.close(); },
          style: 'destructive'
        },
      ]);
  }

  // help with closing swipeable
  const swipeableRef = useRef(null);

  const renderRightActions = (progress, dragX) => {

    return (
      <TouchableOpacity className="rounded-lg ml-2" activeOpacity={0.7}>
        <Button className="rounded-lg items-center" variant="contained" 
          buttonColor="#ef4444" 
          onPress={() => onDeletePressed()}>
          <View className="justify-center items-center grow">
            <Text>Delete</Text>
          </View>
        </Button>
      </TouchableOpacity>
    );
  };

  return (
    <View className="pb-2">
      <Swipeable ref={swipeableRef} renderRightActions={renderRightActions}>
        <TouchableOpacity className="" activeOpacity={0.7}  onPress={() => onPress(id, color, name, grade)}>
          <Card mode="contained" >
            <View className="flex-row content-start">
              <View className="flex w-1/5">
                <Image
                  className="grow rounded-lg m-1"
                  source={{
                    uri: imageUri
                  }}/>
              </View>
              <View className="flex-col grow pt-1 px-2 pb-2 w-2/3">
                <View className="flex-row gap-x-2 items-center">
                  <View 
                    className="w-4 h-4 rounded-full"
                    backgroundColor={color} />
                  <Text numberOfLines={1} ellipsizeMode="tail" variant="titleMedium" 
                    className="my-1 truncate whitespace-nowrap w-56">V{grade} - {name}</Text>
                  {/* <Text variant="titleMedium" className="my-1 truncate">fjlksadjfldksajfldsajfldska fdlsak jfalsd fsad jfasd j;fdsaf;safds</Text> */}
                </View>
                <View className="flex flex-row justify-between">
                  <Text variant="bodySmall" className="">{sendCount} Sends</Text>
                  <Text variant="bodySmall">Last attempted:</Text>
                </View>
                <View className="flex-row justify-between">
                  <Text variant="bodySmall">{attemptCount} Attempts</Text>
                  <Text variant="bodySmall">{dateString}</Text>
                </View>
              </View>
              <View className="flex-row items-center mr-1">
                <Icon source="chevron-right" size={24} color="#777777"/>
              </View>
            </View>
          </Card>
        </TouchableOpacity>
      </Swipeable>
    </View>
  );
}; 

export default ProblemCard