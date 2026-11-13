
import { motion } from 'framer-motion';
import { createElement, type ElementType, type ReactNode } from 'react';
import type { DrawStage, TopicContent } from '@/content/types';

interface TopicSvgProps {
  topic: TopicContent;
  stage?: DrawStage;
  className?: string;
  title?: string;
}

const INK = '#3A004D';

function Layer({
  children,
  show = true,
}: {
  children: ReactNode;
  show?: boolean;
}) {
  if (!show) return null;

  return (
    <motion.g
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
    >
      {children}
    </motion.g>
  );
}

function Label({
  x,
  y,
  children,
  anchor = 'start',
}: {
  x: number;
  y: number;
  children: ReactNode;
  anchor?: 'start' | 'middle' | 'end';
}) {
  return (
    <text
      x={x}
      y={y}
      fontSize="10"
      fontWeight="600"
      fill={INK}
      textAnchor={anchor}
    >
      {children}
    </text>
  );
}

// ANIMAL CELL
function AnimalCell({ stage }: { stage: number }) {
  return (
    <>
      <Layer>
        <path
          d="M55 150 C55 82 116 45 204 48 C290 47 350 92 347 158 C345 225 286 257 197 254 C111 255 56 216 55 150Z"
          fill="#F8EAF1"
          stroke={INK}
          strokeWidth="4"
        />
        <path
          d="M62 150 C62 89 121 54 204 55 C283 54 340 96 340 158"
          fill="none"
          stroke="#D88EAD"
          strokeWidth="2"
        />
      </Layer>

      <Layer show={stage >= 2}>
        <ellipse cx="188" cy="145" rx="55" ry="48" fill="#C9A4E2" stroke={INK} strokeWidth="3" />
        <ellipse cx="188" cy="145" rx="17" ry="15" fill="#70418F" />
        <path
          d="M150 128 Q180 105 211 127 M147 153 Q181 174 222 150"
          fill="none"
          stroke="#8057A4"
          strokeWidth="2"
        />
      </Layer>

      <Layer show={stage >= 3}>
        <g fill="#E89B72" stroke="#8D4E43" strokeWidth="2">
          <ellipse cx="282" cy="104" rx="25" ry="13" transform="rotate(-25 282 104)" />
          <ellipse cx="105" cy="190" rx="25" ry="13" transform="rotate(25 105 190)" />
          <ellipse cx="280" cy="204" rx="24" ry="12" transform="rotate(25 280 204)" />
        </g>
        <g fill="none" stroke="#8D4E43" strokeWidth="2">
          <path d="M263 103 Q275 88 286 105 Q297 119 305 101" />
          <path d="M87 190 Q99 174 110 190 Q122 205 132 187" />
          <path d="M263 204 Q276 188 286 204 Q297 219 307 200" />
        </g>
      </Layer>

      <Layer show={stage >= 4}>
        <g fill="none" stroke="#4D8CB8" strokeWidth="5" strokeLinecap="round">
          <path d="M125 104 Q147 80 166 103 Q183 120 207 99 Q230 83 249 105" />
          <path d="M125 184 Q145 162 165 183 Q183 202 206 180 Q229 161 250 185" />
          <path d="M130 115 Q116 133 135 149 M243 119 Q260 137 244 154" />
        </g>
        <g fill="#D8A94B" stroke="#8A672B" strokeWidth="1.5">
          <path d="M230 76 Q247 62 258 77 Q248 91 230 76Z" />
          <path d="M96 135 Q109 122 120 137 Q107 151 96 135Z" />
        </g>
      </Layer>

      <Layer show={stage >= 5}>
        <g stroke={INK} strokeWidth="1.2" fill="none">
          <path d="M185 98 L185 32 L130 32" />
          <path d="M283 104 L335 76 L375 76" />
          <path d="M145 222 L91 270 L30 270" />
          <path d="M245 183 L310 260 L375 260" />
        </g>
        <Label x={126} y={27}>Nucleus</Label>
        <Label x={375} y={71} anchor="end">Mitochondrion</Label>
        <Label x={30} y={283}>Cell membrane</Label>
        <Label x={375} y={275} anchor="end">Endoplasmic reticulum</Label>
        <Label x={200} y={292} anchor="middle">Animal cell</Label>
      </Layer>
    </>
  );
}

