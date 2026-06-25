'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';

const W = 1080;
const H = 1350;

const PHOTO_R  = 120;  // radius of profile circle on canvas
const PHOTO_CY = 890;  // Y centre of profile circle

/* ── Canvas helpers ─────────────────────────────────────────── */
function rrect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
  ctx.fill();
}

function goldLine(ctx: CanvasRenderingContext2D, cx: number, y: number, half: number, lw = 1.5) {
  const g = ctx.createLinearGradient(cx - half, y, cx + half, y);
  g.addColorStop(0, 'transparent');
  g.addColorStop(0.3, '#c9a227');
  g.addColorStop(0.7, '#ff9e00');
  g.addColorStop(1, 'transparent');
  ctx.save(); ctx.strokeStyle = g; ctx.lineWidth = lw;
  ctx.beginPath(); ctx.moveTo(cx - half, y); ctx.lineTo(cx + half, y); ctx.stroke();
  ctx.restore();
}

function spacedText(ctx: CanvasRenderingContext2D, text: string, cx: number, y: number, spacing: number) {
  const chars = text.split('');
  const widths = chars.map((c) => ctx.measureText(c).width);
  const total = widths.reduce((a, b) => a + b, 0) + spacing * (chars.length - 1);
  let x = cx - total / 2;
  ctx.save(); ctx.textAlign = 'left';
  chars.forEach((c, i) => { ctx.fillText(c, x, y); x += widths[i] + spacing; });
  ctx.restore();
}

