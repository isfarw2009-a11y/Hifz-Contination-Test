import React, { useState, useRef, useEffect } from 'react';

// ─── Design tokens ────────────────────────────────────────────────
const GOLD   = '#f9a826';
const TEAL   = '#00c9a7';
const BLUE   = '#4f8ef7';
const RED    = '#ff6b6b';
const WHITE  = '#ffffff';
const MUTED  = '#888888';
const CARD_BG     = 'rgba(255,255,255,0.06)';
const CARD_BORDER = 'rgba(255,255,255,0.1)';
const BG = 'linear-gradient(135deg, #0a0f1e 0%, #0d1a2e 100%)';
const FONT = "'Segoe UI', 'Noto Sans Bengali', sans-serif";

// ─── Lesson data ──────────────────────────────────────────────────
const LESSONS = [
  {
    id: 'greetings',
    title: 'Greetings & Small Talk',
    emoji: '👋',
    bengali: 'অভিবাদন ও ছোট কথোপকথন',
    phrases: [
      { en: "Hi, how are you doing?",        bn: "হ্যালো, আপনি কেমন আছেন?" },
      { en: "Nice to meet you!",              bn: "আপনার সাথে পরিচিত হয়ে ভালো লাগলো!" },
      { en: "Have a great day!",              bn: "আপনার দিনটি সুন্দর হোক!" },
      { en: "What's up?",                     bn: "কী খবর?" },
      { en: "See you later!",                 bn: "পরে দেখা হবে!" },
      { en: "Take care!",                     bn: "ভালো থাকবেন!" },
    ],
  },
  {
    id: 'university',
    title: 'At the University',
    emoji: '🎓',
    bengali: 'বিশ্ববিদ্যালয়ে',
    phrases: [
      { en: "Where is the financial aid office?",          bn: "ফিনান্সিয়াল এইড অফিস কোথায়?" },
      { en: "Can I get an extension on this assignment?",  bn: "এই অ্যাসাইনমেন্টের সময়সীমা বাড়ানো যাবে?" },
      { en: "I'd like to drop this class.",                bn: "আমি এই ক্লাসটি ছেড়ে দিতে চাই।" },
      { en: "What are your office hours?",                 bn: "আপনার অফিস আওয়ার কখন?" },
      { en: "Is this course required for my major?",       bn: "এই কোর্সটি কি আমার মেজরের জন্য প্রয়োজনীয়?" },
      { en: "I need to register for next semester.",       bn: "আমাকে পরের সেমিস্টারের জন্য রেজিস্ট্রেশন করতে হবে।" },
    ],
  },
  {
    id: 'shopping',
    title: 'Shopping',
    emoji: '🛍️',
    bengali: 'কেনাকাটা',
    phrases: [
      { en: "Do you have this in a different size?",  bn: "এটি কি অন্য সাইজে আছে?" },
      { en: "Where are the fitting rooms?",           bn: "ফিটিং রুম কোথায়?" },
      { en: "I'd like to return this item.",          bn: "আমি এই জিনিসটি ফেরত দিতে চাই।" },
      { en: "Do you accept coupons?",                 bn: "আপনারা কি কুপন গ্রহণ করেন?" },
      { en: "Is this on sale?",                       bn: "এটি কি সেলে আছে?" },
      { en: "Can I pay with a credit card?",          bn: "আমি কি ক্রেডিট কার্ডে পেমেন্ট করতে পারি?" },
    ],
  },
  {
    id: 'doctor',
    title: 'At the Doctor',
    emoji: '🏥',
    bengali: 'ডাক্তারের কাছে',
    phrases: [
      { en: "I need to make an appointment.",            bn: "আমাকে একটি অ্যাপয়েন্টমেন্ট নিতে হবে।" },
      { en: "I've been feeling unwell for a few days.",  bn: "আমি কয়েকদিন ধরে অসুস্থ বোধ করছি।" },
      { en: "Do you take my insurance?",                 bn: "আপনারা কি আমার ইন্স্যুরেন্স নেন?" },
      { en: "Can you refill my prescription?",           bn: "আপনি কি আমার প্রেসক্রিপশন রিফিল করতে পারবেন?" },
      { en: "I am allergic to penicillin.",              bn: "আমার পেনিসিলিনে অ্যালার্জি আছে।" },
      { en: "When should I take this medication?",       bn: "আমি কখন এই ওষুধ খাব?" },
    ],
  },
  {
    id: 'idioms',
    title: 'American Idioms',
    emoji: '🗣️',
    bengali: 'আমেরিকান বাগধারা',
    phrases: [
      { en: "It's raining cats and dogs.",           bn: "প্রচণ্ড বৃষ্টি হচ্ছে।" },
      { en: "Break a leg!",                          bn: "শুভকামনা! (পরীক্ষায় ভালো করুন!)" },
      { en: "Hit the books.",                        bn: "পড়াশোনায় মন দাও।" },
      { en: "Under the weather.",                    bn: "একটু অসুস্থ।" },
      { en: "Bite off more than you can chew.",      bn: "সামর্থ্যের বাইরে কাজ নেওয়া।" },
      { en: "Piece of cake.",                        bn: "খুব সহজ কাজ।" },
    ],
  },
  {
    id: 'dining',
    title: 'Eating Out',
    emoji: '🍽️',
    bengali: 'রেস্তোরাঁয় খাওয়া',
    phrases: [
      { en: "Table for two, please.",       bn: "দুই জনের জন্য টেবিল দিন, দয়া করে।" },
      { en: "Can I see the menu?",          bn: "আমি কি মেনুটা দেখতে পারি?" },
      { en: "I have a food allergy.",       bn: "আমার খাবারে অ্যালার্জি আছে।" },
      { en: "Can I get this to go?",        bn: "এটি কি নিয়ে যেতে পারি?" },
      { en: "The check, please.",           bn: "বিল দিন, দয়া করে।" },
      { en: "Is the tip included?",         bn: "টিপ কি অন্তর্ভুক্ত?" },
    ],
  },
];

