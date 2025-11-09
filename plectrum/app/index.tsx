import { ChordDisplay } from "@/src/components/ChordDisplay";
import { ChordTypeSelector } from "@/src/components/ChordTypeSelector";
import { Header } from "@/src/components/Header";
import { KeyDisplay } from "@/src/components/KeyDisplay";
import { KeySelector } from "@/src/components/KeySelector";
import { MetronomePopup } from "@/src/components/MetronomePopup";
import { ProgressionDisplay } from "@/src/components/ProgressionDisplay";
import { ProgressionSelector } from "@/src/components/ProgressionSelector";
import { RootNoteSelector } from "@/src/components/RootNoteSelector";
import { ViewModeButtons } from "@/src/components/ViewModeButtons";
import { useMetronome } from "@/src/hooks/useMetronome";
import { ALL_CHORDS, Chord } from "@/src/types/chord";
import { ChordType, RootNote } from "@/src/types/types";
import { formatChordForAPI, generateChordHTML } from "@/src/utils/chordFormatter";
import { createAllMajorKeys, getKeyByRoot } from "@/src/utils/keyGenerator";
import { generateProgression, ProgressionPattern } from "@/src/utils/progressionGenerator";
import { useEffect, useState } from "react";
import { View } from "react-native";
import "../global.css";

type ViewMode = 'chords' | 'keys' | 'progressions';

export default function App() {
  const [selectedRoot, setSelectedRoot] = useState<RootNote>('C');
  const [selectedType, setSelectedType] = useState<ChordType>('Major');
  const [viewMode, setViewMode] = useState<ViewMode>('chords');
  const [metronomeVisible, setMetronomeVisible] = useState(false);
  const [selectedKeyRoot, setSelectedKeyRoot] = useState<RootNote>('C');
  const [progressionPattern, setProgressionPattern] = useState<ProgressionPattern>('I-V-vi-IV');
  const [currentProgression, setCurrentProgression] = useState<Chord[]>([]);
  const [showAllChords, setShowAllChords] = useState(false);

  const metronome = useMetronome(120);

  const allKeys = createAllMajorKeys();
  const selectedKey = getKeyByRoot(selectedKeyRoot);
  const selectedChord = ALL_CHORDS.find(
    (chord) => chord.root === selectedRoot && chord.type === selectedType
  );
  const chordNameForAPI = selectedChord 
    ? formatChordForAPI(selectedRoot, selectedType)
    : 'C';
  const chordHTML = generateChordHTML(chordNameForAPI);

  useEffect(() => {
    if (selectedKey && viewMode === 'progressions') {
      const progression = generateProgression(selectedKey, progressionPattern, 4);
      setCurrentProgression(progression);
    }
  }, [selectedKeyRoot, progressionPattern, viewMode, selectedKey]);
  const handleCloseMetronome = async () => {
    setMetronomeVisible(false);
    await metronome.stop();
  };

  const generateNewProgression = () => {
    if (selectedKey) {
      const progression = generateProgression(selectedKey, progressionPattern, 4);
      setCurrentProgression(progression);
    }
  };

  return (
    <View className="flex-1 bg-eclipse-dark">
      <Header
        viewMode={viewMode}
        selectedChordName={selectedChord?.name}
        selectedRoot={selectedRoot}
        selectedType={selectedType}
        selectedKeyRoot={selectedKeyRoot}
        keyChordCount={selectedKey?.chords.length}
        progressionPattern={progressionPattern}
        onMetronomePress={() => setMetronomeVisible(prev => !prev)}
      />

      {viewMode === 'chords' && (
        <>
          <RootNoteSelector
            selectedRoot={selectedRoot}
            onRootChange={setSelectedRoot}
          />
          <ChordTypeSelector
            selectedType={selectedType}
            onTypeChange={setSelectedType}
            showAll={showAllChords}
            onShowAllChange={setShowAllChords}
          />
          <ViewModeButtons
            viewMode={viewMode}
            onViewModeChange={setViewMode}
          />
        </>
      )}

      {(viewMode === 'keys' || viewMode === 'progressions') && (
        <>
          <KeySelector
            selectedKeyRoot={selectedKeyRoot}
            onKeyChange={setSelectedKeyRoot}
          />
          <ViewModeButtons
            viewMode={viewMode}
            onViewModeChange={setViewMode}
          />
        </>
      )}

      {viewMode === 'progressions' && (
        <ProgressionSelector
          selectedPattern={progressionPattern}
          onPatternChange={setProgressionPattern}
          onGenerateNew={generateNewProgression}
        />
      )}

      <View className="flex-1 bg-eclipse-dark">
        {viewMode === 'chords' && (
          <ChordDisplay chordHTML={chordHTML} />
        )}

        {viewMode === 'keys' && selectedKey && (
          <KeyDisplay
            keyRoot={selectedKeyRoot}
            chords={selectedKey.chords}
          />
        )}

        {viewMode === 'progressions' && (
          <ProgressionDisplay
            pattern={progressionPattern}
            progression={currentProgression}
          />
        )}
      </View>

      <MetronomePopup
        visible={metronomeVisible}
        bpm={metronome.bpm}
        isRunning={metronome.isRunning}
        tickCount={metronome.tickCount}
        onClose={handleCloseMetronome}
        onBpmChange={metronome.setBpm}
        onToggle={metronome.toggle}
      />
    </View>
  );
}
