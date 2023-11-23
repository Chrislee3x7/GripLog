import React from 'react'
import { Modal, IconButton, Portal, Text, Icon, Card, ToggleButton } from 'react-native-paper';
import { View, Image, ScrollView, Pressable } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from 'react-native-paper';
import { useSharedValue } from 'react-native-reanimated';
import { Slider } from 'react-native-awesome-slider';

// import Camera from 'react-native-camera';

const NewProblemModal = ({ visible, setVisible}) => {

  const theme = useTheme();
  const [colorSelected, setColorSelected] = React.useState("");
  const selectedIconColor = "#e7e0ec";
  const selectedIconName = "check";

  const grade = useSharedValue(0);


  return (
    <View>
      <Portal>
        <Modal onDismiss={() => setVisible(false)} visible={visible} className="h-screen backdrop-opacity-0	">
          <View className="flex bg-white h-screen" style={{backgroundColor: theme.colors.surface}}>
            <View className="flex-row w-full">
              <Text className="my-6 ml-6 grow self-end" variant="headlineMedium">Create Problem</Text>
              <IconButton icon="close" size={28} className=" shrink self-start mt-4 mr-4" onPress={() => setVisible(false)}/>
            </View>
            <ScrollView showsVerticalScrollIndicator="false">
              <View className="flex column gap-y-2">
                <ScrollView showsHorizontalScrollIndicator="false" horizontal className="x-2">
                  <View className="flex-row grow w-max px-4 gap-x-2">
                    <Pressable onPress={() => {console.log("open camera")}}>
                      <View
                        className="flex rounded-lg w-24 h-48 border-dashed border-2 border-blue-500 items-center justify-center">
                        <MaterialCommunityIcons name="camera" size={32} className=""/>
                      </View>
                    </Pressable>
                    <Image
                      className="rounded-lg w-24 h-48"
                      resizeMode="cover"
                      source={{
                        uri: 'https://wallpapers.com/images/hd/vertical-sunset-shade-mountain-i3d1yb2udkq9rn59.jpg'
                      }}/>
                    <Image
                      className="rounded-lg w-24 h-48"
                      resizeMode="cover"
                      source={{
                        uri: 'https://i.pinimg.com/736x/c8/7d/5c/c87d5c06b2eca33d662f289d61b7f01d.jpg'
                      }}/>
                    <Image
                      className="rounded-lg w-24 h-48"
                      resizeMode="cover"
                      source={{
                        uri: 'https://wallpapershome.com/images/pages/pic_v/16241.jpg'
                      }}/>
                    <Image
                      className="rounded-lg w-24 h-48"
                      resizeMode="cover"
                      source={{
                        uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZy3elTi_98zFXaf9OZLWkXsHpZPnqtLQsjw&usqp=CAU'
                      }}/>
                    
                  </View>
                </ScrollView>
                <View className="m-2 gap-y-2">
                  <Card mode="contained" className="">
                    <Text variant="titleSmall" className="mx-4 mt-2">Color</Text>
                    <ScrollView showsHorizontalScrollIndicator="false" horizontal className="x-2">
                      <View className="flex-row gap-x-2 mt-2 mb-4 mx-2">
                        <ToggleButton icon={colorSelected == "red" ? selectedIconName : ""} iconColor={selectedIconColor} backgroundColor="#c4342d" onPress={() => setColorSelected("red")} className="w-10 h-10 border-blue-500 rounded-full"/>
                        <ToggleButton icon={colorSelected == "ora" ? selectedIconName : ""} iconColor={selectedIconColor} backgroundColor="#f67200" onPress={() => setColorSelected("ora")} className="w-10 h-10 border-blue-500 rounded-full"/>
                        <ToggleButton icon={colorSelected == "yel" ? selectedIconName : ""} iconColor={selectedIconColor} backgroundColor="#f8e115" onPress={() => setColorSelected("yel")} className="w-10 h-10 border-blue-500 rounded-full"/>
                        <ToggleButton icon={colorSelected == "gre" ? selectedIconName : ""} iconColor={selectedIconColor} backgroundColor="#7bb35d" onPress={() => setColorSelected("gre")} className="w-10 h-10 border-blue-500 rounded-full"/>
                        <ToggleButton icon={colorSelected == "blu" ? selectedIconName : ""} iconColor={selectedIconColor} backgroundColor="#69abce" onPress={() => setColorSelected("blu")} className="w-10 h-10 border-blue-500 rounded-full"/>
                        <ToggleButton icon={colorSelected == "pur" ? selectedIconName : ""} iconColor={selectedIconColor} backgroundColor="#7c609c" onPress={() => setColorSelected("pur")} className="w-10 h-10 border-blue-500 rounded-full"/>
                        <ToggleButton icon={colorSelected == "pin" ? selectedIconName : ""} iconColor={selectedIconColor} backgroundColor="#ffbdc4" onPress={() => setColorSelected("pin")} className="w-10 h-10 border-blue-500 rounded-full"/>
                        <ToggleButton icon={colorSelected == "bro" ? selectedIconName : ""} iconColor={selectedIconColor} backgroundColor="#644117" onPress={() => setColorSelected("bro")} className="w-10 h-10 border-blue-500 rounded-full"/>
                        <ToggleButton icon={colorSelected == "bla" ? selectedIconName : ""} iconColor={selectedIconColor} backgroundColor="#141414" onPress={() => setColorSelected("bla")} className="w-10 h-10 border-blue-500 rounded-full"/>
                        <ToggleButton icon={colorSelected == "whi" ? selectedIconName : ""} iconColor={selectedIconColor} backgroundColor="#fcfdf5" onPress={() => setColorSelected("whi")} className="w-10 h-10 border-blue-500 rounded-full"/>
                      </View>
                    </ScrollView>
                  </Card>
                  <Card mode="contained">
                    <Text variant="titleSmall" className="mx-4 mt-2">Grade</Text>
                      <Slider
                        progress={grade}
                        minimumValue={0}
                        maximumValue={17}
                      />
                  </Card>
                </View>
              </View>
            </ScrollView>
          </View>
        </Modal>
      </Portal>
    </View>
  )
}

export default NewProblemModal;