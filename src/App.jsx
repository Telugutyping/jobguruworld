import { useState, useEffect } from "react";

/* ─────────────────────────────────────────────────────────────
   BRAND & THEME
───────────────────────────────────────────────────────────── */
const C = {
  navy: "#0f2744",
  navyMid: "#1a3c6e",
  navyLight: "#1e4d8c",
  gold: "#f59e0b",
  goldDark: "#d97706",
  goldLight: "#fef3c7",
  green: "#16a34a",
  greenBg: "#f0fdf4",
  red: "#dc2626",
  redBg: "#fef2f2",
  blue: "#1d4ed8",
  blueBg: "#dbeafe",
  bg: "#f4f1ec",
  card: "#ffffff",
  border: "#e8e4dd",
  text: "#1a1a1a",
  muted: "#64748b",
  subtle: "#94a3b8",
};

const LANGS = [
  { code:"en", name:"English",   native:"English",    flag:"🇬🇧" },
  { code:"te", name:"Telugu",    native:"తెలుగు",     flag:"🏛" },
  { code:"hi", name:"Hindi",     native:"हिन्दी",     flag:"🇮🇳" },
  { code:"ta", name:"Tamil",     native:"தமிழ்",      flag:"🌺" },
  { code:"kn", name:"Kannada",   native:"ಕನ್ನಡ",     flag:"🟡" },
  { code:"ml", name:"Malayalam", native:"മലയാളം",    flag:"🌴" },
  { code:"mr", name:"Marathi",   native:"मराठी",      flag:"🟠" },
  { code:"gu", name:"Gujarati",  native:"ગુજરાતી",    flag:"🔷" },
  { code:"pa", name:"Punjabi",   native:"ਪੰਜਾਬੀ",    flag:"🌾" },
  { code:"bn", name:"Bengali",   native:"বাংলা",      flag:"🌸" },
  { code:"or", name:"Odia",      native:"ଓଡ଼ିଆ",     flag:"🏵" },
  { code:"as", name:"Assamese",  native:"অসমীয়া",    flag:"🍃" },
  { code:"ur", name:"Urdu",      native:"اردو",       flag:"☪" },
  { code:"ks", name:"Kashmiri",  native:"کٲشُر",     flag:"❄" },
  { code:"kok",name:"Konkani",   native:"कोंकणी",    flag:"🌊" },
  { code:"mai",name:"Maithili",  native:"मैथिली",    flag:"🌾" },
  { code:"ne", name:"Nepali",    native:"नेपाली",    flag:"⛰" },
  { code:"sd", name:"Sindhi",    native:"سنڌي",      flag:"🌊" },
  { code:"sa", name:"Sanskrit",  native:"संस्कृतम्", flag:"📿" },
  { code:"doi",name:"Dogri",     native:"डोगरी",     flag:"🏔" },
  { code:"mni",name:"Manipuri",  native:"মেইতেই",    flag:"🎭" },
  { code:"bo", name:"Bodo",      native:"बड़ो",       flag:"🌿" },
];

/* ─────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────── */
const JOBS = [
  { id:1, title:"TSPSC Group-II Services 2025", telugu:"TSPSC గ్రూప్-II సర్వీసెస్ 2025", org:"TSPSC", state:"Telangana", cat:"State PSC", type:"Govt", posts:783, qual:"Any Degree", age:"18–44", salary:"₹35,120–₹1,03,740", lastDate:"15 Feb 2025", daysLeft:18, diff:72, color:"#1a6b3c", hot:true, free:true },
  { id:2, title:"SSC CGL 2025 — All India", telugu:"SSC CGL 2025 — అఖిల భారత", org:"SSC CGL", state:"All India", cat:"Central Govt", type:"Govt", posts:17727, qual:"Any Degree", age:"18–32", salary:"₹25,500–₹1,51,100", lastDate:"25 Jan 2025", daysLeft:8, diff:68, color:"#1e4d8c", hot:true, free:true },
  { id:3, title:"IBPS PO Recruitment 2025", telugu:"IBPS PO నియామకాలు 2025", org:"IBPS", state:"All India", cat:"Banking", type:"Govt", posts:4455, qual:"Any Degree", age:"20–30", salary:"₹36,000–₹63,840", lastDate:"10 Feb 2025", daysLeft:13, diff:65, color:"#7c3aed", hot:false, free:false },
  { id:4, title:"RRB NTPC Graduate Posts 2025", telugu:"రైల్వే NTPC నియామకాలు 2025", org:"RRB NTPC", state:"All India", cat:"Railway", type:"Govt", posts:11558, qual:"12th / Degree", age:"18–36", salary:"₹19,900–₹35,400", lastDate:"2 Feb 2025", daysLeft:5, diff:58, color:"#b45309", hot:true, free:true },
  { id:5, title:"APPSC Group-I Mains 2025", telugu:"APPSC గ్రూప్-I మెయిన్స్ 2025", org:"APPSC", state:"Andhra Pradesh", cat:"State PSC", type:"Govt", posts:48, qual:"Any Degree", age:"18–42", salary:"₹37,100–₹1,17,800", lastDate:"20 Feb 2025", daysLeft:23, diff:88, color:"#be185d", hot:false, free:false },
  { id:6, title:"TCS Ninja Hiring — Freshers", telugu:"TCS Ninja హైరింగ్ 2025", org:"TCS", state:"Pan India", cat:"IT / Software", type:"Private", posts:5000, qual:"B.Tech/BCA/B.Sc", age:"No limit", salary:"₹3.36–₹7 LPA", lastDate:"28 Jan 2025", daysLeft:11, diff:45, color:"#0369a1", hot:true, free:false },
  { id:7, title:"Telangana DSC Teachers 2025", telugu:"తెలంగాణ DSC టీచర్స్ 2025", org:"DEO Telangana", state:"Telangana", cat:"Teaching", type:"Govt", posts:11000, qual:"Degree + B.Ed", age:"18–44", salary:"₹28,940–₹83,280", lastDate:"Mar 2025", daysLeft:41, diff:55, color:"#0f766e", hot:true, free:true },
  { id:8, title:"UPSC Civil Services 2025", telugu:"UPSC సివిల్ సర్వీసెస్ 2025", org:"UPSC", state:"All India", cat:"Central Govt", type:"Govt", posts:1056, qual:"Any Degree", age:"21–32", salary:"₹56,100–₹2,50,000", lastDate:"11 Feb 2025", daysLeft:14, diff:97, color:"#991b1b", hot:false, free:false },
];

const CATS = ["All India","Central Govt","State PSC","Railway","Banking","Teaching","IT / Software","Defence","Police","Healthcare"];

const DETAIL_JOB = JOBS[0];

const ROADMAP = [
  { m:"Month 1", color:"#16a34a", focus:"History & Polity Foundation", hrs:"4 hrs/day",
    tasks:["NCERT Class 9–10 History — 2 chapters daily","Telugu Academy Telangana History (complete)","M. Laxmikanth Indian Polity — Ch 1 to 10","Sakshi / The Hindu newspaper — 30 min daily","Make handwritten notes for every topic you read"] },
  { m:"Month 2", color:"#0284c7", focus:"Geography & Economy",hrs:"4 hrs/day",
    tasks:["NCERT Geography Class 9–12 (all chapters)","Telangana Budget 2024-25 — key highlights","Central govt schemes: PM-Kisan, MGNREGS, PM-Awas","Ramesh Singh Economy — selected 8 chapters","Practice 30 MCQs daily from previous papers"] },
  { m:"Month 3", color:"#7c3aed", focus:"Telangana Movement & Society", hrs:"5 hrs/day",
    tasks:["Telugu Academy — Telangana Movement material","State formation timeline — all key dates","Welfare schemes: Rythu Bandhu, KCR Kit, Mission Bhagiratha","Tribal welfare, backward classes development","Make category-wise revision cards this month"] },
  { m:"Month 4", color:"#b45309", focus:"Science, Tech & Current Affairs", hrs:"5 hrs/day",
    tasks:["NCERT Class 10 Science — Physics, Chemistry, Biology","Science & Technology developments 2024","Last 12 months current affairs (from Sakshi Education)","Environment & Ecology — basic concepts","Attempt 1 topic-wise test daily"] },
  { m:"Month 5", color:"#dc2626", focus:"Previous Papers Intensive", hrs:"6 hrs/day",
    tasks:["Solve all 5 previous year TSPSC Group-II papers","For every wrong answer — go back and re-study that topic","Join an online test series (Adda247 / TestBook — ₹500–₹1000)","30 MCQs per topic daily minimum","Revise weak areas identified from test results"] },
  { m:"Month 6", color:"#0f172a", focus:"Final Revision & Mock Tests", hrs:"6 hrs/day",
    tasks:["2 full 150-question mock tests every week","No new topics — only revision from your notes","Focus on time management: 150 Qs in 150 minutes","Sleep 8 hours — physical and mental health matters","Stay calm, confident. You are prepared!"] },
];

const SYLLABUS = [
  { paper:"Paper I — General Studies & Mental Ability", marks:150, weight:"50%",
    topics:["Telangana History, Culture & Movement","Indian History — Ancient, Medieval, Modern","Indian Polity & Constitution (Laxmikanth)","Geography of Telangana & India (NCERT)","Indian Economy & Telangana State Economy","Science & Technology (Class 10 level)","Environmental Studies & Ecology","Current Affairs — last 12 months","Mental Ability & Reasoning","Disaster Management & Relief"] },
  { paper:"Paper II — Telangana Movement & Society", marks:150, weight:"50%",
    topics:["Telangana Movement History (detailed)","Formation of Telangana State — 2014","Socio-economic development of Telangana","Government Schemes: Rythu Bandhu, Mission Bhagiratha, KCR Kit","Tribal issues & development programs","Backward classes welfare policies","Women empowerment schemes","Urban & Rural development","Role of media in Telangana movement","Social reforms & movements"] },
];

const CUTOFFS = [
  { yr:2023, gen:412, bc:389, sc:358, st:341, total:900 },
  { yr:2022, gen:398, bc:375, sc:342, st:328, total:900 },
  { yr:2021, gen:421, bc:401, sc:367, st:352, total:900 },
  { yr:2020, gen:387, bc:362, sc:331, st:315, total:900 },
  { yr:2019, gen:405, bc:381, sc:349, st:334, total:900 },
  { yr:2018, gen:378, bc:354, sc:322, st:308, total:900 },
  { yr:2017, gen:365, bc:341, sc:309, st:294, total:900 },
  { yr:2016, gen:352, bc:328, sc:297, st:281, total:900 },
];

const VACANCIES_BY_DIST = [
  { dist:"Hyderabad", posts:124 }, { dist:"Warangal", posts:89 },
  { dist:"Karimnagar", posts:76 }, { dist:"Nalgonda", posts:81 },
  { dist:"Nizamabad", posts:68 }, { dist:"Khammam", posts:72 },
  { dist:"Adilabad", posts:54 }, { dist:"Mahbubnagar", posts:63 },
  { dist:"Rangareddy", posts:56 }, { dist:"Others", posts:100 },
];

