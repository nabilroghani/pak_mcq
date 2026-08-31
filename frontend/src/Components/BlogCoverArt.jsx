/** Clean illustrated blog covers — no muddy banner crops */

const variants = {
  "study-plan": {
    gradient: "from-[#1565C0] via-[#1e88e5] to-[#0d47a1]",
    accent: "#93c5fd",
    label: "Study Plan Guide",
  },
  "past-papers-mcqs": {
    gradient: "from-[#0d9488] via-[#1565C0] to-[#4338ca]",
    accent: "#99f6e4",
    label: "Past Papers & MCQs",
  },
  default: {
    gradient: "from-[#1565C0] via-[#2563eb] to-[#1e3a8a]",
    accent: "#bfdbfe",
    label: "Exam Guide",
  },
};

function StudyPlanArt({ accent }) {
  return (
    <svg viewBox="0 0 400 240" className="absolute inset-0 w-full h-full" aria-hidden="true">
      <circle cx="320" cy="50" r="90" fill={accent} fillOpacity="0.12" />
      <circle cx="60" cy="200" r="70" fill={accent} fillOpacity="0.08" />
      <rect x="240" y="48" width="110" height="120" rx="12" fill="white" fillOpacity="0.95" />
      <rect x="240" y="48" width="110" height="28" rx="12" fill={accent} fillOpacity="0.9" />
      <rect x="240" y="64" width="110" height="12" fill={accent} fillOpacity="0.5" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <rect
          key={i}
          x={252 + (i % 3) * 32}
          y={88 + Math.floor(i / 3) * 28}
          width="22"
          height="18"
          rx="4"
          fill={i === 2 ? "#1565C0" : "#e2e8f0"}
          fillOpacity={i === 2 ? 1 : 0.9}
        />
      ))}
      <rect x="48" y="100" width="88" height="14" rx="3" fill="white" fillOpacity="0.9" transform="rotate(-8 48 100)" />
      <rect x="52" y="118" width="92" height="14" rx="3" fill="white" fillOpacity="0.75" transform="rotate(-4 52 118)" />
      <rect x="56" y="136" width="96" height="16" rx="3" fill="white" fillOpacity="0.95" />
      <rect x="60" y="140" width="40" height="3" rx="1" fill="#1565C0" fillOpacity="0.4" />
      <rect x="60" y="146" width="56" height="2" rx="1" fill="#94a3b8" fillOpacity="0.5" />
      <rect x="160" y="130" width="64" height="72" rx="10" fill="white" fillOpacity="0.2" stroke="white" strokeOpacity="0.35" strokeWidth="1.5" />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <circle cx="174" cy={148 + i * 20} r="6" fill="#22c55e" fillOpacity="0.9" />
          <path d={`M171 ${148 + i * 20} l2 2 4-4`} stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <rect x="186" y={144 + i * 20} width="28" height="4" rx="2" fill="white" fillOpacity="0.7" />
        </g>
      ))}
    </svg>
  );
}

function PastPapersMcqsArt({ accent }) {
  return (
    <svg viewBox="0 0 400 240" className="absolute inset-0 w-full h-full" aria-hidden="true">
      <circle cx="340" cy="180" r="80" fill={accent} fillOpacity="0.15" />
      <circle cx="80" cy="60" r="60" fill={accent} fillOpacity="0.1" />
      <rect x="52" y="40" width="120" height="150" rx="10" fill="white" fillOpacity="0.95" />
      <rect x="68" y="58" width="72" height="6" rx="3" fill="#1565C0" fillOpacity="0.35" />
      <rect x="68" y="72" width="88" height="4" rx="2" fill="#cbd5e1" />
      <rect x="68" y="82" width="80" height="4" rx="2" fill="#cbd5e1" />
      <rect x="68" y="92" width="84" height="4" rx="2" fill="#cbd5e1" />
      <rect x="68" y="110" width="40" height="4" rx="2" fill="#1565C0" fillOpacity="0.5" />
      <rect x="68" y="124" width="72" height="4" rx="2" fill="#cbd5e1" />
      <rect x="68" y="134" width="60" height="4" rx="2" fill="#cbd5e1" />
      <rect x="68" y="152" width="50" height="18" rx="6" fill="#1565C0" fillOpacity="0.15" stroke="#1565C0" strokeOpacity="0.4" strokeWidth="1" />
      <text x="93" y="165" textAnchor="middle" fill="#1565C0" fontSize="9" fontWeight="bold">
        PDF
      </text>
      <rect x="200" y="70" width="160" height="110" rx="14" fill="white" fillOpacity="0.18" stroke="white" strokeOpacity="0.4" strokeWidth="1.5" />
      <text x="220" y="98" fill="white" fontSize="11" fontWeight="bold" opacity="0.95">
        Q. Sample MCQ
      </text>
      {["A", "B", "C"].map((opt, i) => (
        <g key={opt}>
          <rect x="218" y={108 + i * 22} width="124" height="16" rx="8" fill={i === 1 ? "#22c55e" : "white"} fillOpacity={i === 1 ? 0.85 : 0.25} />
          <text x="228" y={119 + i * 22} fill="white" fontSize="9" fontWeight="600" opacity="0.95">
            {opt}) Option {opt}
          </text>
        </g>
      ))}
      <rect x="290" y="48" width="56" height="24" rx="12" fill="#f59e0b" fillOpacity="0.95" />
      <text x="318" y="64" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">
        45:00
      </text>
    </svg>
  );
}

function DefaultArt({ accent }) {
  return (
    <svg viewBox="0 0 400 240" className="absolute inset-0 w-full h-full" aria-hidden="true">
      <circle cx="200" cy="120" r="100" fill={accent} fillOpacity="0.15" />
      <rect x="140" y="70" width="120" height="100" rx="12" fill="white" fillOpacity="0.2" stroke="white" strokeOpacity="0.3" strokeWidth="2" />
      <rect x="160" y="95" width="80" height="8" rx="4" fill="white" fillOpacity="0.6" />
      <rect x="160" y="115" width="60" height="6" rx="3" fill="white" fillOpacity="0.4" />
      <rect x="160" y="130" width="70" height="6" rx="3" fill="white" fillOpacity="0.4" />
    </svg>
  );
}

const artMap = {
  "study-plan": StudyPlanArt,
  "past-papers-mcqs": PastPapersMcqsArt,
  default: DefaultArt,
};

export default function BlogCoverArt({ variant = "default", className = "", showBadge = true }) {
  const config = variants[variant] || variants.default;
  const Art = artMap[variant] || artMap.default;

  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br ${config.gradient} ${className}`}
      role="img"
      aria-label={`${config.label} cover illustration`}
    >
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_20%_80%,white_0%,transparent_45%)]" />
      <Art accent={config.accent} />
      {showBadge && (
        <div className="absolute top-3 left-3 z-10 inline-flex items-center gap-1.5 bg-white/95 backdrop-blur-sm text-[#1565C0] text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md">
          <span className="w-1.5 h-1.5 rounded-full bg-[#1565C0]" />
          Blog Article
        </div>
      )}
      <div className="absolute bottom-3 right-3 z-10 text-[9px] font-bold uppercase tracking-widest text-white/50">
        PakLearners
      </div>
    </div>
  );
}

export function getBlogCoverVariant(post) {
  if (post.coverVariant) return post.coverVariant;
  if (post.slug?.includes("past-papers") || post.slug?.includes("mcqs")) return "past-papers-mcqs";
  if (post.slug?.includes("prepare") || post.slug?.includes("study")) return "study-plan";
  return "default";
}
