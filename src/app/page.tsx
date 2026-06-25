'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const TIX_URL = 'https://tix.africa/discover/shining-light-fyb-dinnernight';

const lux = [0.22, 1, 0.36, 1] as [number, number, number, number];

const TICKET_VARIANTS = {
  hidden: { opacity: 0, y: 32, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.75, ease: lux } },
};

const SCHEDULE_ITEM_VARIANTS = {
  hidden: { opacity: 0, y: 20, scale: 0.94 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: lux } },
};

// 16 rays every 22.5° — alternating gold (primary) and white (secondary)
const RAYS = [
  { angle:   0, length: 320, opacity: 0.24, width: 1.5, dur: 4.2, delay: 0.0, gold: true  },
  { angle:  22, length: 210, opacity: 0.11, width: 1.0, dur: 5.1, delay: 0.7, gold: false },
  { angle:  45, length: 290, opacity: 0.24, width: 1.5, dur: 3.8, delay: 1.3, gold: true  },
  { angle:  67, length: 220, opacity: 0.11, width: 1.0, dur: 4.9, delay: 2.1, gold: false },
  { angle:  90, length: 310, opacity: 0.24, width: 1.5, dur: 4.5, delay: 0.4, gold: true  },
  { angle: 112, length: 215, opacity: 0.11, width: 1.0, dur: 5.3, delay: 1.8, gold: false },
  { angle: 135, length: 280, opacity: 0.24, width: 1.5, dur: 4.0, delay: 0.9, gold: true  },
  { angle: 157, length: 205, opacity: 0.11, width: 1.0, dur: 4.7, delay: 2.5, gold: false },
  { angle: 180, length: 300, opacity: 0.24, width: 1.5, dur: 4.3, delay: 0.2, gold: true  },
  { angle: 202, length: 218, opacity: 0.11, width: 1.0, dur: 5.0, delay: 1.5, gold: false },
  { angle: 225, length: 285, opacity: 0.24, width: 1.5, dur: 3.9, delay: 1.1, gold: true  },
  { angle: 247, length: 208, opacity: 0.11, width: 1.0, dur: 4.8, delay: 2.3, gold: false },
  { angle: 270, length: 315, opacity: 0.24, width: 1.5, dur: 4.6, delay: 0.6, gold: true  },
  { angle: 292, length: 212, opacity: 0.11, width: 1.0, dur: 5.2, delay: 1.9, gold: false },
  { angle: 315, length: 275, opacity: 0.24, width: 1.5, dur: 4.1, delay: 0.8, gold: true  },
  { angle: 337, length: 202, opacity: 0.11, width: 1.0, dur: 5.4, delay: 2.7, gold: false },
];

const SPARKLES = [
  { x: -70,  y: -105, size: 3, opacity: 0.90, dur: 2.2, delay: 0.0 },
  { x:  85,  y:  -55, size: 4, opacity: 0.80, dur: 2.8, delay: 0.7 },
  { x: -105, y:   12, size: 2, opacity: 0.70, dur: 1.9, delay: 1.4 },
  { x:  78,  y:   72, size: 3, opacity: 0.90, dur: 2.5, delay: 0.3 },
  { x: -50,  y:  118, size: 2, opacity: 0.60, dur: 2.1, delay: 1.9 },
  { x:  118, y:  -82, size: 3, opacity: 0.80, dur: 3.0, delay: 1.0 },
  { x:  32,  y: -128, size: 2, opacity: 0.70, dur: 2.4, delay: 0.5 },
  { x: -138, y:  -28, size: 3, opacity: 0.75, dur: 2.6, delay: 2.2 },
];