// HUMAN BRAIN
function Brain({ stage }: { stage: number }) {
  return (
    <>
      <Layer>
        <path
          d="M85 151 C55 130 72 91 103 83 C104 48 145 39 166 60 C190 34 225 44 237 66 C273 52 307 78 304 109 C338 125 326 166 299 180 C285 207 251 209 230 194 C201 216 169 207 153 190 C121 204 88 184 85 151Z"
          fill="#F1B5C7"
          stroke={INK}
          strokeWidth="4"
        />
      </Layer>

      <Layer show={stage >= 2}>
        <path
          d="M85 151 C67 126 80 91 103 83 C124 93 139 122 145 150 C130 169 136 183 153 190 C121 204 88 184 85 151Z"
          fill="#E58DAA"
          stroke={INK}
          strokeWidth="2"
        />
        <path
          d="M103 83 C104 48 145 39 166 60 C185 53 201 55 216 67 L210 120 Q175 112 145 150 C139 122 124 93 103 83Z"
          fill="#E6A4BB"
          stroke={INK}
          strokeWidth="2"
        />
        <path
          d="M216 67 Q273 52 304 109 Q317 141 287 157 L210 120Z"
          fill="#D68AA8"
          stroke={INK}
          strokeWidth="2"
        />
        <path
          d="M145 150 Q174 119 210 120 Q245 123 265 166 Q237 201 197 199 Q168 202 153 190 Q136 177 145 150Z"
          fill="#CE789B"
          stroke={INK}
          strokeWidth="2"
        />
      </Layer>

      <Layer show={stage >= 3}>
        <g fill="none" stroke="#9B5276" strokeWidth="2.3" strokeLinecap="round">
          <path d="M92 115 Q115 101 121 125 Q124 145 145 139" />
          <path d="M112 78 Q137 66 143 91 Q145 107 161 110" />
          <path d="M157 67 Q179 78 170 99 Q164 112 184 119" />
          <path d="M192 58 Q215 75 199 94 Q191 108 215 116" />
          <path d="M232 75 Q255 91 241 111 Q234 126 260 135" />
          <path d="M277 91 Q294 112 275 127 Q264 140 288 151" />
          <path d="M158 155 Q176 139 187 160 Q197 179 217 161" />
          <path d="M225 143 Q246 132 256 151 Q262 167 282 164" />
        </g>
      </Layer>

      <Layer show={stage >= 4}>
        <path
          d="M248 178 Q274 166 291 183 Q307 201 289 220 Q265 239 239 215 Q228 197 248 178Z"
          fill="#D89AB5"
          stroke={INK}
          strokeWidth="3"
        />
        <path
          d="M226 181 Q225 212 215 235 Q209 251 222 262 L247 262 Q240 242 250 216"
          fill="#C77D9C"
          stroke={INK}
          strokeWidth="3"
        />
        <path d="M232 224 Q238 236 235 250" stroke="#8F4B70" strokeWidth="2" fill="none" />
        <g fill="none" stroke="#9B5276" strokeWidth="2">
          <path d="M247 188 Q268 178 283 194 M245 199 Q266 188 288 207 M250 211 Q270 201 285 218" />
        </g>
      </Layer>

      <Layer show={stage >= 5}>
        <g stroke={INK} strokeWidth="1.2" fill="none">
          <path d="M111 95 L45 54 L15 54" />
          <path d="M254 82 L331 45 L382 45" />
          <path d="M272 199 L340 238 L388 238" />
          <path d="M225 245 L160 278 L98 278" />
        </g>
        <Label x={15} y={47}>Frontal lobe</Label>
        <Label x={382} y={39} anchor="end">Parietal lobe</Label>
        <Label x={388} y={252} anchor="end">Cerebellum</Label>
        <Label x={98} y={291}>Brainstem</Label>
        <Label x={200} y={295} anchor="middle">Human brain</Label>
      </Layer>
    </>
  );
}