const SYSTEM_PROMPT = `You are Nova, a warm and patient bilingual tutor helping a Bengali-speaking woman who recently moved from Bangladesh to Northern Virginia and is attending NOVA (Northern Virginia Community College).

ALWAYS respond in BOTH Bengali and English — Bengali first, then English. Use this format:
🇧🇩 [Bengali response]
🇺🇸 [English response]

Your teaching style:
- Warm, encouraging, never condescending
- Correct grammar gently with positive reinforcement
- Give examples from US university life, shopping in Northern Virginia, daily American life
- Explain American cultural norms when relevant
- Keep responses concise and practical

Topics you excel at: university registration, financial aid, healthcare, shopping, public transport, American idioms, pronunciation tips, and daily conversation.`;

// ─── Shared helpers ───────────────────────────────────────────────
function speak(text) {
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'en-US';
  u.rate = 0.9;
  speechSynthesis.cancel();
  speechSynthesis.speak(u);
}

function SpeakButton({ text, style }) {
  return (
    <button
      onClick={e => { e.stopPropagation(); speak(text); }}
      title="Hear pronunciation"
      style={{
        background: 'none',
        border: `1px solid ${GOLD}`,
        borderRadius: 20,
        padding: '3px 12px',
        color: GOLD,
        cursor: 'pointer',
        fontSize: 13,
        ...style,
      }}
    >
      🔊 Listen
    </button>
  );
}

// ─── GLOBAL STYLES injected once ─────────────────────────────────
const GLOBAL_STYLES = `
  @keyframes fadeIn  { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
  @keyframes pulse   { 0%,100% { opacity:1; } 50% { opacity:0.4; } }
  @keyframes blink   { 0%,100% { transform:scale(1); } 50% { transform:scale(1.15); } }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #0a0f1e; }
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 3px; }
  input, button { font-family: ${FONT}; }
`;

