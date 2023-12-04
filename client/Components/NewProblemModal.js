import React, { useState, useRef, useEffect } from 'react'
import { Modal, IconButton, Portal, Text, Icon, Card, ToggleButton, TextInput, Button } from 'react-native-paper';
import { View, Image, ScrollView, Keyboard, TouchableOpacity } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from 'react-native-paper';
import Slider from '@react-native-community/slider';
import { SelectList } from 'react-native-dropdown-select-list';
import UserService from '../services/user.service';
import axios from 'axios';
import { API_URL } from '@env';
import NewLocationModal from './NewLocationModal';


// import Camera from 'react-native-camera';

const NewProblemModal = ({ visible, closeModal }) => {

  const theme = useTheme();
  
  const selectedIconColor = "#e7e0ec";
  const selectedIconName = "check";
  
  const [color, setColor] = useState("");
  const [grade, setGrade] = useState(0);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  
  const [colorError, setColorError] = useState("");
  const [gradeError, setGradeError] = useState("");
  const [locationError, setLocationError] = useState("");
  
  const [locationList, setLocationList] = useState([]);

  const [createLocationModalOpen, setCreateLocationModalOpen] = useState(false);

  const [keyboardStatus, setKeyboardStatus] = useState("");


  useEffect(() => {
    const showKeyboard = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardStatus('Keyboard Shown');
    });
    const hideKeyboard = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardStatus('Keyboard Hidden');
    })

    fetchLocations()
    // const testLocs = [
    //   {key:'1', value:'Purdue Corec'},
    //   {key:'2', value:'Santa Clara Movement'},
    // ];
    
    // setLocationList(testLocs);

    return () => {
      showKeyboard.remove();
      hideKeyboard.remove();
    }
  }, []);

  const fetchLocations = async () => {
    const res = await UserService.getLocations();
    if (!res || !res.data) {
      setLocationList([]);
      return
    }
    const fetchedLocations = res.data;
    const dropdownLocs = fetchedLocations.map((loc, index) => { return {key: index, value: loc.name} })
    // console.log(dropdownLocs);
    setLocationList(dropdownLocs);
  }

  const clearFields = () => {
    setColor("");
    setGrade(0);
    setName("");
    setLocation("")
  }

  const onAddLocationPress = () => {
    setCreateLocationModalOpen(true)
  }
 
  const onCancelPress = () => {
    closeModal();
    clearFields();
  }

  const onCreateLocation = async (newLocName) => {
    await UserService.createLocation(newLocName)
    fetchLocations()
  }

  const onCreatePress = async () => {
    // do error check
    let isValid = true;
    if (!color) {
      isValid = false;
      setColorError('Please choose a color!');
    } else {
      setColorError('');
    }
    if (!grade) {
      isValid = false;
      setGradeError('Please choose a grade!')
    } else {
      setGradeError('');
    }
    // location is optional
    // if (!location) {
    // }
  
    // if anything is invalid, do not make request, simply return
    if (!isValid) return; 

    // send data to server

    const res = await UserService.createProblem(color, grade, name, location);
    closeModal();
    clearFields();
  }

  return (
    <View>
      <Portal>
        <Modal onDismiss={() => onCancelPress()} visible={visible} className="h-screen backdrop-opacity-0	">
          <View className="flex bg-white h-screen" style={{backgroundColor: theme.colors.surface}}>
            <View className="flex-row w-full">
              <Text className="my-6 ml-6 grow self-end" variant="headlineMedium">Create Problem</Text>
              <IconButton icon="close" size={28} className=" shrink self-start mt-4 mr-4" onPress={() => onCancelPress()}/>
            </View>
            
            <ScrollView 
              className=""
              showsVerticalScrollIndicator="false" 
              scrollToOverflowEnabled
              contentContainerStyle={{paddingBottom: 80}}>
              <ScrollView showsHorizontalScrollIndicator="false" horizontal className="mb-2">
                <View className="flex-row grow w-max px-4 gap-x-2">
                  <TouchableOpacity onPress={() => {console.log("open camera")}} activeOpacity={0.5}>
                    <View
                      className="flex rounded-lg w-24 h-48 border-dashed border-2 border-blue-500 items-center justify-center">
                      <MaterialCommunityIcons name="camera" size={32} color="#3b82f6" className=""/>
                    </View>
                  </TouchableOpacity>
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
              {/* after images */}
              <View className="my-2 mx-4 gap-y-2">
                <Card mode="contained" className="">
                  <Text variant="titleMedium" className="mx-4 mt-2">Color</Text>
                  <ScrollView showsHorizontalScrollIndicator="false" horizontal className="">
                    <View className="flex-row gap-x-2 mt-2 mb-4 mx-2">
                      <ToggleButton icon={color == "#c4342d" ? selectedIconName : ""} iconColor={selectedIconColor} backgroundColor="#c4342d" onPress={() => setColor("#c4342d")} className="w-10 h-10 border-blue-500 rounded-full"/>
                      <ToggleButton icon={color == "#f67200" ? selectedIconName : ""} iconColor={selectedIconColor} backgroundColor="#f67200" onPress={() => setColor("#f67200")} className="w-10 h-10 border-blue-500 rounded-full"/>
                      <ToggleButton icon={color == "#f8e115" ? selectedIconName : ""} iconColor={selectedIconColor} backgroundColor="#f8e115" onPress={() => setColor("#f8e115")} className="w-10 h-10 border-blue-500 rounded-full"/>
                      <ToggleButton icon={color == "#7bb35d" ? selectedIconName : ""} iconColor={selectedIconColor} backgroundColor="#7bb35d" onPress={() => setColor("#7bb35d")} className="w-10 h-10 border-blue-500 rounded-full"/>
                      <ToggleButton icon={color == "#69abce" ? selectedIconName : ""} iconColor={selectedIconColor} backgroundColor="#69abce" onPress={() => setColor("#69abce")} className="w-10 h-10 border-blue-500 rounded-full"/>
                      <ToggleButton icon={color == "#7c609c" ? selectedIconName : ""} iconColor={selectedIconColor} backgroundColor="#7c609c" onPress={() => setColor("#7c609c")} className="w-10 h-10 border-blue-500 rounded-full"/>
                      <ToggleButton icon={color == "#ffbdc4" ? selectedIconName : ""} iconColor={selectedIconColor} backgroundColor="#ffbdc4" onPress={() => setColor("#ffbdc4")} className="w-10 h-10 border-blue-500 rounded-full"/>
                      <ToggleButton icon={color == "#644117" ? selectedIconName : ""} iconColor={selectedIconColor} backgroundColor="#644117" onPress={() => setColor("#644117")} className="w-10 h-10 border-blue-500 rounded-full"/>
                      <ToggleButton icon={color == "#141414" ? selectedIconName : ""} iconColor={selectedIconColor} backgroundColor="#141414" onPress={() => setColor("#141414")} className="w-10 h-10 border-blue-500 rounded-full"/>
                      <ToggleButton icon={color == "#fcfdf5" ? selectedIconName : ""} iconColor={selectedIconColor} backgroundColor="#fcfdf5" onPress={() => setColor("#fcfdf5")} className="w-10 h-10 border-blue-500 rounded-full"/>
                    </View>
                  </ScrollView>
                </Card>
                <Card mode="contained" >
                  <View className="flex-row justify-between">
                    <Text variant="titleMedium" className="mx-4 mt-2">Grade</Text>
                    <Text variant="titleMedium" className="self-center mx-4 mt-2">{grade}</Text>
                  </View>
                  <View className="mx-4 my-2">
                    <Slider
                      className=""
                      minimumValue={0}
                      maximumValue={17}
                      step={1}
                      tapToSeek={true}
                      onValueChange={(pos) => {setGrade(pos)}}
                    />
                  </View>
                </Card>
                <Card mode="contained">
                  <Text variant="titleMedium" className="mx-4 mt-2">Name</Text>
                  <TextInput
                    className="mt-2 mb-4 mx-4"
                    onChangeText={(e) => setName(e)}
                    mode={'outlined'}
                    label='Problem Name'
                  />
                </Card>
                <Card mode="contained">
                  <Text variant="titleMedium" className="mx-4 mt-2">Location</Text>
                  <View className="flex flex-row place-center items-center">
                    <View className="ml-4 mt-2 mb-4 grow">
                      <SelectList
                        boxStyles={{borderRadius: 4, backgroundColor: "#fffbfe", paddingVertical: 12}}
                        dropdownStyles={{borderRadius: 4, marginTop: 4}}
                        inputStyles={{fontSize: 16, color: "#55525b"}}
                        searchicon={<Icon/>}
                        arrowicon={<MaterialCommunityIcons name="chevron-down"size={18} />}
                        maxHeight={120}
                        placeholder="Select Option"
                        searchPlaceholder="Search"
                        setSelected={(val) => {setLocation(val); console.log(val)}} 
                        data={locationList}
                        save="value"/>
                    </View>
                    <IconButton className="mt-2 mb-4 mr-2 place-self-center" icon="plus"
                      onPress={() => onAddLocationPress()}/>
                  </View>
                </Card>
                <View className="flex-row gap-x-2">
                  <Button mode="contained-tonal" className="shrink w-1/2" onPress={() => onCancelPress()}>Cancel</Button>
                  <Button mode="contained" className="shrink w-1/2" onPress={() => onCreatePress()}>Create</Button>
                </View>
              </View>
            </ScrollView> 
            <NewLocationModal 
              visible={createLocationModalOpen}
              closeModal={() => setCreateLocationModalOpen(false)}
              // locationName=""
              createLocation={onCreateLocation}
            />
          </View>
        </Modal>
      </Portal>
    </View>
  )
}

export default NewProblemModal;