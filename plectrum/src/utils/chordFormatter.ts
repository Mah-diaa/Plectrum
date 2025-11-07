// Convert chord name to format expected by scales-chords API
// Examples: "C Major" -> "C", "C Minor" -> "Cm", "C 7" -> "C7"

export function formatChordForAPI(root: string, type: string): string {
  // Map chord types to scales-chords API format
  // Only includes chord types supported by the API
  const typeMap: Record<string, string> = {
    // Basic triads
    'Major': '',           // C Major -> C
    'Minor': ' m',          // C Minor -> Cm
    '5': '5',              // C 5 -> C5
    'dim': 'dim',          // C dim -> Cdim
    'aug': 'aug',          // C aug -> Caug
    // Suspended
    'sus2': 'sus2',        // C sus2 -> Csus2
    'sus4': 'sus4',        // C sus4 -> Csus4
    // Sixth chords
    '6': '6',              // C 6 -> C6
    'm6': 'm6',            // C m6 -> Cm6
    '6add9': '6/9',        // C 6add9 -> C6/9 (API uses 6/9 format)
    // Seventh chords
    '7': '7',              // C 7 -> C7
    'maj7': 'maj7',        // C maj7 -> Cmaj7
    'm7': 'm7',            // C m7 -> Cm7
    'dim7': 'dim7',        // C dim7 -> Cdim7
    '7sus2': '7sus2',      // C 7sus2 -> C7sus2
    '7sus4': '7sus4',      // C 7sus4 -> C7sus4
    'm7b5': 'm7b5',        // C m7b5 -> Cm7b5
    '7b5': '7b5',          // C 7b5 -> C7b5
    '7#5': '7#5',          // C 7#5 -> C7#5
    'mmaj7': 'mmaj7',      // C mmaj7 -> Cmmaj7
    // Extended (9ths)
    'maj9': 'maj9',        // C maj9 -> Cmaj9
    'm9': 'm9',            // C m9 -> Cm9
    '9': '9',              // C 9 -> C9
    '9b5': '9b5',          // C 9b5 -> C9b5
    '9#5': '9#5',          // C 9#5 -> C9#5
    '9sus2': '9sus2',      // C 9sus2 -> C9sus2
    '9sus4': '9sus4',      // C 9sus4 -> C9sus4
    // Extended (11ths)
    'm11': 'm11',          // C m11 -> Cm11
    // Extended (13ths)
    'm13': 'm13',          // C m13 -> Cm13
    '13': '13',            // C 13 -> C13
  };
  
  const typeSuffix = typeMap[type] || '';
  return `${root}${typeSuffix}`;
}

// Generate HTML for WebView with chord diagram
export function generateChordHTML(chordName: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
      <style>
        * {
          box-sizing: border-box;
        }
        body {
          margin: 0;
          padding: 0;
          background-color: #0F0E47;
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          overflow: hidden;
        }
        .chord-container {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          max-width: 100vw;
          padding: 0;
          margin: 0;
        }
        /* Target all images and SVGs injected by the API */
        img, svg, canvas {
          max-width: 100% !important;
          height: auto !important;
          width: auto !important;
          object-fit: contain;
        }
        /* Target the container that the API creates */
        .scales_chords_api,
        .scales_chords_api *,
        ins.scales_chords_api,
        ins.scales_chords_api * {
          max-width: 100% !important;
          background-color: transparent !important;
          background: transparent !important;
        }
        /* Try to change white backgrounds to dark */
        div, table, td, th {
          background-color: transparent !important;
          background: transparent !important;
        }
        /* Make white background blend with dark, and invert black lines to white */
        .scales_chords_api {
          background: #0F0E47 !important;
        }
        
        .scales_chords_api img {
          /* Invert colors: black lines become white, white background becomes black */
          /* Then adjust brightness for better visibility */
          filter: invert(1) brightness(1.1);
          /* Screen blend mode: white stays white, black becomes transparent/dark */
          mix-blend-mode: screen;
        }
        
        /* Fallback: if multiply doesn't work well, try screen mode */
        /* Uncomment this and comment out multiply if needed:
        .scales_chords_api img {
          mix-blend-mode: screen;
          filter: brightness(0.9) contrast(1.2);
        }
        */
      </style>
      <script async type="text/javascript" src="https://www.scales-chords.com/api/scales-chords-api.js"></script>
    </head>
    <body>
      <div class="chord-container">
        <ins class="scales_chords_api" chord="${chordName}"></ins>
      </div>
    </body>
    </html>
  `;
}