const TOPPERS = [
  { name:"Ravi Kumar", from:"Karimnagar", rank:12, yr:2023, months:8,
    quote:"మొదటి ప్రయత్నంలోనే పాస్ అయ్యాను. ప్రతి రోజు 5 గంటలు పట్టుదలతో చదివాను.",
    quote_en:"I cleared in my first attempt. I studied 5 hours every day with full dedication.",
    strategy:"Focused entirely on Telangana History + daily Sakshi current affairs. Solved 5 years papers 3 times each.",
    tips:["Never skip Current Affairs — 20+ questions every year","Telugu Academy material is enough — don't buy too many books","Revise your notes 3 times minimum before exam"] },
  { name:"Priya Lakshmi Reddy", from:"Warangal", rank:7, yr:2022, months:10,
    quote:"Previous papers solve చేయడం నన్ను బాగా help చేసింది. Weak areas identify చేసుకున్నాను.",
    quote_en:"Solving previous papers helped me enormously. I identified my weak areas and fixed them.",
    strategy:"Made handwritten notes for every topic. Solved 10 years papers. Joined an online test series.",
    tips:["Write notes by hand — memory retention is stronger","Join a test series — mock exams build confidence","Don't panic in the last month — just revise"] },
  { name:"Suresh Naik", from:"Nalgonda", rank:23, yr:2023, months:6,
    quote:"Job చేస్తూ prepare చేశాను. Time management నా success secret.",
    quote_en:"I prepared while doing a job. Time management was my success secret.",
    strategy:"3 hours morning + 2 hours night. No social media for 6 months. Weekend 8-hour sessions.",
    tips:["Even 4–5 focused hours beats 10 distracted hours","Tell your family about your goal — get their support","Sleep well — a tired brain cannot study"] },
];

const PROMOTIONS = [
  { role:"Deputy Tahsildar / MRO", yrs:"Year 0 — Join", pay:"₹35,120–₹1,03,740", note:"Posted to mandal level. Handle land records, certificates." },
  { role:"Tahsildar", yrs:"After 5–10 years", pay:"₹44,920–₹1,30,290", note:"Head of Mandal Revenue Office. More authority." },
  { role:"Revenue Divisional Officer (RDO)", yrs:"After 12–18 years", pay:"₹56,100–₹1,77,500", note:"Oversees multiple mandals. District-level role." },
  { role:"District Revenue Officer (DRO)", yrs:"After 20–25 years", pay:"₹67,700–₹2,08,700", note:"Senior district-level post. Significant authority." },
  { role:"Joint Collector / Additional Collector", yrs:"After 28+ years", pay:"₹1,44,200–₹2,18,200", note:"IAS-equivalent level. Top of state govt service." },
];

const JOB_WORK = [
  { role:"MRO / Deputy Tahsildar", tasks:["Issue caste, income, nativity certificates to public","Land revenue collection from farmers","Supervise village revenue officers (VROs)","Coordinate flood/cyclone relief at mandal level","Conduct land surveys and resolve boundary disputes","Report to Tahsildar and District Collector"] },
  { role:"Sub-Registrar", tasks:["Register property sale/purchase documents","Collect stamp duty on behalf of government","Maintain land records and encumbrance certificates","Verify legal documents submitted by public","Issue certified copies of registered documents"] },
  { role:"Municipal Commissioner (Grade-3)", tasks:["Manage town planning and building permissions","Collect property tax and water tax","Oversee sanitation, drainage, and road maintenance","Implement government schemes in urban area","Manage municipal staff and contractors"] },
];

const BENEFITS = [
  { icon:"🔒", b:"Permanent job — cannot be removed without formal inquiry" },
  { icon:"💰", b:"Monthly pension for life after retirement at 60" },
  { icon:"🏠", b:"Government quarters (housing) at subsidised rent in many postings" },
  { icon:"🏥", b:"Medical reimbursement for self and entire family — unlimited" },
  { icon:"✈️", b:"LTC — Leave Travel Concession for all-India travel every 4 years" },
  { icon:"📚", b:"Children education allowance — ₹2,700 per child per year" },
  { icon:"🛡", b:"Group Insurance Scheme — life insurance partially paid by government" },
  { icon:"🙏", b:"Respected social status — 'Sir/Madam' — family prestige in society" },
  { icon:"🎁", b:"Festival advance — interest-free loan before Diwali, Eid, Christmas" },
  { icon:"🌿", b:"30 days casual leave + 15 sick leave + earned leave per year" },
];

const SIMILAR = [
  { title:"APPSC Group-II 2025", org:"APPSC", posts:312, last:"20 Feb 2025", match:96, daysLeft:23 },
  { title:"TSPSC Group-IV 2025", org:"TSPSC", posts:9168, last:"Apr 2025", match:94, daysLeft:55 },
  { title:"Telangana DSC Teachers", org:"DEO Telangana", posts:11000, last:"Mar 2025", match:87, daysLeft:41 },
  { title:"SSC CHSL 2025", org:"SSC", posts:3712, last:"10 Feb 2025", match:79, daysLeft:13 },
];

const NAV_ITEMS = [
  { id:"home",      label:"Home",            icon:"🏠" },
  { id:"all-jobs",  label:"All Jobs",        icon:"📋" },
  { id:"by-state",  label:"By State",        icon:"🗺" },
  { id:"by-cat",    label:"By Category",     icon:"📂" },
  { id:"mock",      label:"Mock Tests",      icon:"📝" },
  { id:"current",   label:"Current Affairs", icon:"📰" },
  { id:"premium",   label:"Premium",         icon:"⭐" },
  { id:"about",     label:"About Us",        icon:"ℹ️" },
  { id:"contact",   label:"Contact",         icon:"📞" },
];

/* ─────────────────────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────────────────────── */
function diffColor(d) { return d >= 80 ? C.red : d >= 60 ? C.gold : "#16a34a"; }
function diffLabel(d) { return d >= 80 ? "Very Hard" : d >= 60 ? "Hard" : d >= 40 ? "Medium" : "Easy"; }
function urgColor(n) { return n <= 7 ? C.red : n <= 15 ? C.gold : C.green; }
function urgBg(n)    { return n <= 7 ? C.redBg : n <= 15 ? C.goldLight : C.greenBg; }

/* ─────────────────────────────────────────────────────────────
   SUB-COMPONENTS
───────────────────────────────────────────────────────────── */
function Tag({ children, bg, color }) {
  return <span style={{ background: bg, color, fontSize:10, fontWeight:700, padding:"2px 8px", borderRadius:4, display:"inline-block", marginRight:4, marginBottom:2 }}>{children}</span>;
}

function SectionCard({ title, icon, children, accent }) {
  return (
    <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:12, marginBottom:16, overflow:"hidden" }}>
      <div style={{ background: accent || C.navy, padding:"11px 18px", display:"flex", alignItems:"center", gap:8 }}>
        <span style={{ fontSize:18 }}>{icon}</span>
        <span style={{ color:"#fff", fontWeight:800, fontSize:14, letterSpacing:"-0.01em" }}>{title}</span>
      </div>
      <div style={{ padding:18 }}>{children}</div>
    </div>
  );
}