export default function Home() {
  return (
    <main style={{ background: 'linear-gradient(160deg,#070663 0%,#05014A 40%,#030135 100%)', minHeight: '100vh', position: 'relative', overflowX: 'hidden', color: '#fff', fontFamily: 'var(--font-montserrat),sans-serif' }}>

      {/* ── Film grain luxury texture ── */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9998, opacity: 0.028, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.88' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: '180px 180px' }} />
      {/* ── Vignette ── */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9997, background: 'radial-gradient(ellipse at 50% 38%, transparent 30%, rgba(3,1,53,0.6) 100%)' }} />

      {/* ── Sunburst ── */}
      <div className="sunburst-wrap"><div className="sunburst" /></div>

      {/* ── Bokeh ── */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 1 }}>
        {BOKEH.map((b, i) => (
          <div key={i} style={{ position: 'absolute', left: b.x, top: b.y, width: b.size, height: b.size, borderRadius: '50%', background: b.gold ? `radial-gradient(circle,rgba(201,162,39,${b.op}) 0%,transparent 70%)` : `radial-gradient(circle,rgba(255,255,255,${b.op}) 0%,transparent 70%)`, animation: `float-up ${b.dur}s ease-in-out infinite`, animationDelay: `${b.delay}s` }} />
        ))}
      </div>

      {/* ══════════════════ HERO ══════════════════ */}
      <section style={{ position: 'relative', zIndex: 10, minHeight: '100vh', textAlign: 'center' }}>

        {/* ── Radiance: light radiating from behind The Shining Light ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2.8, delay: 0.5, ease: 'easeOut' }}
          style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}
        >
          {/* Outer atmospheric halo — slow, wide breath */}
          <motion.div
            animate={{ scale: [1, 1.18, 1], opacity: [0.28, 0.52, 0.28] }}
            transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut', repeatType: 'mirror' }}
            style={{ position: 'absolute', top: '38%', left: '50%', transform: 'translate(-50%,-50%)', width: 'clamp(360px,80vw,680px)', height: 'clamp(360px,80vw,680px)', borderRadius: '50%', background: 'radial-gradient(circle, rgba(201,162,39,0.22) 0%, rgba(255,158,0,0.10) 30%, rgba(157,78,221,0.06) 56%, transparent 72%)' }}
          />

          {/* Inner corona — tighter, slightly faster */}
          <motion.div
            animate={{ scale: [1, 1.30, 1], opacity: [0.38, 0.68, 0.38] }}
            transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', repeatType: 'mirror', delay: 0.9 }}
            style={{ position: 'absolute', top: '38%', left: '50%', transform: 'translate(-50%,-50%)', width: 'clamp(150px,30vw,270px)', height: 'clamp(150px,30vw,270px)', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,240,180,0.36) 0%, rgba(201,162,39,0.26) 34%, transparent 68%)' }}
          />

          {/* Bright core — intense, quick pulse */}
          <motion.div
            animate={{ scale: [1, 1.50, 1], opacity: [0.50, 0.95, 0.50] }}
            transition={{ duration: 2.9, repeat: Infinity, ease: 'easeInOut', repeatType: 'mirror', delay: 0.3 }}
            style={{ position: 'absolute', top: '38%', left: '50%', transform: 'translate(-50%,-50%)', width: 'clamp(48px,9vw,82px)', height: 'clamp(48px,9vw,82px)', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,240,0.88) 0%, rgba(255,220,100,0.52) 40%, transparent 70%)' }}
          />

          {/* 16 light rays radiating from the title centre */}
          <div style={{ position: 'absolute', top: '38%', left: '50%' }}>
            {RAYS.map((ray, i) => (
              <motion.div
                key={i}
                animate={{ opacity: [ray.opacity * 0.22, ray.opacity, ray.opacity * 0.22] }}
                transition={{ duration: ray.dur, repeat: Infinity, ease: 'easeInOut', repeatType: 'mirror', delay: ray.delay }}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: -ray.width / 2,
                  width: ray.width,
                  height: ray.length,
                  background: ray.gold
                    ? `linear-gradient(to bottom, rgba(201,162,39,${Math.min(ray.opacity * 3.2, 1)}) 0%, rgba(255,158,0,${ray.opacity * 1.6}) 28%, transparent 85%)`
                    : `linear-gradient(to bottom, rgba(255,255,220,${ray.opacity * 2.6}) 0%, transparent 80%)`,
                  transformOrigin: '50% 0',
                  transform: `rotate(${ray.angle}deg)`,
                }}
              />
            ))}
          </div>

          {/* Sparkle star-points around the title */}
          <div style={{ position: 'absolute', top: '38%', left: '50%' }}>
            {SPARKLES.map((s, i) => (
              <motion.div
                key={i}
                animate={{ opacity: [0, s.opacity, 0], scale: [0.3, 1, 0.3] }}
                transition={{ duration: s.dur, repeat: Infinity, ease: 'easeInOut', repeatType: 'mirror', delay: s.delay }}
                style={{
                  position: 'absolute',
                  top: s.y,
                  left: s.x,
                  width: s.size,
                  height: s.size,
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, #fffde4 0%, rgba(201,162,39,0.55) 50%, transparent 100%)',
                  boxShadow: `0 0 ${s.size * 4}px ${s.size + 1}px rgba(201,162,39,0.52)`,
                }}
              />
            ))}
          </div>

          {/* ── Rotating ornamental rings behind title ── */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 42, repeat: Infinity, ease: 'linear' }}
            style={{ position: 'absolute', top: '38%', left: '50%', width: 'clamp(300px,62vw,520px)', height: 'clamp(300px,62vw,520px)', borderRadius: '50%', border: '1px solid rgba(201,162,39,0.10)', x: '-50%', y: '-50%', pointerEvents: 'none' }}
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 29, repeat: Infinity, ease: 'linear' }}
            style={{ position: 'absolute', top: '38%', left: '50%', width: 'clamp(210px,42vw,370px)', height: 'clamp(210px,42vw,370px)', borderRadius: '50%', border: '1px dashed rgba(201,162,39,0.07)', x: '-50%', y: '-50%', pointerEvents: 'none' }}
          />

          {/* ── Expanding ripple rings ── */}
          {[0,1,2,3].map(i => (
            <motion.div
              key={i}
              style={{ position: 'absolute', top: '38%', left: '50%', width: 'clamp(280px,65vw,600px)', height: 'clamp(280px,65vw,600px)', borderRadius: '50%', border: '1px solid rgba(201,162,39,0.38)', x: '-50%', y: '-50%', originX: 0.5, originY: 0.5, pointerEvents: 'none' }}
              animate={{ scale: [0, 1.15], opacity: [0.55, 0] }}
              transition={{ duration: 3.8, delay: i * 0.95, repeat: Infinity, ease: 'easeOut' }}
            />
          ))}

          {/* ── Rising floating symbols ── */}
          {FLOATERS.map((f, idx) => (
            <div
              key={idx}
              style={{ position: 'absolute', left: f.x, bottom: '-3%', fontSize: f.size + 'px', color: '#c9a227', animation: `float-rise ${f.dur}s linear ${f.delay}s infinite`, userSelect: 'none', pointerEvents: 'none' }}
            >
              {f.symbol}
            </div>
          ))}

          {/* ── Horizontal light streaks ── */}
          {STREAKS.map((s, idx) => (
            <motion.div
              key={idx}
              style={{ position: 'absolute', top: s.y, width: 'clamp(80px,20vw,200px)', height: '1px', background: `linear-gradient(90deg,transparent,rgba(201,162,39,${s.opa}),transparent)`, pointerEvents: 'none' }}
              animate={{ x: ['-220px', '110vw'] }}
              transition={{ duration: s.dur, delay: s.delay, repeat: Infinity, ease: 'linear' }}
            />
          ))}
        </motion.div>

        {/* ── Hero content (above radiance) ── */}
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: 'clamp(5rem,12vw,8rem) 1.5rem clamp(3rem,5vw,4rem)' }}>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 0.82, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: lux }}
            style={{ fontFamily: 'var(--font-great-vibes)', fontSize: 'clamp(1.2rem,4vw,1.8rem)', marginBottom: '0.5rem', letterSpacing: '0.03em' }}
          >
            CAC Fyb Class &apos;26
          </motion.p>

          {/* Big title */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 28 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.05, ease: lux }}
            style={{ lineHeight: 1 }}
          >
            <h1 style={{ fontFamily: 'var(--font-playfair)', fontWeight: 900, fontSize: 'clamp(3.8rem,17vw,9.5rem)', textTransform: 'uppercase', letterSpacing: '-0.02em', lineHeight: 0.88, color: '#fff' }}>
              The<br />Shining
            </h1>
          </motion.div>

          {/* Gold badge */}
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.55, ease: lux }}
            className="light-badge"
            style={{ marginTop: '0.5rem', filter: 'drop-shadow(0 0 18px rgba(255,190,0,0.65)) drop-shadow(0 0 44px rgba(201,162,39,0.32))' }}
          >
            <span style={{ fontFamily: 'var(--font-great-vibes)', fontSize: 'clamp(1.9rem,6.5vw,3.6rem)', color: '#05014A', lineHeight: 1.1 }}>Light.</span>
          </motion.div>

          {/* Scripture ref */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.75 }}
            transition={{ duration: 0.8, delay: 0.85 }}
            style={{ fontWeight: 700, fontSize: 'clamp(0.6rem,1.8vw,0.85rem)', letterSpacing: '0.3em', marginTop: '2.5rem' }}
          >
            MATTHEW CH 5 VS 13–16
          </motion.p>

          {/* Ornamental divider */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.0, delay: 1.0, ease: lux }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.9rem', margin: '2rem auto' }}
          >
            <div style={{ width: 56, height: 1, background: 'linear-gradient(90deg, transparent, rgba(201,162,39,0.8))' }} />
            <motion.span
              animate={{ opacity: [0.6, 1, 0.6], scale: [0.85, 1.25, 0.85] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', repeatType: 'mirror' }}
              style={{ color: '#c9a227', fontSize: '0.75rem', display: 'block', filter: 'drop-shadow(0 0 6px rgba(255,190,0,0.9))' }}
            >✦</motion.span>
            <div style={{ width: 56, height: 1, background: 'linear-gradient(90deg, rgba(201,162,39,0.8), transparent)' }} />
          </motion.div>

          {/* Event card */}
          <motion.div
            initial={{ opacity: 0, y: 44, filter: 'blur(12px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1.1, delay: 1.05, ease: lux }}
            style={{ background: 'rgba(255,255,255,0.055)', border: '1px solid rgba(255,255,255,0.11)', borderRadius: 18, padding: 'clamp(1.4rem,4vw,2.2rem) clamp(1.8rem,7vw,4.5rem)', marginBottom: '2.5rem', backdropFilter: 'blur(10px)', width: '100%', maxWidth: 520 }}
          >
            <p style={{ fontSize: '0.68rem', letterSpacing: '0.28em', opacity: 0.5, marginBottom: '0.6rem', textTransform: 'uppercase' }}>Dinner Night</p>
            <p style={{ fontFamily: 'var(--font-playfair)', fontStyle: 'italic', fontSize: 'clamp(1.3rem,4.5vw,2rem)', marginBottom: '0.45rem' }}>
              Monday, 20th July 2026
            </p>
            <p style={{ fontSize: '0.78rem', opacity: 0.55, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
              CAC Chapel Lautech
            </p>
          </motion.div>

          {/* ── Ticket tiers ── */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.16, delayChildren: 1.38 } },
            }}
            style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', width: '100%', maxWidth: 500 }}
          >
            {/* Regular */}
            <motion.a
              variants={TICKET_VARIANTS}
              whileHover={{ y: -6, scale: 1.03, boxShadow: '0 14px 44px rgba(201,162,39,0.22)', transition: { type: 'spring', stiffness: 360, damping: 22 } }}
              href={TIX_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{ flex: '1 1 180px', background: 'rgba(255,255,255,0.05)', border: '1.5px solid rgba(255,255,255,0.15)', borderRadius: 16, padding: '1.5rem 1.2rem', textDecoration: 'none', color: '#fff', backdropFilter: 'blur(8px)', display: 'block', cursor: 'pointer' }}
            >
              <span style={{ fontSize: '0.58rem', letterSpacing: '0.28em', opacity: 0.6, textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem' }}>Regular</span>
              <span style={{ fontFamily: 'var(--font-playfair)', fontSize: '2rem', fontWeight: 900, color: 'rgba(255,255,255,0.85)', display: 'block', lineHeight: 1 }}>₦2,000</span>
              <span style={{ fontSize: '0.7rem', opacity: 0.5, marginTop: '0.4rem', display: 'block' }}>Standard admission</span>
              <span style={{ display: 'inline-block', marginTop: '1rem', padding: '0.4rem 1rem', borderRadius: 20, background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.07em' }}>
                Get Ticket →
              </span>
            </motion.a>

            {/* VIP */}
            <motion.a
              variants={TICKET_VARIANTS}
              whileHover={{ y: -6, scale: 1.03, boxShadow: '0 18px 60px rgba(201,162,39,0.70)', transition: { type: 'spring', stiffness: 360, damping: 22 } }}
              href={TIX_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{ flex: '1 1 180px', background: 'linear-gradient(135deg,#c9a227 0%,#ff9e00 50%,#c9a227 100%)', border: 'none', borderRadius: 16, padding: '1.5rem 1.2rem', textDecoration: 'none', color: '#05014A', backdropFilter: 'blur(8px)', display: 'block', cursor: 'pointer', boxShadow: '0 8px 40px rgba(201,162,39,0.45)', position: 'relative', overflow: 'hidden' }}
            >
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(105deg,transparent 30%,rgba(255,255,255,0.18) 50%,transparent 70%)', backgroundSize: '200% 100%', animation: 'gold-shimmer 3s ease-in-out infinite', pointerEvents: 'none' }} />
              <span style={{ fontSize: '0.58rem', letterSpacing: '0.28em', opacity: 0.75, textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem', fontWeight: 700 }}>✦ VIP ✦</span>
              <span style={{ fontFamily: 'var(--font-playfair)', fontSize: '2rem', fontWeight: 900, color: '#05014A', display: 'block', lineHeight: 1 }}>₦5,000</span>
              <span style={{ fontSize: '0.7rem', opacity: 0.7, marginTop: '0.4rem', display: 'block', fontWeight: 600 }}>Premium experience</span>
              <span style={{ display: 'inline-block', marginTop: '1rem', padding: '0.4rem 1rem', borderRadius: 20, background: '#05014A', color: '#c9a227', fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.07em' }}>
                Get VIP Ticket →
              </span>
            </motion.a>
          </motion.div>

        </div>{/* end content */}

        {/* ── Scroll indicator ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.8, duration: 1.2 }}
          style={{ position: 'absolute', bottom: '1.8rem', left: '50%', transform: 'translateX(-50%)', zIndex: 5, pointerEvents: 'none' }}
        >
          <motion.div
            animate={{ y: [0, 9, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.35rem' }}
          >
            <span style={{ fontSize: '0.52rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(201,162,39,0.7)' }}>Scroll</span>
            <div style={{ width: '1px', height: 26, background: 'linear-gradient(to bottom, rgba(201,162,39,0.7), transparent)' }} />
            <motion.div
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
              style={{ width: 5, height: 5, borderRadius: '50%', background: '#c9a227', boxShadow: '0 0 8px 3px rgba(201,162,39,0.4)' }}
            />
          </motion.div>
        </motion.div>
      </section>

      {/* ── Dinner silhouette ── */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 5, pointerEvents: 'none', lineHeight: 0 }}>
        <div style={{ position: 'absolute', bottom: 80, left: '50%', transform: 'translateX(-50%)', width: '60%', height: 60, background: 'radial-gradient(ellipse,rgba(201,162,39,0.18) 0%,transparent 70%)' }} />
        <svg viewBox="0 0 1440 340" preserveAspectRatio="xMidYMax meet" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', display: 'block' }}>
          <ellipse cx="720" cy="300" rx="500" ry="28" fill="#0a0535" opacity="0.9" />
          <rect x="220" y="292" width="1000" height="14" rx="4" fill="#0d0640" opacity="0.95" />
          <ellipse cx="720" cy="292" rx="502" ry="10" fill="none" stroke="#c9a227" strokeWidth="0.8" opacity="0.3" />
          <rect x="712" y="240" width="16" height="50" rx="4" fill="#1a0f5e" />
          <ellipse cx="720" cy="240" rx="8" ry="3" fill="#c9a227" opacity="0.8" />
          <ellipse cx="720" cy="230" rx="4" ry="8" fill="#ff9e00" opacity="0.9" style={{ animation: 'flicker 1.8s ease-in-out infinite' }} />
          <ellipse cx="720" cy="234" rx="2.5" ry="5" fill="#fff176" opacity="0.8" style={{ animation: 'flicker 1.4s ease-in-out infinite reverse' }} />
          <ellipse cx="720" cy="240" rx="60" ry="30" fill="#c9a227" opacity="0.06" />
          {[560,620,680,760,820,880].map((x,i) => (<g key={i}><ellipse cx={x} cy="285" rx="9" ry="3" fill="#1a1060" opacity="0.7" /><line x1={x} y1="285" x2={x} y2="262" stroke="#2a1a80" strokeWidth="1.5" /><ellipse cx={x} cy="262" rx="7" ry="14" fill="none" stroke="#2a1a80" strokeWidth="1.5" /><ellipse cx={x} cy="265" rx="5" ry="5" fill="rgba(160,0,60,0.25)" /></g>))}
          <g transform="translate(260,200)"><ellipse cx="0" cy="-40" rx="18" ry="20" fill="#0a0535" /><path d="M-22 -20 Q0 10 22 -20 L30 80 Q0 90 -30 80 Z" fill="#0a0535" /><path d="M-22 -15 Q-50 20 -60 50" stroke="#0a0535" strokeWidth="14" strokeLinecap="round" fill="none" /><path d="M22 -15 Q50 10 55 30" stroke="#0a0535" strokeWidth="14" strokeLinecap="round" fill="none" /></g>
          <g transform="translate(420,195)"><ellipse cx="0" cy="-42" rx="19" ry="21" fill="#0c0440" /><path d="M-24 -22 Q0 8 24 -22 L32 82 Q0 92 -32 82 Z" fill="#0c0440" /><path d="M-24 -16 Q-55 15 -60 45" stroke="#0c0440" strokeWidth="14" strokeLinecap="round" fill="none" /><path d="M24 -16 Q54 15 58 44" stroke="#0c0440" strokeWidth="14" strokeLinecap="round" fill="none" /></g>
          <g transform="translate(580,185)"><ellipse cx="0" cy="-45" rx="20" ry="22" fill="#080330" /><path d="M-25 -24 Q0 5 25 -24 L33 85 Q0 95 -33 85 Z" fill="#080330" /><path d="M-25 -18 Q-58 12 -62 42" stroke="#080330" strokeWidth="15" strokeLinecap="round" fill="none" /><path d="M25 -18 Q55 8 58 38" stroke="#080330" strokeWidth="15" strokeLinecap="round" fill="none" /></g>
          <g transform="translate(860,185)"><ellipse cx="0" cy="-45" rx="20" ry="22" fill="#080330" /><path d="M-25 -24 Q0 5 25 -24 L33 85 Q0 95 -33 85 Z" fill="#080330" /><path d="M-25 -18 Q-58 12 -62 42" stroke="#080330" strokeWidth="15" strokeLinecap="round" fill="none" /><path d="M25 -18 Q55 8 58 38" stroke="#080330" strokeWidth="15" strokeLinecap="round" fill="none" /></g>
          <g transform="translate(1020,195)"><ellipse cx="0" cy="-42" rx="19" ry="21" fill="#0c0440" /><path d="M-24 -22 Q0 8 24 -22 L32 82 Q0 92 -32 82 Z" fill="#0c0440" /><path d="M-24 -16 Q-55 15 -60 45" stroke="#0c0440" strokeWidth="14" strokeLinecap="round" fill="none" /><path d="M24 -16 Q54 15 58 44" stroke="#0c0440" strokeWidth="14" strokeLinecap="round" fill="none" /></g>
          <g transform="translate(1180,200)"><ellipse cx="0" cy="-40" rx="18" ry="20" fill="#0a0535" /><path d="M-22 -20 Q0 10 22 -20 L30 80 Q0 90 -30 80 Z" fill="#0a0535" /><path d="M-22 -15 Q-50 20 -55 50" stroke="#0a0535" strokeWidth="14" strokeLinecap="round" fill="none" /><path d="M22 -15 Q45 -45 40 -75" stroke="#0a0535" strokeWidth="14" strokeLinecap="round" fill="none" /><ellipse cx="40" cy="-78" rx="5" ry="9" fill="none" stroke="#2a1a80" strokeWidth="1.5" /></g>
          <rect x="0" y="306" width="1440" height="34" fill="#030135" />
        </svg>
      </div>

      {/* ══════════════════ SCRIPTURE ══════════════════ */}
      <section style={{ position: 'relative', zIndex: 10, background: 'rgba(0,0,0,0.28)', borderTop: '1px solid rgba(255,255,255,0.07)', padding: 'clamp(3rem,8vw,5rem) clamp(1.5rem,5vw,3rem)', textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1.0, ease: lux }}
        >
          <p style={{ fontSize: '0.68rem', letterSpacing: '0.3em', opacity: 0.45, marginBottom: '1.5rem', textTransform: 'uppercase' }}>Our Theme Scripture</p>
          <motion.blockquote
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.88 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, delay: 0.3 }}
            style={{ fontFamily: 'var(--font-playfair)', fontStyle: 'italic', fontSize: 'clamp(1rem,2.8vw,1.3rem)', maxWidth: 680, margin: '0 auto', lineHeight: 1.75 }}
          >
            &ldquo;You are the light of the world. A city that is set on a hill cannot be hidden.
            Neither do people light a lamp and put it under a bowl. Instead they put it on its stand,
            and it gives light to everyone in the house. In the same way, let your light shine before
            others, that they may see your good deeds and glorify your Father in heaven.&rdquo;
          </motion.blockquote>
          <p style={{ fontWeight: 600, fontSize: '0.78rem', letterSpacing: '0.2em', opacity: 0.5, marginTop: '1.5rem', textTransform: 'uppercase' }}>Matthew 5:14–16</p>

          <div style={{ width: 60, height: 2, background: 'linear-gradient(90deg,transparent,#c9a227,transparent)', margin: '3rem auto 0' }} />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6, ease: lux }}
            style={{ marginTop: '3rem' }}
          >
            <p style={{ fontSize: '0.68rem', letterSpacing: '0.22em', opacity: 0.45, marginBottom: '1.5rem', textTransform: 'uppercase' }}>Secure your seat</p>
            <motion.div
              whileHover={{ scale: 1.04, y: -3, transition: { type: 'spring', stiffness: 350, damping: 20 } }}
              style={{ display: 'inline-block' }}
            >
              <a href={TIX_URL} target="_blank" rel="noopener noreferrer" className="btn-gold">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                Get Your Ticket
              </a>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* ══════════════════ SCHEDULE ══════════════════ */}
      <section style={{ position: 'relative', zIndex: 10, padding: 'clamp(3rem,8vw,5rem) clamp(1.5rem,5vw,3rem)', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.07)', background: 'rgba(0,0,0,0.18)' }}>
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9, ease: lux }}
        >
          <p style={{ fontSize: '0.68rem', letterSpacing: '0.3em', opacity: 0.45, marginBottom: '1rem', textTransform: 'uppercase' }}>Mark your calendars</p>
          <h2 style={{ fontFamily: 'var(--font-playfair)', fontWeight: 900, fontSize: 'clamp(2rem,6vw,3.2rem)', textTransform: 'uppercase', lineHeight: 1, marginBottom: '0.4rem' }}>
            FYB Week
          </h2>
          <p style={{ fontFamily: 'var(--font-great-vibes)', fontSize: 'clamp(1.2rem,3.5vw,1.9rem)', color: '#c9a227', marginBottom: '2.5rem' }}>
            13th – 20th July, 2026
          </p>
        </motion.div>

        <motion.div
          className="schedule-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
          }}
        >
          {EVENTS.map((ev, i) => (
            <motion.div
              key={i}
              variants={SCHEDULE_ITEM_VARIANTS}
              whileHover={{ y: -5, scale: 1.03, transition: { type: 'spring', stiffness: 400, damping: 24 } }}
              style={{
                background: ev.highlight ? 'linear-gradient(135deg,#c9a227 0%,#ff9e00 100%)' : 'rgba(255,255,255,0.06)',
                border: ev.highlight ? 'none' : '1px solid rgba(255,255,255,0.1)',
                borderRadius: 14,
                padding: '0.85rem 1.1rem 1rem',
                textAlign: 'center',
                boxShadow: ev.highlight ? '0 8px 32px rgba(201,162,39,0.35)' : 'none',
                cursor: 'default',
              }}
            >
              <span style={{
                display: 'inline-block',
                background: ev.highlight ? 'rgba(5,1,74,0.25)' : 'rgba(201,162,39,0.12)',
                border: `1px solid ${ev.highlight ? 'rgba(5,1,74,0.3)' : 'rgba(201,162,39,0.3)'}`,
                color: ev.highlight ? '#05014A' : 'rgba(255,255,255,0.65)',
                borderRadius: 50,
                fontSize: '0.6rem',
                fontWeight: 700,
                letterSpacing: '0.06em',
                padding: '0.18rem 0.65rem',
                marginBottom: '0.45rem',
              }}>{ev.day} {ev.date}</span>
              <p style={{
                fontFamily: 'var(--font-playfair)',
                fontWeight: 700,
                fontSize: 'clamp(0.95rem,2.5vw,1.15rem)',
                color: ev.highlight ? '#05014A' : '#fff',
                lineHeight: 1.25,
              }}>{ev.name}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ══════════════════ FLYER PROMO ══════════════════ */}
      <section style={{ position: 'relative', zIndex: 10, padding: 'clamp(3rem,8vw,5rem) clamp(1.5rem,5vw,3rem)', textAlign: 'center', background: 'linear-gradient(180deg,rgba(0,0,0,0.1) 0%,rgba(7,6,99,0.4) 100%)' }}>
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9, ease: lux }}
        >
          <p style={{ fontSize: '0.68rem', letterSpacing: '0.3em', opacity: 0.45, marginBottom: '1.5rem', textTransform: 'uppercase' }}>Share the excitement</p>
          <h2 style={{ fontFamily: 'var(--font-playfair)', fontWeight: 900, fontSize: 'clamp(1.8rem,5vw,3rem)', textTransform: 'uppercase', lineHeight: 1, marginBottom: '0.75rem' }}>
            Create Your<br />
            <span style={{ color: '#c9a227' }}>Attending Flyer</span>
          </h2>
          <p style={{ fontSize: 'clamp(0.85rem,2.5vw,1rem)', opacity: 0.55, maxWidth: 420, margin: '0 auto 2.5rem', lineHeight: 1.7 }}>
            Enter your nickname and get a beautiful personalised flyer to share on WhatsApp &amp; Instagram
          </p>
        </motion.div>

        {/* Mini flyer mockup */}
        <motion.div
          initial={{ opacity: 0, scale: 0.78, rotate: -5 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, delay: 0.2, ease: lux }}
          whileHover={{ scale: 1.07, rotate: 2, y: -10, transition: { type: 'spring', stiffness: 280, damping: 18 } }}
          style={{ display: 'flex', justifyContent: 'center', marginBottom: '2.5rem', cursor: 'default' }}
        >
          <div style={{ width: 180, background: 'linear-gradient(160deg,#070663,#05014A,#030135)', borderRadius: 12, overflow: 'hidden', boxShadow: '0 20px 60px rgba(201,162,39,0.2)', border: '1px solid rgba(201,162,39,0.2)', padding: '1.2rem 1rem 1rem', textAlign: 'center', position: 'relative' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'repeating-conic-gradient(from 0deg at 50% 30%,rgba(157,78,221,0.08) 0deg,rgba(157,78,221,0) 4deg,rgba(157,78,221,0) 12deg)', pointerEvents: 'none' }} />
            <p style={{ fontFamily: 'var(--font-great-vibes)', fontSize: '0.9rem', opacity: 0.75, marginBottom: '0.1rem' }}>CAC Fyb Class &apos;26</p>
            <p style={{ fontFamily: 'var(--font-playfair)', fontWeight: 900, fontSize: '1.3rem', textTransform: 'uppercase', letterSpacing: '-0.01em', lineHeight: 0.9 }}>The<br />Shining</p>
            <div style={{ display: 'inline-block', background: 'linear-gradient(135deg,#c9a227,#ff9e00)', borderRadius: 3, padding: '0.1rem 0.7rem 0.2rem', margin: '0.2rem 0 0.6rem' }}>
              <span style={{ fontFamily: 'var(--font-great-vibes)', fontSize: '1rem', color: '#05014A' }}>Light.</span>
            </div>
            <div style={{ height: 1, background: 'linear-gradient(90deg,transparent,rgba(201,162,39,0.5),transparent)', margin: '0.6rem 0' }} />
            <p style={{ fontSize: '0.42rem', letterSpacing: '0.12em', opacity: 0.5, marginBottom: '0.3rem' }}>I WILL BE ATTENDING</p>
            <p style={{ fontFamily: 'var(--font-playfair)', fontWeight: 900, fontSize: '1rem', letterSpacing: '-0.01em', color: '#fff' }}>Your Name</p>
            <div style={{ height: 1, background: 'linear-gradient(90deg,transparent,rgba(201,162,39,0.4),transparent)', margin: '0.5rem 0' }} />
            <p style={{ fontSize: '0.38rem', opacity: 0.35, letterSpacing: '0.1em' }}>THE SHINING LIGHT DINNER NIGHT</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4, ease: lux }}
        >
          <motion.div
            whileHover={{ scale: 1.04, y: -3, transition: { type: 'spring', stiffness: 350, damping: 20 } }}
            style={{ display: 'inline-block' }}
          >
            <Link href="/flyer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'linear-gradient(135deg,#c9a227,#ff8500)', color: '#05014A', fontFamily: 'var(--font-montserrat)', fontWeight: 800, fontSize: '0.95rem', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '1rem 2.5rem', borderRadius: 50, textDecoration: 'none', boxShadow: '0 4px 28px rgba(201,162,39,0.4)' }}>
              ✦ Create My Flyer
            </Link>
          </motion.div>
          <p style={{ fontSize: '0.68rem', opacity: 0.3, marginTop: '1rem' }}>Free &bull; No sign-up required</p>
        </motion.div>
      </section>

      {/* ══════════════════ FOOTER ══════════════════ */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.0 }}
        style={{ position: 'relative', zIndex: 10, borderTop: '1px solid rgba(255,255,255,0.06)', padding: '2rem 1.5rem', textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontSize: '0.7rem', letterSpacing: '0.1em' }}
      >
        <p>CAC CHAPEL LAUTECH &bull; FOUNTAIN OF DIVINE FAVOUR</p>
        <p style={{ marginTop: '0.4rem', opacity: 0.6 }}>FYB Class &apos;26 &bull; The Shining Light</p>
      </motion.footer>
    </main>
  );
}

