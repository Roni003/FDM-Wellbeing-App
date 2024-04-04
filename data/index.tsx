const meditationSessions = [
    { id: 1, level: 'Beginner', name: 'Quick Meditation', duration: 5 * 60, audioPath: require('../assets/audio/5min.mp3'), image: require('../assets/images/calm.jpg') },
    { id: 2, level: 'Beginner', name: 'Let Go Of Stress', duration: 10 * 60, audioPath: require('../assets/audio/10min.mp3'), image: require('../assets/images/letGo.jpeg') },
    { id: 3, level: 'Intermediate', name: 'Train Your Mind', duration: 20 * 60, audioPath: require('../assets/audio/20min.mp3'), image: require('../assets/images/trainMind.jpg') },
    { id: 4, level: 'Intermidiate', name: 'Daily Calm Mind', duration: 30 * 60, audioPath: require('../assets/audio/30min.mp3'), image: require('../assets/images/nature.jpg') },
    { id: 5, level: 'Advanced', name: 'Deep Meditation', duration: 45 * 60, audioPath: require('../assets/audio/45min.mp3'), image: require('../assets/images/deep.jpg') },
  ];

  const intro = [
    { id: 6, level: 'Beginner', name: 'How-To Meditate', videoSource: require('../assets/video/HowTo.mp4'), image: 'https://i.pinimg.com/originals/5c/43/ee/5c43ee2ccc1076dfbad0281c948406be.png' },
  ];

  const exercises = [
    { id: 7, level: 'Beginner', name: 'Deep Breathing', videoSource: require('../assets/video/deepBreathing.mp4'), image: 'https://post.healthline.com/wp-content/uploads/2022/11/400x400_Breathing_Techniques_For_Stress_Relief_and_More_Deep_Breathing.gif' },
    { id: 8, level: 'Intermediate', name: 'Square Breathing', videoSource: require('../assets/video/boxBreathing.mp4'), image: 'https://post.healthline.com/wp-content/uploads/2022/11/400x400_Breathing_Techniques_For_Stress_Relief_and_More_Equal_Breathing.gif' },
    { id: 9, level: 'Intermediate', name: 'Lions Breathing', videoSource: require('../assets/video/lionsBreathing.mp4'), image: 'https://post.healthline.com/wp-content/uploads/2022/11/400x400_Practicing_Lions_Breath_Lions_Breath.gif' },
    { id: 10, level: 'Advanced', name: 'Alternate Nostril', videoSource: require('../assets/video/nostrilBreathing.mp4'), image: 'https://post.healthline.com/wp-content/uploads/2022/11/400x400_Breathing_Techniques_For_Stress_Relief_and_More_Alternate_Nostril_Breathing.gif' },
  ];

  const extras = [
    { id: 11, level: 'Intermediate', name: 'Movement', videoSource: require('../assets/video/movement.mp4'), image: 'https://imageio.forbes.com/blogs-images/alicegwalton/files/2015/02/0728_deep-brain-stimulation_650x455.jpg?height=455&width=650&fit=bounds' },
    { id: 12, level: 'Intermediate', name: 'Mantra', videoSource: require('../assets/video/mantra.mp4'), image: 'https://images.squarespace-cdn.com/content/v1/5b2a8a5a45776ef37acb6ad6/1571914374300-0PR69AZRU3EXF5HF0635/image-asset.jpeg?format=1500w' },
    { id: 13, level: 'Intermediate', name: 'Visualization', videoSource: require('../assets/video/visualisation.mp4'), image: 'https://img.freepik.com/free-photo/3d-abstract-flowing-geometric-shapes_1048-11947.jpg?w=996&t=st=1711854821~exp=1711855421~hmac=3b3d575344aa2be52edd4d0861258d3a7fba0f2cbf92079a82f6ab47bac348c2' },
    { id: 14, level: 'Advanced', name: 'Body Scan', videoSource: require('../assets/video/bodyScan.mp4'), image: 'https://media.istockphoto.com/id/1330215408/photo/visualized-3d-models-of-the-female-human-body-as-well-as-the-human-skeleton-in-x-rays-using.webp?s=2048x2048&w=is&k=20&c=re2rCUEkqBG5d5tb2tWeYiJSPwjnOs6DXsRpk2tbeqQ=' },
  ];

  export { meditationSessions, intro, exercises, extras };