function InfoRow({ label, value, highlight }) {
  return (
    <div style={{ display:"flex", borderBottom:`1px solid ${C.border}`, fontSize:13 }}>
      <div style={{ background:"#f8f6f2", padding:"8px 12px", minWidth:160, fontWeight:700, color:C.muted, flexShrink:0 }}>{label}</div>
      <div style={{ padding:"8px 12px", color: highlight ? C.navy : C.text, fontWeight: highlight ? 700 : 400, flex:1, lineHeight:1.6 }}>{value}</div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   PAGES
───────────────────────────────────────────────────────────── */
function HomePage({ setPage, setSelectedJob }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const filtered = JOBS.filter(j => {
    const q = search.toLowerCase();
    return (!q || j.title.toLowerCase().includes(q) || j.org.toLowerCase().includes(q)) && (filter === "All" || j.cat === filter || j.type === filter);
  });
  return (
    <div>
      {/* HERO */}
      <div style={{ background:`linear-gradient(160deg, ${C.navy} 0%, #0d2040 60%, #1a3c6e 100%)`, padding:"48px 20px 56px", textAlign:"center" }}>
        <div style={{ display:"inline-block", background:"rgba(245,158,11,0.15)", border:"1px solid rgba(245,158,11,0.3)", borderRadius:20, padding:"4px 16px", fontSize:11, fontWeight:800, color:C.gold, letterSpacing:"0.14em", marginBottom:14 }}>
          🇮🇳 ALL INDIA · 500+ SOURCES · UPDATED EVERY DAY 7 AM
        </div>
        <h1 style={{ color:"#fff", fontSize:38, margin:"0 0 6px", fontWeight:900, letterSpacing:"-0.03em", lineHeight:1.15 }}>
          Job<span style={{ color:C.gold }}>Guru</span>.in
        </h1>
        <p style={{ color:"#93c5fd", fontSize:17, margin:"0 0 4px", fontWeight:700 }}>Your Personal Job Mentor — మీ స్వంత జాబ్ గురువు</p>
        <p style={{ color:"#64748b", fontSize:13, margin:"0 0 28px" }}>
          Every government & private job · Full syllabus · Study plan · Cut-offs · Career guide · 22 Languages
        </p>
        {/* SEARCH */}
        <div style={{ maxWidth:600, margin:"0 auto 20px", display:"flex", gap:8 }}>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍  Search job, organisation, exam... e.g. TSPSC, Railway, Bank"
            style={{ flex:1, padding:"14px 18px", borderRadius:10, border:"2px solid rgba(255,255,255,0.12)", background:"rgba(255,255,255,0.07)", color:"#f1f5f9", fontSize:14, outline:"none" }} />
          <button style={{ background:C.gold, color:"#fff", border:"none", borderRadius:10, padding:"14px 22px", fontSize:14, fontWeight:900, cursor:"pointer" }}>Search</button>
        </div>
        {/* QUICK CATEGORIES */}
        <div style={{ display:"flex", gap:8, flexWrap:"wrap", justifyContent:"center", maxWidth:700, margin:"0 auto 20px" }}>
          {["All","Central Govt","State PSC","Railway","Banking","Teaching","IT / Software"].map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{ background: filter === f ? C.gold : "rgba(255,255,255,0.08)", color: filter === f ? "#fff" : "#93c5fd", border: filter === f ? "none" : "1px solid rgba(255,255,255,0.15)", borderRadius:20, padding:"6px 14px", fontSize:12, fontWeight:700, cursor:"pointer" }}>{f}</button>
          ))}
        </div>
        {/* LIVE STATS */}
        <div style={{ display:"flex", gap:10, flexWrap:"wrap", justifyContent:"center" }}>
          {[["🔴","8","Urgent (<7 days)","#fef2f2","#991b1b"],["🟡","14","Closing Soon","#fef3c7","#92400e"],["🟢","47","New Today","#dcfce7","#166534"],["📋","283","Total Active","#dbeafe","#1e40af"],["🏛","28","States Covered","#f3e8ff","#6b21a8"]].map(([ic,n,l,bg,col]) => (
            <div key={l} style={{ background:bg, color:col, fontSize:12, fontWeight:700, padding:"5px 12px", borderRadius:20, display:"flex", alignItems:"center", gap:5 }}>
              {ic} <strong>{n}</strong> {l}
            </div>
          ))}
        </div>
      </div>

      {/* TICKER */}
      <div style={{ background:C.gold, padding:"9px 0", overflow:"hidden" }}>
        <div style={{ display:"flex", gap:0, whiteSpace:"nowrap" }}>
          {[...Array(2)].map((_,r)=>(
            <div key={r} style={{ display:"flex", animation:"ticker 22s linear infinite", gap:0 }}>
              {["🔔 TSPSC Group-II — 783 Posts — Last Date 15 Feb 2025","⚡ SSC CGL 2025 — 17,727 Posts — Apply Now","📢 RRB NTPC — 11,558 Posts — Only 5 Days Left!","🏦 IBPS PO — 4,455 Posts — 13 Days Left","🎓 Telangana DSC — 11,000 Teacher Posts"].map((t,i) => (
                <span key={i} style={{ fontSize:12, fontWeight:800, color:"#fff", paddingRight:60 }}>{t}</span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* JOB CARDS */}
      <div style={{ maxWidth:960, margin:"0 auto", padding:"24px 16px" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
          <span style={{ fontWeight:800, fontSize:16, color:C.navy }}>Latest Job Notifications</span>
          <span style={{ fontSize:12, color:C.green, fontWeight:700 }}>✓ Auto-updated today 7:04 AM by JobGuru AI</span>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(440px,1fr))", gap:12 }}>
          {filtered.map(job => (
            <div key={job.id} onClick={() => { setSelectedJob(job); setPage("detail"); }}
              style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:12, padding:"16px 18px", cursor:"pointer", position:"relative", overflow:"hidden", transition:"transform 0.1s" }}
              onMouseEnter={e => e.currentTarget.style.transform="translateY(-2px)"}
              onMouseLeave={e => e.currentTarget.style.transform="translateY(0)"}>
              <div style={{ position:"absolute", left:0, top:0, bottom:0, width:5, background:job.color, borderRadius:"12px 0 0 12px" }} />
              <div style={{ paddingLeft:10 }}>
                <div style={{ display:"flex", gap:6, marginBottom:8, flexWrap:"wrap" }}>
                  <Tag bg={job.color+"18"} color={job.color}>{job.org}</Tag>
                  <Tag bg={job.type==="Govt"?"#dcfce7":"#dbeafe"} color={job.type==="Govt"?"#166534":"#1e40af"}>{job.type}</Tag>
                  <Tag bg="#f1f5f9" color="#475569">{job.state}</Tag>
                  {job.hot && <Tag bg="#fff7ed" color="#c2410c">🔥 HOT</Tag>}
                  {!job.free && <Tag bg={C.goldLight} color="#92400e">⭐ Premium</Tag>}
                </div>
                <div style={{ fontSize:15, fontWeight:800, color:C.navy, marginBottom:2, lineHeight:1.3 }}>{job.title}</div>
                <div style={{ fontSize:12, color:C.subtle, marginBottom:10 }}>{job.telugu}</div>
                <div style={{ display:"flex", gap:16, flexWrap:"wrap", marginBottom:10 }}>
                  {[["📌",job.posts.toLocaleString()+" posts"],["🎓",job.qual],["💰",job.salary]].map(([ic,v]) => (
                    <div key={v}><div style={{ fontSize:10, color:C.subtle }}>{ic}</div><div style={{ fontSize:11, fontWeight:700, color:C.text }}>{v}</div></div>
                  ))}
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                  <div style={{ flex:1, height:4, background:"#f1f5f9", borderRadius:2 }}>
                    <div style={{ height:"100%", width:`${job.diff}%`, background:diffColor(job.diff), borderRadius:2 }} />
                  </div>
                  <span style={{ fontSize:10, color:diffColor(job.diff), fontWeight:700, minWidth:55 }}>{diffLabel(job.diff)}</span>
                  <div style={{ background:urgBg(job.daysLeft), color:urgColor(job.daysLeft), fontSize:11, fontWeight:800, padding:"3px 9px", borderRadius:5, marginLeft:"auto" }}>{job.daysLeft}d left</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div style={{ background:C.navy, padding:"40px 20px" }}>
        <div style={{ maxWidth:860, margin:"0 auto", textAlign:"center" }}>
          <div style={{ fontSize:11, color:C.gold, fontWeight:800, letterSpacing:"0.12em", marginBottom:8 }}>HOW JOBGURU WORKS</div>
          <h2 style={{ color:"#fff", fontSize:24, fontWeight:900, margin:"0 0 30px" }}>AI collects. AI explains. You just study.</h2>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))", gap:16 }}>
            {[["🤖","AI Collects","500+ newspapers & websites scanned every morning at 5 AM"],["🧠","AI Explains","Claude AI reads each job and writes full details in simple language"],["🌐","22 Languages","Read in Telugu, Hindi, Tamil, Kannada or any Indian language"],["📱","Delivered to You","Sent to Telegram, WhatsApp, website and app by 7 AM"]].map(([ic,t,s]) => (
              <div key={t} style={{ background:"rgba(255,255,255,0.06)", borderRadius:10, padding:18, border:"1px solid rgba(255,255,255,0.08)" }}>
                <div style={{ fontSize:32, marginBottom:10 }}>{ic}</div>
                <div style={{ color:"#fff", fontWeight:800, fontSize:14, marginBottom:6 }}>{t}</div>
                <div style={{ color:"#64748b", fontSize:12, lineHeight:1.6 }}>{s}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* JOIN CHANNELS */}
      <div style={{ background:`linear-gradient(135deg, ${C.navy} 0%, #0d2040 100%)`, padding:"32px 20px", textAlign:"center", borderTop:`3px solid ${C.gold}` }}>
        <h2 style={{ color:"#fff", fontSize:20, fontWeight:900, margin:"0 0 4px" }}>Never miss a government job again</h2>
        <p style={{ color:"#64748b", fontSize:13, margin:"0 0 18px" }}>Join 50,000+ students already getting free daily alerts</p>
        <div style={{ display:"flex", gap:10, justifyContent:"center", flexWrap:"wrap" }}>
          <button style={{ background:"#25D366", color:"#fff", border:"none", borderRadius:8, padding:"10px 20px", fontSize:13, fontWeight:800, cursor:"pointer" }}>📱 Join WhatsApp Channel</button>
          <button style={{ background:"#2CA5E0", color:"#fff", border:"none", borderRadius:8, padding:"10px 20px", fontSize:13, fontWeight:800, cursor:"pointer" }}>✈️ Join Telegram Channel</button>
          <button onClick={() => setPage("premium")} style={{ background:C.gold, color:"#fff", border:"none", borderRadius:8, padding:"10px 20px", fontSize:13, fontWeight:800, cursor:"pointer" }}>⭐ Get Premium ₹149/mo</button>
        </div>
      </div>
    </div>
  );
}

/* ─── DETAIL PAGE ─────────────────────────────────────────── */
function DetailPage({ job }) {
  const [tab, setTab] = useState("overview");
  const [lang, setLang] = useState(LANGS[0]);
  const [showLangPicker, setShowLangPicker] = useState(false);
  const [translations, setTranslations] = useState({});
  const [translating, setTranslating] = useState(false);
  const [age, setAge] = useState("");
  const [qual, setQual] = useState("");
  const [cat, setCat] = useState("");
  const [eligResult, setEligResult] = useState(null);

  const totalSecs = (job.daysLeft || 18) * 86400;
  const [secs, setSecs] = useState(totalSecs);
  useEffect(() => {
    const t = setInterval(() => setSecs(s => Math.max(0,s-1)), 1000);
    return () => clearInterval(t);
  }, []);
  const cd = { d:Math.floor(secs/86400), h:Math.floor((secs%86400)/3600), m:Math.floor((secs%3600)/60), s:secs%60 };

  async function translateAll() {
    if (lang.code === "en") return;
    setTranslating(true);
    try {
      const content = `Translate the following complete Indian government job notification into ${lang.name} (${lang.native}). Use simple everyday language that any common person can understand. Keep numbers, ₹ amounts, exam names (TSPSC, SSC, UPSC, etc.) and dates exactly as-is. Write fully in ${lang.native} script.

JOB TITLE: ${job.title}
TOTAL POSTS: ${job.posts.toLocaleString()} vacancies
ORGANISATION: TSPSC — Telangana State Public Service Commission
QUALIFICATION: Any Bachelor's Degree from a recognised university
AGE LIMIT: 18 to 44 years. SC/ST/BC: up to 49 years. PH: 10 years extra.
SALARY: ₹35,120 to ₹1,03,740 per month. In-hand approximately ₹42,000–₹48,000/month after deductions.
EXAM FEE: OC/EWS: ₹200. BC: ₹100. SC/ST/PH: completely FREE.
LAST DATE TO APPLY: 15 February 2025
EXAM DATE: June 2025 (expected)
OFFICIAL WEBSITE: tspsc.gov.in

SYLLABUS SUMMARY: Paper I — General Studies (150 marks): Telangana History, Indian History, Indian Polity, Geography, Economy, Science, Current Affairs. Paper II — Telangana Movement and Society (150 marks): Telangana Movement History, State Formation, Government Schemes, Social Welfare Programs.

STUDY PLAN: Month 1 — History and Polity basics. Month 2 — Geography and Economy. Month 3 — Telangana Movement and Society. Month 4 — Science and Current Affairs. Month 5 — Previous year papers practice. Month 6 — Full mock tests and revision only.

IMPORTANT BENEFITS AFTER SELECTION: Permanent government job with full security. Monthly pension for life after retirement. Government housing in many postings. Medical reimbursement for entire family. Leave Travel Concession for all-India travel. Children education allowance. High social respect in society.

Please translate all of the above into ${lang.native} naturally and clearly.`;

      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ model:"claude-sonnet-4-20250514", max_tokens:2000, messages:[{ role:"user", content }] })
      });
      const data = await res.json();
      setTranslations(t => ({ ...t, [lang.code]: data.content[0].text }));
    } catch(e) { alert("Translation failed. Please try again."); }
    finally { setTranslating(false); }
  }

  function checkElig() {
    const a = parseInt(age);
    const maxAge = cat==="sc"||cat==="st" ? 49 : cat==="bc" ? 49 : 44;
    const ageOk = !isNaN(a) && a >= 18 && a <= maxAge;
    const qualOk = qual !== "";
    setEligResult({ ok: ageOk && qualOk, ageOk, qualOk });
  }

  function shareWA() {
    const msg = `🎓 *JobGuruWorld.com* — ${job.title}\n\n📌 Posts: ${job.posts.toLocaleString()}\n🎓 Qualification: ${job.qual}\n👤 Age: ${job.age}\n💰 Salary: ${job.salary}\n📅 Last Date: ${job.lastDate}\n\n🌐 Full Study Plan + Details:\njobguruworld.com\n\n#JobGuruWorld #${job.org} #GovernmentJob`;
    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`);
  }

  const TABS = [
    { id:"overview",  label:"Overview",       icon:"📋" },
    { id:"syllabus",  label:"Syllabus",        icon:"📚" },
    { id:"roadmap",   label:"Study Plan",      icon:"🗺" },
    { id:"cutoff",    label:"Cut-offs",        icon:"🎯" },
    { id:"papers",    label:"Papers",          icon:"📝" },
    { id:"joblife",   label:"Job Life",        icon:"💼" },
    { id:"toppers",   label:"Toppers",         icon:"🏆" },
    { id:"similar",   label:"Similar Jobs",    icon:"🔗" },
    { id:"language",  label:"My Language",     icon:"🌐" },
  ];

  return (
    <div>
      {/* JOB HERO HEADER */}
      <div style={{ background:job.color, padding:"20px 20px 0" }}>
        <div style={{ maxWidth:1040, margin:"0 auto" }}>
          <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:10 }}>
            <Tag bg="rgba(255,255,255,0.2)" color="#fff">{job.org}</Tag>
            <Tag bg="rgba(255,255,255,0.2)" color="#fff">{job.type}</Tag>
            <Tag bg="rgba(255,255,255,0.2)" color="#fff">{job.state}</Tag>
            {job.hot && <Tag bg="rgba(255,255,255,0.2)" color="#fff">🔥 HOT</Tag>}
          </div>
          <h1 style={{ color:"#fff", fontSize:24, margin:"0 0 2px", fontWeight:900, lineHeight:1.2 }}>{job.title}</h1>
          <p style={{ color:"rgba(255,255,255,0.7)", fontSize:13, margin:"0 0 16px" }}>{job.telugu}</p>
          {/* KEY STATS */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(6,1fr)", gap:2 }}>
            {[["Posts",job.posts.toLocaleString()],["Salary",job.salary.split("–")[0]+"…"],["Age",job.age],["Qual",job.qual.length>10?job.qual.slice(0,10)+"…":job.qual],["Fee","₹200/Free"],["Exam","June 2025"]].map(([l,v]) => (
              <div key={l} style={{ background:"rgba(0,0,0,0.25)", padding:"9px 12px", textAlign:"center" }}>
                <div style={{ fontSize:9, color:"rgba(255,255,255,0.6)", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.04em", marginBottom:3 }}>{l}</div>
                <div style={{ fontSize:13, fontWeight:800, color:"#fff" }}>{v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ACTION BAR */}
      <div style={{ background:"#fff", borderBottom:`1px solid ${C.border}`, padding:"10px 20px" }}>
        <div style={{ maxWidth:1040, margin:"0 auto", display:"flex", gap:10, alignItems:"center", flexWrap:"wrap" }}>
          <div style={{ display:"flex", gap:5, alignItems:"center" }}>
            <span style={{ fontSize:11, color:C.red, fontWeight:800 }}>⏱ Closes in:</span>
            {[["d",cd.d],["h",cd.h],["m",cd.m],["s",cd.s]].map(([u,v]) => (
              <div key={u} style={{ background:C.red, color:"#fff", borderRadius:4, padding:"2px 7px", textAlign:"center", minWidth:32 }}>
                <div style={{ fontSize:13, fontWeight:900 }}>{String(v).padStart(2,"0")}</div>
                <div style={{ fontSize:8, opacity:0.8 }}>{u}</div>
              </div>
            ))}
          </div>
          <div style={{ flex:1 }} />
          <button onClick={shareWA} style={{ background:"#25D366", color:"#fff", border:"none", borderRadius:6, padding:"7px 13px", fontSize:12, fontWeight:700, cursor:"pointer" }}>📤 WhatsApp Share</button>
          <a href="https://tspsc.gov.in" target="_blank" rel="noreferrer" style={{ background:"#f1f5f9", color:C.blue, border:`1px solid ${C.blueBg}`, borderRadius:6, padding:"7px 13px", fontSize:12, fontWeight:700, textDecoration:"none" }}>📄 Official Notification</a>
          <a href="https://tspsc.gov.in/apply" target="_blank" rel="noreferrer" style={{ background:C.gold, color:"#fff", borderRadius:6, padding:"7px 16px", fontSize:12, fontWeight:900, textDecoration:"none" }}>✅ Apply Now →</a>
        </div>
      </div>

      {/* TABS */}
      <div style={{ background:"#fff", borderBottom:`1px solid ${C.border}`, position:"sticky", top:0, zIndex:20 }}>
        <div style={{ maxWidth:1040, margin:"0 auto", display:"flex", overflowX:"auto" }}>
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{ padding:"11px 14px", border:"none", background:"none", cursor:"pointer", whiteSpace:"nowrap",
              fontSize:12, fontWeight: tab===t.id ? 800 : 500, color: tab===t.id ? C.navyMid : C.subtle,
              borderBottom: tab===t.id ? `2.5px solid ${C.gold}` : "2.5px solid transparent", display:"flex", alignItems:"center", gap:5 }}>
              <span style={{ fontSize:14 }}>{t.icon}</span>{t.label}
            </button>
          ))}
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div style={{ maxWidth:1040, margin:"0 auto", padding:"20px 16px", display:"grid", gridTemplateColumns:"1fr 300px", gap:20 }}>

        <div>
          {/* ── OVERVIEW ── */}
          {tab === "overview" && (
            <div>
              <SectionCard title="Complete Notification Details" icon="📋" accent={C.navyMid}>
                <table style={{ width:"100%", borderCollapse:"collapse" }}>
                  <tbody>
                    {[["Organisation","TSPSC — Telangana State Public Service Commission",true],["Post Names","Deputy Tahsildar, MRO, Sub-Registrar, Municipal Commissioner (Grade 3)",true],["Total Vacancies","783 Posts",true],["Qualification","Any Bachelor's Degree from a recognised university",false],["Age Limit","18 to 44 years",false],["Age Relaxation","SC/ST/BC: up to 49 years  |  PH: 10 years extra  |  ExSM: 3 years extra",false],["Application Opens","20 January 2025",false],["Last Date to Apply","15 February 2025",true],["Exam Date (Expected)","June 2025",false],["Result (Expected)","December 2025",false],["Exam Fee — OC/EWS","₹200",false],["Exam Fee — BC","₹100",false],["Exam Fee — SC/ST/PH","FREE — ₹0",true],["Salary Range","₹35,120 – ₹1,03,740 per month",false],["In-hand Salary","~₹42,000 – ₹48,000/month after deductions",true],["Exam Pattern","2 Papers × 150 marks = 300 marks  |  Negative marking: ⅓ mark deducted",false],["Official Website","tspsc.gov.in",false]].map(([l,v,hi]) => (
                      <InfoRow key={l} label={l} value={v} highlight={hi} />
                    ))}
                  </tbody>
                </table>
              </SectionCard>

              <SectionCard title="District-wise Vacancy Breakdown — జిల్లాల వారీగా ఖాళీలు" icon="🗺" accent="#0369a1">
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"6px 20px" }}>
                  {VACANCIES_BY_DIST.map(v => (
                    <div key={v.dist} style={{ display:"flex", alignItems:"center", gap:8 }}>
                      <span style={{ fontSize:12, color:C.muted, minWidth:100 }}>{v.dist}</span>
                      <div style={{ flex:1, height:6, background:"#f1f5f9", borderRadius:3, overflow:"hidden" }}>
                        <div style={{ height:"100%", width:`${(v.posts/124)*100}%`, background:C.navyLight, borderRadius:3 }} />
                      </div>
                      <span style={{ fontSize:12, fontWeight:800, color:C.navyLight, minWidth:28 }}>{v.posts}</span>
                    </div>
                  ))}
                </div>
              </SectionCard>

              <SectionCard title="⚠️ Common Mistakes to Avoid — ఈ తప్పులు చేయకండి" icon="⚠️" accent="#dc2626">
                {["Starting new books in the last month before exam — stick to what you already have","Ignoring Telangana-specific topics — 40% of the paper is about Telangana only","Skipping previous papers practice — this is the biggest and most common mistake","Reading too many books — 3 good books mastered beats 10 books half-read","No daily revision schedule — reading once is never enough, revise minimum 3 times","Ignoring Current Affairs — every exam has 20–25 questions from last 12 months news","Studying 15 hours one day and 0 hours the next — consistency beats intensity always","Not attempting mock tests — you must simulate real exam conditions before the actual exam"].map((m,i) => (
                  <div key={i} style={{ display:"flex", gap:10, padding:"7px 0", borderBottom: i<7 ? `1px solid #fee2e2` : "none" }}>
                    <span style={{ color:C.red, fontWeight:900, flexShrink:0 }}>✗</span>
                    <span style={{ fontSize:13, color:C.text, lineHeight:1.6 }}>{m}</span>
                  </div>
                ))}
              </SectionCard>
            </div>
          )}

          {/* ── SYLLABUS ── */}
          {tab === "syllabus" && (
            <div>
              <div style={{ background:"#fff3cd", border:"1px solid #ffc107", borderRadius:8, padding:"10px 14px", marginBottom:14, fontSize:13, color:"#856404" }}>
                📌 Exam Pattern: 2 Papers × 150 marks each = 300 marks total · 2.5 hours per paper · Negative marking: ⅓ mark per wrong answer · No interview — merit from written exam only
              </div>
              {SYLLABUS.map((s,i) => (
                <SectionCard key={i} title={`${s.paper} — ${s.marks} Marks (${s.weight})`} icon="📚" accent={i===0 ? C.navyMid : "#7c3aed"}>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"6px 16px", marginBottom:12 }}>
                    {s.topics.map((t,j) => (
                      <div key={j} style={{ display:"flex", gap:7, alignItems:"flex-start" }}>
                        <span style={{ color:C.green, fontWeight:900, flexShrink:0, fontSize:14 }}>✓</span>
                        <span style={{ fontSize:13, color:C.text, lineHeight:1.5 }}>{t}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ background:"#f0fdf4", borderRadius:6, padding:"9px 12px", fontSize:12, color:"#166534" }}>
                    <strong>Best resource:</strong> Telugu Academy {i===0 ? "General Studies" : "Telangana Movement"} Material + NCERT Class 9–12 (free PDF at ncert.nic.in)
                  </div>
                </SectionCard>
              ))}
              <SectionCard title="Recommended Books — సిఫారసు చేయబడిన పుస్తకాలు" icon="📖" accent="#b45309">
                {[["Telugu Academy Group-II Study Material","All subjects · Available in Hyderabad · ₹400–600 per subject","🥇 Most Important"],["M. Laxmikanth — Indian Polity (Telugu edition)","Chapters 1–20 essential · Telugu version available · ₹600","🥇 Must Read"],["NCERT Class 9–12 (All subjects)","Completely FREE — download at ncert.nic.in · Start here","🆓 Free"],["Sakshi Education Previous Year Papers","Last 5 years · Available at local stationery shops · ₹150–200","📝 Essential"],["Telangana Economy — Tata McGraw Hill","State-specific economy · Important for Paper I · ₹350","📊 Useful"]].map(([t,d,tag],i) => (
                  <div key={i} style={{ display:"flex", gap:12, padding:"10px 0", borderBottom: i<4 ? `1px solid ${C.border}` : "none" }}>
                    <span style={{ fontSize:22, flexShrink:0 }}>{["📗","📘","💻","📋","📙"][i]}</span>
                    <div style={{ flex:1 }}>
                      <div style={{ fontSize:13, fontWeight:700, color:C.navy }}>{t}</div>
                      <div style={{ fontSize:12, color:C.muted, marginTop:2 }}>{d}</div>
                    </div>
                    <span style={{ background: tag.startsWith("🥇")?"#fef9c3":tag.startsWith("🆓")?"#dcfce7":"#f1f5f9", color: tag.startsWith("🥇")?"#92400e":tag.startsWith("🆓")?"#166534":C.muted, fontSize:10, fontWeight:700, padding:"3px 8px", borderRadius:5, whiteSpace:"nowrap", height:"fit-content" }}>{tag}</span>
                  </div>
                ))}
              </SectionCard>
            </div>
          )}

          {/* ── STUDY ROADMAP ── */}
          {tab === "roadmap" && (
            <div>
              <div style={{ background:C.goldLight, border:`1px solid ${C.gold}`, borderRadius:8, padding:"10px 14px", marginBottom:14, fontSize:13, color:"#92400e" }}>
                🎯 This 6-month plan is AI-generated by JobGuru based on the official syllabus, past exam patterns, and strategies from students who cleared TSPSC Group-II. Follow it consistently and you will be fully prepared.
              </div>
              {ROADMAP.map((r,i) => (
                <div key={i} style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:12, padding:"18px 20px", marginBottom:14, borderLeft:`5px solid ${r.color}` }}>
                  <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:12 }}>
                    <span style={{ background:r.color, color:"#fff", fontSize:11, fontWeight:900, padding:"4px 12px", borderRadius:20 }}>{r.m}</span>
                    <span style={{ fontSize:15, fontWeight:800, color:C.navy }}>{r.focus}</span>
                    <span style={{ marginLeft:"auto", fontSize:11, color:C.subtle, background:"#f1f5f9", padding:"3px 9px", borderRadius:5 }}>⏱ {r.hrs}</span>
                  </div>
                  {r.tasks.map((t,j) => (
                    <div key={j} style={{ display:"flex", gap:9, padding:"5px 0", borderBottom: j<r.tasks.length-1 ? `1px solid #f8f5f0` : "none" }}>
                      <span style={{ color:r.color, fontWeight:900, flexShrink:0 }}>→</span>
                      <span style={{ fontSize:13, color:C.text, lineHeight:1.6 }}>{t}</span>
                    </div>
                  ))}
                </div>
              ))}
              <div style={{ background:C.navyMid, borderRadius:12, padding:18, textAlign:"center" }}>
                <div style={{ fontSize:15, fontWeight:900, color:"#fff", marginBottom:4 }}>📥 Download This Study Plan as PDF</div>
                <div style={{ fontSize:12, color:"#93c5fd", marginBottom:12 }}>Save it on your phone and refer anytime — even offline</div>
                <button style={{ background:C.gold, color:"#fff", border:"none", borderRadius:8, padding:"9px 22px", fontSize:13, fontWeight:800, cursor:"pointer" }}>Download Free PDF →</button>
              </div>
            </div>
          )}

          {/* ── CUT-OFFS ── */}
          {tab === "cutoff" && (
            <div>
              <SectionCard title="Last 8 Years Cut-off Marks — కట్-ఆఫ్ మార్కులు" icon="🎯" accent={C.navyMid}>
                <div style={{ marginBottom:12, fontSize:13, color:C.muted }}>Total marks: 900 (300 written + 300 physical/interview equivalent). Aim for <strong style={{ color:C.navy }}>420+ marks (General)</strong> for safe selection.</div>
                <div style={{ overflowX:"auto" }}>
                  <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
                    <thead>
                      <tr style={{ background:C.navyMid }}>
                        {["Year","General","BC","SC","ST","Trend"].map(h => (
                          <th key={h} style={{ padding:"9px 12px", color:"#fff", textAlign:"left", fontSize:11, fontWeight:700 }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {CUTOFFS.map((c,i) => (
                        <tr key={c.yr} style={{ background: i%2===0 ? "#fff" : "#f8f5f0" }}>
                          <td style={{ padding:"8px 12px", fontWeight:800, color:C.navy }}>{c.yr}</td>
                          {[["gen",c.gen,"#1d4ed8"],["bc",c.bc,"#7c3aed"],["sc",c.sc,"#dc2626"],["st",c.st,"#f59e0b"]].map(([k,v,col]) => (
                            <td key={k} style={{ padding:"8px 12px" }}>
                              <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                                <div style={{ width:40, height:4, background:"#f1f5f9", borderRadius:2 }}>
                                  <div style={{ height:"100%", width:`${(v/500)*100}%`, background:col, borderRadius:2 }} />
                                </div>
                                <span style={{ fontWeight:700, color:col }}>{v}</span>
                              </div>
                            </td>
                          ))}
                          <td style={{ padding:"8px 12px", fontSize:11, fontWeight:700, color: i>0 && CUTOFFS[i-1].gen>c.gen ? C.green : C.red }}>
                            {i>0 ? (CUTOFFS[i-1].gen>c.gen ? "▼ Easier":"▲ Tougher") : "—"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div style={{ marginTop:14, background:"#fef9c3", borderRadius:8, padding:"10px 14px", fontSize:13, color:"#713f12" }}>
                  📊 <strong>Trend Analysis:</strong> Cut-offs have been rising by 3–5 marks each year as more students prepare seriously. General category should target 420+. BC: 400+. SC: 360+. ST: 345+.
                </div>
              </SectionCard>
            </div>
          )}

          {/* ── PAPERS ── */}
          {tab === "papers" && (
            <div>
              <SectionCard title="Previous Year Question Papers — పాత ప్రశ్నపత్రాలు" icon="📝" accent={C.navyMid}>
                {[2023,2022,2021,2020,2019,2018].map(yr => (
                  <div key={yr} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"11px 0", borderBottom:`1px solid ${C.border}` }}>
                    <div>
                      <div style={{ fontSize:14, fontWeight:700, color:C.navy }}>TSPSC Group-II {yr} — Paper I & Paper II</div>
                      <div style={{ fontSize:12, color:C.subtle, marginTop:2 }}>150 Questions · 150 Marks · 2.5 Hours · Negative marking ⅓</div>
                    </div>
                    <div style={{ display:"flex", gap:7 }}>
                      <button style={{ background:C.blueBg, color:C.blue, border:"none", borderRadius:6, padding:"5px 12px", fontSize:12, fontWeight:700, cursor:"pointer" }}>View</button>
                      <button style={{ background:"#dcfce7", color:C.green, border:"none", borderRadius:6, padding:"5px 12px", fontSize:12, fontWeight:700, cursor:"pointer" }}>PDF</button>
                    </div>
                  </div>
                ))}
              </SectionCard>
              <SectionCard title="AI Model Tests by JobGuru — మోడల్ పేపర్లు" icon="🤖" accent="#16a34a">
                <div style={{ fontSize:12, color:C.muted, marginBottom:12 }}>Generated fresh by JobGuru AI based on latest syllabus and exam pattern analysis</div>
                {[["📋","Full General Studies Mock Test","150 Questions · All topics","Start Test →"],["🏛","Telangana History Specialist Test","50 Questions · Deep history focus","Start Test →"],["⚖️","Indian Polity & Constitution","40 Questions · Laxmikanth level","Start Test →"],["💰","Economy & Schemes Special Test","35 Questions · Schemes focus","Start Test →"],["📰","Current Affairs Monthly Test","40 Questions · Last 30 days","Start Test →"],["🔄","Mixed Topic Speed Test","100 Questions · 60 minutes","Start Test →"]].map(([ic,t,d,btn],i) => (
                  <div key={i} style={{ display:"flex", alignItems:"center", gap:12, padding:"10px 0", borderBottom: i<5 ? `1px solid ${C.border}` : "none" }}>
                    <span style={{ fontSize:22 }}>{ic}</span>
                    <div style={{ flex:1 }}>
                      <div style={{ fontSize:13, fontWeight:700, color:C.navy }}>{t}</div>
                      <div style={{ fontSize:11, color:C.subtle }}>{d}</div>
                    </div>
                    <button style={{ background:"#f0fdf4", color:C.green, border:`1px solid #bbf7d0`, borderRadius:6, padding:"5px 12px", fontSize:12, fontWeight:700, cursor:"pointer" }}>{btn}</button>
                  </div>
                ))}
              </SectionCard>
            </div>
          )}

          {/* ── JOB LIFE ── */}
          {tab === "joblife" && (
            <div>
              <SectionCard title="What is the actual job work? — ఉద్యోగంలో రోజువారీ పని" icon="💼" accent={C.navyMid}>
                {JOB_WORK.map((jw,i) => (
                  <div key={i} style={{ marginBottom:16, paddingBottom:16, borderBottom: i<JOB_WORK.length-1 ? `1px solid ${C.border}` : "none" }}>
                    <div style={{ fontSize:14, fontWeight:800, color:C.blue, marginBottom:8 }}>{jw.role}</div>
                    {jw.tasks.map((t,j) => (
                      <div key={j} style={{ display:"flex", gap:8, padding:"4px 0", fontSize:13, color:C.text }}>
                        <span style={{ color:C.green, fontWeight:900 }}>•</span>{t}
                      </div>
                    ))}
                  </div>
                ))}
              </SectionCard>

              <SectionCard title="Complete Salary & Allowances — పూర్తి జీతం వివరాలు" icon="💰" accent="#16a34a">
                <table style={{ width:"100%", borderCollapse:"collapse" }}>
                  <tbody>
                    {[["Basic Pay","₹35,120/month",false],["Dearness Allowance (DA 12%)","₹4,214/month",false],["House Rent Allowance (HRA 24%)","₹8,429/month",false],["Travel Allowance (TA)","₹2,500–₹5,000/month (varies by posting)",false],["Medical Allowance","₹8,000/year for self + family",false],["Gross Salary (approx.)","₹52,000–₹58,000/month",true],["Income Tax Deduction","~₹3,000–₹6,000/month (varies)",false],["PF Deduction (10% basic)","₹3,512/month (your savings)",false],["In-hand Salary (Final Take-home)","₹42,000–₹48,000/month",true],["Annual Salary (approx.)","₹5.5–₹7 Lakhs per year",true]].map(([l,v,hi]) => <InfoRow key={l} label={l} value={v} highlight={hi} />)}
                  </tbody>
                </table>
              </SectionCard>

              <SectionCard title="Career Growth & Promotion Path — కెరీర్ వృద్ధి" icon="📈" accent="#7c3aed">
                {PROMOTIONS.map((p,i) => (
                  <div key={i} style={{ display:"flex", gap:14, alignItems:"flex-start", padding:"12px 0", borderBottom: i<PROMOTIONS.length-1 ? `1px solid ${C.border}` : "none" }}>
                    <div style={{ width:36, height:36, background: i===0 ? C.navyMid : i===PROMOTIONS.length-1 ? C.gold : "#f1f5f9", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, fontWeight:900, color: i===0||i===PROMOTIONS.length-1 ? "#fff" : C.muted, flexShrink:0 }}>{i+1}</div>
                    <div>
                      <div style={{ fontSize:14, fontWeight:800, color:C.navy }}>{p.role}</div>
                      <div style={{ fontSize:12, color:C.muted, marginTop:2 }}>{p.yrs} · <strong style={{ color:C.green }}>{p.pay}</strong></div>
                      <div style={{ fontSize:12, color:C.text, marginTop:3 }}>{p.note}</div>
                    </div>
                  </div>
                ))}
                <div style={{ marginTop:12, background:"#fef9c3", borderRadius:8, padding:"10px 14px", fontSize:12, color:"#713f12" }}>
                  🌟 Top performers with good service record can get empanelled to IAS cadre after 15+ years. Your career can reach the highest levels of government!
                </div>
              </SectionCard>

              <SectionCard title="Job Benefits & Privileges — ఉద్యోగ సౌకర్యాలు" icon="🌟" accent="#b45309">
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
                  {BENEFITS.map((b,i) => (
                    <div key={i} style={{ display:"flex", gap:8, background:"#f8f5f0", borderRadius:7, padding:"9px 11px" }}>
                      <span style={{ fontSize:18, flexShrink:0 }}>{b.icon}</span>
                      <span style={{ fontSize:12, color:C.text, lineHeight:1.5 }}>{b.b}</span>
                    </div>
                  ))}
                </div>
              </SectionCard>
            </div>
          )}

          {/* ── TOPPERS ── */}
          {tab === "toppers" && (
            <div>
              <div style={{ background:C.goldLight, border:`1px solid ${C.gold}`, borderRadius:8, padding:"10px 14px", marginBottom:14, fontSize:13, color:"#92400e" }}>
                🏆 Real success stories from students who cleared TSPSC Group-II. Learn from their strategies and avoid their mistakes.
              </div>
              {TOPPERS.map((t,i) => (
                <div key={i} style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:12, padding:20, marginBottom:14 }}>
                  <div style={{ display:"flex", gap:14, marginBottom:14 }}>
                    <div style={{ width:56, height:56, background:C.blueBg, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:900, color:C.blue, fontSize:18, flexShrink:0 }}>
                      {t.name.split(" ").map(n=>n[0]).join("")}
                    </div>
                    <div style={{ flex:1 }}>
                      <div style={{ fontSize:16, fontWeight:800, color:C.navy }}>{t.name}</div>
                      <div style={{ fontSize:12, color:C.muted }}>From {t.from} · Rank <strong style={{ color:C.gold }}>#{t.rank}</strong> · Year {t.yr} · Prepared in {t.months} months</div>
                    </div>
                    <div style={{ background:"#fef9c3", color:"#92400e", fontSize:13, fontWeight:900, padding:"4px 14px", borderRadius:20, height:"fit-content" }}>Rank #{t.rank}</div>
                  </div>
                  <div style={{ background:"#f0fdf4", border:"1px solid #bbf7d0", borderRadius:8, padding:"12px 14px", marginBottom:12 }}>
                    <div style={{ fontSize:12, color:C.green, fontWeight:700, marginBottom:4 }}>🎙 In their own words (Telugu):</div>
                    <div style={{ fontSize:14, color:"#166534", fontStyle:"italic", lineHeight:1.7 }}>"{t.quote}"</div>
                  </div>
                  <div style={{ background:C.blueBg, borderRadius:8, padding:"10px 14px", marginBottom:12 }}>
                    <div style={{ fontSize:12, color:C.blue, fontWeight:700, marginBottom:4 }}>🔑 Their strategy:</div>
                    <div style={{ fontSize:13, color:"#1e40af", lineHeight:1.6 }}>{t.strategy}</div>
                  </div>
                  <div>
                    <div style={{ fontSize:12, fontWeight:700, color:C.navy, marginBottom:6 }}>💡 Their top tips for you:</div>
                    {t.tips.map((tip,j) => (
                      <div key={j} style={{ display:"flex", gap:8, padding:"4px 0", fontSize:13, color:C.text }}>
                        <span style={{ color:C.gold, fontWeight:900 }}>★</span>{tip}
                      </div>
                    ))}
                  </div>
                  <button style={{ marginTop:12, background:C.navyMid, color:"#fff", border:"none", borderRadius:7, padding:"8px 16px", fontSize:12, fontWeight:700, cursor:"pointer" }}>
                    🎧 Listen to full interview →
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* ── SIMILAR JOBS ── */}
          {tab === "similar" && (
            <div>
              <SectionCard title="You can also apply for these jobs" icon="🔗" accent={C.navyMid}>
                <div style={{ fontSize:12, color:C.muted, marginBottom:14 }}>Based on your TSPSC Group-II eligibility (Any Degree, Age 18–44), these jobs also match your profile:</div>
                {SIMILAR.map((s,i) => (
                  <div key={i} style={{ display:"flex", alignItems:"center", gap:14, padding:"12px 0", borderBottom: i<SIMILAR.length-1 ? `1px solid ${C.border}` : "none" }}>
                    <div style={{ flex:1 }}>
                      <div style={{ fontSize:14, fontWeight:800, color:C.navy }}>{s.title}</div>
                      <div style={{ fontSize:12, color:C.muted, marginTop:2 }}>{s.org} · {s.posts.toLocaleString()} posts · Last date: {s.last}</div>
                    </div>
                    <div style={{ textAlign:"center" }}>
                      <div style={{ fontSize:18, fontWeight:900, color:C.green }}>{s.match}%</div>
                      <div style={{ fontSize:10, color:C.subtle }}>match</div>
                    </div>
                    <div style={{ textAlign:"right" }}>
                      <div style={{ background:urgBg(s.daysLeft), color:urgColor(s.daysLeft), fontSize:11, fontWeight:700, padding:"3px 9px", borderRadius:5, marginBottom:6 }}>{s.daysLeft}d left</div>
                      <button style={{ background:C.gold, color:"#fff", border:"none", borderRadius:6, padding:"5px 12px", fontSize:12, fontWeight:700, cursor:"pointer" }}>View →</button>
                    </div>
                  </div>
                ))}
              </SectionCard>
            </div>
          )}

          {/* ── LANGUAGE ── */}
          {tab === "language" && (
            <div>
              <SectionCard title="Read This Notification in Your Language" icon="🌐" accent={C.navyMid}>
                <div style={{ fontSize:13, color:C.muted, marginBottom:16 }}>Select your language below. JobGuru AI will translate the complete job notification into simple, easy-to-understand words in your language.</div>
                <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(120px,1fr))", gap:7, marginBottom:20 }}>
                  {LANGS.map(l => (
                    <button key={l.code} onClick={() => setLang(l)} style={{
                      background: lang.code===l.code ? C.navyMid : "#f8f5f0",
                      border: lang.code===l.code ? `2px solid ${C.gold}` : `1px solid ${C.border}`,
                      borderRadius:8, padding:"8px 10px", cursor:"pointer", textAlign:"left"
                    }}>
                      <div style={{ display:"flex", gap:5, alignItems:"center" }}>
                        <span style={{ fontSize:16 }}>{l.flag}</span>
                        <div>
                          <div style={{ fontSize:13, fontWeight:800, color: lang.code===l.code ? "#fff" : C.navy, lineHeight:1.2 }}>{l.native}</div>
                          <div style={{ fontSize:10, color: lang.code===l.code ? "#93c5fd" : C.subtle }}>{l.name}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
                {lang.code !== "en" && !translations[lang.code] && (
                  <button onClick={translateAll} disabled={translating} style={{ background: translating ? "#94a3b8" : C.gold, color:"#fff", border:"none", borderRadius:9, padding:"13px 28px", fontSize:14, fontWeight:900, cursor: translating ? "default" : "pointer", width:"100%", marginBottom:16 }}>
                    {translating ? `⏳ Translating into ${lang.native}... (30 seconds)` : `🌐 Translate Complete Notification into ${lang.native} →`}
                  </button>
                )}
                {lang.code !== "en" && translations[lang.code] && (
                  <div style={{ background:"#f0fdf4", border:"1px solid #bbf7d0", borderRadius:10, padding:18 }}>
                    <div style={{ fontSize:12, color:C.green, fontWeight:800, marginBottom:12 }}>✅ Translated in {lang.native} — {lang.name}</div>
                    <div style={{ fontSize:14, color:C.text, lineHeight:2.0, whiteSpace:"pre-wrap" }}>{translations[lang.code]}</div>
                  </div>
                )}
                {lang.code === "en" && (
                  <div style={{ background:"#f0f9ff", border:"1px solid #bae6fd", borderRadius:8, padding:"12px 16px", fontSize:13, color:"#0369a1" }}>
                    ℹ️ English is already the default language. Select any Indian language above to get the translation.
                  </div>
                )}
              </SectionCard>
            </div>
          )}
        </div>

        {/* ── RIGHT SIDEBAR ── */}
        <div>
          {/* Eligibility Checker */}
          <div style={{ background:C.card, border:`2px solid ${C.gold}`, borderRadius:12, padding:16, marginBottom:14 }}>
            <div style={{ fontSize:14, fontWeight:900, color:C.navy, marginBottom:12 }}>🎯 Am I Eligible?</div>
            <div style={{ marginBottom:8 }}>
              <label style={{ fontSize:11, color:C.muted, fontWeight:700, display:"block", marginBottom:3 }}>YOUR AGE</label>
              <input value={age} onChange={e=>setAge(e.target.value)} placeholder="e.g. 26" type="number" style={{ width:"100%", padding:"8px 10px", border:`1px solid ${C.border}`, borderRadius:6, fontSize:13, outline:"none", boxSizing:"border-box" }} />
            </div>
            <div style={{ marginBottom:8 }}>
              <label style={{ fontSize:11, color:C.muted, fontWeight:700, display:"block", marginBottom:3 }}>QUALIFICATION</label>
              <select value={qual} onChange={e=>setQual(e.target.value)} style={{ width:"100%", padding:"8px 10px", border:`1px solid ${C.border}`, borderRadius:6, fontSize:13, outline:"none" }}>
                <option value="">Select your degree</option>
                {["B.A.","B.Com","B.Sc","B.Tech","BCA","Any Other Degree","12th Pass","10th Pass"].map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div style={{ marginBottom:12 }}>
              <label style={{ fontSize:11, color:C.muted, fontWeight:700, display:"block", marginBottom:3 }}>CATEGORY</label>
              <select value={cat} onChange={e=>setCat(e.target.value)} style={{ width:"100%", padding:"8px 10px", border:`1px solid ${C.border}`, borderRadius:6, fontSize:13, outline:"none" }}>
                <option value="">Select category</option>
                {[["oc","OC / General"],["ews","EWS"],["bc","BC"],["sc","SC"],["st","ST"],["ph","PH / Disabled"]].map(([v,l]) => <option key={v} value={v}>{l}</option>)}
              </select>
            </div>
            <button onClick={checkElig} style={{ width:"100%", background:C.navyMid, color:"#fff", border:"none", borderRadius:7, padding:"10px", fontSize:13, fontWeight:800, cursor:"pointer" }}>Check My Eligibility →</button>
            {eligResult && (
              <div style={{ marginTop:10, padding:"10px 12px", borderRadius:7, background: eligResult.ok ? C.greenBg : C.redBg, border:`1px solid ${eligResult.ok ? "#bbf7d0":"#fecaca"}` }}>
                <div style={{ fontSize:14, fontWeight:800, color: eligResult.ok ? C.green : C.red, marginBottom:4 }}>
                  {eligResult.ok ? "✅ You ARE Eligible!" : "❌ Not Eligible"}
                </div>
                <div style={{ fontSize:12, color:C.text, lineHeight:1.6 }}>
                  {!eligResult.ageOk && "• Age is outside the allowed range.\n"}
                  {!eligResult.qualOk && "• Please select your qualification.\n"}
                  {eligResult.ok && `You meet all criteria for this job. Apply before ${DETAIL_JOB.lastDate}!`}
                </div>
              </div>
            )}
          </div>

          {/* Difficulty Meter */}
          <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:12, padding:16, marginBottom:14 }}>
            <div style={{ fontSize:13, fontWeight:900, color:C.navy, marginBottom:12 }}>📊 Exam Difficulty Meter</div>
            <div style={{ textAlign:"center", marginBottom:10 }}>
              <div style={{ fontSize:42, fontWeight:900, color:diffColor(job.diff||72) }}>{job.diff||72}</div>
              <div style={{ fontSize:13, fontWeight:700, color:diffColor(job.diff||72) }}>{diffLabel(job.diff||72)}</div>
            </div>
            <div style={{ height:10, background:"#f1f5f9", borderRadius:5, overflow:"hidden", marginBottom:10 }}>
              <div style={{ height:"100%", width:`${job.diff||72}%`, background:`linear-gradient(90deg, #22c55e 0%, #f59e0b 60%, #dc2626 100%)`, borderRadius:5 }} />
            </div>
            {[["Competition","12.4 lakh applicants for 783 seats"],["Selection","1 in every 1,583 who apply"],["Pass Rate","~0.063% of applicants selected"]].map(([l,v]) => (
              <div key={l} style={{ display:"flex", justifyContent:"space-between", padding:"4px 0", fontSize:12, borderBottom:`1px solid ${C.border}` }}>
                <span style={{ color:C.muted }}>{l}</span>
                <span style={{ fontWeight:700, color:C.text }}>{v}</span>
              </div>
            ))}
          </div>

          {/* Important Dates */}
          <div style={{ background:C.navyMid, borderRadius:12, padding:16, marginBottom:14 }}>
            <div style={{ fontSize:13, fontWeight:900, color:"#fff", marginBottom:12 }}>📅 Important Dates</div>
            {[["Notification","10 Jan 2025","#22c55e"],["App. Opens","20 Jan 2025","#22c55e"],["Last Date","15 Feb 2025","#f97316"],["Admit Card","May 2025","#60a5fa"],["Exam Date","June 2025","#a78bfa"],["Result","Dec 2025","#fbbf24"]].map(([l,d,col]) => (
              <div key={l} style={{ display:"flex", justifyContent:"space-between", padding:"6px 0", borderBottom:"1px solid rgba(255,255,255,0.08)" }}>
                <span style={{ fontSize:12, color:"#94a3b8" }}>{l}</span>
                <span style={{ fontSize:12, fontWeight:800, color:col }}>{d}</span>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:12, padding:16 }}>
            <div style={{ fontSize:13, fontWeight:900, color:C.navy, marginBottom:10 }}>Quick Actions</div>
            {[["✅ Apply Now →", C.gold, "#fff", "https://tspsc.gov.in/apply"],["📄 Official Notification", "#dbeafe", C.blue, "https://tspsc.gov.in"],["📤 Share on WhatsApp","#dcfce7", C.green, null],["📥 Download Study Plan PDF","#f3e8ff","#6b21a8",null],["🌐 Translate to My Language",C.goldLight,"#92400e",null]].map(([l,bg,col,href]) => (
              href ? (
                <a key={l} href={href} target="_blank" rel="noreferrer" style={{ display:"block", background:bg, color:col, borderRadius:7, padding:"9px 13px", fontSize:13, fontWeight:700, cursor:"pointer", marginBottom:7, textDecoration:"none" }}>{l}</a>
              ) : (
                <button key={l} onClick={l.includes("WhatsApp") ? shareWA : l.includes("Language") ? () => setTab("language") : undefined} style={{ display:"block", width:"100%", background:bg, color:col, border:"none", borderRadius:7, padding:"9px 13px", fontSize:13, fontWeight:700, cursor:"pointer", marginBottom:7, textAlign:"left" }}>{l}</button>
              )
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── SIMPLE CONTENT PAGES ───────────────────────────────── */
function PageShell({ title, icon, children }) {
  return (
    <div style={{ maxWidth:860, margin:"0 auto", padding:"28px 16px" }}>
      <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:20 }}>
        <span style={{ fontSize:28 }}>{icon}</span>
        <h1 style={{ fontSize:24, fontWeight:900, color:C.navy, margin:0 }}>{title}</h1>
      </div>
      {children}
    </div>
  );
}

function ByStatePage() {
  const states = [...new Set(JOBS.map(j=>j.state))];
  return (
    <PageShell title="Jobs by State" icon="🗺">
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))", gap:10 }}>
        {["Telangana","Andhra Pradesh","Karnataka","Tamil Nadu","Maharashtra","Uttar Pradesh","Bihar","Rajasthan","Gujarat","Punjab","West Bengal","Odisha","All India","Pan India"].map(s => {
          const count = JOBS.filter(j=>j.state===s).length;
          return (
            <div key={s} style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:10, padding:"14px 16px", cursor:"pointer" }}
              onMouseEnter={e=>e.currentTarget.style.borderColor=C.gold}
              onMouseLeave={e=>e.currentTarget.style.borderColor=C.border}>
              <div style={{ fontSize:14, fontWeight:800, color:C.navy }}>{s}</div>
              <div style={{ fontSize:12, color:count>0?C.green:C.subtle, fontWeight:600, marginTop:3 }}>{count>0?`${count} active jobs`:"Jobs coming soon"}</div>
            </div>
          );
        })}
      </div>
    </PageShell>
  );
}

function ByCatPage() {
  return (
    <PageShell title="Jobs by Category" icon="📂">
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))", gap:10 }}>
        {[["🏛","Central Govt","UPSC, SSC, Railways, IBPS"],["🏢","State PSC","TSPSC, APPSC, KPSC, TNPSC"],["🚂","Railway","RRB NTPC, Group D, ALP"],["🏦","Banking","IBPS PO, SBI Clerk, RBI"],["🎓","Teaching","DSC, TGT, PGT, Navodaya"],["💻","IT / Software","TCS, Infosys, Wipro, HCL"],["⚔️","Defence","NDA, CDS, AFCAT, Army"],["👮","Police","SI, Constable, CISF, CRPF"],["🏥","Healthcare","ANM, Staff Nurse, AIIMS"],["⚖️","High Court","Court Peon, Steno, Clerk"]].map(([ic,cat,desc]) => (
          <div key={cat} style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:10, padding:"14px 16px", cursor:"pointer" }}
            onMouseEnter={e=>e.currentTarget.style.borderColor=C.gold}
            onMouseLeave={e=>e.currentTarget.style.borderColor=C.border}>
            <div style={{ fontSize:24, marginBottom:6 }}>{ic}</div>
            <div style={{ fontSize:14, fontWeight:800, color:C.navy }}>{cat}</div>
            <div style={{ fontSize:12, color:C.muted, marginTop:2 }}>{desc}</div>
          </div>
        ))}
      </div>
    </PageShell>
  );
}

function MockTestPage() {
  return (
    <PageShell title="Mock Tests — మోడల్ పేపర్లు" icon="📝">
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:12 }}>
        {[["TSPSC Group-II Full Mock","150 Questions · 150 Marks · 2.5 hrs","Medium","Free",C.navyMid],["SSC CGL Tier-I Mock","100 Questions · 200 Marks · 60 mins","Hard","Free",C.blue],["IBPS PO Prelims Mock","100 Questions · 100 Marks · 60 mins","Hard","Premium",C.gold],["Railway NTPC Mock","100 Questions · 100 Marks · 90 mins","Medium","Free","#b45309"],["Current Affairs Monthly","40 Questions · Latest events","Easy","Free",C.green],["Telangana History Special","60 Questions · Deep Telangana focus","Medium","Free","#7c3aed"]].map(([t,d,diff,tag,col]) => (
          <div key={t} style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:10, padding:16, borderTop:`4px solid ${col}` }}>
            <div style={{ display:"flex", gap:6, marginBottom:8 }}>
              <Tag bg={tag==="Free"?"#dcfce7":C.goldLight} color={tag==="Free"?C.green:"#92400e"}>{tag}</Tag>
              <Tag bg={diff==="Hard"?C.redBg:diff==="Medium"?C.goldLight:C.greenBg} color={diff==="Hard"?C.red:diff==="Medium"?"#92400e":C.green}>{diff}</Tag>
            </div>
            <div style={{ fontSize:14, fontWeight:800, color:C.navy, marginBottom:4 }}>{t}</div>
            <div style={{ fontSize:12, color:C.muted, marginBottom:12 }}>{d}</div>
            <button style={{ background:col, color:"#fff", border:"none", borderRadius:7, padding:"8px 16px", fontSize:13, fontWeight:700, cursor:"pointer" }}>Start Test →</button>
          </div>
        ))}
      </div>
    </PageShell>
  );
}

