import { MaterialIcons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

interface MetronomePopupProps {
  visible: boolean;
  bpm: number;
  isRunning: boolean;
  tickCount: number;
  onClose: () => void;
  onBpmChange: (bpm: number) => void;
  onToggle: () => void;
}

export function MetronomePopup({
  visible,
  bpm,
  isRunning,
  tickCount,
  onClose,
  onBpmChange,
  onToggle,
}: MetronomePopupProps) {
  if (!visible) return null;

  return (
    <View
      className="absolute top-24 right-4 z-50"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
      }}
    >
      <View className="bg-eclipse-dark rounded-2xl p-4 w-72 border-2 border-eclipse-purple">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-lg font-bold text-white">Metronome</Text>
          <TouchableOpacity
            onPress={onClose}
            className="w-6 h-6 items-center justify-center"
          >
            <MaterialIcons name="close" size={20} color="white" />
          </TouchableOpacity>
        </View>

        <View className="items-center mb-4">
          <Text
            className={`text-5xl font-bold mb-1 ${isRunning ? "text-eclipse-indigo" : "text-white"}`}
          >
            {bpm}
          </Text>
          <Text className="text-eclipse-lavender text-xs">BPM</Text>
        </View>

        <View className="flex-row justify-center items-center mb-4 gap-2">
          <TouchableOpacity
            onPress={() => onBpmChange(Math.max(40, bpm - 5))}
            className="bg-eclipse-purple w-10 h-10 rounded-full items-center justify-center"
          >
            <Text className="text-white text-lg">-5</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onBpmChange(Math.max(40, bpm - 1))}
            className="bg-eclipse-purple w-10 h-10 rounded-full items-center justify-center"
          >
            <Text className="text-white text-lg">-</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onBpmChange(Math.min(200, bpm + 1))}
            className="bg-eclipse-purple w-10 h-10 rounded-full items-center justify-center"
          >
            <Text className="text-white text-lg">+</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onBpmChange(Math.min(200, bpm + 5))}
            className="bg-eclipse-purple w-10 h-10 rounded-full items-center justify-center"
          >
            <Text className="text-white text-lg">+5</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={onToggle}
          className={`py-3 rounded-lg ${isRunning ? "bg-red-600" : "bg-eclipse-indigo"}`}
        >
          <Text className="text-white text-center font-semibold">
            {isRunning ? "Stop" : "Start"}
          </Text>
        </TouchableOpacity>

        {isRunning && (
          <View className="items-center mt-3">
            <View
              className={`w-4 h-4 rounded-full mb-2 ${tickCount % 4 === 0 ? "bg-eclipse-indigo" : "bg-eclipse-purple"}`}
              style={{
                transform: [{ scale: tickCount % 4 === 0 ? 1.5 : 1 }],
              }}
            />
            <Text className="text-eclipse-lavender text-xs">
              Ticks: {tickCount}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}
