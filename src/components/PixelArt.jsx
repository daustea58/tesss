import React from 'react';

export function PixelHeart({ className = '', label = '' }) {
  return (
    <span className={`pixel-heart ${className}`} role={label ? 'img' : undefined} aria-label={label || undefined}>
      <i />
    </span>
  );
}

export function PixelSparkle({ className = '' }) {
  return <span className={`pixel-sparkle ${className}`} aria-hidden="true" />;
}

export function PixelFlower({ className = '', color = 'pink' }) {
  return (
    <span className={`pixel-flower pixel-flower--${color} ${className}`} aria-hidden="true">
      <i /><i /><i /><i /><b />
    </span>
  );
}

export function PixelCloud({ className = '' }) {
  return (
    <span className={`pixel-cloud ${className}`} aria-hidden="true">
      <i /><i /><i /><i />
    </span>
  );
}

export function PixelGarden({ subtle = false }) {
  const flowers = Array.from({ length: 18 }, (_, index) => index);
  return (
    <div className={`pixel-garden ${subtle ? 'pixel-garden--subtle' : ''}`} aria-hidden="true">
      <div className="sky-dither" />
      <PixelCloud className="cloud cloud--one" />
      <PixelCloud className="cloud cloud--two" />
      <PixelCloud className="cloud cloud--three" />
      <div className="far-hills"><i /><i /><i /></div>
      <div className="pixel-tree tree--left"><i className="trunk" /><i className="crown crown--a" /><i className="crown crown--b" /><i className="crown crown--c" /></div>
      <div className="pixel-tree tree--right"><i className="trunk" /><i className="crown crown--a" /><i className="crown crown--b" /><i className="crown crown--c" /></div>
      <div className="garden-grass" />
      <div className="garden-flowers">
        {flowers.map((flower) => (
          <PixelFlower key={flower} color={flower % 4 === 0 ? 'white' : flower % 3 === 0 ? 'dusty' : 'pink'} className={`garden-flower garden-flower--${flower + 1}`} />
        ))}
      </div>
      <PixelHeart className="garden-heart garden-heart--one" />
      <PixelHeart className="garden-heart garden-heart--two" />
      <PixelHeart className="garden-heart garden-heart--three" />
      <PixelSparkle className="garden-sparkle garden-sparkle--one" />
      <PixelSparkle className="garden-sparkle garden-sparkle--two" />
      <PixelSparkle className="garden-sparkle garden-sparkle--three" />
      <span className="pixel-butterfly butterfly--one"><i /><i /></span>
      <span className="pixel-butterfly butterfly--two"><i /><i /></span>
    </div>
  );
}

export function PixelIcon({ type, className = '' }) {
  const common = { viewBox: '0 0 64 64', className: `pixel-icon ${className}`, role: 'img', 'aria-hidden': true, shapeRendering: 'crispEdges' };
  if (type === 'music') {
    return <svg {...common}><rect x="9" y="12" width="46" height="39" fill="#6e4054"/><rect x="13" y="16" width="38" height="31" fill="#f5b9c7"/><rect x="18" y="20" width="28" height="12" fill="#fff7ec"/><rect x="22" y="23" width="20" height="6" fill="#9bb8cc"/><rect x="17" y="38" width="9" height="9" fill="#d06e8b"/><rect x="38" y="38" width="9" height="9" fill="#d06e8b"/><rect x="20" y="41" width="3" height="3" fill="#fff7ec"/><rect x="41" y="41" width="3" height="3" fill="#fff7ec"/><rect x="28" y="36" width="8" height="4" fill="#7f8b82"/><rect x="31" y="34" width="2" height="8" fill="#7f8b82"/></svg>;
  }
  if (type === 'camera') {
    return <svg {...common}><rect x="8" y="21" width="48" height="30" fill="#6e4054"/><rect x="14" y="17" width="16" height="7" fill="#6e4054"/><rect x="12" y="25" width="40" height="22" fill="#f5b9c7"/><rect x="20" y="27" width="24" height="18" fill="#fff7ec"/><rect x="24" y="30" width="16" height="12" fill="#9bb8cc"/><rect x="28" y="33" width="8" height="6" fill="#d9859a"/><rect x="46" y="27" width="3" height="3" fill="#813f59"/></svg>;
  }
  if (type === 'letter') {
    return <svg {...common}><rect x="7" y="15" width="50" height="36" fill="#6e4054"/><rect x="11" y="19" width="42" height="28" fill="#f4aabd"/><path d="M11 20h42L32 37z" fill="#fff7ec"/><path d="M11 46l15-13 6 5 6-5 15 13z" fill="#dd809a"/><rect x="29" y="29" width="6" height="6" fill="#813f59"/></svg>;
  }
  return <svg {...common}><rect x="13" y="23" width="38" height="29" fill="#6e4054"/><rect x="17" y="27" width="30" height="21" fill="#e99aad"/><rect x="10" y="18" width="44" height="10" fill="#f5b9c7"/><rect x="28" y="18" width="8" height="34" fill="#fff7ec"/><rect x="17" y="35" width="30" height="7" fill="#fff7ec"/><rect x="28" y="34" width="8" height="9" fill="#d06e8b"/><rect x="25" y="37" width="14" height="3" fill="#d06e8b"/></svg>;
}