function CurrentAffairsPage() {
  return (
    <PageShell title="Current Affairs — కరెంట్ అఫైర్స్" icon="📰">
      <div style={{ background:C.goldLight, border:`1px solid ${C.gold}`, borderRadius:8, padding:"10px 14px", marginBottom:16, fontSize:13, color:"#92400e" }}>
        📅 Updated daily — Every government exam has 20–25 questions from current affairs. Read this every day!
      </div>
      {[["National","🏛",["Parliament passed Digital Personal Data Protection Bill","PM launches PM Surya Ghar Muft Bijli Yojana scheme","India's GDP growth rate at 8.4% for Q3 FY2024","New education policy implementation update","Election Commission announces Model Code of Conduct"]],["Telangana","🌿",["Telangana government announces new job calendar 2025","Budget 2024-25 — key highlights for Telangana","New districts formed — Mulugu and Narayanpet updates","Rythu Bandhu third installment released","TSPSC new recruitment calendar announced"]],["Science & Tech","🔬",["ISRO successfully launches PSLV-C58 XPoSat mission","India becomes 4th country to land on Moon (Chandrayaan-3)","RBI launches CBDC — Digital Rupee expansion","5G services expanded to 500+ cities","AI regulation policy announced by MeitY"]]].map(([section,ic,items]) => (
          <div key={section} style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:10, marginBottom:14, overflow:"hidden" }}>
            <div style={{ background:C.navyMid, padding:"10px 16px", fontSize:13, fontWeight:800, color:"#fff", display:"flex", gap:8, alignItems:"center" }}>
              <span>{ic}</span>{section}
            </div>
            {items.map((item,i) => (
              <div key={i} style={{ padding:"10px 16px", borderBottom: i<items.length-1 ? `1px solid ${C.border}` : "none", fontSize:13, color:C.text, display:"flex", gap:10 }}>
                <span style={{ color:C.gold, fontWeight:900 }}>•</span>{item}
              </div>
            ))}
          </div>
        ))}
    </PageShell>
  );
}

