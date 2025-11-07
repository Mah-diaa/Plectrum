import { Chord } from "@/src/types/chord";
import { RootNote } from "@/src/types/types";
import { FlatList, Text, View } from "react-native";

interface KeyDisplayProps {
  keyRoot: RootNote;
  chords: Chord[];
}

export function KeyDisplay({ keyRoot, chords }: KeyDisplayProps) {
  return (
    <View className="flex-1 p-4">
      <Text className="text-xl font-bold text-white mb-4 text-center">
        Chords in {keyRoot} Major
      </Text>
      <FlatList
        data={chords}
        renderItem={({ item }) => (
          <View className="bg-eclipse-purple p-4 mb-2 rounded-lg">
            <Text className="text-white text-lg font-semibold">{item.name}</Text>
            <Text className="text-eclipse-lavender text-sm">{item.root} {item.type}</Text>
          </View>
        )}
        keyExtractor={(item, index) => `${item.name}-${index}`}
      />
    </View>
  );
}

