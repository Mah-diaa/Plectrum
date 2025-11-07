import { ALL_ROOT_NOTES, RootNote } from "@/src/types/types";
import { Dimensions, FlatList, Text, TouchableOpacity, View } from "react-native";

const screenWidth = Dimensions.get('window').width;
const itemWidth = screenWidth / 4;

interface KeySelectorProps {
  selectedKeyRoot: RootNote;
  onKeyChange: (key: RootNote) => void;
}

export function KeySelector({ selectedKeyRoot, onKeyChange }: KeySelectorProps) {
  return (
    <View className="py-4 bg-eclipse-purple">
      <Text className="text-sm font-semibold mb-2 px-4 text-eclipse-lavender">Select Key</Text>
      <FlatList
        data={ALL_ROOT_NOTES}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => onKeyChange(item)}
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
  );
}

