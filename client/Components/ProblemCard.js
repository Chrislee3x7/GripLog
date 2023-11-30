import { View, Image } from 'react-native';
import { Card, Icon, Text } from 'react-native-paper'

const ProblemCard = ({ id, grade, color, name, imageUri, sendCount, attemptCount, lastAttemptDate, onPress }) => {
  const date = new Date(lastAttemptDate);
  const nullDate = new Date("9000-01-01");
  console.log(date, nullDate);
  const dateString = date.valueOf() == nullDate.valueOf() ? "N/A" : date.toLocaleDateString();

  return (
    <View className="pb-2">
      <Card mode="contained" onPress={() => onPress(id, color, grade, name)}>
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
    </View>
  );
}; 

export default ProblemCard