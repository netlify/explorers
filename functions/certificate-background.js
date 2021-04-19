const PDFDocument = require('pdfkit')
const streamBuffers = require('stream-buffers')
const SVGtoPDF = require('svg-to-pdfkit')

exports.handler = async (event, context) => {

  
  console.log('Here we go here we go here we go now');

  const name = event.queryStringParameters.name || 'Jam Daddy'
  const date = event.queryStringParameters.date || '11.02.2020'

  const background = `<svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 810 630"
      ref="certificate"
    >
      <defs>
        <radialGradient
          id="radial-gradient"
          cx="242"
          cy="850"
          r=".88"
          gradientTransform="matrix(0 38 44 0 -37119 -9213)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stop-color="#3bbeb3" />
          <stop offset="1" stop-color="#4e9abf" />
        </radialGradient>
      </defs>
      <path fill="#f1f2f2" d="M0 0h809v629H0z" />
      <path opacity=".9" fill="#0f1f25" d="M38.24 37h737.17v437H38.24z" />
      <path
        class="cls-3"
        d="M766.16 29.1v553.8H30.48V29.1h735.68m.75-.75H29.73v555.3h737.18V28.35z"
        transform="translate(8.5 8.5)"
      />
      <path fill="#0f1f25" d="M38.24 36.85h737.17v317.74H38.24z" />
      <path
        fill="white"
        d="M234.53 132.13V136h-3v-4.1c0-5.05-1.95-8.88-7.12-8.88s-7.13 3.83-7.13 8.88v24.5c0 5 2 8.8 7.13 8.8s7.12-3.76 7.12-8.8v-5.58h3v5.38c0 6.79-3 11.9-10.15 11.9s-10.15-5.11-10.15-11.9v-24.07c0-6.79 3-11.9 10.15-11.9s10.15 5.11 10.15 11.9zM269 142.41v2.83h-12.89v19.63h15.47v2.82H253v-47.06h18.56v2.82h-15.45v19zM299.88 120.63c7.2 0 10.09 4 10.09 10.62v4.1c0 5.52-2.15 8.68-6.79 9.75 4.84 1.08 6.79 4.51 6.79 9.62V162c0 2 .13 4.11 1.14 5.65h-3.22c-.81-1.41-1-3.09-1-5.65v-7.39c0-6.25-3.43-8-8.81-8h-4.91v21h-3.09v-46.98zm-1.74 23.2c5.51 0 8.74-1.55 8.74-7.87v-4.44c0-5-1.95-8.07-7.06-8.07h-6.66v20.38zM337.4 167.69v-44.24h-9.54v-2.82h22.25v2.82h-9.62v44.24zM370.48 120.63v47.06h-3.09v-47.06zM404.57 143.56v2.82H392.4v21.31h-3.09v-47.06h17.88v2.82H392.4v20.11zM428.44 120.63v47.06h-3.09v-47.06zM467.37 132.13V136h-3v-4.1c0-5.05-2-8.88-7.13-8.88s-7.12 3.83-7.12 8.88v24.5c0 5 1.95 8.8 7.12 8.8s7.13-3.76 7.13-8.8v-5.58h3v5.38c0 6.79-3 11.9-10.15 11.9s-10.16-5.11-10.16-11.9v-24.07c0-6.79 3-11.9 10.16-11.9s10.15 5.11 10.15 11.9zM490.36 157.27L488 167.69h-2.82l10.28-47.13H500l10.49 47.13h-3.1L505 157.27zm.47-2.69h13.72l-6.92-30.45zM534 167.69v-44.24h-9.55v-2.82h22.26v2.82h-9.62v44.24zM579.92 142.41v2.83h-12.84v19.63h15.46v2.82H564v-47.06h18.55v2.82h-15.47v19zM321.57 190.82c0-2.25 1-3.9 3.37-3.9s3.41 1.65 3.41 3.9v7.87c0 2.25-1 3.9-3.41 3.9s-3.37-1.65-3.37-3.9zm1 7.94c0 1.67.67 2.9 2.36 2.9s2.4-1.23 2.4-2.9v-8c0-1.67-.68-2.9-2.4-2.9s-2.36 1.23-2.36 2.9zM339.42 194.56v.92h-4v7h-1v-15.43h5.85v.95h-4.84v6.58zM360.6 190.82v1.27h-1v-1.34c0-1.65-.63-2.9-2.33-2.9s-2.33 1.25-2.33 2.9v8c0 1.65.64 2.88 2.33 2.88s2.33-1.23 2.33-2.88v-1.83h1v1.76c0 2.23-1 3.9-3.32 3.9s-3.32-1.67-3.32-3.9v-7.87c0-2.23 1-3.9 3.32-3.9s3.32 1.68 3.32 3.91zM366.58 190.82c0-2.25 1-3.9 3.37-3.9s3.41 1.65 3.41 3.9v7.87c0 2.25-1 3.9-3.41 3.9s-3.37-1.65-3.37-3.9zm1 7.94c0 1.67.66 2.9 2.35 2.9s2.4-1.23 2.4-2.9v-8c0-1.67-.68-2.9-2.4-2.9s-2.35 1.23-2.35 2.9zM384.6 202.43h-1l-3.26-13.62v13.65h-.9v-15.41h1.45l3.24 13.62 3.21-13.62h1.45v15.41h-1v-13.69zM398.13 187.05c2.38 0 3.3 1.5 3.3 3.74v1.68c0 2.44-1.12 3.65-3.56 3.65H396v6.34h-1v-15.41zm-.26 8.14c1.78 0 2.55-.79 2.55-2.66v-1.8c0-1.67-.57-2.75-2.29-2.75H396v7.21zM407.39 202.46v-15.41h1v14.48h4.84v.93zM424.38 194.18v.93h-4.2v6.42h5.06v.93h-6.08v-15.41h6.08v.95h-5.06v6.2zM434 202.46V188h-3.2v-.93h7.28v.93H435v14.48zM444.82 187.05v15.41h-1v-15.41zM450.91 190.82c0-2.25 1-3.9 3.37-3.9s3.41 1.65 3.41 3.9v7.87c0 2.25-1 3.9-3.41 3.9s-3.37-1.65-3.37-3.9zm1 7.94c0 1.67.66 2.9 2.36 2.9s2.39-1.23 2.39-2.9v-8c0-1.67-.68-2.9-2.39-2.9s-2.36 1.23-2.36 2.9zM464.68 202.46h-.92v-15.41h1.32l4.62 13v-13h.92v15.41h-1.12l-4.82-13.73z"
        transform="translate(8.5 8.5)"
      />
      <text
        transform="translate(410 387)"
        font-family="Roboto-Regular,Roboto"
        fill="#fff"
        font-size="12"
        letter-spacing=".02em"
        text-anchor="middle"
      >
        This presents the completion of 3 courses and
        <tspan x="0" y="21" letter-spacing=".01em">
          training on Jamstack Explorers platform.
        </tspan>
      </text>
      <text
        transform="translate(410 440)"
        font-family="Roboto-Bold,Roboto"
        font-weight="700"
        font-size="18"
        fill="#fff"
        text-anchor="middle"
      >
        ${date}
      </text>
      <text
        font-family="Roboto-Bold,Roboto"
        font-size="10"
        fill="#000"
        transform="translate(207 558)"
      >
        Christian Bach
        <tspan class="cls-11">
          <tspan class="cls-12" x="18" y="10">Founder</tspan>
        </tspan>
      </text>
      <path class="cls-13" d="M178 542.95H300" />
      <path
        class="cls-3"
        d="M212.5 506.17a37.43 37.43 0 00-.57 5.58 15 15 0 00.19 2.77 3.26 3.26 0 001.22 2.27 1.35 1.35 0 001.17.11 2.32 2.32 0 001-.84 9.07 9.07 0 001.13-2.49 34.6 34.6 0 001.14-5.46c.12-.92.22-1.85.31-2.78s.22-1.86.25-2.78a9.64 9.64 0 00-.22-2.7 3 3 0 00-1.4-2 3.15 3.15 0 00-2.46-.23A5.77 5.77 0 00212 499a17.74 17.74 0 00-3.21 4.44 25.87 25.87 0 00-1.91 5.2 37.48 37.48 0 00-1.06 5.47 21.78 21.78 0 000 5.53 7.21 7.21 0 002.29 4.78 4.9 4.9 0 002.47 1 4.77 4.77 0 002.64-.37 5.63 5.63 0 002.07-1.75 18.81 18.81 0 001.44-2.38 32.39 32.39 0 002.26-5.12 13.69 13.69 0 00.75-5.48l.12.12a3 3 0 00-2.13.64 5.15 5.15 0 00-1.53 1.72 3.79 3.79 0 00-.53 2.19 3 3 0 001 2c.07.06.24 0 .39-.21a4.63 4.63 0 00.39-.56c.25-.41.47-.83.69-1.26s.46-.85.74-1.27a3 3 0 01.5-.59 1 1 0 01.39-.22.7.7 0 01.51.08h-.15a.74.74 0 01.51.08.6.6 0 01.26.47 2.36 2.36 0 01-.07.81c-.1.51-.24 1-.36 1.47a7.94 7.94 0 00-.25 1.43 1.4 1.4 0 00.37 1.18h-.33a12.42 12.42 0 001.49-3.28 13.3 13.3 0 01.76-1.74 3.71 3.71 0 011.33-1.46.29.29 0 01.39.1.28.28 0 010 .13c.12 2 0 3.89-.07 5.81a15.94 15.94 0 00.67 5.58l-.63-.08c1.46-2.11 1.91-4.84 3.51-7.14a.4.4 0 01.55-.1.44.44 0 01.17.32v4.62a16.65 16.65 0 00.23 2.25 5.35 5.35 0 00.71 2l-.75.12c.68-2.43.86-5.06 1.41-7.62a19.52 19.52 0 011.16-3.82 7.3 7.3 0 012.51-3.22 6.39 6.39 0 014-1 7.45 7.45 0 012 .39 3.8 3.8 0 011.8 1.2 2.61 2.61 0 01.46 2.19 3.37 3.37 0 01-1.23 1.79c-1 .87-2.27 1.45-2.86 2.42l-.36-.56a129.55 129.55 0 0117.51-.12c5.83.3 11.64.8 17.43 1.46a334.53 334.53 0 0134.49 5.67c-5.71-1.17-11.45-2.17-17.21-3s-11.53-1.63-17.32-2.23-11.64-1.08-17.41-1.35a128 128 0 00-17.41.25.37.37 0 01-.4-.33.4.4 0 01.06-.22c.79-1.3 2.07-1.85 3-2.68a2.62 2.62 0 00.94-1.35 1.76 1.76 0 00-.3-1.5 4.54 4.54 0 00-3.21-1.25 5.48 5.48 0 00-3.45.84 6.54 6.54 0 00-2.2 2.86 18.64 18.64 0 00-1.08 3.64c-.54 2.52-.74 5.11-1.48 7.69a.41.41 0 01-.51.3.48.48 0 01-.24-.18 6.17 6.17 0 01-.83-2.33 17.26 17.26 0 01-.22-2.36c-.06-1.57 0-3.13 0-4.64l.71.22c-1.49 2.07-1.95 4.81-3.56 7.1a.37.37 0 01-.5.09.36.36 0 01-.14-.18 16.41 16.41 0 01-.63-5.85c.05-1.93.23-3.86.14-5.75l.43.23a3.16 3.16 0 00-1.14 1.23 12.94 12.94 0 00-.74 1.65 13.07 13.07 0 01-1.62 3.4.23.23 0 01-.32 0 1.84 1.84 0 01-.53-1.57 9.35 9.35 0 01.27-1.51c.13-.49.27-1 .38-1.44a2.38 2.38 0 00.06-.68c0-.21-.06-.2-.28-.19h-.15c-.2-.18-.6.25-.84.61s-.49.81-.72 1.23-.46.85-.71 1.27a5.82 5.82 0 01-.44.61 1.54 1.54 0 01-.33.27.51.51 0 01-.52 0 3.34 3.34 0 01-1.12-2.2 4.2 4.2 0 01.58-2.38 5.6 5.6 0 011.65-1.81 3.27 3.27 0 012.35-.67.18.18 0 01.12.13 14.89 14.89 0 01-.79 5.59 31.69 31.69 0 01-2.25 5.18 18.36 18.36 0 01-1.44 2.44 6.13 6.13 0 01-2.17 1.87 5 5 0 01-2.85.46 5.35 5.35 0 01-2.7-1 7.77 7.77 0 01-2.57-5.07 22.58 22.58 0 01-.06-5.69 38 38 0 011-5.58 27.05 27.05 0 012-5.35 17.35 17.35 0 013.37-4.63 6.43 6.43 0 012.52-1.53 3.81 3.81 0 013 .3 3.76 3.76 0 011.72 2.46 10.13 10.13 0 01.21 2.89c0 1-.16 1.9-.26 2.82s-.22 1.87-.37 2.81a34.94 34.94 0 01-1.24 5.52 9.7 9.7 0 01-1.24 2.6 2.74 2.74 0 01-1.15 1 1.75 1.75 0 01-1.53-.15 3.58 3.58 0 01-1.33-2.56 14.25 14.25 0 01-.12-2.84 38.87 38.87 0 01.73-5.59h.05l-.1-.06z"
        transform="translate(8.5 8.5)"
      />
      <text
        font-family="Roboto-Bold,Roboto"
        font-size="10"
        fill="#000"
        transform="translate(530 558)"
      >
        Mathias Biilmann
        <tspan class="cls-11">
          <tspan class="cls-12" x="24.38" y="10">Founder</tspan>
        </tspan>
      </text>
      <path class="cls-13" d="M507.51 542.95h122.83" />
      <path
        class="cls-3"
        d="M513.56 522.7a12.72 12.72 0 013.93-4.89 30.08 30.08 0 015.38-3.32 37.88 37.88 0 015.84-2.44 40.93 40.93 0 016.19-1.36 49.36 49.36 0 016.32-.46 10 10 0 016.14 1.81 10.45 10.45 0 013.8 5.13 13.65 13.65 0 01.71 6.33.24.24 0 01-.16.19 1.45 1.45 0 01-1.56-.56 3.33 3.33 0 01-.62-1.45 3.38 3.38 0 01.05-1.58 1.44 1.44 0 01.45-.71 1.13 1.13 0 01.84-.21.16.16 0 01.13.11 13.32 13.32 0 00.74 1.63 2.14 2.14 0 00.51.65c.16.16.34 0 .47-.27a5.23 5.23 0 00.4-1.7 13.28 13.28 0 000-1.78l.23.09a2.77 2.77 0 00-.63 2c0 .7.32 1.5 1 1.62a1.19 1.19 0 001-.21 2.28 2.28 0 00.64-.82 5.83 5.83 0 00.51-2.1l.32.07a9.41 9.41 0 00-.61 3.39 2.23 2.23 0 00.5 1.5 1.58 1.58 0 001.47.28 4.08 4.08 0 002.28-2.31A14.41 14.41 0 00561 518a17.06 17.06 0 00.31-1.71 5.87 5.87 0 000-1.67c-.06-.25-.17-.41-.28-.42s-.27.08-.42.29a5.46 5.46 0 00-.67 1.51 8.22 8.22 0 00-.21.82 4.27 4.27 0 000 .81 3.21 3.21 0 00.34 1.52.53.53 0 00.91.14 2.08 2.08 0 00.49-1.34l.75.1a6.83 6.83 0 00-.06 2.14l-.56-.34a1.85 1.85 0 01.33-.12h.16c-.06 0 0 0 0 0s0-.13.07-.2a.4.4 0 01.5-.26.39.39 0 01.27.39c0 .5-.07.91-.09 1.35a6.24 6.24 0 000 1.23 1.2 1.2 0 00.06.18h.06c.06 0 0 0 .12-.07a3.36 3.36 0 00.48-1 3.82 3.82 0 011.9-2.19 7.91 7.91 0 012.67-.84 18 18 0 015.43.11 16.42 16.42 0 012.65.62 6.7 6.7 0 011.31.56 1.51 1.51 0 01.65.66.72.72 0 01-.13.75 1.27 1.27 0 01-.42.29h-.06a10.76 10.76 0 01-1.42.2c-.46 0-.9.08-1.33.15-.85.14-1.71.42-1.95 1.05l-.36-.58c2.85.16 5.75-.21 8.69-.18s5.83.08 8.75.24a136.55 136.55 0 0117.35 2q-4.32-.62-8.67-1c-2.89-.26-5.8-.45-8.7-.55s-5.81-.14-8.71-.08-5.78.48-8.75.31a.44.44 0 01-.4-.45v-.13a2.22 2.22 0 011.17-1.15 5.44 5.44 0 011.42-.41c.93-.16 1.89-.16 2.67-.35h-.07l.13-.09v.14a.86.86 0 00-.3-.24 5.49 5.49 0 00-1.13-.48 15.12 15.12 0 00-2.52-.58 17.52 17.52 0 00-5.16-.1c-1.65.23-3.43.89-3.9 2.43a4.16 4.16 0 01-.67 1.33 1 1 0 01-.45.3.87.87 0 01-.62 0l-.22-.13a.86.86 0 01-.21-.26 1.35 1.35 0 01-.15-.44 14.22 14.22 0 01.08-2.73l.78.12a1.44 1.44 0 01-.12.3.79.79 0 01-.33.39 1.39 1.39 0 01-.36.09l-.16.06a.4.4 0 01-.52-.2.35.35 0 010-.14 7.11 7.11 0 01.11-2.41.37.37 0 01.47-.26.36.36 0 01.27.37 2.71 2.71 0 01-.72 1.9 1.27 1.27 0 01-1.12.39 1.35 1.35 0 01-.94-.68 4 4 0 01-.42-1.89 5.22 5.22 0 01.08-.95 8.29 8.29 0 01.24-.89 5.67 5.67 0 01.8-1.69 1.57 1.57 0 01.39-.38.84.84 0 011.2.26 1.52 1.52 0 01.19.51 6.06 6.06 0 010 1.86 14.81 14.81 0 01-.35 1.76 15.16 15.16 0 01-1.24 3.37 4.5 4.5 0 01-2.61 2.5 1.93 1.93 0 01-1.84-.41 2.63 2.63 0 01-.6-1.77 9.79 9.79 0 01.68-3.52.16.16 0 01.21-.1.17.17 0 01.11.17 6.07 6.07 0 01-.57 2.21 2.65 2.65 0 01-.74.93 1.54 1.54 0 01-1.18.24 1.37 1.37 0 01-.93-.74 2.55 2.55 0 01-.27-1.14 3 3 0 01.7-2.18.13.13 0 01.18 0 .12.12 0 010 .09 11.17 11.17 0 010 1.83 5.51 5.51 0 01-.4 1.81 1 1 0 01-.34.41.49.49 0 01-.59 0 2.49 2.49 0 01-.61-.75 13.87 13.87 0 01-.78-1.66l.14.11a.79.79 0 00-.88.69 2.8 2.8 0 000 1.38 2.74 2.74 0 00.56 1.25 1 1 0 001.07.38l-.17.2a13 13 0 00-.82-6.05 10 10 0 00-3.62-4.77 9.44 9.44 0 00-5.73-1.66 48.16 48.16 0 00-6.23.41 37.5 37.5 0 00-11.91 3.56 33.73 33.73 0 00-5.4 3.13 12.46 12.46 0 00-4 4.67h-.06l-.19.06z"
        transform="translate(8.5 8.5)"
      />
      <g fill="#4e9abf">
        <path
          d="M396 532.77a.73.73 0 00-.47.91l10.26 32.51c.12.37.43.44.69.14l5.66-6.41a1.5 1.5 0 011.19-.45l8.51 1c.4 0 .6-.21.46-.58l-11.65-31a.77.77 0 00-.94-.46z"
          transform="translate(8.5 8.5)"
        />
        <path
          d="M400.66 532.89a.71.71 0 01.47.9l-10.26 32.51c-.12.37-.43.44-.7.14l-5.65-6.44a1.5 1.5 0 00-1.19-.45l-8.52 1c-.39 0-.59-.21-.46-.58L386 529a.77.77 0 01.94-.46z"
          transform="translate(8.5 8.5)"
        />
      </g>
      <path
        fill="#3dbeb3"
        d="M433.68 526.27l-4.73 7.19-.4 8.6-8.05 3.03-5.38 6.73-8.3-2.29-8.3 2.29-5.37-6.73-8.05-3.04-.41-8.59-4.72-7.19 4.72-7.19.41-8.59 8.05-3.04 5.37-6.72 8.3 2.28 8.3-2.28 5.38 6.72 8.05 3.04.4 8.59 4.73 7.19z"
      />
      <path
        d="M417.33 517.77a19 19 0 11-19-19 19 19 0 0119 19z"
        transform="translate(8.5 8.5)"
        fill="#f5f6f7"
      />
      <path
        d="M419.46 517.77a21.14 21.14 0 11-21.14-21.14 21.15 21.15 0 0121.14 21.14z"
        transform="translate(8.5 8.5)"
        stroke="#f2f8f9"
        stroke-miterlimit="10"
        fill="none"
      />
      <path
        d="M398.32 535.87a18.11 18.11 0 10-18.11-18.1 18.1 18.1 0 0018.11 18.1zm-9.95-5.7l-.95-.86-1.17.52.52-1.16-.85-1 1.27.14.64-1.11.26 1.25 1.26.27-1.11.64zm5.56 2.88l-1.21-.42-.87.93v-1.28l-1.16-.55 1.22-.37.17-1.27.73 1.06 1.25-.24-.77 1zm4.85.59l-.46 1.19-.46-1.19-1.28-.07 1-.8-.33-1.24 1.07.7 1.07-.7-.33 1.24 1 .8zm6.13-.13l-.89-.93-1.2.44.61-1.13-.79-1 1.26.23.72-1.06.18 1.27 1.22.36-1.15.55zm5.48-3.68l-1.17-.52-1 .86.13-1.27-1.11-.64 1.25-.27.27-1.25.64 1.11 1.27-.14-.85 1zm2.44-5.62l-.54 1.16-.37-1.23-1.27-.16 1.05-.73-.24-1.26 1 .78 1.12-.62-.42 1.21.93.88zm1.36-6.9l1.2.46-1.2.45-.07 1.28-.8-1-1.24.33.7-1.07-.7-1.08 1.24.33.8-1zm-2.32-6l.36-1.23.55 1.16h1.28l-.92.88.43 1.21-1.13-.61-1 .78.23-1.26-1.06-.72zm-3.6-5.93l1 .86 1.17-.52-.52 1.17.85.95-1.27-.14-.64 1.11-.27-1.25-1.25-.27 1.11-.63zm-5.56-2.88l1.21.43.87-.94v1.28l1.16.55-1.22.37-.17 1.27-.73-1.05-1.25.23.77-1zm-4.85-.59l.46-1.19.46 1.19 1.28.07-1 .81.33 1.23-1.07-.69-1.07.69.33-1.23-1-.81zm-6.13.13l.89.93 1.2-.43-.61 1.12.79 1-1.26-.23-.72 1.05-.18-1.26-1.22-.36 1.15-.56zm6.59 3.49a12.26 12.26 0 11-12.26 12.26 12.26 12.26 0 0112.26-12.28zm-12.07.19l1.17.52.95-.86-.13 1.28 1.11.63-1.26.27-.26 1.25-.64-1.11-1.27.14.85-.95zm-2.44 5.62l.54-1.16.37 1.23 1.27.16-1.05.73.24 1.26-1-.78-1.12.62.42-1.21-.93-.88zm-1.36 6.9l-1.2-.45 1.2-.46.06-1.28.81 1 1.24-.33-.7 1.08.7 1.07-1.24-.33-.81 1zm2 7.25l-.55-1.15h-1.28l.92-.88-.43-1.2 1.13.6 1-.78-.23 1.26 1.06.72-1.27.17z"
        transform="translate(8.5 8.5)"
        fill="#3ebeb3"
      />
      <text
        transform="translate(290 250)"
        letter-spacing=".05em"
        font-size="10"
        font-family="Roboto-Regular,Roboto"
        fill="#f7f9f9"
      >
        THIS CERTIFICATE IS PROUDLY PRESENTED TO
      </text>
      <path class="cls-26" d="M270 235.26h273.32" />
      <text
        font-size="36"
        font-family="Roboto-Medium,Roboto"
        font-weight="500"
        text-anchor="middle" x="50%" y="314"
        fill="#f7f9f9"
      >
        ${name}
      </text>
      <path
        d="M380.59 62.39l.11 1.94a6 6 0 014.88-2.25c3.5 0 5.27 2 5.34 6V79.2h-3.77V68.31a3.49 3.49 0 00-.69-2.37 2.91 2.91 0 00-2.26-.77 3.63 3.63 0 00-3.39 2.07v12H377V62.39zm21.55 17.13a7.79 7.79 0 01-5.8-2.26 8.21 8.21 0 01-2.23-6v-.46a10.05 10.05 0 011-4.5 7.38 7.38 0 012.72-3.09 7.23 7.23 0 013.91-1.1 6.57 6.57 0 015.26 2.16 9.26 9.26 0 011.87 6.2V72h-11a5 5 0 001.39 3.29 4.14 4.14 0 003.06 1.21 5.08 5.08 0 004.21-2.1l2 1.95a6.74 6.74 0 01-2.68 2.33 8.37 8.37 0 01-3.78.84zm-.45-14.41a3.14 3.14 0 00-2.5 1.09 5.61 5.61 0 00-1.22 3h7.18V69a4.6 4.6 0 00-1-2.87 3.18 3.18 0 00-2.46-1.02zm14.82-6.8v4.08h3v2.8h-3v9.38a2.06 2.06 0 00.38 1.39 1.74 1.74 0 001.36.43 5.79 5.79 0 001.31-.15v2.92a9.1 9.1 0 01-2.48.35q-4.33 0-4.34-4.8v-9.52H410v-2.8h2.76V58.3h3.77zm9.85 20.9h-3.77V55.34h3.77zm8.1 0h-3.76V62.39h3.76zm-4-21.18a2 2 0 01.55-1.45 2.47 2.47 0 013.16 0 2 2 0 01.56 1.45 2 2 0 01-.56 1.42 2.47 2.47 0 01-3.16 0 2 2 0 01-.55-1.42zm9.43 21.18v-14h-2.56v-2.8h2.56v-1.56a5.77 5.77 0 011.55-4.32 5.94 5.94 0 014.34-1.53 8.58 8.58 0 012.11.28l-.1 3a6.89 6.89 0 00-1.44-.12c-1.8 0-2.69.93-2.69 2.78v1.49h3.41v2.8h-3.41v14h-3.77zm15.79-5.41l3.42-11.41h4l-6.66 19.36c-1 2.83-2.76 4.25-5.21 4.25a7 7 0 01-1.82-.28v-2.93h.72a3.61 3.61 0 002.14-.52 3.47 3.47 0 001.14-1.75l.54-1.44-5.89-16.74h4.06l3.55 11.41z"
        transform="translate(8.5 8.5)"
        fill-rule="evenodd"
        fill="#fff"
      />
      <path
        d="M358.07 63.41a.08.08 0 010-.08l.68-4.18 3.21 3.2-3.34 1.42a1.58 1.58 0 00-.55-.36zm4.64-.25l3.43 3.43c.71.71 1.07 1.06 1.2 1.48a1.16 1.16 0 010 .18l-8.18-3.47s-.07 0-.07-.06 0 0 .07-.07zm4.53 6.19a6.21 6.21 0 01-1.1 1.26l-3.86 3.86-5-1s-.09 0-.09-.06a1.44 1.44 0 00-.58-1.05v-.08l.94-5.76s0-.1.05-.1a1.52 1.52 0 001-.59.14.14 0 01.09 0l8.53 3.61zm-5.85 6L355 81.71l1.12-6.71a.1.1 0 01.05 0 1.67 1.67 0 00.61-.45.16.16 0 01.08-.06l4.47.92zm-7.7 7.7l-.71.71-7.92-11.44.06-.11.05-.06h.06l8.77 1.68h.07a1.55 1.55 0 00.91 1v.07c0 .07 0 0 0 0-.09.82-.98 6.6-1.29 8.16zm-1.49 1.49a3.25 3.25 0 01-1.19.91 1.78 1.78 0 01-1.07 0 4.36 4.36 0 01-1.48-1.19l-7.95-8 2.08-3.22h.08a2.13 2.13 0 001.45-.07.09.09 0 01.07 0l8 11.54zm-12.46-9l-1.82-1.82 3.6-1.54s.05 0 .06.06l.12.16-2 3.09zm-2.63-2.63l-2.3-2.31c-.4-.39-.68-.68-.88-.92l7 1.45h.09s-.05.07-.09.09zm-3.58-4.42a1.56 1.56 0 01.08-.43c.13-.42.48-.77 1.2-1.48l2.95-3q2 3 4.09 5.91v.1a2.54 2.54 0 00-.35.46.09.09 0 010 .06l-7.91-1.66zm5-5.66l4-4c.37.17 1.73.74 2.94 1.25l2 .86a.12.12 0 01.07.05 1.77 1.77 0 00.46 1.71v.09l-4 6.25a.09.09 0 01-.07 0 2 2 0 00-.48-.06 2.49 2.49 0 00-.46 0h-.05l-4.25-6.2zm4.77-4.77l5.14-5.14a4.42 4.42 0 011.48-1.2 1.78 1.78 0 011.07 0c.41.13.76.49 1.48 1.2l1.11 1.12-3.66 5.66h-.08a1.83 1.83 0 00-1.7.33h-.09zm11.06-3.25l3.37 3.38-.81 5v.05a1.49 1.49 0 00-.49.24l-5.14-2.19s-.07 0-.07-.06a1.91 1.91 0 00-.28-.81s-.05-.08 0-.13zm-3.48 7.61l4.82 2a.13.13 0 01.07 0 .88.88 0 000 .24v.13l-.06.06L345 69.58a.06.06 0 01-.05 0v-.09l4-6.14s0-.08.09-.08h.25a1.78 1.78 0 001.49-.79.1.1 0 01.12-.05zm-5.52 8.12l10.85-4.63.16.14-.93 5.71s0 .1-.06.1a1.51 1.51 0 00-1.21.75l-.05.05h-.06L345.52 71s-.13-.45-.14-.45z"
        transform="translate(8.5 8.5)"
        fill="url(#radial-gradient)"
      />
      <path class="cls-26" d="M38.24 354.59h737.17" />
    </svg>`

  const doc = new PDFDocument({
    layout: 'landscape',
    size: 'A4',
  })

  let writer = new streamBuffers.WritableStreamBuffer()

  await new Promise((resolve, reject) => {
    writer.on('finish', resolve)
    doc.pipe(writer)
    SVGtoPDF(doc, background)
    doc.end()
  })

  console.log(`Time to return ${name} ${date}`);
  
  console.log(writer.getContents().toString("base64"));
 

  return {
    statusCode: 200,
    headers: {
      'Content-type': 'application/pdf',
    },
    // body: " writer.getContents()"
    body: writer.getContents().toString("base64"),
    isBase64Encoded: true
  };

}