function PremiumPage() {
  return (
    <PageShell title="JobGuru Premium" icon="⭐">
      <div style={{ textAlign:"center", marginBottom:28 }}>
        <div style={{ fontSize:16, color:C.muted, marginBottom:4 }}>Unlock the full power of JobGuru</div>
        <div style={{ fontSize:38, fontWeight:900, color:C.navy }}>₹149<span style={{ fontSize:18, fontWeight:400, color:C.muted }}>/month</span></div>
        <div style={{ fontSize:13, color:C.muted }}>= ₹5/day · Less than one chai ☕</div>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:12, marginBottom:24 }}>
        {[["🔒 Full Job Guides","Complete syllabus, study plan, cut-offs, topper strategies for every exam"],["🌐 All 22 Languages","Read any job notification in Telugu, Hindi, Tamil, Kannada or any Indian language"],["📝 Unlimited Mock Tests","Full mock tests for every exam with detailed solutions"],["🤖 AI Mentor 24/7","Ask any exam question, doubt or query — AI answers instantly"],["📥 PDF Downloads","Download study plans and notes for offline studying"],["🔔 Smart Alerts","Get personalised job alerts based on your qualification and state"],["📊 Performance Analytics","Track your mock test scores and improvement over time"],["📰 Daily Current Affairs","Curated daily current affairs relevant to your target exams"]].map(([t,d]) => (
          <div key={t} style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:10, padding:16 }}>
            <div style={{ fontSize:15, fontWeight:800, color:C.navy, marginBottom:6 }}>{t}</div>
            <div style={{ fontSize:13, color:C.muted, lineHeight:1.6 }}>{d}</div>
          </div>
        ))}
      </div>
      <div style={{ textAlign:"center" }}>
        <button style={{ background:C.gold, color:"#fff", border:"none", borderRadius:10, padding:"14px 36px", fontSize:16, fontWeight:900, cursor:"pointer" }}>Start Premium — ₹149/month →</button>
        <div style={{ fontSize:12, color:C.muted, marginTop:8 }}>🔒 Secure payment via Razorpay · UPI / Card / NetBanking · Cancel anytime</div>
      </div>
    </PageShell>
  );
}

