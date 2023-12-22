import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Card, Text, Button, FAB, useTheme, IconButton, SegmentedButtons, Switch, Portal } from 'react-native-paper';
import { ScrollView, View, Image, Modal} from 'react-native'
import UserService from '../services/user.service';
import ProblemCard from './ProblemCard';
import NewProblemModal from './NewProblemModal';
import Slider from '@react-native-community/slider'
import BottomSheet from '@gorhom/bottom-sheet';


const ProblemListView = ({ navigation }) => {

  const theme = useTheme();

  const [problems, setProblems] = useState([]);
  const [newProblemModalIsVisible, setNewProblemModalIsVisible] = useState(false);

  // filter/sort stuff
  const [filterMenuOpen, setFiterMenuOpen] = useState(false);
  const [sliderLength, setSliderLength] = useState(0);

  const [sortOldFirst, setSortOldFirst] = useState(false);
  const [filterIncomplete, setFilterIncomplete] = useState(false);
  const [filterMinGrade, setFilterMinGrade] = useState(0);
  const [filterMaxGrade, setFilterMaxGrade] = useState(17);
  const [displayProblems, setDisplayProblems] = useState([]);
  const [startFilter, setStartFilter] = useState(0);

  useFocusEffect(
    React.useCallback(() => {
      fetchProblems();
      
      return;
    }, [newProblemModalIsVisible])
  );

  useFocusEffect(
    React.useCallback(() => {
      applyFilter();
      return; 
    }, [sortOldFirst, filterIncomplete, startFilter])
  );

  const fetchProblems = async () => {
    const problems = await UserService.getProblems();
    setProblems(problems.data);
    setDisplayProblems(problems.data);
  }

  const deleteProblem = async (id) => {
    await UserService.deleteProblem(id);
    fetchProblems(); // alternatively manually modify client side
  }

  const onProblemPress = (id, color, grade, name) => {
    navigation.navigate("ProblemDetail", { id: id, color: color, grade: grade, name: name });
  }

  const applyFilter = () => {
    // go through all filter steps starting from the original problems array
    let newProblems = [...problems];
    if (filterIncomplete) {
      newProblems = newProblems.filter((p) => { return p.sendCount === 0 })
    }
    if (sortOldFirst) {
      newProblems.reverse();
    }
    newProblems = newProblems.filter(p => { return p.grade >= filterMinGrade && p.grade <= filterMaxGrade})
    // console.log(newProblems);
    setDisplayProblems(newProblems);
  }

  const resetButtonVisible = () => {
    return sortOldFirst || filterIncomplete || filterMinGrade !== 0 || filterMaxGrade !== 17;
  }

  const resetFilter = () => {
    setSortOldFirst(false);
    setFilterIncomplete(false);
    setFilterMinGrade(0);
    setFilterMaxGrade(17);
    setDisplayProblems(problems);
  }

  // bottom sheet stuff
  const openTestBottomSheet = () => {
    console.log("Opening testBottomSheet");
    // bottomSheetRef.current.snapToIndex(1);
  }

  // ref
  const ref = useRef();
  // variables
  const snapPoints = useMemo(() => ['50%', '80%'], []);

  return (
    <View className="flex grow">
      <View className="absolute top-0 left-0 right-0 bottom-0 mt-12 px-4"  style={{backgroundColor: theme.colors.surface}}>
        <View className="pt-2 pl-4 flex-row justify-between items-center">
          <Text className="" variant="headlineLarge">Problems</Text>
          <IconButton className="" icon="filter-variant" size={28} onPress={() => setFiterMenuOpen(!filterMenuOpen)}/>
        </View>
        {filterMenuOpen ? (
          <View className="mb-2 p-4 rounded-lg bg-slate-200">
            {/* <Text variant="titleLarge">Parameters</Text> */}
            <View className="flex items-start gap-y-2">
              <View className="flex-row items-center">
                <Text variant="titleSmall">Old First</Text>
                <View className="grow"/>
                <Switch
                  value={sortOldFirst}
                  onValueChange={(val) => {setSortOldFirst(val)}}
                />
              </View>
              <View className="flex-row items-center">
                <Text variant="titleSmall">Show Incomplete Only</Text>
                <View className="grow"/>
                <Switch
                  value={filterIncomplete}
                  onValueChange={(val) => {setFilterIncomplete(val)}}
                />
              </View>
              <View className="w-full flex-col gap-y-2">
                <View className="mr-2 flex-row gap-x-2">
                  <View className="rounded-md bg-slate-300 px-2 py-1 w-1/6 justify-center">
                    <Text className="text-center" variant="titleSmall">V{filterMinGrade}</Text>
                  </View>
                  <View className="grow">
                    <Slider
                      minimumValue={0}
                      maximumValue={17}
                      upperLimit={filterMaxGrade}
                      step={1}
                      tapToSeek={true}
                      onValueChange={(pos) => {setFilterMinGrade(pos)}}
                      onSlidingComplete={(val) => {setStartFilter(startFilter + 1)}}
                    />
                  </View>
                </View>
                <View className="mr-2 flex-row gap-x-2">
                  <View className="rounded-md bg-slate-300 px-2 py-1 w-1/6 justify-center">
                    <Text className="text-center" variant="titleSmall">V{filterMaxGrade}</Text>
                  </View>
                  <View className="grow">
                    <Slider
                      minimumValue={0}
                      maximumValue={17}
                      lowerLimit={filterMinGrade}
                      value={filterMaxGrade}
                      step={1}
                      tapToSeek={true}
                      onValueChange={(pos) => {setFilterMaxGrade(pos)}}
                      onSlidingComplete={(val) => {setStartFilter(startFilter + 1)}}
                    />
                  </View>
                </View>
                <Button className="self-end" disabled={!resetButtonVisible()} onPress={() => resetFilter()}>Reset</Button>
              </View>
            </View>
          </View> ) : null
        }
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="flex-col overflow-auto mt-2">
            {displayProblems.length > 0 ? displayProblems.map(problem => (
              <ProblemCard
                id={problem._id}
                color={problem.color}
                grade={problem.grade}
                name={problem.name}
                location={problem.location}
                imageUri="https://wallpapers.com/images/hd/vertical-sunset-shade-mountain-i3d1yb2udkq9rn59.jpg"
                sendCount={problem.sendCount ? problem.sendCount : 0}
                attemptCount={problem.attemptCount ? problem.attemptCount : 0}
                lastAttemptDate={problem.lastAttemptDate ? problem.lastAttemptDate : 0}
                onPress={onProblemPress}
                deleteProblem={deleteProblem}
                key={problem._id}
                />
              )):
              <View>
                <Text className="text-center">Get started by creating a new Problem!</Text>
              </View>
            }
          </View>
        </ScrollView>
        <FAB className="absolute bottom-4 right-0 mx-4" variant="tertiary" size="medium" icon="plus" onPress={() => setNewProblemModalIsVisible(true)}/>
        {/* <FAB className="absolute bottom-24 right-0 mx-4" variant="primary" size="medium" icon="plus" onPress={() => openTestBottomSheet(true)}/> */}
      </View>
      { newProblemModalIsVisible ? (<Modal transparent className="w-full h-full"><NewProblemModal visible={newProblemModalIsVisible} closeModal={() => {setNewProblemModalIsVisible(false)}}/></Modal>) : null }
    </View>
  )
}

export default ProblemListView;