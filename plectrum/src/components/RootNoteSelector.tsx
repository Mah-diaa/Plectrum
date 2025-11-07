import { ALL_ROOT_NOTES, RootNote } from "@/src/types/types";
import { Dimensions, FlatList, Text, TouchableOpacity, View } from "react-native";

const screenWidth = Dimensions.get('window').width;
const itemWidth = screenWidth / 4;

interface RootNoteSelectorProps {
  selectedRoot: RootNote;
  onRootChange: (root: RootNote) => void;
}

export function RootNoteSelector({ selectedRoot, onRootChange }: RootNoteSelectorProps) {
  const renderButton = ({ item }: { item: RootNote }) => (
    <TouchableOpacity
      onPress={() => onRootChange(item)}
      className={`flex-1 items-center justify-center h-12 mx-1 rounded-lg ${
        selectedRoot === item ? 'bg-eclipse-indigo' : 'bg-eclipse-purple'
      }`}
      style={{ width: itemWidth - 8 }}
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

  return (
    <View className="py-4 bg-eclipse-purple">
      <Text className="text-sm font-semibold mb-2 px-4 text-eclipse-lavender">Root Notes</Text>
      <FlatList
        data={ALL_ROOT_NOTES}
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

