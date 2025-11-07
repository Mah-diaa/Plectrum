import { Text, View } from "react-native";
import { WebView } from "react-native-webview";

interface ChordDisplayProps {
  chordHTML: string;
}

export function ChordDisplay({ chordHTML }: ChordDisplayProps) {
  if (!chordHTML) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-lg text-eclipse-lavender">
          Select a chord to see diagram
        </Text>
      </View>
    );
  }

  return (
    <WebView
      source={{ html: chordHTML }}
      style={{ backgroundColor: 'transparent', flex: 1 }}
      scalesPageToFit={true}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      bounces={false}
      scrollEnabled={false}
    />
  );
}

