import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image } from 'react-native';
import AudioPlayer from '@/components/audioPlayer';
import VideoPlayer from '@/components/VideoPlayer';

const MeditationApp = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedSession, setSelectedSession] = useState(null);
  const [showSessionOptions, setShowSessionOptions] = useState(true);
  const [sessionStarted, setSessionStarted] = useState(false);
  const [totalSessions, setTotalSessions] = useState(0);
  const [totalMinutes, setTotalMinutes] = useState(0);
  const [previousSessions, setPreviousSessions] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [lessonsWatched, setLessonsWatched] = useState(0);
  const [videoEnded, setVideoEnded] = useState(false);

  const options = ['Meditate', 'Exercises', 'Statistics'];

  const meditationSessions = [
    { id: 1, level: 'Beginner', name: 'Quick Meditation', duration: 5 * 60, audioPath: require('./../../assets/audio/5min.mp3'), image: require('./../../../assets/images/calm.jpg') },
    { id: 2, level: 'Beginner', name: 'Let Go Of Stress', duration: 10 * 60, audioPath: require('./../../../assets/audio/10min.mp3'), image: require('./../../../assets/images/letGo.jpeg') },
    { id: 3, level: 'Intermediate', name: 'Train Your Mind', duration: 20 * 60, audioPath: require('./../../../assets/audio/20min.mp3'), image: require('./../../../assets/images/trainMind.jpg') },
    {id: 14, level: 'Intermidiate', name: 'Daily Calm', duration: 30 * 60, audioPath: require('./../../../assets/audio/30min.mp3'), image: require('./../../../assets/images/nature.jpg') },
    { id: 4, level: 'Advanced', name: 'Deep Meditation', duration: 45 * 60, audioPath: require('./../../../assets/audio/45min.mp3'), image: require('./../../../assets/images/deep.jpg') },
  ];

  const intro = [
    { id: 5, level: 'Beginner', name: 'How-To Meditate', videoSource: require('./../../../assets/video/HowTo.mp4'), image: 'https://i.pinimg.com/originals/5c/43/ee/5c43ee2ccc1076dfbad0281c948406be.png' },
  ];

  const exercises = [
    { id: 6, level: 'Beginner', name: 'Deep Breathing', videoSource: require('./../../../assets/video/deepBreathing.mp4'), image: 'https://post.healthline.com/wp-content/uploads/2022/11/400x400_Breathing_Techniques_For_Stress_Relief_and_More_Deep_Breathing.gif' },
    { id: 7, level: 'Intermediate', name: 'Square Breathing', videoSource: require('./../../../assets/video/boxBreathing.mp4'), image: 'https://post.healthline.com/wp-content/uploads/2022/11/400x400_Breathing_Techniques_For_Stress_Relief_and_More_Equal_Breathing.gif' },
    { id: 8, level: 'Intermediate', name: 'Lions Breathing', videoSource: require('./../../../assets/video/lionsBreathing.mp4'), image: 'https://post.healthline.com/wp-content/uploads/2022/11/400x400_Practicing_Lions_Breath_Lions_Breath.gif' },
    { id: 9, level: 'Advanced', name: 'Alternate Nostril', videoSource: require('./../../../assets/video/nostrilBreathing.mp4'), image: 'https://post.healthline.com/wp-content/uploads/2022/11/400x400_Breathing_Techniques_For_Stress_Relief_and_More_Alternate_Nostril_Breathing.gif' },
  ];

  const extras = [
    { id: 10, level: 'Intermediate', name: 'Movement', videoSource: require('./../../../assets/video/movement.mp4'), image: 'https://imageio.forbes.com/blogs-images/alicegwalton/files/2015/02/0728_deep-brain-stimulation_650x455.jpg?height=455&width=650&fit=bounds' },
    { id: 11, level: 'Intermediate', name: 'Mantra', videoSource: require('./../../../assets/video/mantra.mp4'), image: 'https://images.squarespace-cdn.com/content/v1/5b2a8a5a45776ef37acb6ad6/1571914374300-0PR69AZRU3EXF5HF0635/image-asset.jpeg?format=1500w' },
    { id: 12, level: 'Intermediate', name: 'Visualization', videoSource: require('./../../../assets/video/visualisation.mp4'), image: 'https://img.freepik.com/free-photo/3d-abstract-flowing-geometric-shapes_1048-11947.jpg?w=996&t=st=1711854821~exp=1711855421~hmac=3b3d575344aa2be52edd4d0861258d3a7fba0f2cbf92079a82f6ab47bac348c2' },
    { id: 13, level: 'Advanced', name: 'Body Scan', videoSource: require('./../../../assets/video/bodyScan.mp4'), image: 'https://media.istockphoto.com/id/1330215408/photo/visualized-3d-models-of-the-female-human-body-as-well-as-the-human-skeleton-in-x-rays-using.webp?s=2048x2048&w=is&k=20&c=re2rCUEkqBG5d5tb2tWeYiJSPwjnOs6DXsRpk2tbeqQ=' },
  ];

  const dailyGoal = 10;
  const dailyGoalAchieved = totalMinutes >= dailyGoal;
  const dailyGoalBoxColor = dailyGoalAchieved ? 'green' : '#333333';


  const startTimer = (session) => {
    console.log("hey");
    setShowSessionOptions(false);
    setSessionStarted(true);
    //setTotalSessions(totalSessions + 1);

    setTotalMinutes(totalMinutes + session.duration / 60);

    const completionDate = new Date();
    setPreviousSessions(prevSessions => [...prevSessions, { ...session, completionDate }]);
  
  
  };

  const stopTimer = () => {
    setShowSessionOptions(true);
    setSessionStarted(false);
  };

  const handleOptionPress = (option) => {
    setSelectedOption(option);
  };

  const handleVideoEnd = () => {
    setLessonsWatched(lessonsWatched + 1); // Increment lessonsWatched by 1 when the video ends
  };

  const incrementTotalSessions = () => {
    setTotalSessions(totalSessions + 1);
  };

  const renderContent = () => {
    switch (selectedOption) {
      case 'Meditate':
        return (
          <View>
            <View>
              {showSessionOptions && meditationSessions.map((session) => (
                <TouchableOpacity
                  key={session.id}
                  style={styles.sessionButton}
                  onPress={() => setSelectedSession(session)}>

                  <Image
                    source= {session.image}
                    style={styles.sessionImage}
                  />
                  <View style={styles.sessionInfoContainer}>
                    <Text style={styles.sessionInfoHead}>{session.name}</Text>
                    <Text style={styles.sessionInfoText}>Level: {session.level}</Text>
                    <Text style={styles.sessionInfoText}>Duration: {session.duration / 60} mins</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>

            {selectedSession && !sessionStarted && (
              <View>
                <>
                  <Text style={styles.subHeader}>Selected Duration: {selectedSession.duration / 60} minutes</Text>
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
            <View style={styles.container}>
              {/* Your header and options container */}
              <View style={styles.contentContainer}>
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
                    <View style={styles.introContainer}>
                      {showSessionOptions && intro.map((eSession) => (
                        <TouchableOpacity
                          key={eSession.id}
                          style={styles.eSessionButton}
                          onPress={() => setSelectedVideo(eSession)}>
        
                          <View style={styles.eSessionInfoContainer}>
                            <Text style={styles.eSessionInfoHead}>{eSession.name}</Text>
                            <Text style={styles.eSessionInfoText}>Techniques, Benfits{'\n'} and a Beginner's {'\n'}How-To</Text>
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

      case 'Statistics':
        return (
          <View style={styles.statisticsContainer}>
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
                {dailyGoalAchieved && <Text style={styles.completed}>Completed!</Text>}
              </View>
            </View>
            
            <Text style={styles.reviewHeader}>Session History</Text>
            <View style={styles.reviewSection}>
              <ScrollView horizontal>
                <View style={styles.sessionBoxContainer}>
                  {previousSessions.map(item => (
                    <View style={styles.sessionBox} key={item.id}>
                      <Text style={styles.sessionText}>{item.completionDate.toLocaleString()}</Text>
                      <Text style={styles.sessionText}>{item.name}</Text>
                      <Text style={styles.sessionText}>Level: {item.level}</Text>
                      <Text style={styles.sessionText}>Duration: {item.duration / 60} mins</Text>
                    </View>
                  ))}
                </View>
              </ScrollView>
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
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        {/* Conditionally render options based on sessionStarted */}
        {!sessionStarted && (
          <View style={styles.optionsContainer}>
            {options.map(option => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.option,
                  selectedOption === option && styles.selectedOption
                ]}
                onPress={() => handleOptionPress(option)}
              >
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
      <View style={styles.contentContainer}>
        {renderContent()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  headerContainer: {
    flexDirection: 'row',
    flex: 0.2,
    marginTop: 20,
    backgroundColor: 'black',
    paddingBottom: 10,
  },
  option: {
    paddingHorizontal: 0,
    marginHorizontal: 15,
    borderBottomWidth: 2,
    borderColor: 'transparent',
  },
  selectedOption: {
    borderColor: 'white',
    marginBottom: 10,
  },
  optionText: {
    fontSize: 15,
    color: 'white',
  },
  contentContainer: {
    flex: 3,
    marginTop: 30,
  },
  sessionButton: {
    flexDirection: 'row',
    height: 90,
    marginBottom: 10,
    backgroundColor: '#303030',
    width: 350,
    alignItems: 'center',
    borderRadius: 10,
    justifyContent: 'space-between',
  },
  subHeader: {
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
  optionsContainer: {
    flexDirection: 'row',
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
  sessionImage: {
    width: 120,
    height: 90,
    resizeMode: 'cover',
    opacity: 0.7,
    borderRadius: 20,
    marginRight: 20,
  },
  selectedSection: {
    marginTop: 20,
    alignItems: 'center',
  },
  sessionInfoContainer: {
    marginRight: 100,
  },
  sessionInfoHead: {
    color: 'white',
    fontSize: 15,
  },
  sessionInfoText: {
    color: '#d3d3d3',
    fontSize: 12,
  },
  statisticsContainer: {
    alignItems: 'center',
    marginTop: 70,
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
    marginTop: 30,
    alignItems: 'center',
  },
  reviewHeader: {
    fontSize: 18,
    color: 'white',
    marginTop: 20,
  },
  sessionBoxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    height: 200,
  },
  sessionBox: {
    backgroundColor: '#DDDD',
    padding: 15,
    borderRadius: 10,
    marginBottom: 40,
    marginRight: 10,
  },
  sessionText: {
    color: 'black',
    fontSize: 16,
  },
  completed: {
    color: 'black',
    fontSize: 20,
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
  eSessionButton: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#333333',
    width: 400,
    alignItems: 'center',
    borderRadius: 10,
    justifyContent: 'space-between',
  },
  eSessionInfoHead: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'white',
  },
  eSessionInfoText: {
    fontSize: 14,
    color: '#d3d3d3',
  },
//containers
  introContainer: {
    height: 100,
    alignItems: 'center',
  },
  scrollContainer: {
     marginLeft: 10,
     marginBottom: 60,
     marginTop: 20,
  },
  exercisesContainer: {
    height: 170,
    flexDirection: 'row',
    marginTop: 0,
  },
  extrasContainer: {
    height: 170,
    marginBottom: 100,
    flexDirection: 'row',
  },
  exerciseButton: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#333333',
    padding: 10,
    borderRadius: 10,
    marginRight: 20,
    //marginTop: 50,
    
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
  }
});

export default MeditationApp;