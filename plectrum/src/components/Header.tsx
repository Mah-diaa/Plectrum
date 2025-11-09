import { MaterialIcons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

type ViewMode = 'chords' | 'keys' | 'progressions';

interface HeaderProps {
  viewMode: ViewMode;
  selectedChordName?: string;
  selectedRoot?: string;
  selectedType?: string;
  selectedKeyRoot?: string;
  keyChordCount?: number;
  progressionPattern?: string;
  onMetronomePress: () => void;
}

export function Header({
  viewMode,
  selectedChordName,
  selectedRoot,
  selectedType,
  selectedKeyRoot,
  keyChordCount,
  progressionPattern,
  onMetronomePress,
}: HeaderProps) {
  const getTitle = () => {
    if (viewMode === 'chords') return selectedChordName || 'Select Chord';
    if (viewMode === 'keys') return `${selectedKeyRoot} Major`;
    return 'Chord Progressions';
  };

  const getSubtitle = () => {
    if (viewMode === 'chords') return `${selectedRoot} ${selectedType}`;
    if (viewMode === 'keys') return `${keyChordCount || 0} chords in key`;
    return progressionPattern;
  };

  return (
    <View className="pt-20 pb-6 px-4 bg-eclipse-indigo relative">
      <TouchableOpacity
        onPress={onMetronomePress}
        className="absolute top-20 left-4 w-10 h-10 items-center justify-center rounded-full bg-eclipse-purple z-10"
      >
        <MaterialIcons name="timer" size={20} color="white" />
      </TouchableOpacity>

      <Text className="text-3xl font-bold text-center text-white">
        {getTitle()}
      </Text>
      <Text className="text-sm text-eclipse-lavender text-center mt-2">
        {getSubtitle()}
      </Text>
    </View>
  );
}