// ─── App shell ────────────────────────────────────────────────────
export default function App() {
  const [mode, setMode] = useState('learn');

  const tabs = [
    { key: 'learn',    label: 'Learn',    emoji: '📚' },
    { key: 'practice', label: 'Practice', emoji: '✏️' },
    { key: 'tutor',    label: 'AI Tutor', emoji: '🤖' },
    { key: 'quiz',     label: 'Quiz',     emoji: '🧠' },
    { key: 'speak',    label: 'Speak',    emoji: '🎤' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: BG, fontFamily: FONT, color: WHITE }}>
      <style>{GLOBAL_STYLES}</style>

      {/* Header */}
      <header style={{ textAlign: 'center', padding: '28px 16px 12px', borderBottom: `1px solid ${CARD_BORDER}` }}>
        <h1 style={{ fontSize: 26, fontWeight: 700, color: GOLD, letterSpacing: 0.5 }}>
          🌟 NOVA English Academy
        </h1>
        <p style={{ color: MUTED, fontSize: 13, marginTop: 6 }}>
          ইংরেজি শেখার সেরা সঙ্গী · Your English Learning Companion
        </p>
      </header>

      {/* Tab bar */}
      <nav style={{ display: 'flex', overflowX: 'auto', padding: '10px 16px', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
        {tabs.map(t => (
          <button
            key={t.key}
            onClick={() => setMode(t.key)}
            style={{
              padding: '8px 18px',
              borderRadius: 24,
              border: `1px solid ${mode === t.key ? GOLD : CARD_BORDER}`,
              background: mode === t.key ? GOLD : CARD_BG,
              color: mode === t.key ? '#0a0f1e' : WHITE,
              fontWeight: 600,
              fontSize: 14,
              cursor: 'pointer',
              transition: 'all 0.2s',
              whiteSpace: 'nowrap',
            }}
          >
            {t.emoji} {t.label}
          </button>
        ))}
      </nav>

      {/* Content */}
      <main style={{ maxWidth: 720, margin: '0 auto', padding: '20px 16px 60px' }}>
        {mode === 'learn'    && <LearnMode />}
        {mode === 'practice' && <PracticeMode />}
        {mode === 'tutor'    && <TutorMode />}
        {mode === 'quiz'     && <QuizMode />}
        {mode === 'speak'    && <SpeakMode />}
      </main>
    </div>
  );
}

// ─── LEARN mode ───────────────────────────────────────────────────
function LearnMode() {
  const [lesson, setLesson] = useState(null);
  const [revealed, setRevealed] = useState({});

  if (!lesson) {
    return (
      <div style={{ animation: 'fadeIn 0.35s ease' }}>
        <h2 style={{ color: GOLD, marginBottom: 20 }}>📚 Choose a Lesson</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(190px,1fr))', gap: 14 }}>
          {LESSONS.map(l => (
            <button
              key={l.id}
              onClick={() => setLesson(l)}
              style={{
                background: CARD_BG,
                border: `1px solid ${CARD_BORDER}`,
                borderRadius: 18,
                padding: '20px 14px',
                cursor: 'pointer',
                color: WHITE,
                textAlign: 'center',
                transition: 'border-color 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = TEAL)}
              onMouseLeave={e => (e.currentTarget.style.borderColor = CARD_BORDER)}
            >
              <div style={{ fontSize: 34 }}>{l.emoji}</div>
              <div style={{ fontWeight: 700, fontSize: 15, marginTop: 8 }}>{l.title}</div>
              <div style={{ color: MUTED, fontSize: 13, marginTop: 4 }}>{l.bengali}</div>
              <div style={{ color: TEAL, fontSize: 12, marginTop: 8 }}>{l.phrases.length} phrases</div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div style={{ animation: 'fadeIn 0.35s ease' }}>
      <button
        onClick={() => { setLesson(null); setRevealed({}); }}
        style={{ background: 'none', border: 'none', color: TEAL, cursor: 'pointer', fontSize: 15, marginBottom: 16 }}
      >
        ← Back to lessons
      </button>
      <h2 style={{ color: GOLD, marginBottom: 4 }}>{lesson.emoji} {lesson.title}</h2>
      <p style={{ color: MUTED, fontSize: 13, marginBottom: 20 }}>
        {lesson.bengali} · Tap a card to reveal Bengali
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {lesson.phrases.map((p, i) => (
          <div
            key={i}
            onClick={() => setRevealed(r => ({ ...r, [i]: !r[i] }))}
            style={{
              background: CARD_BG,
              border: `1px solid ${revealed[i] ? GOLD : CARD_BORDER}`,
              borderRadius: 16,
              padding: '18px 20px',
              cursor: 'pointer',
              transition: 'border-color 0.2s',
            }}
          >
            <div style={{ fontSize: 16, fontWeight: 600 }}>{p.en}</div>
            {revealed[i] ? (
              <div style={{
                marginTop: 10,
                padding: '10px 14px',
                background: 'rgba(249,168,38,0.1)',
                borderRadius: 10,
                color: GOLD,
                fontSize: 16,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 8,
                animation: 'fadeIn 0.25s ease',
              }}>
                <span>{p.bn}</span>
                <SpeakButton text={p.en} />
              </div>
            ) : (
              <div style={{ color: MUTED, fontSize: 13, marginTop: 6 }}>Tap to reveal Bengali 👆</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── PRACTICE mode ────────────────────────────────────────────────
const ALL_PHRASES = LESSONS.flatMap(l => l.phrases.map(p => ({ ...p, lessonTitle: l.title })));

function makeBlank(phrases) {
  const phrase = phrases[Math.floor(Math.random() * phrases.length)];
  const words = phrase.en.split(' ');
  const candidates = words
    .map((w, i) => ({ w, i }))
    .filter(({ w }) => w.replace(/[^a-zA-Z]/g, '').length >= 4);
  const target = candidates.length
    ? candidates[Math.floor(Math.random() * candidates.length)]
    : { w: words[Math.min(1, words.length - 1)], i: Math.min(1, words.length - 1) };
  const blanked = words.map((w, i) => (i === target.i ? '_____' : w)).join(' ');
  return { phrase, blanked, answer: target.w.replace(/[^a-zA-Z']/g, '') };
}

function PracticeMode() {
  const [q, setQ]           = useState(() => makeBlank(ALL_PHRASES));
  const [input, setInput]   = useState('');
  const [result, setResult] = useState(null);
  const [streak, setStreak] = useState(0);

  const check = () => {
    if (!input.trim()) return;
    const ok = input.trim().toLowerCase().replace(/[^a-z']/g, '') ===
               q.answer.toLowerCase().replace(/[^a-z']/g, '');
    setResult(ok ? 'correct' : 'wrong');
    setStreak(s => (ok ? s + 1 : 0));
  };

  const next = () => {
    setQ(makeBlank(ALL_PHRASES));
    setInput('');
    setResult(null);
  };

  return (
    <div style={{ animation: 'fadeIn 0.35s ease' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h2 style={{ color: GOLD }}>✏️ Fill in the Blank</h2>
        <div style={{ background: CARD_BG, border: `1px solid ${CARD_BORDER}`, borderRadius: 20, padding: '4px 14px', fontSize: 14 }}>
          🔥 <span style={{ color: GOLD, fontWeight: 700 }}>{streak}</span>
        </div>
      </div>

      <div style={{ background: CARD_BG, border: `1px solid ${CARD_BORDER}`, borderRadius: 20, padding: 28, marginBottom: 20 }}>
        <p style={{ color: MUTED, fontSize: 13, marginBottom: 6 }}>🇧🇩 Bengali hint:</p>
        <p style={{ color: TEAL, fontSize: 18, marginBottom: 20 }}>{q.phrase.bn}</p>
        <p style={{ color: MUTED, fontSize: 13, marginBottom: 6 }}>🇺🇸 Complete the sentence:</p>
        <p style={{ fontSize: 20, fontWeight: 600, marginBottom: 20 }}>{q.blanked}</p>

        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && !result && check()}
          disabled={!!result}
          placeholder="Type the missing word…"
          style={{
            width: '100%',
            padding: '12px 16px',
            borderRadius: 12,
            border: `1px solid ${result === 'correct' ? TEAL : result === 'wrong' ? RED : CARD_BORDER}`,
            background: 'rgba(255,255,255,0.07)',
            color: WHITE,
            fontSize: 16,
            outline: 'none',
          }}
        />

        {result && (
          <div style={{
            marginTop: 14,
            padding: '12px 16px',
            borderRadius: 12,
            background: result === 'correct' ? 'rgba(0,201,167,0.13)' : 'rgba(255,107,107,0.13)',
            color: result === 'correct' ? TEAL : RED,
            fontWeight: 600,
            animation: 'fadeIn 0.25s ease',
          }}>
            {result === 'correct'
              ? '✅ সঠিক! Correct!'
              : `❌ The answer was: "${q.answer}"`}
          </div>
        )}
      </div>

      {!result
        ? <button onClick={check} disabled={!input.trim()} style={btnStyle(BLUE)}>Check Answer</button>
        : <button onClick={next} style={btnStyle(GOLD, '#0a0f1e')}>Next Question →</button>
      }
    </div>
  );
}

// ─── AI TUTOR mode ────────────────────────────────────────────────
const INITIAL_MSG = {
  role: 'assistant',
  content: "🇧🇩 আস্সালামু আলাইকুম! আমি নোভা, আপনার ইংরেজি শিক্ষক। আজ কী শিখতে চান?\n\n🇺🇸 Hello! I'm Nova, your English tutor. What would you like to practice today?",
};

function TutorMode() {
  const [messages, setMessages] = useState([INITIAL_MSG]);
  const [input, setInput]       = useState('');
  const [loading, setLoading]   = useState(false);
  const bottomRef               = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    setInput('');
    const history = [...messages, { role: 'user', content: text }];
    setMessages(history);
    setLoading(true);
    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': import.meta.env.VITE_ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-allow-browser': 'true',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system: SYSTEM_PROMPT,
          messages: history.map(m => ({ role: m.role, content: m.content })),
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setMessages(h => [...h, { role: 'assistant', content: data.content?.[0]?.text ?? '' }]);
    } catch {
      setMessages(h => [...h, {
        role: 'assistant',
        content: '🇧🇩 দুঃখিত, একটি সমস্যা হয়েছে। আবার চেষ্টা করুন।\n🇺🇸 Sorry, something went wrong. Please try again.',
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ animation: 'fadeIn 0.35s ease' }}>
      <h2 style={{ color: GOLD, marginBottom: 20 }}>🤖 AI Tutor — Nova</h2>

      <div style={{
        height: 420,
        overflowY: 'auto',
        background: CARD_BG,
        border: `1px solid ${CARD_BORDER}`,
        borderRadius: 16,
        padding: 16,
        marginBottom: 14,
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
      }}>
        {messages.map((m, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start', animation: 'fadeIn 0.25s ease' }}>
            <div style={{
              maxWidth: '83%',
              padding: '12px 16px',
              borderRadius: m.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
              background: m.role === 'user' ? BLUE : 'rgba(255,255,255,0.1)',
              fontSize: 15,
              lineHeight: 1.65,
              whiteSpace: 'pre-wrap',
            }}>
              {m.content}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display: 'flex', gap: 5, padding: '6px 12px' }}>
            {[0, 1, 2].map(j => (
              <div key={j} style={{ width: 8, height: 8, borderRadius: '50%', background: MUTED, animation: `pulse 1.2s ease-in-out ${j * 0.2}s infinite` }} />
            ))}
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div style={{ display: 'flex', gap: 10 }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send()}
          placeholder="Ask Nova anything in Bengali or English…"
          style={{
            flex: 1,
            padding: '12px 16px',
            borderRadius: 12,
            border: `1px solid ${CARD_BORDER}`,
            background: 'rgba(255,255,255,0.07)',
            color: WHITE,
            fontSize: 15,
            outline: 'none',
          }}
        />
        <button
          onClick={send}
          disabled={!input.trim() || loading}
          style={{ ...btnStyle(GOLD, '#0a0f1e'), padding: '12px 20px', opacity: (!input.trim() || loading) ? 0.55 : 1 }}
        >
          Send
        </button>
      </div>
    </div>
  );
}

// ─── QUIZ mode ────────────────────────────────────────────────────
function makeQuestion() {
  const correct = ALL_PHRASES[Math.floor(Math.random() * ALL_PHRASES.length)];
  const distractors = ALL_PHRASES
    .filter(p => p !== correct)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);
  return { correct, options: [correct, ...distractors].sort(() => Math.random() - 0.5) };
}

function QuizMode() {
  const [q, setQ]             = useState(makeQuestion);
  const [picked, setPicked]   = useState(null);
  const [score, setScore]     = useState(0);
  const [total, setTotal]     = useState(0);
  const [best, setBest]       = useState(() => parseInt(localStorage.getItem('novaQuizBest') || '0'));

  const pick = opt => {
    if (picked) return;
    setPicked(opt);
    const newTotal = total + 1;
    setTotal(newTotal);
    if (opt === q.correct) {
      const newScore = score + 1;
      setScore(newScore);
      if (newScore > best) {
        setBest(newScore);
        localStorage.setItem('novaQuizBest', String(newScore));
      }
    }
  };

  const next = () => { setQ(makeQuestion()); setPicked(null); };

  return (
    <div style={{ animation: 'fadeIn 0.35s ease' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h2 style={{ color: GOLD }}>🧠 Quiz</h2>
        <div style={{ display: 'flex', gap: 8 }}>
          <Pill>{score}/{total}</Pill>
          <Pill gold>🏆 {best}</Pill>
        </div>
      </div>

      <div style={{ background: CARD_BG, border: `1px solid ${CARD_BORDER}`, borderRadius: 20, padding: '24px 28px', marginBottom: 20 }}>
        <p style={{ color: MUTED, fontSize: 13, marginBottom: 10 }}>What does this mean in English?</p>
        <p style={{ color: TEAL, fontSize: 22 }}>{q.correct.bn}</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {q.options.map((opt, i) => {
          const isCorrect  = opt === q.correct;
          const isSelected = opt === picked;
          let border = CARD_BORDER, bg = CARD_BG;
          if (picked) {
            if (isCorrect)            { border = TEAL; bg = 'rgba(0,201,167,0.11)'; }
            else if (isSelected)      { border = RED;  bg = 'rgba(255,107,107,0.11)'; }
          }
          return (
            <button
              key={i}
              onClick={() => pick(opt)}
              style={{
                padding: '14px 18px',
                borderRadius: 14,
                border: `1px solid ${border}`,
                background: bg,
                color: WHITE,
                textAlign: 'left',
                cursor: picked ? 'default' : 'pointer',
                fontSize: 15,
                fontWeight: (isSelected || (picked && isCorrect)) ? 700 : 400,
                transition: 'all 0.15s',
              }}
            >
              {opt.en}
              {picked && isCorrect  && ' ✅'}
              {picked && isSelected && !isCorrect && ' ❌'}
            </button>
          );
        })}
      </div>

      {picked && (
        <button onClick={next} style={{ ...btnStyle(GOLD, '#0a0f1e'), marginTop: 18, width: '100%', animation: 'fadeIn 0.25s ease' }}>
          Next Question →
        </button>
      )}
    </div>
  );
}

// ─── SPEAK mode ───────────────────────────────────────────────────
function SpeakMode() {
  const supported       = !!(window.SpeechRecognition || window.webkitSpeechRecognition);
  const [phrase, setPhrase]       = useState(() => ALL_PHRASES[Math.floor(Math.random() * ALL_PHRASES.length)]);
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [feedback, setFeedback]   = useState(null);
  const recRef = useRef(null);

  const nextPhrase = () => {
    setPhrase(ALL_PHRASES[Math.floor(Math.random() * ALL_PHRASES.length)]);
    setTranscript('');
    setFeedback(null);
  };

  const evaluate = said => {
    const norm  = s => s.toLowerCase().replace(/[^a-z0-9 ]/g, '').trim();
    const tWords = norm(phrase.en).split(' ');
    const sWords = norm(said).split(' ');
    const matched = tWords.filter(w => sWords.includes(w)).length;
    const pct = matched / tWords.length;
    if (pct >= 0.85)
      setFeedback({ type: 'great', msg: '🇧🇩 চমৎকার! উচ্চারণ খুব ভালো!\n🇺🇸 Excellent! Great pronunciation!' });
    else if (pct >= 0.5)
      setFeedback({ type: 'ok', msg: '🇧🇩 ভালো চেষ্টা! আরেকবার চেষ্টা করুন।\n🇺🇸 Good try! Practice a bit more.' });
    else
      setFeedback({ type: 'retry', msg: '🇧🇩 আবার চেষ্টা করুন। শুনুন এবং অনুকরণ করুন।\n🇺🇸 Try again — listen carefully and repeat.' });
  };

  const startListening = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    const rec = new SR();
    rec.lang = 'en-US';
    rec.interimResults = false;
    recRef.current = rec;
    rec.onresult = e => {
      const said = e.results[0][0].transcript;
      setTranscript(said);
      evaluate(said);
    };
    rec.onerror = e => {
      setListening(false);
      const msg = e.error === 'not-allowed'
        ? '🇧🇩 মাইক্রোফোনের অনুমতি দিন।\n🇺🇸 Please allow microphone access.'
        : `🇧🇩 সমস্যা হয়েছে।\n🇺🇸 Error: ${e.error}`;
      setFeedback({ type: 'retry', msg });
    };
    rec.onend = () => setListening(false);
    rec.start();
    setListening(true);
    setFeedback(null);
    setTranscript('');
  };

  if (!supported) {
    return (
      <div style={{ textAlign: 'center', padding: 48, animation: 'fadeIn 0.35s ease' }}>
        <div style={{ fontSize: 48 }}>😔</div>
        <h2 style={{ color: RED, margin: '16px 0 10px' }}>Not Supported</h2>
        <p style={{ color: MUTED }}>
          🇧🇩 আপনার ব্রাউজার স্পিচ রিকগনিশন সাপোর্ট করে না।<br />
          🇺🇸 Your browser doesn't support speech recognition. Please use Chrome.
        </p>
      </div>
    );
  }

  const feedbackColor = { great: TEAL, ok: GOLD, retry: RED, error: RED };

  return (
    <div style={{ animation: 'fadeIn 0.35s ease' }}>
      <h2 style={{ color: GOLD, marginBottom: 6 }}>🎤 Speak & Practice</h2>
      <p style={{ color: MUTED, fontSize: 13, marginBottom: 24 }}>
        🇧🇩 শুনুন, তারপর বলুন · 🇺🇸 Listen, then say the phrase aloud
      </p>

      <div style={{ background: CARD_BG, border: `1px solid ${CARD_BORDER}`, borderRadius: 20, padding: '28px 24px', marginBottom: 20, textAlign: 'center' }}>
        <p style={{ color: MUTED, fontSize: 13, marginBottom: 10 }}>Say this phrase:</p>
        <p style={{ fontSize: 22, fontWeight: 700, marginBottom: 10 }}>{phrase.en}</p>
        <p style={{ color: TEAL, fontSize: 16, marginBottom: 20 }}>{phrase.bn}</p>
        <SpeakButton text={phrase.en} />
      </div>

      {transcript !== '' && (
        <div style={{
          background: 'rgba(79,142,247,0.1)',
          border: `1px solid ${BLUE}50`,
          borderRadius: 14,
          padding: '12px 18px',
          marginBottom: 14,
          animation: 'fadeIn 0.25s ease',
        }}>
          <span style={{ color: MUTED, fontSize: 12 }}>You said: </span>
          <span style={{ fontSize: 15 }}>"{transcript}"</span>
        </div>
      )}

      {feedback && (
        <div style={{
          borderRadius: 14,
          padding: '14px 18px',
          marginBottom: 20,
          background: `${feedbackColor[feedback.type]}18`,
          border: `1px solid ${feedbackColor[feedback.type]}40`,
          color: feedbackColor[feedback.type],
          whiteSpace: 'pre-line',
          fontWeight: 600,
          animation: 'fadeIn 0.25s ease',
        }}>
          {feedback.msg}
        </div>
      )}

      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <button
          onClick={startListening}
          disabled={listening}
          style={{
            ...btnStyle(listening ? RED : TEAL),
            flex: 1,
            minWidth: 150,
            animation: listening ? 'blink 1s ease-in-out infinite' : 'none',
          }}
        >
          {listening ? '🔴 Listening…' : '🎤 Start Speaking'}
        </button>
        <button onClick={nextPhrase} style={{ ...btnStyle('transparent'), border: `1px solid ${CARD_BORDER}`, padding: '12px 18px' }}>
          Next Phrase →
        </button>
      </div>
    </div>
  );
}

// ─── Tiny shared UI helpers ───────────────────────────────────────
function Pill({ children, gold }) {
  return (
    <div style={{
      background: CARD_BG,
      border: `1px solid ${gold ? GOLD + '50' : CARD_BORDER}`,
      borderRadius: 20,
      padding: '4px 14px',
      fontSize: 13,
      color: gold ? GOLD : WHITE,
      fontWeight: gold ? 700 : 400,
    }}>
      {children}
    </div>
  );
}

function btnStyle(bg, color = WHITE) {
  return {
    padding: '13px 0',
    borderRadius: 13,
    border: 'none',
    background: bg,
    color,
    fontWeight: 700,
    fontSize: 15,
    cursor: 'pointer',
    width: '100%',
  };
}