function AboutPage() {
  return (
    <PageShell title="About JobGuruWorld.com" icon="ℹ️">
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
        <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:10, padding:20 }}>
          <div style={{ fontSize:15, fontWeight:800, color:C.navy, marginBottom:10 }}>🎓 Our Mission</div>
          <p style={{ fontSize:13, color:C.text, lineHeight:1.8 }}>JobGuruWorld.com was created to ensure no Indian student misses a government job opportunity due to lack of information. We use AI to collect, translate, and explain every job notification in simple language across all 22 Indian languages.</p>
        </div>
        <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:10, padding:20 }}>
          <div style={{ fontSize:15, fontWeight:800, color:C.navy, marginBottom:10 }}>🤖 How We Work</div>
          <p style={{ fontSize:13, color:C.text, lineHeight:1.8 }}>Every morning at 5 AM, our AI scans 500+ newspapers, official government websites, and job portals across India. Claude AI then processes each notification and creates complete guides with study plans, syllabus, and career information.</p>
        </div>
        <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:10, padding:20 }}>
          <div style={{ fontSize:15, fontWeight:800, color:C.navy, marginBottom:10 }}>📊 Our Numbers</div>
          {[["283","Active job notifications"],["50,000+","Students using JobGuru"],["22","Indian languages supported"],["500+","Sources monitored daily"],["28","States covered"]].map(([n,l]) => (
            <div key={l} style={{ display:"flex", gap:10, padding:"4px 0", fontSize:13 }}>
              <strong style={{ color:C.gold, minWidth:50 }}>{n}</strong>
              <span style={{ color:C.text }}>{l}</span>
            </div>
          ))}
        </div>
        <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:10, padding:20 }}>
          <div style={{ fontSize:15, fontWeight:800, color:C.navy, marginBottom:10 }}>💡 Why JobGuru is Different</div>
          {["Full study roadmap — not just notification copy-paste","22 Indian languages — not just English or Hindi","Job Life tab — what the actual job work is","Career growth path from day 1 to retirement","Toppers' real strategies and voice interviews","Eligibility checker in 30 seconds"].map((p,i) => (
            <div key={i} style={{ display:"flex", gap:8, fontSize:13, padding:"3px 0" }}>
              <span style={{ color:C.gold, fontWeight:900 }}>★</span>{p}
            </div>
          ))}
        </div>
      </div>
    </PageShell>
  );
}

