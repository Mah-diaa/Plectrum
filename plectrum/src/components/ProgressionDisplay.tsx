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
        <Text className="text-xl font-bold text-white mb-1 text-center">
          {pattern === 'random' ? 'Random' : pattern} Progression
        </Text>
        
        <View className="mb-0">
          <View className="flex-row flex-wrap justify-center gap-2">
            {progression.map((chord, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setSelectedChordIndex(selectedChordIndex === index ? null : index)}
                className={`px-4 py-3 rounded-lg items-center justify-center ${
                  selectedChordIndex === index ? 'bg-eclipse-indigo' : 'bg-eclipse-purple'
                }`}
                style={{ minWidth: 70, maxWidth: 100 }}
              >
                <Text 
                  className="text-white font-bold text-center" 
                  style={{ fontSize: 18 }}
                  numberOfLines={1}
                  adjustsFontSizeToFit={true}
                  minimumFontScale={0.7}
                >
                  {chord.name}
                </Text>
                <Text 
                  className="text-eclipse-lavender text-xs mt-1 text-center" 
                  numberOfLines={1}
                >
                  {chord.root} {chord.type}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {selectedChord && chordHTML && (
          <View className="w-full mt-0" style={{ height: 400 }}>
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