const EVENTS = [
  { day: 'Mon',  date: '13th', name: 'Leadership Summit',   highlight: false },
  { day: 'Tue',  date: '14th', name: 'Career Talk',         highlight: false },
  { day: 'Wed',  date: '15th', name: 'Marriage Summit',     highlight: false },
  { day: 'Thur', date: '16th', name: 'Revival Hour',        highlight: false },
  { day: 'Fri',  date: '17th', name: 'Music & Drama Night', highlight: false },
  { day: 'Sat',  date: '18th', name: 'Health Clinic',       highlight: false },
  { day: 'Sun',  date: '19th', name: 'Thanksgiving',        highlight: false },
  { day: 'Mon',  date: '20th', name: 'Dinner Party',        highlight: true  },
];

const FLOATERS = [
  { x: '7%',  size: 18, symbol: '✦', dur: 9,  delay: 0   },
  { x: '88%', size: 12, symbol: '✦', dur: 12, delay: 2.5 },
  { x: '22%', size: 10, symbol: '✝', dur: 14, delay: 5   },
  { x: '78%', size: 15, symbol: '✦', dur: 10, delay: 1   },
  { x: '45%', size: 8,  symbol: '✦', dur: 11, delay: 7   },
  { x: '62%', size: 9,  symbol: '✝', dur: 13, delay: 3.5 },
  { x: '33%', size: 13, symbol: '✦', dur: 8,  delay: 4   },
  { x: '55%', size: 7,  symbol: '✦', dur: 16, delay: 6   },
  { x: '15%', size: 11, symbol: '✦', dur: 10, delay: 8   },
  { x: '92%', size: 14, symbol: '✝', dur: 15, delay: 1.5 },
];

