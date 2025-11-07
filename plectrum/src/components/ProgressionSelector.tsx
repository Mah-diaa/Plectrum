import { getAllProgressionPatterns, ProgressionPattern } from "@/src/utils/progressionGenerator";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

interface ProgressionSelectorProps {
  selectedPattern: ProgressionPattern;
  onPatternChange: (pattern: ProgressionPattern) => void;
  onGenerateNew: () => void;
}

export function ProgressionSelector({
  selectedPattern,
  onPatternChange,
  onGenerateNew,
}: ProgressionSelectorProps) {
  return (
    <View className="py-4 bg-eclipse-purple">
      <Text className="text-sm font-semibold mb-2 px-4 text-eclipse-lavender">Progression Pattern</Text>
      <FlatList
        data={getAllProgressionPatterns()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => onPatternChange(item)}
            className={`flex-1 items-center justify-center h-10 mx-1 rounded-lg ${
              selectedPattern === item ? 'bg-eclipse-indigo' : 'bg-eclipse-dark'
            }`}
            style={{ minWidth: 80 }}
          >
            <Text
              className={`font-semibold text-xs ${
                selectedPattern === item ? 'text-white' : 'text-eclipse-lavender'
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
        onPress={onGenerateNew}
        className="mx-4 mt-3 bg-eclipse-indigo py-2 rounded-lg"
      >
        <Text className="text-white text-center font-semibold">Generate New Progression</Text>
      </TouchableOpacity>
    </View>
  );
}