// DOG AND CAT
function Animal({
  stage,
  cat = false,
}: {
  stage: number;
  cat?: boolean;
}) {
  const coat = cat ? '#A5AAB2' : '#C8A27A';

  return (
    <>
      <Layer>
        <path
          d="M90 151 Q125 111 208 119 Q259 119 286 146 Q276 185 231 197 Q143 211 95 181Z"
          fill={coat}
          stroke={INK}
          strokeWidth="4"
        />
      </Layer>

      <Layer show={stage >= 2}>
        <path
          d="M263 139 Q269 91 309 91 Q343 99 338 139 Q326 165 288 164Z"
          fill={coat}
          stroke={INK}
          strokeWidth="4"
        />
        {cat ? (
          <path
            d="M276 105 L273 65 L301 91 M312 91 L335 64 L332 111"
            fill={coat}
            stroke={INK}
            strokeWidth="4"
            strokeLinejoin="round"
          />
        ) : (
          <path
            d="M279 104 Q255 77 270 67 Q293 72 297 106"
            fill="#9C704B"
            stroke={INK}
            strokeWidth="3"
          />
        )}
        <ellipse cx="337" cy="139" rx="20" ry="13" fill={coat} stroke={INK} strokeWidth="3" />
      </Layer>

      <Layer show={stage >= 3}>
        <circle cx="321" cy="119" r="4" fill={INK} />
        <path d="M333 136 L341 140 L334 145" fill="#4A302A" stroke={INK} strokeWidth="1.5" />

        {cat ? (
          <path
            d="M110 151 Q63 123 71 91 Q83 73 96 101 Q102 126 123 134"
            fill="none"
            stroke={INK}
            strokeWidth="9"
            strokeLinecap="round"
          />
        ) : (
          <path
            d="M100 163 Q58 142 66 115"
            fill="none"
            stroke={INK}
            strokeWidth="9"
            strokeLinecap="round"
          />
        )}

        <path
          d="M140 188 L132 252 L151 252 M174 193 L174 254 L192 254 M245 183 L250 251 L268 251 M275 174 L292 240 L310 240"
          fill="none"
          stroke={INK}
          strokeWidth="8"
          strokeLinecap="round"
        />
      </Layer>

      <Layer show={stage >= 4}>
        {cat ? (
          <g fill="none" stroke="#5C5861" strokeWidth="2">
            <path d="M322 143 L365 132 M322 148 L367 151 M322 153 L361 169" />
            <path d="M300 94 L303 77 L311 93 M318 92 L329 75 L330 99" />
          </g>
        ) : (
          <g fill="none" stroke="#8D6244" strokeWidth="2">
            <path d="M276 146 Q292 154 307 145 M285 102 Q301 111 308 99" />
            <path d="M132 126 Q154 114 171 128 M185 125 Q207 113 224 128" />
          </g>
        )}

        <path
          d="M128 251 Q139 243 153 251 M171 253 Q183 244 196 253 M248 251 Q262 242 274 251 M290 240 Q303 231 316 240"
          fill="none"
          stroke="#4A302A"
          strokeWidth="3"
        />
      </Layer>

      <Layer show={stage >= 5}>
        <g stroke={INK} strokeWidth="1.2" fill="none">
          <path d="M306 104 L352 54 L390 54" />
          <path d="M182 128 L155 67 L95 67" />
          <path d="M220 193 L214 275 L170 275" />
        </g>
        <Label x={390} y={48} anchor="end">Head</Label>
        <Label x={95} y={60}>Body</Label>
        <Label x={170} y={288}>Legs and paws</Label>
        <Label x={200} y={298} anchor="middle">
          {cat ? 'Cat anatomy' : 'Dog anatomy'}
        </Label>
      </Layer>
    </>
  );
}