function ContactPage() {
  return (
    <PageShell title="Contact Us" icon="📞">
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
        <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:10, padding:20 }}>
          <div style={{ fontSize:15, fontWeight:800, color:C.navy, marginBottom:16 }}>📬 Get in Touch</div>
          {[["Email","support@jobguruworld.com","📧"],["WhatsApp","Join our channel for daily alerts","📱"],["Telegram","@JobGuruWorld","✈️"],["YouTube","JobGuruWorld","▶️"]].map(([l,v,ic]) => (
            <div key={l} style={{ display:"flex", gap:10, padding:"8px 0", borderBottom:`1px solid ${C.border}`, fontSize:13 }}>
              <span>{ic}</span>
              <div>
                <div style={{ fontWeight:700, color:C.navy }}>{l}</div>
                <div style={{ color:C.blue }}>{v}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:10, padding:20 }}>
          <div style={{ fontSize:15, fontWeight:800, color:C.navy, marginBottom:14 }}>✉️ Send a Message</div>
          {[["Your Name","Enter your name"],["Email or Phone","Enter email or phone"],["Message","Your question or feedback"]].map(([l,ph]) => (
            <div key={l} style={{ marginBottom:10 }}>
              <label style={{ fontSize:11, color:C.muted, fontWeight:700, display:"block", marginBottom:3 }}>{l}</label>
              {l==="Message" ? <textarea placeholder={ph} rows={3} style={{ width:"100%", padding:"8px 10px", border:`1px solid ${C.border}`, borderRadius:6, fontSize:13, outline:"none", boxSizing:"border-box", resize:"vertical" }} /> : <input placeholder={ph} style={{ width:"100%", padding:"8px 10px", border:`1px solid ${C.border}`, borderRadius:6, fontSize:13, outline:"none", boxSizing:"border-box" }} />}
            </div>
          ))}
          <button style={{ background:C.gold, color:"#fff", border:"none", borderRadius:7, padding:"9px 20px", fontSize:13, fontWeight:800, cursor:"pointer" }}>Send Message →</button>
        </div>
      </div>
    </PageShell>
  );
}

