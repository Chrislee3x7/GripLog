import { View, Image } from 'react-native';
import { Card, Text } from 'react-native-paper'

const ProblemCard = ({ grade, color, name, imageUri, sendCount, attemptCount, lastAttemptDate }) => {
  const date = new Date(lastAttemptDate);
  const dateString = lastAttemptDate == 0 ? "N/A" : date.toLocaleDateString();

  return (
    <View className="pb-2">
      <Card mode="contained">
        <View className="flex-row content-start">
          <Image
            className="rounded-lg w-1/5 m-1"
            source={{
              uri: imageUri
            }}/>
          <View className="flex-col grow pt-1 px-2 pb-2">
            <View className="flex flex-row gap-x-2 items-center">
            <View 
              className="w-4 h-4 border-blue-500 rounded-full"
              backgroundColor={color} />
              <Text variant="titleMedium" className="my-1">V{grade} - {name}</Text>
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
        </View>
      </Card>
    </View>
  );
}; 

export default ProblemCard