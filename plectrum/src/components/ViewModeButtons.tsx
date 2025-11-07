import { Text, TouchableOpacity, View } from "react-native";

type ViewMode = 'chords' | 'keys' | 'progressions';

interface ViewModeButtonsProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
}

export function ViewModeButtons({ viewMode, onViewModeChange }: ViewModeButtonsProps) {
  return (
    <View className="py-3 bg-eclipse-purple px-4">
      <View className="flex-row gap-2 justify-center">
        <TouchableOpacity
          onPress={() => onViewModeChange('chords')}
          className={`px-4 py-2 rounded-lg ${viewMode === 'chords' ? 'bg-eclipse-indigo' : 'bg-eclipse-dark/50'}`}
        >
          <Text className={`text-sm font-semibold ${viewMode === 'chords' ? 'text-white' : 'text-eclipse-lavender'}`}>
            Chords
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onViewModeChange('keys')}
          className={`px-4 py-2 rounded-lg ${viewMode === 'keys' ? 'bg-eclipse-indigo' : 'bg-eclipse-dark/50'}`}
        >
          <Text className={`text-sm font-semibold ${viewMode === 'keys' ? 'text-white' : 'text-eclipse-lavender'}`}>
            Keys
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onViewModeChange('progressions')}
          className={`px-4 py-2 rounded-lg ${viewMode === 'progressions' ? 'bg-eclipse-indigo' : 'bg-eclipse-dark/50'}`}
        >
          <Text className={`text-sm font-semibold ${viewMode === 'progressions' ? 'text-white' : 'text-eclipse-lavender'}`}>
            Progressions
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