const roseColors = {
  blush: { dark: '#944e68', mid: '#d9859a', light: '#f5b9c7', shine: '#fff1ed' },
  dusty: { dark: '#7a5668', mid: '#b7859a', light: '#ddb4c2', shine: '#fff0ef' },
  pale: { dark: '#b46c82', mid: '#edb1be', light: '#ffd2d9', shine: '#fff9f4' },
};

function PixelRose({ x, y, scale = 1, variant = 'blush', delay = 0 }) {
  const c = roseColors[variant];
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <g className="bouquet-rose" style={{ '--bloom-delay': `${delay}s` }}>
        <rect x="-26" y="-14" width="52" height="28" fill={c.dark} />
        <rect x="-19" y="-22" width="38" height="44" fill={c.dark} />
        <rect x="-31" y="-7" width="10" height="14" fill={c.mid} />
        <rect x="21" y="-7" width="10" height="14" fill={c.mid} />
        <rect x="-14" y="-27" width="28" height="10" fill={c.mid} />
        <rect x="-23" y="-13" width="46" height="26" fill={c.mid} />
        <rect x="-14" y="-20" width="28" height="40" fill={c.mid} />
        <rect x="-16" y="-9" width="13" height="18" fill={c.light} />
        <rect x="3" y="-9" width="13" height="18" fill={c.light} />
        <rect x="-8" y="-14" width="16" height="28" fill={c.light} />
        <rect x="-10" y="-5" width="20" height="14" fill={c.dark} />
        <rect x="-5" y="-10" width="10" height="10" fill={c.dark} />
        <rect x="-2" y="-7" width="6" height="6" fill={c.shine} />
        <rect x="-19" y="-16" width="7" height="7" fill={c.shine} />
        <rect x="12" y="6" width="6" height="6" fill={c.shine} />
      </g>
    </g>
  );
}

function PixelDaisy({ x, y, scale = 1, delay = 0 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <g className="bouquet-daisy" style={{ '--bloom-delay': `${delay}s` }}>
        <rect x="-4" y="-19" width="8" height="38" fill="#d8dce0" />
        <rect x="-19" y="-4" width="38" height="8" fill="#d8dce0" />
        <rect x="-13" y="-13" width="26" height="26" fill="#fffdf7" />
        <rect x="-5" y="-5" width="10" height="10" fill="#e6bb79" />
        <rect x="-2" y="-2" width="4" height="4" fill="#a76d56" />
      </g>
    </g>
  );
}

function PixelLeaf({ x, y, flip = false, delay = 0 }) {
  return (
    <g transform={`translate(${x} ${y}) ${flip ? 'scale(-1 1)' : ''}`}>
      <g className="bouquet-leaf" style={{ '--bloom-delay': `${delay}s` }}>
        <path d="M0 0h12v-6h12v-6h12v6h6v12h-6v6H22v6H10v-6H0z" fill="#6f887a" />
        <path d="M6 0h12v-6h12v6h6v6H24v6H12V6H6z" fill="#9eb4a3" />
        <rect x="18" y="-5" width="6" height="23" fill="#587265" />
      </g>
    </g>
  );
}