// PLANT ANATOMY
function Plant({ stage }: { stage: number }) {
  return (
    <>
      <Layer>
        <path
          d="M200 264 L200 115"
          stroke="#568A45"
          strokeWidth="13"
          strokeLinecap="round"
        />
        <path
          d="M200 264 Q175 278 155 295 M200 264 Q200 286 199 300 M200 264 Q224 282 246 296 M200 276 Q174 282 139 286 M200 276 Q230 281 264 286"
          fill="none"
          stroke="#8B6B4A"
          strokeWidth="5"
          strokeLinecap="round"
        />
      </Layer>

      <Layer show={stage >= 2}>
        <path
          d="M197 205 Q143 202 120 154 Q167 146 199 188Z"
          fill="#68AD57"
          stroke={INK}
          strokeWidth="2.5"
        />
        <path
          d="M203 171 Q251 166 279 119 Q232 110 203 153Z"
          fill="#68AD57"
          stroke={INK}
          strokeWidth="2.5"
        />
        <path
          d="M200 190 Q165 170 132 158 M202 158 Q236 137 267 124"
          fill="none"
          stroke="#397A3C"
          strokeWidth="2"
        />
      </Layer>

      <Layer show={stage >= 3}>
        <path
          d="M200 117 Q180 94 190 77 Q200 55 211 77 Q223 94 200 117Z"
          fill="#E98BB0"
          stroke={INK}
          strokeWidth="2"
        />
        <path
          d="M200 117 Q170 115 169 94 Q168 74 190 83 Q202 93 200 117Z"
          fill="#F3A6C1"
          stroke={INK}
          strokeWidth="2"
        />
        <path
          d="M200 117 Q230 115 231 94 Q232 74 210 83 Q198 93 200 117Z"
          fill="#F3A6C1"
          stroke={INK}
          strokeWidth="2"
        />
        <circle cx="200" cy="99" r="9" fill="#F4C64D" stroke={INK} strokeWidth="2" />
      </Layer>

      <Layer show={stage >= 4}>
        <g stroke="#397A3C" strokeWidth="2" fill="none">
          <path d="M200 120 L200 185 M200 185 L170 165 M200 185 L232 160" />
          <path d="M200 218 L200 260" />
        </g>
        <g fill="#8B6B4A">
          <circle cx="151" cy="289" r="3" />
          <circle cx="170" cy="280" r="3" />
          <circle cx="226" cy="284" r="3" />
          <circle cx="247" cy="291" r="3" />
        </g>
      </Layer>

      <Layer show={stage >= 5}>
        <g stroke={INK} strokeWidth="1.2" fill="none">
          <path d="M200 280 L290 280 L375 280" />
          <path d="M265 133 L325 70 L385 70" />
          <path d="M200 98 L120 42 L30 42" />
        </g>
        <Label x={375} y={274} anchor="end">Roots</Label>
        <Label x={385} y={64} anchor="end">Leaves</Label>
        <Label x={30} y={35}>Flower</Label>
        <Label x={200} y={298} anchor="middle">Plant anatomy</Label>
      </Layer>
    </>
  );
}