async function drawFlyer(canvas: HTMLCanvasElement, name: string, photoSrc: string | null) {
  canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext('2d')!;

  await document.fonts.ready;

  /* 1 · Background gradient */
  const bg = ctx.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0,   '#070663');
  bg.addColorStop(0.4, '#05014A');
  bg.addColorStop(1,   '#020128');
  ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);

  /* 2 · Radial centre glow */
  const glow = ctx.createRadialGradient(W / 2, H * 0.32, 0, W / 2, H * 0.32, 750);
  glow.addColorStop(0, 'rgba(123,44,191,0.28)'); glow.addColorStop(1, 'transparent');
  ctx.fillStyle = glow; ctx.fillRect(0, 0, W, H);

  /* 3 · Sunburst rays */
  const cx = W / 2, cy = H * 0.32;
  for (let a = 0; a < 360; a += 5) {
    const r = (a * Math.PI) / 180;
    const rg = ctx.createLinearGradient(cx, cy, cx + Math.cos(r) * 1500, cy + Math.sin(r) * 1500);
    rg.addColorStop(0, 'rgba(157,78,221,0.22)');
    rg.addColorStop(0.4, 'rgba(157,78,221,0.07)');
    rg.addColorStop(1, 'transparent');
    ctx.save(); ctx.strokeStyle = rg; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.cos(r) * 1500, cy + Math.sin(r) * 1500); ctx.stroke();
    ctx.restore();
  }

  /* 4 · Vignette */
  const vig = ctx.createRadialGradient(W / 2, H / 2, 250, W / 2, H / 2, 950);
  vig.addColorStop(0, 'transparent'); vig.addColorStop(1, 'rgba(0,0,30,0.45)');
  ctx.fillStyle = vig; ctx.fillRect(0, 0, W, H);

  ctx.textAlign = 'center';

  /* 5 · "CAC Fyb Class '26" */
  ctx.fillStyle = 'rgba(255,255,255,0.72)';
  ctx.font = '400 52px "Great Vibes"';
  ctx.fillText("CAC Fyb Class '26", W / 2, 112);

  /* 6 · THE */
  ctx.fillStyle = '#ffffff';
  ctx.font = '900 148px "Playfair Display"';
  ctx.fillText('THE', W / 2, 295);

  /* 7 · SHINING */
  ctx.fillText('SHINING', W / 2, 438);

  /* 8 · "Light." gold badge */
  ctx.font = '400 80px "Great Vibes"';
  const lightW = ctx.measureText('Light.').width;
  const bW = lightW + 90, bH = 98, bX = W / 2 - bW / 2, bY = 457;
  ctx.fillStyle = '#c9a227'; rrect(ctx, bX, bY, bW, bH, 9);
  ctx.fillStyle = '#05014A'; ctx.fillText('Light.', W / 2, bY + 70);

  /* 9 · Scripture */
  ctx.fillStyle = 'rgba(255,255,255,0.62)';
  ctx.font = '700 26px Montserrat';
  spacedText(ctx, 'MATTHEW CH 5 VS 13–16', W / 2, 625, 4);

  /* 10 · Divider */
  goldLine(ctx, W / 2, 668, 230);

  /* 11 · "I WILL BE ATTENDING" */
  ctx.fillStyle = 'rgba(255,255,255,0.48)';
  ctx.font = '700 30px Montserrat';
  spacedText(ctx, 'I WILL BE ATTENDING', W / 2, 745, 6);

  /* 12 · Profile photo circle */
  const pcx = W / 2;

  // Gold ring
  const ring = ctx.createLinearGradient(pcx - PHOTO_R - 5, PHOTO_CY, pcx + PHOTO_R + 5, PHOTO_CY);
  ring.addColorStop(0, '#c9a227'); ring.addColorStop(0.5, '#ff9e00'); ring.addColorStop(1, '#c9a227');
  ctx.save();
  ctx.beginPath(); ctx.arc(pcx, PHOTO_CY, PHOTO_R + 5, 0, Math.PI * 2);
  ctx.fillStyle = ring; ctx.fill();
  ctx.restore();

  if (photoSrc) {
    const img = await new Promise<HTMLImageElement>((res, rej) => {
      const i = new Image();
      i.onload = () => res(i); i.onerror = rej; i.src = photoSrc;
    });
    ctx.save();
    ctx.beginPath(); ctx.arc(pcx, PHOTO_CY, PHOTO_R, 0, Math.PI * 2); ctx.clip();
    const s = Math.max((PHOTO_R * 2) / img.width, (PHOTO_R * 2) / img.height);
    ctx.drawImage(img, pcx - (img.width * s) / 2, PHOTO_CY - (img.height * s) / 2, img.width * s, img.height * s);
    ctx.restore();
    // Subtle inner rim
    ctx.save();
    ctx.beginPath(); ctx.arc(pcx, PHOTO_CY, PHOTO_R, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255,255,255,0.18)'; ctx.lineWidth = 2; ctx.stroke();
    ctx.restore();
  } else {
    // Placeholder
    const inner = ctx.createRadialGradient(pcx, PHOTO_CY - 15, 0, pcx, PHOTO_CY, PHOTO_R);
    inner.addColorStop(0, '#1a0f6e'); inner.addColorStop(1, '#070663');
    ctx.save();
    ctx.beginPath(); ctx.arc(pcx, PHOTO_CY, PHOTO_R, 0, Math.PI * 2);
    ctx.fillStyle = inner; ctx.fill();
    ctx.restore();
  }

  /* 13 · Name — auto-fit
       Ring bottom = PHOTO_CY + (PHOTO_R+6) = 1016.
       110px Playfair cap-height ≈ 79px → baseline must be ≥ 1016+79+10 = 1105.
       Keeping max at 110px so cap top stays clear of ring.            */
  ctx.fillStyle = '#ffffff';
  let fs = 110;
  ctx.font = `900 ${fs}px "Playfair Display"`;
  while (ctx.measureText(name).width > W - 100 && fs > 44) {
    fs -= 4; ctx.font = `900 ${fs}px "Playfair Display"`;
  }
  ctx.fillText(name, W / 2, 1105);

  /* Name underline */
  const nw = Math.min(ctx.measureText(name).width + 40, W - 80);
  const nu = ctx.createLinearGradient(W / 2 - nw / 2, 0, W / 2 + nw / 2, 0);
  nu.addColorStop(0, 'transparent'); nu.addColorStop(0.25, '#c9a227'); nu.addColorStop(0.75, '#ff9e00'); nu.addColorStop(1, 'transparent');
  ctx.save(); ctx.strokeStyle = nu; ctx.lineWidth = 3.5;
  ctx.beginPath(); ctx.moveTo(W / 2 - nw / 2, 1133); ctx.lineTo(W / 2 + nw / 2, 1133); ctx.stroke();
  ctx.restore();

  /* 14 · "The Shining Light Dinner Night" */
  ctx.fillStyle = 'rgba(255,255,255,0.62)';
  ctx.font = 'italic 400 44px "Playfair Display"';
  ctx.fillText('The Shining Light Dinner Night', W / 2, 1181);

  /* 15 · Date line */
  ctx.fillStyle = 'rgba(255,255,255,0.35)';
  ctx.font = '500 23px Montserrat';
  ctx.fillText('20th July 2026 • CAC Chapel Lautech', W / 2, 1224);

  /* 16 · Divider */
  goldLine(ctx, W / 2, 1267, 175);

  /* 17 · Branding */
  ctx.fillStyle = 'rgba(255,255,255,0.28)';
  ctx.font = '600 19px Montserrat';
  spacedText(ctx, "CAC CHAPEL LAUTECH • FYB CLASS '26", W / 2, 1315, 2);

  /* 18 · Handle */
  ctx.fillStyle = 'rgba(255,255,255,0.18)';
  ctx.font = '400 18px Montserrat';
  ctx.fillText('@theshininglight_26', W / 2, 1345);
}