export function LuxuryBouquet({ compact = false, className = '' }) {
  const roses = [
    [400, 154, 1.15, 'pale'], [311, 181, 1.04, 'blush'], [490, 181, 1.04, 'blush'],
    [248, 232, 1.02, 'dusty'], [355, 230, 1.16, 'blush'], [448, 230, 1.16, 'pale'], [554, 232, 1.02, 'dusty'],
    [284, 294, 1.15, 'pale'], [397, 291, 1.28, 'blush'], [512, 294, 1.15, 'pale'],
    [338, 350, 1.1, 'dusty'], [459, 350, 1.1, 'blush'], [401, 390, 1.12, 'pale'],
  ];
  const leaves = [[211, 220, false], [588, 220, true], [208, 302, false], [593, 302, true], [245, 380, false], [556, 380, true], [298, 414, false], [504, 414, true]];
  const daisies = [[269, 162], [534, 160], [218, 269], [580, 269], [267, 339], [535, 339], [330, 132], [470, 132], [398, 114]];
  return (
    <div className={`luxury-bouquet ${compact ? 'luxury-bouquet--compact' : ''} ${className}`}>
      <svg viewBox="0 0 800 650" role="img" aria-label="Buket bunga pixel-art mewah berwarna dusty pink dan abu-abu" shapeRendering="crispEdges">
        <g className="bouquet-halo"><rect x="324" y="78" width="152" height="4" /><rect x="262" y="110" width="276" height="4" /><rect x="205" y="174" width="390" height="4" /></g>
        <g className="bouquet-sparkles">
          <path d="M155 176h8v-8h8v8h8v8h-8v8h-8v-8h-8z" /><path d="M627 182h7v-7h7v7h7v7h-7v7h-7v-7h-7z" />
          <path d="M191 408h6v-6h6v6h6v6h-6v6h-6v-6h-6z" /><path d="M595 409h6v-6h6v6h6v6h-6v6h-6v-6h-6z" />
        </g>
        <g className="bouquet-stems">
          <path d="M400 252v222M350 242l50 232M450 242l-50 232M300 256l100 218M500 256L400 474" />
        </g>
        {leaves.map(([x, y, flip], index) => <PixelLeaf key={`${x}-${y}`} x={x} y={y} flip={flip} delay={index * 0.07} />)}
        <g className="bouquet-wrap bouquet-wrap--back"><path d="M240 372l160 199 160-199-68-52H308z" /><path d="M237 372l163 243 163-243-59-56H296z" /></g>
        <g className="bouquet-wrap bouquet-wrap--paper"><path d="M208 351l192 267 192-267-101-61H309z" /><path d="M263 360l137 242 137-242-64-38H327z" /><path d="M318 397l82 205 82-205-40-25h-84z" /></g>
        <g className="bouquet-wrap-lines"><path d="M238 370l162 242 162-242M282 386l118 214 118-214M321 401l79 201 79-201" /></g>
        <g className="bouquet-flower-bed">
          {leaves.slice(0, 4).map(([x, y, flip], index) => <PixelLeaf key={`top-${x}`} x={x + (flip ? -16 : 16)} y={y - 62} flip={flip} delay={0.3 + index * 0.07} />)}
          {daisies.map(([x, y], index) => <PixelDaisy key={`${x}-${y}`} x={x} y={y} scale={index === 8 ? 0.82 : 0.72} delay={0.22 + index * 0.06} />)}
          {roses.map(([x, y, scale, variant], index) => <PixelRose key={`${x}-${y}`} x={x} y={y} scale={scale} variant={variant} delay={0.08 + index * 0.09} />)}
        </g>
        <g className="bouquet-ribbon"><path d="M335 480h130v46h-130z" /><path d="M335 510l-101 84 104-25 62-43zM465 510l101 84-104-25-62-43z" /><path d="M369 495h62v62h-62z" /><rect x="389" y="510" width="22" height="24" /></g>
        <g className="bouquet-silver"><rect x="296" y="433" width="11" height="89" /><rect x="493" y="433" width="11" height="89" /><rect x="285" y="440" width="32" height="10" /><rect x="483" y="440" width="32" height="10" /></g>
        <g className="bouquet-shine"><rect x="355" y="431" width="10" height="10" /><rect x="435" y="447" width="8" height="8" /><rect x="388" y="580" width="24" height="5" /></g>
      </svg>
      <PixelHeart className="bouquet-heart bouquet-heart--left" />
      <PixelHeart className="bouquet-heart bouquet-heart--right" />
      <PixelSparkle className="bouquet-sparkle bouquet-sparkle--top" />
      <PixelSparkle className="bouquet-sparkle bouquet-sparkle--bottom" />
    </div>
  );
}

export function PixelPhotoPlaceholder({ index, tone = 'rose', label = 'GANTI FOTO' }) {
  return (
    <div className={`photo-placeholder photo-placeholder--${tone}`} aria-label={`Slot foto ${index}; ${label}`}>
      <span className="placeholder-sun" />
      <span className="placeholder-hill placeholder-hill--one" />
      <span className="placeholder-hill placeholder-hill--two" />
      <PixelHeart className="placeholder-heart" />
      <b>{label}</b>
      <small>PHOTO {String(index).padStart(2, '0')}</small>
    </div>
  );
}

export function PixelCouplePlaceholder() {
  return (
    <div className="couple-placeholder" aria-label="Slot foto pasangan">
      <div className="couple-sunset"><i /><i /><i /></div>
      <div className="couple-figures"><span className="figure figure--one" /><span className="figure figure--two" /></div>
      <div className="couple-caption">ADD YOUR PHOTO</div>
    </div>
  );
}