// PHOTOSYNTHESIS
function Leaf({ stage }: { stage: number }) {
  return (
    <>
      <Layer>
        <path
          d="M85 210 Q75 83 265 56 Q327 151 230 237 Q132 275 85 210Z"
          fill="#79BD69"
          stroke={INK}
          strokeWidth="4"
        />
      </Layer>

      <Layer show={stage >= 2}>
        <path
          d="M92 214 Q174 151 267 64"
          fill="none"
          stroke="#2F7544"
          strokeWidth="5"
        />
        <g stroke="#397D4C" strokeWidth="2.3" fill="none">
          <path d="M127 187 Q123 146 110 121 M154 166 Q153 126 145 99 M182 143 Q194 111 192 88 M209 119 Q236 104 252 91" />
          <path d="M150 170 Q180 183 210 197 M126 190 Q151 213 177 230 M185 144 Q220 154 245 160" />
        </g>
      </Layer>

      <Layer show={stage >= 3}>
        <g fill="#1E6B3A" stroke="#14502C" strokeWidth="1.5">
          <ellipse cx="151" cy="155" rx="9" ry="5" transform="rotate(-25 151 155)" />
          <ellipse cx="194" cy="126" rx="9" ry="5" transform="rotate(-25 194 126)" />
          <ellipse cx="219" cy="181" rx="9" ry="5" transform="rotate(20 219 181)" />
          <ellipse cx="126" cy="207" rx="9" ry="5" transform="rotate(20 126 207)" />
        </g>
        <g fill="none" stroke="#F5B942" strokeWidth="3">
          <path d="M22 45 L75 88 M38 24 L85 66 M10 76 L64 112" />
        </g>
      </Layer>

      <Layer show={stage >= 4}>
        <path
          d="M30 257 Q65 238 96 220"
          fill="none"
          stroke="#398BD4"
          strokeWidth="4"
          strokeDasharray="6 5"
        />
        <path
          d="M310 125 L363 125 M350 115 L363 125 L350 135"
          fill="none"
          stroke="#8E9AAF"
          strokeWidth="3"
        />
        <path
          d="M268 213 L320 252 M306 247 L320 252 L314 237"
          fill="none"
          stroke="#4FB3D9"
          strokeWidth="3"
        />
      </Layer>

      <Layer show={stage >= 5}>
        <g stroke={INK} strokeWidth="1.2" fill="none">
          <path d="M192 126 L285 30 L380 30" />
          <path d="M151 155 L78 98 L20 98" />
          <path d="M320 125 L365 163 L390 163" />
        </g>
        <Label x={380} y={24} anchor="end">Veins</Label>
        <Label x={20} y={91}>Sunlight</Label>
        <Label x={390} y={157} anchor="end">CO₂ enters</Label>
        <Label x={200} y={295} anchor="middle">Photosynthesis in a leaf</Label>
      </Layer>
    </>
  );
}

// VOLCANO
function Volcano({ stage }: { stage: number }) {
  return (
    <>
      <Layer>
        <path
          d="M35 258 L150 105 Q199 84 249 105 L365 258Z"
          fill="#A88975"
          stroke={INK}
          strokeWidth="4"
        />
        <path
          d="M150 105 Q199 123 249 105"
          fill="none"
          stroke={INK}
          strokeWidth="3"
        />
      </Layer>

      <Layer show={stage >= 2}>
        <ellipse cx="200" cy="106" rx="48" ry="13" fill="#4B3B35" stroke={INK} strokeWidth="3" />
        <path
          d="M181 108 Q200 121 219 108"
          fill="none"
          stroke="#D6B9A8"
          strokeWidth="2"
        />
        <path
          d="M185 111 L200 245 L215 111"
          fill="#C24C2D"
          fillOpacity="0.8"
          stroke="#8D3528"
          strokeWidth="3"
        />
      </Layer>

      <Layer show={stage >= 3}>
        <ellipse cx="200" cy="260" rx="74" ry="22" fill="#F15B32" stroke="#8D3528" strokeWidth="3" />
        <path d="M200 244 L200 128" stroke="#F15B32" strokeWidth="13" />
        <path d="M188 243 L188 132 M212 243 L212 132" stroke="#FFAA47" strokeWidth="3" />
      </Layer>

      <Layer show={stage >= 4}>
        <path
          d="M215 111 Q249 137 268 208"
          fill="none"
          stroke="#FF6B24"
          strokeWidth="12"
          strokeLinecap="round"
        />
        <path
          d="M215 111 Q249 137 268 208"
          fill="none"
          stroke="#FFD15C"
          strokeWidth="3"
        />
        <g fill="#A8A8A8" stroke="#777" strokeWidth="2">
          <circle cx="168" cy="54" r="22" />
          <circle cx="194" cy="38" r="27" />
          <circle cx="225" cy="50" r="24" />
          <circle cx="249" cy="61" r="17" />
        </g>
        <g fill="#777">
          <circle cx="144" cy="30" r="3" />
          <circle cx="270" cy="28" r="4" />
          <circle cx="290" cy="50" r="3" />
          <circle cx="124" cy="58" r="3" />
        </g>
      </Layer>

      <Layer show={stage >= 5}>
        <g stroke={INK} strokeWidth="1.2" fill="none">
          <path d="M200 106 L290 80 L380 80" />
          <path d="M200 192 L90 195 L20 195" />
          <path d="M266 190 L330 230 L390 230" />
        </g>
        <Label x={380} y={74} anchor="end">Crater</Label>
        <Label x={20} y={188}>Central vent</Label>
        <Label x={390} y={224} anchor="end">Lava flow</Label>
        <Label x={200} y={295} anchor="middle">Volcano cross-section</Label>
      </Layer>
    </>
  );
}

