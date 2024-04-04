import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, useColorScheme } from 'react-native';
import AudioPlayer from '@/components/audioPlayer'
import VideoPlayer from '@/components/VideoPlayer';
import DailyGoalModal from '@/components/DailyGoalModal';
import AddMinutesModal from '@/components/AddMinutesModal';
import { meditationSessions, intro, exercises, extras } from '@/data/index'
import Options from '@/components/meditationOptions';
import PastGoals from '@/components/pastGoalComponent';
import Colors from "@/lib/Colors";
import BackButton from '@/components/BackButton';

const MeditationApp = () => {
  const colorScheme = useColorScheme();
  const themeColors = colorScheme === "light" ? Colors.light : Colors.dark;
  
  const data = [20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160];
  const [selectedOption, setSelectedOption] = useState('Statistics'); // Default is 'Statistics' section
  const [selectedSession, setSelectedSession] = useState(null);
  const [showSessionOptions, setShowSessionOptions] = useState(true);
  const [sessionStarted, setSessionStarted] = useState(false);
  const [totalSessions, setTotalSessions] = useState(0);
  const [totalMinutes, setTotalMinutes] = useState(0);
  const [previousSessions, setPreviousSessions] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [lessonsWatched, setLessonsWatched] = useState(0);
  const [userInputGoal, setUserInputGoal] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [additionalMinutes, setAdditionalMinutes] = useState('');
  const [addMinutesModalVisible, setAddMinutesModalVisible] = useState(false);


  const dailyGoal = userInputGoal !== '' ? parseInt(userInputGoal) : 10; // Use userInputGoal if available, otherwise default to 10
  const dailyGoalAchieved = totalMinutes >= dailyGoal;
  const dailyGoalBoxColor = dailyGoalAchieved ? 'green' : '#333333';

  //functions below for setting daily goal
  const handleDailyGoalInputChange = (text) => {
    setUserInputGoal(text);
  };

  const handleDailyGoalModalOpen = () => {
    setModalVisible(true);
  };

  const handleSetDailyGoal = () => {
    const goal = parseInt(userInputGoal);
    // Check if input is a number and greater than 0
    if (!isNaN(goal) && goal > 0) {
      setTotalMinutes(0);
      setModalVisible(false);
    } else {
      // If userInputGoal is not a valid number, show an error message or handle it appropriately
      alert('Please enter a valid positive number for the daily goal.');
      setUserInputGoal('');
    }
  };

  //functions below for adding meditation minutes completed outside of the app
  const handleAddDailyMinutes = () => {
    const minutesToAdd = parseInt(additionalMinutes);
    // Check if input is a number and greater than 0
    if (!isNaN(minutesToAdd) && minutesToAdd > 0) {
      setTotalMinutes(totalMinutes + minutesToAdd);
      setAdditionalMinutes('');
      setAddMinutesModalVisible(false);
    } else {
      // If userInputGoal is not a valid number, show an error message or handle it appropriately
      alert('Please enter a valid positive number of minutes.');
    }
  };
  
  const handleAddMinutesInputChange = (text) => {
    setAdditionalMinutes(text);
  };
  
  const handleAddMinutesModalOpen = () => {
    setAddMinutesModalVisible(true);
  };
  
  const handleAddMinutesModalClose = () => {
    setAdditionalMinutes('');
    setAddMinutesModalVisible(false);
  };
  

  //function for the start session button
  const startTimer = (session) => {
    console.log("hey");
    setShowSessionOptions(false);
    setSessionStarted(true);

    setTotalMinutes(totalMinutes + session.duration / 60);

    const completionDate = new Date();
    setPreviousSessions(prevSessions => [...prevSessions, { ...session, completionDate }]);
  
  
  };

  //function for the end session button 
  const stopTimer = () => {
    setShowSessionOptions(true);
    setSessionStarted(false);
  };

  //function for rendering the diff sections
  const handleOptionPress = (option) => {
    setSelectedOption(option);
  };

  // Increment lessonsWatched by 1 only when the video ends
  const handleVideoEnd = () => {
    setLessonsWatched(lessonsWatched + 1); 
  };
  // Increment totalSessions by 1 only when the audio ends
  const incrementTotalSessions = () => {
    setTotalSessions(totalSessions + 1);
  };
 
  const renderContent = () => {
    switch (selectedOption) {
      case 'Statistics':
        return (
          <View style={styles.statisticsContainer}>
            <Text style={[styles.pastHeader, { color: 'white' }]}>Past progress</Text>
            <View style={styles.past}>
              <PastGoals data={data} goal={dailyGoal} />
            </View>
            <View style={styles.statisticBoxContainer}>
              <View style={styles.statisticBox}>
                <Text style={styles.statisticLabel}>Sessions Completed</Text>
                <Text style={styles.statisticValue}>{totalSessions}</Text>
              </View>
              <View style={styles.statisticBox}>
                <Text style={styles.statisticLabel}>Lessons{'\n'}Watched</Text>
                <Text style={styles.statisticValue}>{lessonsWatched}</Text>
              </View>
            </View>
            <View style={styles.statisticBoxContainer}>
              <View style={styles.statisticBox}>
                <Text style={styles.statisticLabel}>Minutes Meditated</Text>
                <Text style={styles.statisticValue}>{totalMinutes} mins</Text>
              </View>
              <View style={[styles.statisticBox, { backgroundColor: dailyGoalBoxColor }]}>
                <Text style={styles.statisticLabel}>Daily {'\n'}Goal:</Text>
                <Text style={styles.statisticValue}>{dailyGoal} mins</Text>
              </View>
            </View>
            
            <View style={styles.addSetButtons}>
            <TouchableOpacity style={styles.setGoalButton} onPress={handleDailyGoalModalOpen}>
                <Text style={styles.addSetButtonsText}>Set Daily Goal</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.setGoalButton} onPress={handleAddMinutesModalOpen}>
              <Text style={styles.addSetButtonsText}>Add Minutes</Text>       
            </TouchableOpacity>
            </View>

            <Text style={styles.reviewHeader}>Session History</Text>
            <View style={styles.reviewSection}>
              <ScrollView horizontal>
                <View style={styles.sessionHistoryContainer}>
                  {previousSessions.map(item => (
                    <View style={styles.sessionHistoryBox} key={item.id}>
                      <Text style={styles.sessionHistoryText}>{item.completionDate.toLocaleString([], {dateStyle: 'short', timeStyle: 'short'})}</Text>
                      <Text style={styles.sessionHistoryText}>{item.name}</Text>
                      <Text style={styles.sessionHistoryText}>Duration: {item.duration / 60} mins</Text>
                    </View>
                  ))}
                </View>
              </ScrollView>
            </View>
          </View>
        );
      case 'Meditate':
        return (
          <View>
            <View>
              {showSessionOptions && meditationSessions.map((session) => (
                <TouchableOpacity
                  key={session.id}
                  style={styles.meditateButton}
                  onPress={() => setSelectedSession(session)}>

                  <Image
                    source= {session.image}
                    style={styles.sessionImage}
                  />
                  <View style={styles.meditateInfoContainer}>
                    <Text style={styles.meditateInfoHead}>{session.name}</Text>
                    <Text style={styles.meditateInfoText}>Level: {session.level}</Text>
                    <Text style={styles.meditateInfoText}>Duration: {session.duration / 60} mins</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>

            {selectedSession && !sessionStarted && (
              <View>
                <>
                  <Text style={styles.meditateSubHeader}>Selected Duration: {selectedSession.duration / 60} minutes</Text>
                  <TouchableOpacity style={styles.startButton} onPress={() => startTimer(selectedSession)}>
                    <Text>Start Session</Text>
                  </TouchableOpacity>
                </>
              </View>
            )}

            {sessionStarted && selectedSession && (
              <View style={styles.audioPlayerContainer}>
                <View style={styles.audioPlayer}>
                  <AudioPlayer audioPath={selectedSession.audioPath} 
                  onAudioEnd={incrementTotalSessions}
                  onBackSession={stopTimer} // Pass the callback function here
                  />
                </View>
              </View>
            )}
          </View>
        );

        case 'Exercises':
          return (
            <View>
              <View  style={{ flex: 1 }}>
                {selectedVideo ? (
                  // Render only the selected video
                  <View style={styles.videoPlayerContainer}>
                   <VideoPlayer
                      videoSource={selectedVideo.videoSource}
                      style={styles.videoPlayer}
                      onVideoEnd={handleVideoEnd}
                    />
                    <TouchableOpacity
                      style={styles.goBackButton}
                      onPress={() => {
                        setSelectedVideo(null);
                        //handleVideoWatched(selectedVideo); // Call another function here if needed
                      }}>
                      <Text style={styles.goBackButtonText}>Go Back to Exercises</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  // Render only when no video is selected
                  <>
                
                    <View style={styles.exercisesIntroContainer}>
                      {showSessionOptions && intro.map((eSession) => (
                        <TouchableOpacity
                          key={eSession.id}
                          style={styles.exerciseIntroButton}
                          onPress={() => setSelectedVideo(eSession)}>
        
                          <View style={styles.exerciseIntroInfoContainer}>
                            <Text style={styles.exerciseIntroInfoHead}>{eSession.name}</Text>
                            <Text style={styles.exerciseIntroInfoText}>Techniques, Benfits{'\n'}and a Beginner's {'\n'}How-To</Text>
                          </View>
                          <Image
                            source={{ uri: eSession.image }}
                            style={styles.eSessionImage}
                          />
                        </TouchableOpacity>
                      ))}
                    </View>
                    <View style={styles.scrollContainer}>
                    <Text style={styles.exerciseTitle}>Guided Breathwork</Text>
                    <ScrollView horizontal>
                      <View style={styles.exercisesContainer}>
                        {showSessionOptions && exercises.map((esession) => (
                          <TouchableOpacity
                            key={esession.id}
                            style={styles.exerciseButton}
                            onPress={() => setSelectedVideo(esession)}>
        
                            <Image
                              source={{ uri: esession.image }}
                              style={styles.sessionImage}
                            />
                            <View style={styles.exerciseInfoContainer}>
                              <Text style={styles.exerciseName}>{esession.name}</Text>
                              <Text style={styles.exerciseLevel}>Level: {esession.level}</Text>
                            </View>
                          </TouchableOpacity>
                        ))}
                      </View>
                    </ScrollView>
                    <Text style={styles.exerciseTitle}>Deepen your practice</Text>
                    <ScrollView horizontal>
                      <View style={styles.extrasContainer}>
                        {showSessionOptions && extras.map((esession) => (
                          <TouchableOpacity
                            key={esession.id}
                            style={styles.exerciseButton}
                            onPress={() => setSelectedVideo(esession)}>
        
                            <Image
                              source={{ uri: esession.image }}
                              style={styles.sessionImage}
                            />
                            <View style={styles.exerciseInfoContainer}>
                              <Text style={styles.exerciseName}>{esession.name}</Text>
                              <Text style={styles.exerciseLevel}>Level: {esession.level}</Text>
                            </View>
                          </TouchableOpacity>
                        ))}
                      </View>
                    </ScrollView>
                    </View>
                  </>
                )}
              </View>
            </View>
          );

      default:
        return (
          <View>
            <Text>Please select an option</Text>
          </View>
        );
    }
  };

  return (
    <ScrollView contentContainerStyle={[styles.scrollViewContent, { backgroundColor: 'black'}]}>
      
      <View style={styles.headerContainer}>
        <BackButton destination={"/user/(tabs)/"} name={"Dashboard"} />
        {/* Conditionally render options based on sessionStarted */}
        {!sessionStarted && (
            <Options
              options={['Statistics', 'Meditate', 'Exercises']}
              selectedOption={selectedOption}
              onSelectOption={handleOptionPress}
            />
        )}
      </View>
      <View style={styles.contentContainer}>
        {renderContent()}
      </View>
      
      
  
      <DailyGoalModal
        modalVisible={modalVisible}
        handleDailyGoalInputChange={handleDailyGoalInputChange}
        userInputGoal={userInputGoal}
        handleSetDailyGoal={handleSetDailyGoal}
        setModalVisible={setModalVisible}
      />
      
      <AddMinutesModal
        addMinutesModalVisible={addMinutesModalVisible}
        handleAddMinutesInputChange={handleAddMinutesInputChange}
        additionalMinutes={additionalMinutes}
        handleAddDailyMinutes={handleAddDailyMinutes}
        handleAddMinutesModalClose={handleAddMinutesModalClose}
      />
    
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  //top navigate options
  headerContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 5,
    flex: 0.2,
    marginTop: 70, // Adjust the margin top as needed
    backgroundColor: 'black',
  },
  optionsContainer: {
    flexDirection: 'row',
  },
  scrollViewContent: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    flex: 4,
    marginTop: 30,
  },
  //meditate section
  meditateButton: {
    flexDirection: 'row',
    height: 90,
    marginBottom: 10,
    backgroundColor: '#303030',
    width: 350,
    alignItems: 'center',
    borderRadius: 10,
    justifyContent: 'space-between',
  },
  meditateInfoContainer: {
    marginRight: 100,
  },
  meditateInfoHead: {
    color: 'white',
    fontSize: 15,
  },
  meditateInfoText: {
    color: '#d3d3d3',
    fontSize: 12,
  },
  meditateSubHeader: {
    width: 200,
    color: 'white',
  },
  startButton: {
    padding: 10,
    marginTop: 10,
    width: 350,
    backgroundColor: '#DDDD',
    alignItems: 'center',
    borderRadius: 10,
  },
  audioPlayer: {
    marginBottom: 20,
  },
  audioPlayerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 550,
    marginBottom:20,
  },

  //exercises section
  exercisesIntroContainer: {
    height: 100,
    alignItems: 'center',
  },
  scrollContainer: {
     marginLeft: 30,
     height: 530,
     marginTop: 20,
  },
  exercisesContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 10,
  },
  exerciseInfoContainer: {
    alignItems: 'center',
  },
  exerciseName: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  exerciseLevel: {
    fontSize: 14,
    color: '#d3d3d3',
  },
  exerciseButton: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#333333',
    padding: 10,
    borderRadius: 10,
    marginRight: 20,
  },
  videoPlayerContainer: {
    height: 500,
    width: 400,
    alignItems: 'center',
  },
  videoPlayer: {
    aspectRatio: 10 / 7,
    marginBottom: 100,
  },
  goBackButton: {
    backgroundColor: '#333',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 0,
    width: '50%',
  },
  goBackButtonText: {
    color: 'white',
    fontSize: 16,
  },
  exerciseTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
    marginTop:5,
  },
  exerciseIntroButton: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#303030',
    width: 350,
    alignItems: 'center',
    borderRadius: 10,
    justifyContent: 'space-between',
  },
  exerciseIntroInfoHead: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'white',
  },
  exerciseIntroInfoText: {
    fontSize: 14,
    color: '#d3d3d3',
  },
  extrasContainer: {
    height: 170,
    marginBottom: 100,
    flexDirection: 'row',
    marginTop: 10,
  },


