import { View, Image } from 'react-native';
import { Card, Text } from 'react-native-paper'

const AttemptCard = ({ attemptDate, notes }) => {
  const date = new Date(attemptDate);
  const dateString = date.toLocaleDateString();

  return (
    <View className="pb-2">
      <Card mode="outlined">
        {/*  */}
        <View className="flex-col grow pt-1 px-2 pb-2">
          <Text variant="titleMedium" className="my-1">{dateString}</Text>
          <Text variant="bodySmall" className="">{notes}</Text>
        </View>
      </Card>
    </View>
  );
}; 

export default AttemptCard