// WATER CYCLE
function WaterCycle({ stage }: { stage: number }) {
  return (
    <>
      <Layer>
        <circle cx="62" cy="55" r="25" fill="#F5C542" stroke={INK} strokeWidth="2" />
        <path
          d="M0 226 L80 142 L143 226 L211 128 L292 226 L400 226 L400 300 L0 300Z"
          fill="#A9C5A0"
          stroke={INK}
          strokeWidth="3"
        />
        <path
          d="M0 240 Q70 230 140 241 T280 240 T400 240 L400 300 L0 300Z"
          fill="#4B8FC8"
          stroke={INK}
          strokeWidth="2"
        />
      </Layer>

      <Layer show={stage >= 2}>
        <path
          d="M239 85 Q238 55 270 53 Q281 24 313 40 Q347 34 353 68 Q381 75 363 96 L254 96Z"
          fill="#F4F6FA"
          stroke={INK}
          strokeWidth="2.5"
        />
        <path
          d="M250 90 Q273 78 295 90 Q319 77 350 91"
          fill="none"
          stroke="#B7C5D4"
          strokeWidth="2"
        />
        <path
          d="M85 145 L143 226 L210 128"
          fill="none"
          stroke="#7C8C75"
          strokeWidth="2"
        />
      </Layer>

      <Layer show={stage >= 3}>
        <path
          d="M100 233 Q135 203 132 174 Q129 155 151 140"
          fill="none"
          stroke="#398BD4"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <path
          d="M300 96 L295 120 M320 96 L315 120 M340 96 L335 120"
          stroke="#398BD4"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </Layer>

      <Layer show={stage >= 4}>
        <g fill="none" stroke="#6BBDE2" strokeWidth="4" strokeLinecap="round">
          <path d="M155 214 Q174 170 164 133" strokeDasharray="7 7" />
          <path d="M203 213 Q220 169 211 130" strokeDasharray="7 7" />
          <path d="M155 146 L164 133 L172 146 M202 143 L211 130 L219 143" />
        </g>
        <g fill="#398BD4">
          <path d="M290 117 Q280 132 290 137 Q300 132 290 117Z" />
          <path d="M315 117 Q305 132 315 137 Q325 132 315 117Z" />
          <path d="M340 117 Q330 132 340 137 Q350 132 340 117Z" />
        </g>
      </Layer>

      <Layer show={stage >= 5}>
        <g stroke={INK} strokeWidth="1.2" fill="none">
          <path d="M165 150 L105 105 L20 105" />
          <path d="M313 60 L365 25 L395 25" />
          <path d="M112 221 L55 265 L10 265" />
        </g>
        <Label x={20} y={98}>Evaporation</Label>
        <Label x={395} y={19} anchor="end">Condensation</Label>
        <Label x={10} y={280}>Collection</Label>
        <Label x={200} y={295} anchor="middle">Water cycle</Label>
      </Layer>
    </>
  );
}

