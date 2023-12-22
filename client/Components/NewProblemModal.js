import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react'
import { Modal, IconButton, Portal, Text, Icon, Card, ToggleButton, TextInput, Button, HelperText } from 'react-native-paper';
import { View, Image, ScrollView, Keyboard, TouchableOpacity } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from 'react-native-paper';
import Slider from '@react-native-community/slider';
import { SelectList } from 'react-native-dropdown-select-list';
import UserService from '../services/user.service';
import axios from 'axios';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { API_URL } from '@env';
import NewLocationModal from './NewLocationModal';
import BottomSheet, { BottomSheetFooter } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';



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
  const [nameError, setNameError] = useState("");
  const [locationError, setLocationError] = useState("");
  
  const [locationList, setLocationList] = useState([]);

  const [createLocationModalOpen, setCreateLocationModalOpen] = useState(false);

  const [keyboardStatus, setKeyboardStatus] = useState("");

  const safeAreaInsets = useSafeAreaInsets();

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
    setLocation("");
    setNameError("");
    setColorError("");
    setGradeError(0);
  }

  const onAddLocationPress = () => {
    setCreateLocationModalOpen(true)
  }
 
  const onCancelPress = () => {
    ref.current.close();
    closeModal()
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
    if (name == "") {
      isValid = false;
      setNameError('Please give your problem a name!')
    } else {
      setNameError('');
    }
  
    // if anything is invalid, do not make request, simply return
    if (!isValid) return; 
    console.log("shit is valid");
    const res = await UserService.createProblem(color, grade, name, location);
    onCancelPress();
  }

  const onOpenCamera = async () => {
    console.log("open camera");

    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };
  
    launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.error) {
        console.log('Camera Error: ', response.error);
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri;
        setSelectedImage(imageUri);
        console.log(imageUri);
      }
    });
  }

  // ref
  const ref = useRef();
  // variables
  const snapPoints = useMemo(() => ['50%', '90%'], []);
  // callbacks
  const handleSheetChanges = useCallback((index) => {
    // console.log('handleSheetChanges', index);
    if (index == -1) {
      try {closeModal()}
      catch(err) {
        console.log(err);
      };

      // console.log("poooop")
    }
  }, [visible, closeModal]);

  let extraScrollHeight = 0;
  
  const renderFooter = useCallback(
    props => (
      <BottomSheetFooter {...props}>
        <View className="flex-row px-4 pt-4 bg-white space-x-2 " style={{paddingBottom: safeAreaInsets.bottom}} onLayout={event => {
          extraScrollHeight = event.nativeEvent.layout.height;
        }}>
          <Button compact mode="contained-tonal" className="shrink w-1/2" onPress={() => onCancelPress()}>Cancel</Button>
          <Button compact mode="contained" className="shrink w-1/2" onPress={() => onCreatePress()}>Create</Button>
        </View>
      </BottomSheetFooter>
    ),
    [onCancelPress, onCreatePress, extraScrollHeight]
  );

  useEffect(() => {
    if (visible) {
      ref.current.expand();
    }
  }, [visible]);

  return (
    <View className="w-full h-full" style={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
      {/* <Portal> */}
        {/* <GestureHandlerRootView> */}
          <BottomSheet
            ref={ref}
            index={1}
            snapPoints={snapPoints}
            footerComponent={renderFooter}
            // onChange={handleSheetChanges}
            enablePanDownToClose
            onClose={() => onCancelPress()}>
            <View className="">
              {/* <View className="flex-col bottom-0 rounded-t-xl" style={{backgroundColor: theme.colors.surface}}> */}
              <View className="flex-row">
                <Text className="mb-4 ml-6 grow" variant="headlineSmall">New problem</Text>
              </View>
              <ScrollView 
                className=""
                showsVerticalScrollIndicator={false} 
                scrollToOverflowEnabled
                contentContainerStyle={{paddingBottom: 2 * safeAreaInsets.bottom + 56/*extraScrollHeight*/}}
                >
                <View className="my-2 mx-4 gap-y-2 pb-4">
                  <ScrollView showsHorizontalScrollIndicator={false} horizontal className="">
                    <View className="flex-row grow space-x-2">
                      <TouchableOpacity onPress={() => {onOpenCamera()}} activeOpacity={0.5}>
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
                  <Card mode="contained" className="">
                    <Text variant="titleMedium" className="mx-4 mt-2">Color</Text>
                    <ScrollView showsHorizontalScrollIndicator={false} horizontal className="">
                      <View className="flex-row gap-x-2 mt-2 mb-4 mx-2">
                        <ToggleButton icon={color == "#c4342d" ? selectedIconName : ""} iconColor={selectedIconColor} backgroundColor="#c4342d" onPress={() => {setColor("#c4342d"); setColorError('')}} className="w-10 h-10 border-blue-500 rounded-full"/>
                        <ToggleButton icon={color == "#f67200" ? selectedIconName : ""} iconColor={selectedIconColor} backgroundColor="#f67200" onPress={() => {setColor("#f67200"); setColorError('')}} className="w-10 h-10 border-blue-500 rounded-full"/>
                        <ToggleButton icon={color == "#f8e115" ? selectedIconName : ""} iconColor={selectedIconColor} backgroundColor="#f8e115" onPress={() => {setColor("#f8e115"); setColorError('')}} className="w-10 h-10 border-blue-500 rounded-full"/>
                        <ToggleButton icon={color == "#7bb35d" ? selectedIconName : ""} iconColor={selectedIconColor} backgroundColor="#7bb35d" onPress={() => {setColor("#7bb35d"); setColorError('')}} className="w-10 h-10 border-blue-500 rounded-full"/>
                        <ToggleButton icon={color == "#69abce" ? selectedIconName : ""} iconColor={selectedIconColor} backgroundColor="#69abce" onPress={() => {setColor("#69abce"); setColorError('')}} className="w-10 h-10 border-blue-500 rounded-full"/>
                        <ToggleButton icon={color == "#7c609c" ? selectedIconName : ""} iconColor={selectedIconColor} backgroundColor="#7c609c" onPress={() => {setColor("#7c609c"); setColorError('')}} className="w-10 h-10 border-blue-500 rounded-full"/>
                        <ToggleButton icon={color == "#ffbdc4" ? selectedIconName : ""} iconColor={selectedIconColor} backgroundColor="#ffbdc4" onPress={() => {setColor("#ffbdc4"); setColorError('')}} className="w-10 h-10 border-blue-500 rounded-full"/>
                        <ToggleButton icon={color == "#644117" ? selectedIconName : ""} iconColor={selectedIconColor} backgroundColor="#644117" onPress={() => {setColor("#644117"); setColorError('')}} className="w-10 h-10 border-blue-500 rounded-full"/>
                        <ToggleButton icon={color == "#141414" ? selectedIconName : ""} iconColor={selectedIconColor} backgroundColor="#141414" onPress={() => {setColor("#141414"); setColorError('')}} className="w-10 h-10 border-blue-500 rounded-full"/>
                        <ToggleButton icon={color == "#fcfdf5" ? selectedIconName : ""} iconColor={selectedIconColor} backgroundColor="#fcfdf5" onPress={() => {setColor("#fcfdf5"); setColorError('')}} className="w-10 h-10 border-blue-500 rounded-full"/>
                      </View>
                    </ScrollView>
                    {colorError != '' ? (
                      <HelperText className="mx-2 mb-2" type="error">
                        {colorError}
                      </HelperText>) : null
                    }
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
                        onValueChange={(pos) => {setGrade(pos); setGradeError('')}}
                      />
                    </View>
                    {gradeError != '' ? (
                      <HelperText className="mx-2 mb-2" type="error">
                        {gradeError}
                      </HelperText>) : null
                    }
                  </Card>
                  <Card mode="contained">
                    <Text variant="titleMedium" className="mx-4 mt-2">Name</Text>
                    <TextInput
                      className="mt-2 mb-4 mx-4"
                      value={name}
                      onChangeText={(e) => {setName(e); setNameError("")}}
                      mode={'outlined'}
                      label='Problem name'
                    />
                    {nameError != '' ? (
                      <HelperText className="mx-2 mb-2" type="error">
                        {nameError}
                      </HelperText>
                      ) : null}
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
                          placeholder="Select option"
                          searchPlaceholder="Search"
                          setSelected={(val) => {setLocation(val)}} 
                          data={locationList}
                          save="value"/>
                      </View>
                      <IconButton className="mt-2 mb-4 mr-2 place-self-center" icon="plus"
                        onPress={() => onAddLocationPress()}/>
                    </View>
                  </Card>
                </View> 
                {/* <View className="flex-row px-4 py-2 space-x-2 bg-white">
                  <Button mode="contained-tonal" className="shrink w-1/2" onPress={() => onCancelPress()}>Cancel</Button>
                  <Button mode="contained" className="shrink w-1/2" onPress={() => onCreatePress()}>Create</Button>
                </View> */}
              </ScrollView>
              <NewLocationModal 
                  visible={createLocationModalOpen}
                  closeModal={() => setCreateLocationModalOpen(false)}
                  createLocation={onCreateLocation}
                />
              <View className="flex-row px-4 py-2 space-x-2 border-slate-300 border-t">
                <Button mode="contained-tonal" className="shrink w-1/2" onPress={() => onCancelPress()}>Cancel</Button>
                <Button mode="contained" className="shrink w-1/2" onPress={() => onCreatePress()}>Create</Button>
              </View>
              {/* <View style={{marginBottom: safeAreaInsets.bottom * 4 }} /> */}

            </View>
            
          </BottomSheet>
      {/* </Portal> */}
      {/* </GestureHandlerRootView> */}

    </View>
  )
}

export default NewProblemModal;