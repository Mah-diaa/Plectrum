export function formatChordForAPI(root: string, type: string): string {
  const typeMap: Record<string, string> = {
    'Major': '',
    'Minor': ' m',
    '5': '5',
    'dim': 'dim',
    'aug': 'aug',
    'sus2': 'sus2',
    'sus4': 'sus4',
    '6': '6',
    'm6': 'm6',
    '6add9': '6/9',
    '7': '7',
    'maj7': 'maj7',
    'm7': 'm7',
    'dim7': 'dim7',
    '7sus2': '7sus2',
    '7sus4': '7sus4',
    'm7b5': 'm7b5',
    '7b5': '7b5',
    '7#5': '7#5',
    'mmaj7': 'mmaj7',
    'maj9': 'maj9',
    'm9': 'm9',
    '9': '9',
    '9b5': '9b5',
    '9#5': '9#5',
    '9sus2': '9sus2',
    '9sus4': '9sus4',
    'm11': 'm11',
    'maj11': 'maj11',
    '11': '11',
    'm13': 'm13',
    '13': '13',
    'maj13': 'maj13',
    'maj7b5': 'maj7b5',
    'm7#5': 'm7#5',
  };
  
  const typeSuffix = typeMap[type] || '';
  return `${root}${typeSuffix}`;
}
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
        img, svg, canvas {
          max-width: 100% !important;
          height: auto !important;
          width: auto !important;
          object-fit: contain;
        }
        .scales_chords_api,
        .scales_chords_api *,
        ins.scales_chords_api,
        ins.scales_chords_api * {
          max-width: 100% !important;
          background-color: transparent !important;
          background: transparent !important;
        }
        div, table, td, th {
          background-color: transparent !important;
          background: transparent !important;
        }
        .scales_chords_api {
          background: #0F0E47 !important;
        }
        .scales_chords_api img {
          filter: invert(1) brightness(1.1);
          mix-blend-mode: screen;
        }
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