/* ── Component ───────────────────────────────────────────────── */
export default function FlyerPage() {
  const [nickname, setNickname]   = useState('');
  const [photoSrc, setPhotoSrc]   = useState<string | null>(null);
  const [busy, setBusy]           = useState(false);
  const [done, setDone]           = useState(false);
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const wrapRef     = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [scale, setScale] = useState(1 / 3);

  /* Compute preview scale from container width */
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const obs = new ResizeObserver(([entry]) => setScale(entry.contentRect.width / W));
    obs.observe(el); return () => obs.disconnect();
  }, []);

  const previewName = nickname.trim() || 'Your Name';

  const handlePhotoChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => { setPhotoSrc(ev.target?.result as string); setDone(false); };
    reader.readAsDataURL(file);
  }, []);

  const removePhoto = useCallback(() => {
    setPhotoSrc(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    setDone(false);
  }, []);

  const download = useCallback(async () => {
    const name = nickname.trim();
    if (!name) return;
    setBusy(true); setDone(false);
    try {
      await drawFlyer(canvasRef.current!, name, photoSrc);
      const url = canvasRef.current!.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = url;
      a.download = `shining-light-${name.toLowerCase().replace(/\s+/g, '-')}.png`;
      document.body.appendChild(a); a.click(); document.body.removeChild(a);
      setDone(true);
    } finally { setBusy(false); }
  }, [nickname, photoSrc]);

  return (
    <main style={{ minHeight: '100vh', background: 'linear-gradient(160deg,#070663 0%,#05014A 50%,#030135 100%)', color: '#fff', fontFamily: 'var(--font-montserrat),sans-serif', overflowX: 'hidden', position: 'relative' }}>

      {/* Sunburst bg */}
      <div className="sunburst-wrap" style={{ opacity: 0.6 }}><div className="sunburst" /></div>

      {/* Nav */}
      <nav style={{ position: 'relative', zIndex: 20, padding: '1.25rem 1.5rem', display: 'flex', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <Link href="/" style={{ color: 'rgba(255,255,255,0.55)', textDecoration: 'none', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.4rem', letterSpacing: '0.05em', transition: 'color 0.2s' }}>
          ← Back
        </Link>
        <span style={{ flex: 1, textAlign: 'center', fontFamily: 'var(--font-playfair)', fontWeight: 900, fontSize: '1.1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>The Shining Light</span>
        <span style={{ width: '60px' }} />
      </nav>

      {/* Page body */}
      <div className="flyer-grid" style={{ position: 'relative', zIndex: 10, maxWidth: 900, margin: '0 auto', padding: 'clamp(2.5rem,6vw,4rem) clamp(1rem,4vw,2rem) 4rem', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: 'clamp(2rem,5vw,4rem)', alignItems: 'start' }}>

        {/* ── LEFT: Live preview ── */}
        <div className="flyer-preview">
          <p style={{ fontSize: '0.6rem', letterSpacing: '0.28em', opacity: 0.4, marginBottom: '1rem', textTransform: 'uppercase', textAlign: 'center' }}>Live Preview</p>

          {/* Scaled wrapper */}
          <div ref={wrapRef} style={{ width: '100%', aspectRatio: `${W}/${H}`, overflow: 'hidden', borderRadius: 16, boxShadow: '0 24px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(201,162,39,0.15)', position: 'relative' }}>
            <div style={{ width: W, height: H, transform: `scale(${scale})`, transformOrigin: 'top left', position: 'absolute', top: 0, left: 0, background: 'linear-gradient(160deg,#070663 0%,#05014A 40%,#020128 100%)' }}>

              {/* Sunburst inside preview */}
              <div style={{ position: 'absolute', inset: 0, background: 'repeating-conic-gradient(from 0deg at 50% 32%,rgba(157,78,221,0.1) 0deg,rgba(157,78,221,0) 4deg,rgba(157,78,221,0) 12deg)', pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: '40%', background: 'radial-gradient(ellipse at 50% 30%,rgba(123,44,191,0.28) 0%,transparent 70%)', pointerEvents: 'none' }} />

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', textAlign: 'center', padding: '80px 60px', position: 'relative', zIndex: 5 }}>

                <p style={{ fontFamily: 'var(--font-great-vibes)', fontSize: 52, opacity: 0.75, marginBottom: 8, color: '#fff' }}>CAC Fyb Class &apos;26</p>

                <h2 style={{ fontFamily: 'var(--font-playfair)', fontWeight: 900, fontSize: 155, textTransform: 'uppercase', letterSpacing: '-2px', lineHeight: 0.88, color: '#fff', margin: '10px 0 4px' }}>
                  The<br />Shining
                </h2>

                <div style={{ display: 'inline-block', background: 'linear-gradient(135deg,#c9a227,#ff9e00)', borderRadius: 9, padding: '8px 45px 18px', marginTop: 8 }}>
                  <span style={{ fontFamily: 'var(--font-great-vibes)', fontSize: 80, color: '#05014A', lineHeight: 1 }}>Light.</span>
                </div>

                <p style={{ fontSize: 26, fontWeight: 700, letterSpacing: 4, marginTop: 55, opacity: 0.65, color: '#fff' }}>MATTHEW CH 5 VS 13–16</p>

                <div style={{ width: 460, height: 1.5, background: 'linear-gradient(90deg,transparent,#c9a227,#ff9e00,transparent)', margin: '40px auto' }} />

                <p style={{ fontSize: 30, fontWeight: 700, letterSpacing: 6, opacity: 0.5, color: '#fff', marginBottom: 28 }}>I WILL BE ATTENDING</p>

                {/* Profile photo circle */}
                {photoSrc ? (
                  <div style={{ width: PHOTO_R * 2, height: PHOTO_R * 2, borderRadius: '50%', border: '5px solid #c9a227', overflow: 'hidden', margin: '0 auto 28px', flexShrink: 0 }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={photoSrc} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  </div>
                ) : (
                  <div style={{ width: PHOTO_R * 2, height: PHOTO_R * 2, borderRadius: '50%', border: '5px solid #c9a227', background: 'radial-gradient(circle at 50% 40%,#1a0f6e,#070663)', margin: '0 auto 28px', flexShrink: 0 }} />
                )}

                <div style={{ position: 'relative', width: '100%' }}>
                  <h3 style={{ fontFamily: 'var(--font-playfair)', fontWeight: 900, fontSize: Math.max(60, Math.min(150, 1400 / Math.max(previewName.length, 5))), color: '#fff', letterSpacing: '-1px', lineHeight: 1.05, wordBreak: 'break-word' }}>
                    {previewName}
                  </h3>
                  <div style={{ width: '60%', height: 3.5, background: 'linear-gradient(90deg,transparent,#c9a227,#ff9e00,transparent)', margin: '20px auto 0' }} />
                </div>

                <p style={{ fontFamily: 'var(--font-playfair)', fontStyle: 'italic', fontSize: 50, opacity: 0.65, color: '#fff', marginTop: 80 }}>The Shining Light Dinner Night</p>
                <p style={{ fontSize: 26, opacity: 0.35, color: '#fff', marginTop: 18 }}>20th July 2026 &bull; CAC Chapel Lautech</p>

                <div style={{ width: 350, height: 1.5, background: 'linear-gradient(90deg,transparent,rgba(201,162,39,0.5),transparent)', margin: '48px auto 24px' }} />
                <p style={{ fontSize: 21, fontWeight: 600, opacity: 0.28, letterSpacing: 2, color: '#fff' }}>CAC CHAPEL LAUTECH &bull; FYB CLASS &apos;26</p>
                <p style={{ fontSize: 20, opacity: 0.2, color: '#fff', marginTop: 80 }}>@theshininglight_26</p>
              </div>
            </div>
          </div>

          <p style={{ fontSize: '0.65rem', opacity: 0.3, textAlign: 'center', marginTop: '0.75rem', letterSpacing: '0.05em' }}>
            1080 × 1350 px &bull; Perfect for Instagram &amp; WhatsApp
          </p>
        </div>

        {/* ── RIGHT: Form ── */}
        <div className="flyer-form" style={{ paddingTop: 'clamp(0px,4vw,2rem)' }}>
          <div style={{ marginBottom: '2.5rem' }}>
            <p style={{ fontSize: '0.6rem', letterSpacing: '0.28em', opacity: 0.4, marginBottom: '0.75rem', textTransform: 'uppercase' }}>Personalise Your Flyer</p>
            <h1 style={{ fontFamily: 'var(--font-playfair)', fontWeight: 900, fontSize: 'clamp(1.8rem,4vw,2.5rem)', textTransform: 'uppercase', lineHeight: 1, marginBottom: '0.75rem' }}>
              Create Your<br />
              <span style={{ color: '#c9a227' }}>Attending Flyer</span>
            </h1>
            <p style={{ fontSize: '0.88rem', opacity: 0.5, lineHeight: 1.7, maxWidth: 360 }}>
              Upload your photo and enter your nickname. Your personalised flyer will download instantly — ready to share!
            </p>
          </div>

          {/* Photo upload */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', opacity: 0.6, marginBottom: '0.6rem' }}>
              Your Photo <span style={{ fontWeight: 400, opacity: 0.65 }}>(Optional)</span>
            </label>

            {photoSrc ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.8rem 1rem', background: 'rgba(255,255,255,0.07)', border: '1.5px solid rgba(201,162,39,0.4)', borderRadius: 12 }}>
                <div style={{ width: 52, height: 52, borderRadius: '50%', overflow: 'hidden', border: '2.5px solid #c9a227', flexShrink: 0 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={photoSrc} alt="Your photo" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: '0.82rem', fontWeight: 600, color: '#fff', margin: 0 }}>Photo added!</p>
                  <p style={{ fontSize: '0.7rem', opacity: 0.45, margin: '0.15rem 0 0' }}>Will appear on your flyer</p>
                </div>
                <button
                  onClick={removePhoto}
                  style={{ background: 'none', border: '1px solid rgba(255,255,255,0.18)', borderRadius: 8, color: 'rgba(255,255,255,0.5)', fontSize: '0.7rem', padding: '0.3rem 0.7rem', cursor: 'pointer', fontFamily: 'inherit', transition: 'border-color 0.2s,color 0.2s' }}
                >
                  Remove
                </button>
              </div>
            ) : (
              <button
                onClick={() => fileInputRef.current?.click()}
                style={{ width: '100%', padding: '1.1rem 1.2rem', background: 'rgba(255,255,255,0.04)', border: '1.5px dashed rgba(255,255,255,0.22)', borderRadius: 12, color: 'rgba(255,255,255,0.5)', cursor: 'pointer', fontSize: '0.85rem', fontFamily: 'var(--font-montserrat),sans-serif', letterSpacing: '0.03em', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.65rem', transition: 'border-color 0.2s,background 0.2s,color 0.2s', boxSizing: 'border-box' }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                  <circle cx="12" cy="13" r="4" />
                </svg>
                Upload Your Photo
              </button>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              style={{ display: 'none' }}
            />
          </div>

          {/* Nickname input */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', opacity: 0.6, marginBottom: '0.6rem' }}>
              Your Nickname
            </label>
            <input
              type="text"
              maxLength={24}
              placeholder="e.g. Blessing, Seun, Miracle…"
              value={nickname}
              onChange={(e) => { setNickname(e.target.value); setDone(false); }}
              onKeyDown={(e) => e.key === 'Enter' && download()}
              style={{ width: '100%', padding: '1rem 1.2rem', background: 'rgba(255,255,255,0.07)', border: '1.5px solid rgba(255,255,255,0.14)', borderRadius: 12, color: '#fff', fontSize: '1.1rem', fontFamily: 'var(--font-montserrat),sans-serif', outline: 'none', letterSpacing: '0.02em', boxSizing: 'border-box', transition: 'border-color 0.2s' }}
            />
            <p style={{ fontSize: '0.65rem', opacity: 0.35, marginTop: '0.4rem' }}>
              {nickname.length}/24 characters
            </p>
          </div>

          {/* How to */}
          <div style={{ background: 'rgba(201,162,39,0.08)', border: '1px solid rgba(201,162,39,0.18)', borderRadius: 12, padding: '1.1rem 1.2rem', marginBottom: '1.75rem' }}>
            <p style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em', color: '#c9a227', marginBottom: '0.5rem', textTransform: 'uppercase' }}>How it works</p>
            {['Upload your photo (optional)', 'Enter your nickname above', 'Click "Download Flyer" below', 'Share on WhatsApp & Instagram!'].map((step, i) => (
              <p key={i} style={{ fontSize: '0.8rem', opacity: 0.65, lineHeight: 1.6, display: 'flex', gap: '0.5rem' }}>
                <span style={{ color: '#c9a227', fontWeight: 700, minWidth: 16 }}>{i + 1}.</span> {step}
              </p>
            ))}
          </div>

          {/* Download button */}
          <button
            onClick={download}
            disabled={!nickname.trim() || busy}
            style={{ width: '100%', padding: '1.1rem', background: nickname.trim() && !busy ? 'linear-gradient(135deg,#c9a227,#ff8500)' : 'rgba(255,255,255,0.1)', color: nickname.trim() && !busy ? '#05014A' : 'rgba(255,255,255,0.3)', border: 'none', borderRadius: 14, fontSize: '0.95rem', fontFamily: 'var(--font-montserrat),sans-serif', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', cursor: nickname.trim() && !busy ? 'pointer' : 'not-allowed', boxShadow: nickname.trim() && !busy ? '0 4px 28px rgba(201,162,39,0.4)' : 'none', transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem' }}
          >
            {busy ? (
              <><span style={{ display: 'inline-block', width: 16, height: 16, border: '2px solid rgba(255,255,255,0.3)', borderTop: '2px solid rgba(255,255,255,0.8)', borderRadius: '50%', animation: 'sun-spin 0.8s linear infinite' }} /> Generating…</>
            ) : done ? (
              '✓ Downloaded!'
            ) : (
              <><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg> Download Flyer</>
            )}
          </button>

          {done && (
            <p style={{ fontSize: '0.78rem', color: '#4ade80', textAlign: 'center', marginTop: '0.75rem', opacity: 0.85 }}>
              ✓ Flyer saved! Share it with the world 🎉
            </p>
          )}

          <p style={{ fontSize: '0.65rem', opacity: 0.25, textAlign: 'center', marginTop: '1rem', lineHeight: 1.6 }}>
            Free to download &bull; No account needed<br />
            Your flyer is ready to share!
          </p>
        </div>
      </div>

      {/* Hidden full-res canvas */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />

    </main>
  );
}