//styles for the statistics part
  setGoalButton: {
    backgroundColor: '#333333',
    borderRadius: 10,
    padding: 10,
    marginTop: 30,
  },
  addMinutesButton: {
    backgroundColor: '#333333',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10, 
  },
  addMinutesButtonText: {
    color: '#ffffff',
    fontSize: 16,
  },
  addSetButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  addSetButtonsText: {
    color: 'white',
  },
  past: {
    height: 100,
  },
  pastHeader: {
    marginVertical: 15,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
  sessionHistoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    height: 150,
  },
  sessionHistoryText: {
    color: 'black',
    fontSize: 16,
  },
  sessionHistoryBox: {
    backgroundColor: '#DDDD',
    padding: 15,
    borderRadius: 10,
    marginBottom: 40,
    marginRight: 10,
  },
   statisticsContainer: {
    alignItems: 'center',
    height: 600,
  },
  statisticsText: {
    color: 'white',
    fontSize: 18,
    marginBottom: 10,
  },
  statisticBoxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 20,
    width: 400,
  },
  statisticBox: {
    flex: 1,
    backgroundColor: '#303030',
    padding: 20,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  statisticLabel: {
    color: 'white',
    fontSize: 16,
    marginBottom: 10,
  },
  statisticValue: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  reviewSection: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
  },
  reviewHeader: {
    fontSize: 18,
    color: 'white',
    marginTop: 10,
  },
  completed: {
    color: 'black',
    fontSize: 20,
  },
  

  //images
  sessionImage: {
    width: 120,
    height: 90,
    resizeMode: 'cover',
    opacity: 0.7,
    borderRadius: 20,
  },

  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    width: 420,
    height: 200,
  },
  eSessionImage: {
    resizeMode: 'cover',
    justifyContent: 'center',
    width: 200,
    height: 80,
    borderRadius: 20,
  },
});

export default MeditationApp;