
import { motion } from 'framer-motion';

interface Props {
  stage?: 1 | 2 | 3 | 4 | 5;
  className?: string;
}

const INK = '#3A004D';

function Layer({ children, show = true }: {
  children: React.ReactNode;
  show?: boolean;
}) {
  if (!show) return null;
  return (
    <motion.g
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.55 }}
    >
      {children}
    </motion.g>
  );
}

export function HumanHeartDiagram({ stage = 5, className = '' }: Props) {
  const chambers = stage >= 2;
  const vessels = stage >= 3;
  const internal = stage >= 4;
  const labels = stage >= 5;

  return (
    <svg
      viewBox="0 0 520 440"
      role="img"
      aria-label={`Human heart anatomical drawing, stage ${stage} of 5`}
      className={className}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="heart-muscle" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F7B0B9" />
          <stop offset="55%" stopColor="#D96B80" />
          <stop offset="100%" stopColor="#96334E" />
        </linearGradient>
        <linearGradient id="heart-blue" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#9ED8F0" />
          <stop offset="100%" stopColor="#3476B2" />
        </linearGradient>
        <linearGradient id="heart-red" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F59A91" />
          <stop offset="100%" stopColor="#A91F40" />
        </linearGradient>
      </defs>

      {/* Stage 1: Anatomical outer heart */}
      <Layer>
        <path
          d="M258 391
             C226 366 169 331 135 284
             C103 239 91 191 111 150
             C128 112 168 98 199 118
             C224 132 240 155 254 178
             C274 143 304 113 342 115
             C389 116 421 151 415 202
             C410 260 369 316 326 351
             C297 375 274 387 258 391Z"
          fill="url(#heart-muscle)"
          fillOpacity="0.25"
          stroke={INK}
          strokeWidth="5"
          strokeLinejoin="round"
        />
        <path
          d="M136 190 Q150 143 192 143 Q217 146 235 179
             M278 180 Q305 138 349 142 Q383 149 390 187"
          fill="none"
          stroke="#A94E65"
          strokeWidth="2.5"
        />
        <path
          d="M152 265 Q183 316 236 350 M362 257 Q328 323 280 357"
          fill="none"
          stroke="#A94E65"
          strokeWidth="2"
        />
      </Layer>

      {/* Stage 2: Four chambers */}
      <Layer show={chambers}>
        {/* Right atrium: viewer's left */}
        <path
          d="M145 164 Q164 137 207 151 Q228 164 223 218
             Q211 245 170 233 Q140 218 145 164Z"
          fill="url(#heart-blue)"
          stroke={INK}
          strokeWidth="3"
        />
        {/* Left atrium: viewer's right */}
        <path
          d="M284 157 Q325 132 367 158 Q391 184 371 226
             Q345 250 299 225 Q277 202 284 157Z"
          fill="url(#heart-red)"
          stroke={INK}
          strokeWidth="3"
        />
        {/* Right ventricle */}
        <path
          d="M164 234 Q200 246 225 221
             Q252 243 260 293 Q264 345 235 365
             Q195 345 169 302 Q149 269 164 234Z"
          fill="url(#heart-blue)"
          stroke={INK}
          strokeWidth="3"
        />
        {/* Left ventricle */}
        <path
          d="M282 224 Q317 246 369 224
             Q383 266 351 318 Q316 362 265 390
             Q248 350 254 294 Q260 251 282 224Z"
          fill="url(#heart-red)"
          stroke={INK}
          strokeWidth="3"
        />
        {/* Muscle thickness */}
        <path d="M270 250 Q253 310 267 378" fill="none" stroke="#7F263F" strokeWidth="7" />
      </Layer>

      {/* Stage 3: Major blood vessels */}
      <Layer show={vessels}>
        {/* Aorta */}
        <path
          d="M284 158 C265 128 268 80 292 54
             C318 26 365 39 370 75
             L371 102"
          fill="none"
          stroke="#A91F40"
          strokeWidth="25"
          strokeLinecap="round"
        />
        <path
          d="M284 158 C265 128 268 80 292 54
             C318 26 365 39 370 75"
          fill="none"
          stroke={INK}
          strokeWidth="2.5"
        />
        {/* Aortic branches */}
        <path d="M299 53 L293 19 M327 43 L332 10 M354 51 L369 25"
          fill="none" stroke="#A91F40" strokeWidth="12" strokeLinecap="round" />
        <g fill="none" stroke={INK} strokeWidth="2">
          <path d="M299 53 L293 19 M327 43 L332 10 M354 51 L369 25" />
        </g>

        {/* Pulmonary trunk */}
        <path
          d="M243 174 C222 138 194 113 165 108
             C137 104 120 123 125 150"
          fill="none"
          stroke="#397DB5"
          strokeWidth="23"
          strokeLinecap="round"
        />
        <path d="M243 174 C222 138 194 113 165 108"
          fill="none" stroke={INK} strokeWidth="2.5" />

        {/* Superior vena cava */}
        <path d="M169 45 Q160 75 170 115"
          fill="none" stroke="#397DB5" strokeWidth="20" strokeLinecap="round" />
        <path d="M169 45 Q160 75 170 115"
          fill="none" stroke={INK} strokeWidth="2" />

        {/* Inferior vena cava */}
        <path d="M180 305 Q177 350 164 382"
          fill="none" stroke="#397DB5" strokeWidth="19" strokeLinecap="round" />
        <path d="M180 305 Q177 350 164 382"
          fill="none" stroke={INK} strokeWidth="2" />

        {/* Pulmonary veins */}
        <g fill="none" stroke="#A91F40" strokeWidth="12" strokeLinecap="round">
          <path d="M370 176 L420 158" />
          <path d="M370 195 L423 207" />
        </g>
        <g fill="none" stroke={INK} strokeWidth="2">
          <path d="M370 176 L420 158" />
          <path d="M370 195 L423 207" />
        </g>
      </Layer>

      {/* Stage 4: Septum, valves and coronary arteries */}
      <Layer show={internal}>
        {/* Septum */}
        <path d="M257 215 Q260 276 262 373"
          fill="none" stroke="#7B2943" strokeWidth="9" strokeLinecap="round" />
        <path d="M255 154 L257 220"
          fill="none" stroke="#7B2943" strokeWidth="6" />

        {/* Atrioventricular valves */}
        <g fill="none" stroke="#5D2942" strokeWidth="4" strokeLinecap="round">
          <path d="M208 224 Q228 245 249 222" />
          <path d="M270 222 Q292 245 313 222" />
          <path d="M218 230 L228 248 L241 230" />
          <path d="M281 230 L293 248 L306 230" />
        </g>

        {/* Chordae tendineae */}
        <g stroke="#F6D6D9" strokeWidth="2" fill="none">
          <path d="M228 246 L211 284 L221 310" />
          <path d="M238 246 L239 290 L246 315" />
          <path d="M292 246 L311 285 L303 315" />
          <path d="M303 246 L322 285 L316 309" />
        </g>

        {/* Semilunar valves */}
        <g stroke="#5D2942" strokeWidth="3" fill="#F7D8DC">
          <path d="M245 168 Q260 153 275 168 Q260 180 245 168Z" />
          <path d="M268 145 Q281 131 294 145 Q281 158 268 145Z" />
        </g>

        {/* Coronary arteries across surface */}
        <g fill="none" stroke="#9D1D3D" strokeWidth="5" strokeLinecap="round">
          <path d="M250 190 Q225 198 211 221 Q196 244 184 258" />
          <path d="M211 221 Q188 218 177 234" />
          <path d="M250 190 Q272 196 290 215 Q310 235 328 259" />
          <path d="M290 215 Q316 203 337 212" />
        </g>
        <g fill="none" stroke="#F5A4AC" strokeWidth="1.5">
          <path d="M250 190 Q225 198 211 221 Q196 244 184 258" />
          <path d="M250 190 Q272 196 290 215 Q310 235 328 259" />
        </g>

        {/* Muscle texture */}
        <g fill="none" stroke="#A84E67" strokeWidth="1.4" opacity="0.8">
          <path d="M174 275 Q190 297 214 319" />
          <path d="M183 287 Q199 309 225 330" />
          <path d="M291 282 Q315 303 337 287" />
          <path d="M284 301 Q307 321 326 305" />
        </g>
      </Layer>

      {/* Stage 5: Colour key and labels */}
      <Layer show={labels}>
        <g fill="none" stroke={INK} strokeWidth="1.3">
          <path d="M153 179 L75 159 L18 159" />
          <path d="M350 179 L436 158 L505 158" />
          <path d="M190 285 L91 305 L18 305" />
          <path d="M327 294 L433 311 L505 311" />
          <path d="M347 57 L425 39 L505 39" />
          <path d="M165 76 L88 55 L18 55" />
          <path d="M258 337 L258 414" />
        </g>
        <g fill={INK} fontSize="11" fontWeight="600">
          <text x="18" y="150">Right atrium</text>
          <text x="505" y="150" textAnchor="end">Left atrium</text>
          <text x="18" y="297">Right ventricle</text>
          <text x="505" y="303" textAnchor="end">Left ventricle</text>
          <text x="505" y="32" textAnchor="end">Aorta</text>
          <text x="18" y="47">Vena cava</text>
          <text x="258" y="428" textAnchor="middle">Interventricular septum</text>
        </g>

        <g transform="translate(174 405)" fontSize="10" fontWeight="600">
          <circle cx="0" cy="0" r="5" fill="#397DB5" />
          <text x="9" y="4" fill={INK}>Oxygen-poor blood</text>
          <circle cx="124" cy="0" r="5" fill="#A91F40" />
          <text x="133" y="4" fill={INK}>Oxygen-rich blood</text>
        </g>
      </Layer>
    </svg>
  );
}
