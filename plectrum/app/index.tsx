import { useState } from "react";
import { Text, View, FlatList, TouchableOpacity, Dimensions } from "react-native";
import { WebView } from "react-native-webview";
import "../global.css";
import { ALL_CHORDS } from "@/src/types/chord";
import { RootNote, ChordType, ALL_ROOT_NOTES, ALL_CHORD_TYPES } from "@/src/types/types";
import { formatChordForAPI, generateChordHTML } from "@/src/utils/chordFormatter";

const screenWidth = Dimensions.get('window').width;
const itemWidth = screenWidth / 4; // Show 4 items at a time

export default function App() {
  const [selectedRoot, setSelectedRoot] = useState<RootNote>('C');
  const [selectedType, setSelectedType] = useState<ChordType>('Major');

  // Find the selected chord
  const selectedChord = ALL_CHORDS.find(
    (chord) => chord.root === selectedRoot && chord.type === selectedType
  );

  // Format chord name for API and generate HTML
  const chordNameForAPI = selectedChord 
    ? formatChordForAPI(selectedRoot, selectedType)
    : 'C';
  const chordHTML = generateChordHTML(chordNameForAPI);

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

  return (
    <View className="flex-1 bg-eclipse-dark">
      {/* Header showing selected chord */}
      <View className="pt-12 pb-6 px-4 bg-eclipse-indigo">
        <Text className="text-3xl font-bold text-center text-white">
          {selectedChord?.name || 'Select Chord'}
        </Text>
        <Text className="text-sm text-eclipse-lavender text-center mt-2">
          {selectedRoot} {selectedType}
        </Text>
      </View>

      {/* Root Notes Row */}
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
        <Text className="text-sm font-semibold mb-2 px-4 text-eclipse-lavender">Chord Types</Text>
        <FlatList
          data={ALL_CHORD_TYPES}
          renderItem={renderTypeButton}
          keyExtractor={(item) => item}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={itemWidth}
          decelerationRate="fast"
          contentContainerStyle={{ paddingHorizontal: 4 }}
        />
      </View>

      {/* Display Area - Chord Diagram */}
      <View className="flex-1 bg-eclipse-dark">
        {selectedChord ? (
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
        )}
      </View>
    </View>
  );
}
