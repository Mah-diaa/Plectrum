import { ALL_CHORDS, Chord } from "@/src/types/chord";
import { ALL_CHORD_TYPES, ALL_ROOT_NOTES, ChordType, IMPORTANT_CHORD_TYPES, RootNote } from "@/src/types/types";
import { formatChordForAPI, generateChordHTML } from "@/src/utils/chordFormatter";
import { createAllMajorKeys, getKeyByRoot } from "@/src/utils/keyGenerator";
import { Metronome } from "@/src/utils/metronome";
import { generateProgression, getAllProgressionPatterns, ProgressionPattern } from "@/src/utils/progressionGenerator";
import { MaterialIcons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import { Dimensions, FlatList, Text, TouchableOpacity, View } from "react-native";
import { WebView } from "react-native-webview";
import "../global.css";

const screenWidth = Dimensions.get('window').width;
const itemWidth = screenWidth / 4; // Show 4 items at a time

type ViewMode = 'chords' | 'keys' | 'progressions';

export default function App() {
  const [selectedRoot, setSelectedRoot] = useState<RootNote>('C');
  const [selectedType, setSelectedType] = useState<ChordType>('Major');
  const [viewMode, setViewMode] = useState<ViewMode>('chords');
  const [metronomeVisible, setMetronomeVisible] = useState(false);
  const [bpm, setBpm] = useState(120);
  const [metronomeRunning, setMetronomeRunning] = useState(false);
  const [tickCount, setTickCount] = useState(0);
  const metronomeRef = useRef<Metronome | null>(null);
  const [selectedKeyRoot, setSelectedKeyRoot] = useState<RootNote>('C');
  const [progressionPattern, setProgressionPattern] = useState<ProgressionPattern>('I-V-vi-IV');
  const [currentProgression, setCurrentProgression] = useState<Chord[]>([]);
  const [showAllChords, setShowAllChords] = useState(false);
  
  const allKeys = createAllMajorKeys();
  const selectedKey = getKeyByRoot(selectedKeyRoot);

  // Find the selected chord
  const selectedChord = ALL_CHORDS.find(
    (chord) => chord.root === selectedRoot && chord.type === selectedType
  );

  // Format chord name for API and generate HTML
  const chordNameForAPI = selectedChord 
    ? formatChordForAPI(selectedRoot, selectedType)
    : 'C';
  const chordHTML = generateChordHTML(chordNameForAPI);

  // Initialize metronome
  useEffect(() => {
    metronomeRef.current = new Metronome(bpm, () => {
      setTickCount(prev => prev + 1);
    });
    return () => {
      metronomeRef.current?.destroy().catch(() => {});
    };
  }, []);

  // Update metronome BPM
  useEffect(() => {
    if (metronomeRef.current) {
      const wasRunning = metronomeRef.current.getIsRunning();
      metronomeRef.current.setBPM(bpm).then(() => {
        // Restart if it was running
        if (wasRunning && !metronomeRef.current?.getIsRunning()) {
          metronomeRef.current?.start().then(() => {
            setMetronomeRunning(true);
          });
        }
      });
    }
  }, [bpm]);

  // Generate progression when key or pattern changes
  useEffect(() => {
    if (selectedKey && viewMode === 'progressions') {
      const progression = generateProgression(selectedKey, progressionPattern, 4);
      setCurrentProgression(progression);
    }
  }, [selectedKeyRoot, progressionPattern, viewMode, selectedKey]);

  const renderRootButton = ({ item }: { item: RootNote }) => (
    <TouchableOpacity
      onPress={() => setSelectedRoot(item)}
      className={`flex-1 items-center justify-center h-12 mx-1 rounded-lg ${
        selectedRoot === item ? 'bg-eclipse-indigo' : 'bg-eclipse-purple'
      }`}
      style={{ width: itemWidth - 8 }} // Subtract margin
    >
      <Text
        className={`font-semibold text-lg ${
          selectedRoot === item ? 'text-white' : 'text-eclipse-lavender'
        }`}
      >
        {item}
      </Text>
    </TouchableOpacity>
  );

  const renderTypeButton = ({ item }: { item: ChordType }) => (
    <TouchableOpacity
      onPress={() => setSelectedType(item)}
      className={`flex-1 items-center justify-center h-12 mx-1 rounded-lg ${
        selectedType === item ? 'bg-eclipse-indigo' : 'bg-eclipse-purple'
      }`}
      style={{ width: itemWidth - 8 }} // Subtract margin
    >
      <Text
        className={`font-semibold text-sm ${
          selectedType === item ? 'text-white' : 'text-eclipse-lavender'
        }`}
      >
        {item}
      </Text>
    </TouchableOpacity>
  );

  const toggleMetronome = async () => {
    if (metronomeRef.current) {
      if (metronomeRunning) {
        await metronomeRef.current.stop();
        setMetronomeRunning(false);
        setTickCount(0);
      } else {
        // Resume audio context if suspended (required by browsers)
        if (typeof window !== 'undefined' && (window as any).AudioContext) {
          try {
            const audioContext = (window as any).__metronomeAudioContext;
            if (audioContext && audioContext.state === 'suspended') {
              await audioContext.resume();
            }
          } catch (e) {
            // Ignore errors
          }
        }
        setTickCount(0);
        await metronomeRef.current.start();
        setMetronomeRunning(true);
      }
    }
  };

  const generateNewProgression = () => {
    if (selectedKey) {
      const progression = generateProgression(selectedKey, progressionPattern, 4);
      setCurrentProgression(progression);
    }
  };

  // View Mode Buttons Component
  const ViewModeButtons = () => (
    <View className="py-3 bg-eclipse-purple px-4">
      <View className="flex-row gap-2 justify-center">
        <TouchableOpacity
          onPress={() => setViewMode('chords')}
          className={`px-4 py-2 rounded-lg ${viewMode === 'chords' ? 'bg-eclipse-indigo' : 'bg-eclipse-dark/50'}`}
        >
          <Text className={`text-sm font-semibold ${viewMode === 'chords' ? 'text-white' : 'text-eclipse-lavender'}`}>Chords</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setViewMode('keys')}
          className={`px-4 py-2 rounded-lg ${viewMode === 'keys' ? 'bg-eclipse-indigo' : 'bg-eclipse-dark/50'}`}
        >
          <Text className={`text-sm font-semibold ${viewMode === 'keys' ? 'text-white' : 'text-eclipse-lavender'}`}>Keys</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setViewMode('progressions')}
          className={`px-4 py-2 rounded-lg ${viewMode === 'progressions' ? 'bg-eclipse-indigo' : 'bg-eclipse-dark/50'}`}
        >
          <Text className={`text-sm font-semibold ${viewMode === 'progressions' ? 'text-white' : 'text-eclipse-lavender'}`}>Progressions</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View className="flex-1 bg-eclipse-dark">
      {/* Header showing selected chord */}
      <View className="pt-20 pb-6 px-4 bg-eclipse-indigo relative">
        {/* Metronome Button - Top Left */}
        <TouchableOpacity
          onPress={() => setMetronomeVisible(true)}
          className="absolute top-20 left-4 w-10 h-10 items-center justify-center rounded-full bg-eclipse-purple z-10"
        >
          <MaterialIcons name="timer" size={20} color="white" />
        </TouchableOpacity>

        <Text className="text-3xl font-bold text-center text-white">
          {viewMode === 'chords' && (selectedChord?.name || 'Select Chord')}
          {viewMode === 'keys' && `${selectedKeyRoot} Major`}
          {viewMode === 'progressions' && 'Chord Progressions'}
        </Text>
        <Text className="text-sm text-eclipse-lavender text-center mt-2">
          {viewMode === 'chords' && `${selectedRoot} ${selectedType}`}
          {viewMode === 'keys' && `${selectedKey?.chords.length || 0} chords in key`}
          {viewMode === 'progressions' && progressionPattern}
        </Text>
      </View>

      {/* Root Notes Row - Show for chords and keys/progressions */}
      {viewMode === 'chords' && (
        <>
          <View className="py-4 bg-eclipse-purple">
            <Text className="text-sm font-semibold mb-2 px-4 text-eclipse-lavender">Root Notes</Text>
            <FlatList
              data={ALL_ROOT_NOTES}
              renderItem={renderRootButton}
              keyExtractor={(item) => item}
              horizontal
              showsHorizontalScrollIndicator={false}
              snapToInterval={itemWidth}
              decelerationRate="fast"
              contentContainerStyle={{ paddingHorizontal: 4 }}
            />
          </View>

          {/* Chord Types Row */}
          <View className="py-4 bg-eclipse-purple">
            <View className="flex-row justify-between items-center mb-2 px-4">
              <Text className="text-sm font-semibold text-eclipse-lavender">Chord Types</Text>
              <TouchableOpacity
                onPress={() => setShowAllChords(!showAllChords)}
                className="px-3 py-1 rounded-lg bg-eclipse-dark"
              >
                <Text className="text-xs text-eclipse-lavender">
                  {showAllChords ? 'Show Less' : 'Show More'}
                </Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={showAllChords ? ALL_CHORD_TYPES : IMPORTANT_CHORD_TYPES}
              renderItem={renderTypeButton}
              keyExtractor={(item) => item}
              horizontal
              showsHorizontalScrollIndicator={false}
              snapToInterval={itemWidth}
              decelerationRate="fast"
              contentContainerStyle={{ paddingHorizontal: 4 }}
            />
          </View>

          {/* View Mode Buttons */}
          <ViewModeButtons />
        </>
      )}

      {/* Key Selection Row - Show for keys and progressions */}
      {(viewMode === 'keys' || viewMode === 'progressions') && (
        <>
          <View className="py-4 bg-eclipse-purple">
            <Text className="text-sm font-semibold mb-2 px-4 text-eclipse-lavender">Select Key</Text>
            <FlatList
              data={ALL_ROOT_NOTES}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => setSelectedKeyRoot(item)}
                  className={`flex-1 items-center justify-center h-12 mx-1 rounded-lg ${
                    selectedKeyRoot === item ? 'bg-eclipse-indigo' : 'bg-eclipse-dark'
                  }`}
                  style={{ width: itemWidth - 8 }}
                >
                  <Text
                    className={`font-semibold text-lg ${
                      selectedKeyRoot === item ? 'text-white' : 'text-eclipse-lavender'
                    }`}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item}
              horizontal
              showsHorizontalScrollIndicator={false}
              snapToInterval={itemWidth}
              decelerationRate="fast"
              contentContainerStyle={{ paddingHorizontal: 4 }}
            />
          </View>

          {/* View Mode Buttons */}
          <ViewModeButtons />
        </>
      )}

      {/* Progression Pattern Selection - Show only for progressions */}
      {viewMode === 'progressions' && (
        <View className="py-4 bg-eclipse-purple">
          <Text className="text-sm font-semibold mb-2 px-4 text-eclipse-lavender">Progression Pattern</Text>
          <FlatList
            data={getAllProgressionPatterns()}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => setProgressionPattern(item)}
                className={`flex-1 items-center justify-center h-10 mx-1 rounded-lg ${
                  progressionPattern === item ? 'bg-eclipse-indigo' : 'bg-eclipse-dark'
                }`}
                style={{ minWidth: 80 }}
              >
                <Text
                  className={`font-semibold text-xs ${
                    progressionPattern === item ? 'text-white' : 'text-eclipse-lavender'
                  }`}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 4 }}
          />
          <TouchableOpacity
            onPress={generateNewProgression}
            className="mx-4 mt-3 bg-eclipse-indigo py-2 rounded-lg"
          >
            <Text className="text-white text-center font-semibold">Generate New Progression</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Display Area */}
      <View className="flex-1 bg-eclipse-dark">
        {viewMode === 'chords' && (
          selectedChord ? (
            <WebView
              source={{ html: chordHTML }}
              style={{ backgroundColor: 'transparent', flex: 1 }}
              scalesPageToFit={true}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              bounces={false}
              scrollEnabled={false}
            />
          ) : (
            <View className="flex-1 items-center justify-center">
              <Text className="text-lg text-eclipse-lavender">
                Select a chord to see diagram
              </Text>
            </View>
          )
        )}

        {viewMode === 'keys' && selectedKey && (
          <View className="flex-1 p-4">
            <Text className="text-xl font-bold text-white mb-4 text-center">
              Chords in {selectedKeyRoot} Major
            </Text>
            <FlatList
              data={selectedKey.chords}
              renderItem={({ item }) => (
                <View className="bg-eclipse-purple p-4 mb-2 rounded-lg">
                  <Text className="text-white text-lg font-semibold">{item.name}</Text>
                  <Text className="text-eclipse-lavender text-sm">{item.root} {item.type}</Text>
                </View>
              )}
              keyExtractor={(item, index) => `${item.name}-${index}`}
            />
          </View>
        )}

        {viewMode === 'progressions' && currentProgression.length > 0 && (
          <View className="flex-1 p-4">
            <Text className="text-xl font-bold text-white mb-4 text-center">
              {progressionPattern === 'random' ? 'Random' : progressionPattern} Progression
            </Text>
            <View className="flex-row flex-wrap justify-center gap-3">
              {currentProgression.map((chord, index) => (
                <View key={index} className="bg-eclipse-purple px-6 py-4 rounded-lg min-w-[80px] items-center">
                  <Text className="text-white text-2xl font-bold">{chord.name}</Text>
                  <Text className="text-eclipse-lavender text-xs mt-1">{chord.root} {chord.type}</Text>
                </View>
              ))}
            </View>
            <Text className="text-eclipse-lavender text-center mt-6 text-sm">
              Practice playing these chords in order!
            </Text>
          </View>
        )}
      </View>

      {/* Metronome Popup - Speech Bubble Style */}
      {metronomeVisible && (
        <View className="absolute top-24 right-4 z-50" style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 8 }}>
          {/* Speech bubble tail */}
          <View className="absolute -top-2 right-6 w-4 h-4 bg-eclipse-dark rotate-45" />
          
          {/* Popup content */}
          <View className="bg-eclipse-dark rounded-2xl p-4 w-72 border-2 border-eclipse-purple">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-lg font-bold text-white">Metronome</Text>
              <TouchableOpacity
                onPress={async () => {
                  setMetronomeVisible(false);
                  if (metronomeRef.current) {
                    await metronomeRef.current.stop();
                    setMetronomeRunning(false);
                    setTickCount(0);
                  }
                }}
                className="w-6 h-6 items-center justify-center"
              >
                <MaterialIcons name="close" size={20} color="white" />
              </TouchableOpacity>
            </View>

            {/* BPM Display */}
            <View className="items-center mb-4">
              <Text className={`text-5xl font-bold mb-1 ${metronomeRunning ? 'text-eclipse-indigo' : 'text-white'}`}>
                {bpm}
              </Text>
              <Text className="text-eclipse-lavender text-xs">BPM</Text>
            </View>

            {/* BPM Controls */}
            <View className="flex-row justify-center items-center mb-4 gap-2">
              <TouchableOpacity
                onPress={() => setBpm(Math.max(40, bpm - 5))}
                className="bg-eclipse-purple w-10 h-10 rounded-full items-center justify-center"
              >
                <Text className="text-white text-lg">-5</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setBpm(Math.max(40, bpm - 1))}
                className="bg-eclipse-purple w-10 h-10 rounded-full items-center justify-center"
              >
                <Text className="text-white text-lg">-</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setBpm(Math.min(200, bpm + 1))}
                className="bg-eclipse-purple w-10 h-10 rounded-full items-center justify-center"
              >
                <Text className="text-white text-lg">+</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setBpm(Math.min(200, bpm + 5))}
                className="bg-eclipse-purple w-10 h-10 rounded-full items-center justify-center"
              >
                <Text className="text-white text-lg">+5</Text>
              </TouchableOpacity>
            </View>

            {/* Start/Stop Button */}
            <TouchableOpacity
              onPress={toggleMetronome}
              className={`py-3 rounded-lg ${metronomeRunning ? 'bg-red-600' : 'bg-eclipse-indigo'}`}
            >
              <Text className="text-white text-center font-semibold">
                {metronomeRunning ? 'Stop' : 'Start'}
              </Text>
            </TouchableOpacity>

            {/* Tick Counter with Visual Indicator */}
            {metronomeRunning && (
              <View className="items-center mt-3">
                <View 
                  className={`w-4 h-4 rounded-full mb-2 ${tickCount % 4 === 0 ? 'bg-eclipse-indigo' : 'bg-eclipse-purple'}`}
                  style={{
                    transform: [{ scale: tickCount % 4 === 0 ? 1.5 : 1 }],
                  }}
                />
                <Text className="text-eclipse-lavender text-xs">
                  Ticks: {tickCount}
                </Text>
              </View>
            )}
          </View>
        </View>
      )}
    </View>
  );
}