const STREAKS = [
  { y: '14%', dur: 5.5, delay: 0,   opa: '0.22' },
  { y: '30%', dur: 7.0, delay: 1.8, opa: '0.16' },
  { y: '52%', dur: 6.2, delay: 3.5, opa: '0.20' },
  { y: '68%', dur: 8.0, delay: 5.0, opa: '0.14' },
  { y: '82%', dur: 5.0, delay: 2.2, opa: '0.18' },
];

const BOKEH = [
  { x: '10%',  y: '15%', size: '80px',  op: 0.06, gold: true,  dur: 12, delay: 0   },
  { x: '85%',  y: '8%',  size: '60px',  op: 0.05, gold: false, dur: 15, delay: 2   },
  { x: '50%',  y: '5%',  size: '100px', op: 0.04, gold: true,  dur: 18, delay: 4   },
  { x: '25%',  y: '55%', size: '50px',  op: 0.07, gold: false, dur: 10, delay: 1   },
  { x: '70%',  y: '45%', size: '70px',  op: 0.05, gold: true,  dur: 14, delay: 6   },
  { x: '5%',   y: '70%', size: '40px',  op: 0.06, gold: false, dur: 11, delay: 3   },
  { x: '90%',  y: '65%', size: '55px',  op: 0.05, gold: true,  dur: 16, delay: 5   },
  { x: '40%',  y: '30%', size: '35px',  op: 0.08, gold: false, dur: 9,  delay: 7   },
  { x: '60%',  y: '20%', size: '45px',  op: 0.06, gold: true,  dur: 13, delay: 1.5 },
  { x: '15%',  y: '40%', size: '65px',  op: 0.04, gold: false, dur: 17, delay: 8   },
];
