import { Chord } from "@/src/types/chord";
import { formatChordForAPI, generateChordHTML } from "@/src/utils/chordFormatter";
import { ProgressionPattern } from "@/src/utils/progressionGenerator";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { WebView } from "react-native-webview";

interface ProgressionDisplayProps {
  pattern: ProgressionPattern;
  progression: Chord[];
}

export function ProgressionDisplay({ pattern, progression }: ProgressionDisplayProps) {
  const [selectedChordIndex, setSelectedChordIndex] = useState<number | null>(null);

  if (progression.length === 0) {
    return null;
  }

  const selectedChord = selectedChordIndex !== null ? progression[selectedChordIndex] : null;
  const chordHTML = selectedChord 
    ? generateChordHTML(formatChordForAPI(selectedChord.root, selectedChord.type))
    : null;

  return (
    <View className="flex-1">
      <ScrollView 
        className="flex-1 p-4"
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <Text className="text-xl font-bold text-white mb-4 text-center">
          {pattern === 'random' ? 'Random' : pattern} Progression
        </Text>
        
        {/* Chord Buttons */}
        <View className="mb-4">
          <View className="flex-row flex-wrap justify-center gap-3">
            {progression.map((chord, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setSelectedChordIndex(selectedChordIndex === index ? null : index)}
                className={`px-6 py-4 rounded-lg min-w-[80px] items-center ${
                  selectedChordIndex === index ? 'bg-eclipse-indigo' : 'bg-eclipse-purple'
                }`}
              >
                <Text className="text-white text-2xl font-bold">{chord.name}</Text>
                <Text className="text-eclipse-lavender text-xs mt-1">{chord.root} {chord.type}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Chord Diagram Display */}
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
      </ScrollView>
    </View>
  );
}