// SOLAR SYSTEM
function SolarSystem({ stage }: { stage: number }) {
  const planets = [
    { x: 200, y: 150, r: 8, c: '#A8A8A8' },
    { x: 223, y: 150, r: 12, c: '#D9A15D' },
    { x: 252, y: 150, r: 13, c: '#4C8FC8' },
    { x: 281, y: 150, r: 10, c: '#C96F4B' },
    { x: 322, y: 150, r: 25, c: '#D9B47A' },
    { x: 365, y: 150, r: 20, c: '#D7C08A' },
  ];

  return (
    <>
      <Layer>
        <circle cx="200" cy="150" r="28" fill="#F5B942" stroke="#C77A23" strokeWidth="3" />
        <g stroke="#F5B942" strokeWidth="2">
          <path d="M200 109 V96 M200 204 V191 M159 150 H146 M254 150 H241 M171 121 L161 111 M229 179 L239 189 M229 121 L239 111 M171 179 L161 189" />
        </g>
      </Layer>

      <Layer show={stage >= 2}>
        {[45, 70, 95, 120, 150, 178].map((r) => (
          <circle
            key={r}
            cx="200"
            cy="150"
            r={r}
            fill="none"
            stroke="#A99BB0"
            strokeWidth="1.3"
            strokeDasharray="4 5"
          />
        ))}
      </Layer>

      <Layer show={stage >= 3}>
        {planets.slice(0, 4).map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={p.r}
            fill={p.c}
            stroke={INK}
            strokeWidth="1.5"
          />
        ))}
      </Layer>

      <Layer show={stage >= 4}>
        {planets.slice(4).map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={p.r}
            fill={p.c}
            stroke={INK}
            strokeWidth="1.5"
          />
        ))}
        <ellipse
          cx="365"
          cy="150"
          rx="31"
          ry="9"
          fill="none"
          stroke="#A98452"
          strokeWidth="4"
          transform="rotate(-18 365 150)"
        />
        <g fill="#B7A4A0">
          {Array.from({ length: 20 }, (_, i) => (
            <circle
              key={i}
              cx={267 + i * 3.2}
              cy={91 + (i % 4) * 4}
              r="1.5"
            />
          ))}
        </g>
      </Layer>

      <Layer show={stage >= 5}>
        <g stroke={INK} strokeWidth="1.2" fill="none">
          <path d="M200 120 L160 55 L110 55" />
          <path d="M322 126 L330 60 L390 60" />
          <path d="M365 170 L380 225 L395 225" />
        </g>
        <Label x={110} y={48}>Sun</Label>
        <Label x={390} y={54} anchor="end">Jupiter</Label>
        <Label x={395} y={239} anchor="end">Saturn and rings</Label>
        <Label x={200} y={295} anchor="middle">
          Solar system (schematic, not to scale)
        </Label>
      </Layer>
    </>
  );
}

// MAIN TOPIC SVG RENDERER
export function TopicSvg({
  topic,
  stage = 5,
  className = '',
  title,
}: TopicSvgProps) {
  let content: ReactNode;

  switch (topic.slug) {
    case 'animal-cell':
      content = <AnimalCell stage={stage} />;
      break;

    case 'human-brain':
      content = <Brain stage={stage} />;
      break;

    case 'dog':
      content = <Animal stage={stage} />;
      break;

    case 'cat':
      content = <Animal stage={stage} cat />;
      break;

    case 'plant-anatomy':
      content = <Plant stage={stage} />;
      break;

    case 'photosynthesis':
      content = <Leaf stage={stage} />;
      break;

    case 'volcano':
      content = <Volcano stage={stage} />;
      break;

    case 'water-cycle':
      content = <WaterCycle stage={stage} />;
      break;

    case 'solar-system':
      content = <SolarSystem stage={stage} />;
      break;

    default:
      content = (
        <>
          {topic.parts
            .filter((part) => part.drawStage <= stage)
            .map((part) => (
              <motion.g
                key={part.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                {createElement(part.svg.tag as ElementType, {
                  ...part.svg.attrs,
                  fill:
                    stage === 5 && part.color !== 'none'
                      ? part.color
                      : 'none',
                  stroke: part.decorative ? '#8B4F67' : INK,
                  strokeWidth: part.decorative ? 1.2 : 2.5,
                  strokeLinecap: 'round',
                  strokeLinejoin: 'round',
                  strokeDasharray: part.decorative ? '4 5' : undefined,
                })}
              </motion.g>
            ))}
        </>
      );
      break;
  }

  return (
    <svg
      viewBox="0 0 400 300"
      role="img"
      aria-label={title ?? `${topic.title} illustration`}
      className={className}
      preserveAspectRatio="xMidYMid meet"
      width="100%"
      height="100%"
      style={{
        display: 'block',
        overflow: 'visible',
      }}
    >
      {content}
    </svg>
  );
}
