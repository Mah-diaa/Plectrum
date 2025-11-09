import { Chord } from "@/src/types/chord";
import { ALL_ROOT_NOTES, RootNote } from "@/src/types/constants";
import { formatChordForAPI, generateChordHTML } from "@/src/utils/chordFormatter";
import { useMemo, useState } from "react";
import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { WebView } from "react-native-webview";

interface KeyDisplayProps {
  keyRoot: RootNote;
  chords: Chord[];
}

const MAJOR_SCALE_INTERVALS = [0, 2, 4, 5, 7, 9, 11];
const DEGREE_LABELS = ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii°'];

function getDegreeForChordRoot(keyRoot: RootNote, chordRoot: RootNote): number {
  const keyRootIndex = ALL_ROOT_NOTES.indexOf(keyRoot);
  const chordRootIndex = ALL_ROOT_NOTES.indexOf(chordRoot);
  let semitoneDiff = (chordRootIndex - keyRootIndex + 12) % 12;
  return MAJOR_SCALE_INTERVALS.indexOf(semitoneDiff);
}

export function KeyDisplay({ keyRoot, chords }: KeyDisplayProps) {
  const [selectedChord, setSelectedChord] = useState<Chord | null>(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedDegree, setSelectedDegree] = useState<number>(0);

  const chordHTML = selectedChord 
    ? generateChordHTML(formatChordForAPI(selectedChord.root, selectedChord.type))
    : null;

  const chordsByDegree = useMemo(() => {
    const grouped: Chord[][] = [[], [], [], [], [], [], []];
    
    chords.forEach(chord => {
      const degree = getDegreeForChordRoot(keyRoot, chord.root as RootNote);
      if (degree !== -1) {
        grouped[degree].push(chord);
      }
    });
    
    return grouped;
  }, [chords, keyRoot]);

  const currentDegreeChords = chordsByDegree[selectedDegree] || [];

  return (
    <View className="flex-1 p-4">
      <Text className="text-xl font-bold text-white mb-4 text-center">
        Chords in {keyRoot} Major
      </Text>
      
      <TouchableOpacity
        onPress={() => setDropdownVisible(true)}
        className="bg-eclipse-purple p-4 rounded-lg mb-4"
      >
        <Text className="text-white text-lg font-semibold">
          {selectedChord ? selectedChord.name : 'Select a chord...'}
        </Text>
        {selectedChord && (
          <Text className="text-eclipse-lavender text-sm mt-1">
            {selectedChord.root} {selectedChord.type}
          </Text>
        )}
      </TouchableOpacity>

      <Modal
        visible={dropdownVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setDropdownVisible(false)}
      >
        <TouchableOpacity
          className="flex-1 bg-black/50"
          activeOpacity={1}
          onPress={() => setDropdownVisible(false)}
        >
          <View className="flex-1 justify-center p-4">
            <View className="bg-eclipse-dark rounded-lg max-h-[80%]">
              <View className="p-4 border-b border-eclipse-purple">
                <Text className="text-white text-xl font-bold">
                  Select a Chord
                </Text>
              </View>
              
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                className="border-b border-eclipse-purple/30"
                contentContainerStyle={{ paddingHorizontal: 8 }}
              >
                {DEGREE_LABELS.map((label, index) => {
                  const hasChords = chordsByDegree[index] && chordsByDegree[index].length > 0;
                  if (!hasChords) return null;
                  
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => setSelectedDegree(index)}
                      className={`px-4 py-3 border-b-2 ${
                        selectedDegree === index
                          ? 'border-eclipse-indigo bg-eclipse-purple/30'
                          : 'border-transparent'
                      }`}
                    >
                      <Text
                        className={`font-semibold ${
                          selectedDegree === index
                            ? 'text-eclipse-indigo'
                            : 'text-eclipse-lavender'
                        }`}
                      >
                        {label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
              
              <ScrollView className="max-h-[400px]">
                {currentDegreeChords.map((chord, index) => (
                  <TouchableOpacity
                    key={`${chord.name}-${index}`}
                    onPress={() => {
                      setSelectedChord(chord);
                      setDropdownVisible(false);
                    }}
                    className={`p-4 border-b border-eclipse-purple/30 ${
                      selectedChord?.name === chord.name ? 'bg-eclipse-indigo' : ''
                    }`}
                  >
                    <Text className="text-white text-lg font-semibold">
                      {chord.name}
                    </Text>
                    <Text className="text-eclipse-lavender text-sm mt-1">
                      {chord.root} {chord.type}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>

      {selectedChord && chordHTML && (
        <View className="flex-1 min-h-[400px] bg-eclipse-dark rounded-lg overflow-hidden">
          <WebView
            source={{ html: chordHTML }}
            style={{ backgroundColor: 'transparent', flex: 1 }}
            scalesPageToFit={true}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            bounces={false}
            scrollEnabled={false}
            contentInsetAdjustmentBehavior="never"
          />
        </View>
      )}

      {!selectedChord && (
        <View className="flex-1 items-center justify-center">
          <Text className="text-lg text-eclipse-lavender">
            Select a chord to see diagram
          </Text>
        </View>
      )}
    </View>
  );
}

