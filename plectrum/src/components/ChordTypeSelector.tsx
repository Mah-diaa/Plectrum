import { ALL_CHORD_TYPES, ChordType, IMPORTANT_CHORD_TYPES } from "@/src/types/types";
import { Dimensions, FlatList, Text, TouchableOpacity, View } from "react-native";

const screenWidth = Dimensions.get('window').width;
const itemWidth = screenWidth / 4;

interface ChordTypeSelectorProps {
  selectedType: ChordType;
  onTypeChange: (type: ChordType) => void;
  showAll: boolean;
  onShowAllChange: (show: boolean) => void;
}

export function ChordTypeSelector({
  selectedType,
  onTypeChange,
  showAll,
  onShowAllChange,
}: ChordTypeSelectorProps) {
  const renderButton = ({ item }: { item: ChordType }) => (
    <TouchableOpacity
      onPress={() => onTypeChange(item)}
      className={`flex-1 items-center justify-center h-12 mx-1 rounded-lg ${
        selectedType === item ? 'bg-eclipse-indigo' : 'bg-eclipse-purple'
      }`}
      style={{ width: itemWidth - 8 }}
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
    <View className="py-4 bg-eclipse-purple">
      <View className="flex-row justify-between items-center mb-2 px-4">
        <Text className="text-sm font-semibold text-eclipse-lavender">Chord Types</Text>
        <TouchableOpacity
          onPress={() => onShowAllChange(!showAll)}
          className="px-3 py-1 rounded-lg bg-eclipse-dark"
        >
          <Text className="text-xs text-eclipse-lavender">
            {showAll ? 'Show Less' : 'Show More'}
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={showAll ? ALL_CHORD_TYPES : IMPORTANT_CHORD_TYPES}
        renderItem={renderButton}
        keyExtractor={(item) => item}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={itemWidth}
        decelerationRate="fast"
        contentContainerStyle={{ paddingHorizontal: 4 }}
      />
    </View>
  );
}