/* ─────────────────────────────────────────────────────────────
   ROOT APP
───────────────────────────────────────────────────────────── */
export default function App() {
  const [page, setPage] = useState("home");
  const [selectedJob, setSelectedJob] = useState(JOBS[0]);
  const [menuOpen, setMenuOpen] = useState(false);

  const pages = {
    "home": <HomePage setPage={setPage} setSelectedJob={setSelectedJob} />,
    "all-jobs": <HomePage setPage={setPage} setSelectedJob={setSelectedJob} />,
    "by-state": <ByStatePage />,
    "by-cat": <ByCatPage />,
    "mock": <MockTestPage />,
    "current": <CurrentAffairsPage />,
    "premium": <PremiumPage />,
    "about": <AboutPage />,
    "contact": <ContactPage />,
    "detail": <DetailPage job={selectedJob} />,
  };

  return (
    <div style={{ fontFamily:"'Segoe UI', system-ui, sans-serif", background:C.bg, minHeight:"100vh", color:C.text }}>
      <style>{`
        @keyframes ticker { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width:6px; height:6px; }
        ::-webkit-scrollbar-track { background:#f1f5f9; }
        ::-webkit-scrollbar-thumb { background:#cbd5e1; border-radius:3px; }
        input:focus, select:focus, textarea:focus { border-color: #1a3c6e !important; }
      `}</style>

      {/* ── TOP NAV ── */}
      <nav style={{ background:C.navy, borderBottom:`3px solid ${C.gold}`, position:"sticky", top:0, zIndex:100 }}>
        <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 16px", display:"flex", alignItems:"center", height:54, gap:8 }}>
          {/* LOGO */}
          <div onClick={() => setPage("home")} style={{ display:"flex", alignItems:"center", gap:8, cursor:"pointer", marginRight:12, flexShrink:0 }}>
            <div style={{ width:34, height:34, background:C.gold, borderRadius:9, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20 }}>🎓</div>
            <div>
              <div style={{ color:"#fff", fontWeight:900, fontSize:18, letterSpacing:"-0.04em", lineHeight:1 }}>Job<span style={{ color:C.gold }}>Guru</span></div>
              <div style={{ color:"#93c5fd", fontSize:8, letterSpacing:"0.1em" }}>.COM — YOUR JOB MENTOR</div>
            </div>
          </div>

          {/* DESKTOP NAV */}
          <div style={{ display:"flex", flex:1, gap:2, overflowX:"auto" }}>
            {NAV_ITEMS.filter(n => n.id !== "premium").map(n => (
              <button key={n.id} onClick={() => setPage(n.id)} style={{
                background:"none", border:"none", cursor:"pointer", padding:"6px 10px", borderRadius:6, whiteSpace:"nowrap",
                color: page===n.id ? C.gold : "#93c5fd",
                fontWeight: page===n.id ? 800 : 500,
                fontSize:12,
                background: page===n.id ? "rgba(245,158,11,0.12)" : "none",
                display:"flex", alignItems:"center", gap:4
              }}>
                <span style={{ fontSize:13 }}>{n.icon}</span>{n.label}
              </button>
            ))}
          </div>

          <button onClick={() => setPage("premium")} style={{ background:C.gold, color:"#fff", border:"none", borderRadius:7, padding:"7px 14px", fontSize:12, fontWeight:900, cursor:"pointer", flexShrink:0, whiteSpace:"nowrap" }}>
            ⭐ Premium ₹149/mo
          </button>
        </div>
      </nav>

      {/* PAGE CONTENT */}
      {pages[page] || pages["home"]}

      {/* FOOTER */}
      <footer style={{ background:C.navy, borderTop:`3px solid ${C.gold}`, padding:"28px 20px", marginTop:20 }}>
        <div style={{ maxWidth:960, margin:"0 auto" }}>
          <div style={{ display:"flex", gap:20, flexWrap:"wrap", marginBottom:20 }}>
            <div style={{ flex:2, minWidth:200 }}>
              <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
                <div style={{ width:30, height:30, background:C.gold, borderRadius:7, display:"flex", alignItems:"center", justifyContent:"center", fontSize:16 }}>🎓</div>
                <span style={{ color:"#fff", fontWeight:900, fontSize:17 }}>Job<span style={{ color:C.gold }}>Guru</span>.in</span>
              </div>
              <div style={{ color:"#64748b", fontSize:12, lineHeight:1.7 }}>మీ స్వంత జాబ్ గురువు<br />Your Personal Job Mentor<br />India's most complete job guide · 22 languages · 500+ sources daily</div>
            </div>
            {[["Quick Links",["All Jobs","By State","By Category","Mock Tests","Current Affairs"]],["Support",["About Us","Contact Us","Premium Plans","Privacy Policy","Terms of Service"]]].map(([title, links]) => (
              <div key={title} style={{ minWidth:130 }}>
                <div style={{ color:C.gold, fontWeight:800, fontSize:12, marginBottom:10, letterSpacing:"0.06em" }}>{title.toUpperCase()}</div>
                {links.map(l => <div key={l} style={{ color:"#64748b", fontSize:12, padding:"3px 0", cursor:"pointer" }}>{l}</div>)}
              </div>
            ))}
            <div style={{ minWidth:160 }}>
              <div style={{ color:C.gold, fontWeight:800, fontSize:12, marginBottom:10, letterSpacing:"0.06em" }}>JOIN US</div>
              {[["📱 WhatsApp Channel","#25D366"],["✈️ Telegram Channel","#2CA5E0"],["▶️ YouTube","#ff0000"]].map(([l,bg]) => (
                <button key={l} style={{ display:"block", background:bg, color:"#fff", border:"none", borderRadius:5, padding:"5px 12px", fontSize:12, fontWeight:700, cursor:"pointer", marginBottom:6 }}>{l}</button>
              ))}
            </div>
          </div>
          <div style={{ borderTop:"1px solid rgba(255,255,255,0.08)", paddingTop:14, display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:8 }}>
            <div style={{ fontSize:11, color:"#475569" }}>© 2025 JobGuruWorld.com · Powered by AI · Built for India's 50 crore job seekers</div>
            <div style={{ fontSize:11, color:"#475569" }}>22 Languages · 28 States · 500+ Sources · Updated Daily 7 AM</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
