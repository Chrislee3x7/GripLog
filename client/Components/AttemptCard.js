import React, { useState, useEffect } from 'react';
import { View, Image, Animated } from 'react-native';
import { Card, Text } from 'react-native-paper';


const ExpandableView = ({ expanded = false }) => {
  const [height] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(height, {
      toValue: expanded ? 200 : 0,
      duration: 250,
      useNativeDriver: false
    }).start();
  }, [expanded, height]);

  return (
    <Animated.View
      style={{ height, backgroundColor: "" }}
    />
  );
};

const AttemptCard = ({ attemptDate, notes, isSend }) => {
  const date = new Date(attemptDate);
  const dateString = date.toLocaleDateString();

  const [expanded, setExpanded] = useState(false);

  return (
    <View className="pb-2">
      <Card mode="outlined" onPress={() => setExpanded(!expanded)}>
        <View className="flex-col grow pt-1 px-4 pb-2">
          <Text variant="titleMedium" className="my-1">{dateString}</Text>
          <Text variant="bodySmall" className="">{notes}</Text>
        </View>
        <ExpandableView expanded={expanded}></ExpandableView>
      </Card>
    </View>
  );
}; 

export default AttemptCard