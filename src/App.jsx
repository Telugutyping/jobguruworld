import { useState, useEffect, useRef } from "react";

/* ═══════════════════════════════════════════════════════
   BRAND & THEME
═══════════════════════════════════════════════════════ */
const C = {
  navy:"#0a1f3d", navyMid:"#1a3c6e", navyLight:"#2563eb",
  gold:"#f59e0b", goldDark:"#d97706", goldLight:"#fef3c7",
  green:"#16a34a", greenBg:"#f0fdf4",
  red:"#dc2626", redBg:"#fef2f2",
  blue:"#1d4ed8", blueBg:"#dbeafe",
  orange:"#ea580c", orangeBg:"#fff7ed",
  purple:"#7c3aed", purpleBg:"#f5f3ff",
  teal:"#0d9488", tealBg:"#f0fdfa",
  bg:"#f3f0eb", card:"#fff",
  border:"#e5e1da", text:"#1a1a1a",
  muted:"#64748b", subtle:"#94a3b8",
};

/* ═══════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════ */
const JOBS = [
  {id:1,title:"TSPSC Group-II Services 2025",telugu:"TSPSC గ్రూప్-II సర్వీసెస్ 2025",org:"TSPSC",state:"Telangana",cat:"State PSC",type:"Govt",edu:"Any Degree",posts:783,qual:"Any Degree",age:"18–44",salary:"₹35,120–₹1,03,740",lastDate:"15 Feb 2025",daysLeft:18,diff:72,color:"#1a6b3c",hot:true,free:true,tag:"Gazetted Officer"},
  {id:2,title:"SSC CGL 2025 — All India",telugu:"SSC CGL 2025 — అఖిల భారత",org:"SSC CGL",state:"All India",cat:"Central Govt",type:"Govt",edu:"Any Degree",posts:17727,qual:"Any Degree",age:"18–32",salary:"₹25,500–₹1,51,100",lastDate:"25 Jan 2025",daysLeft:8,diff:68,color:"#1e4d8c",hot:true,free:true,tag:"Group B & C"},
  {id:3,title:"IBPS PO Recruitment 2025",telugu:"IBPS PO నియామకాలు 2025",org:"IBPS",state:"All India",cat:"Banking",type:"Govt",edu:"Any Degree",posts:4455,qual:"Any Degree",age:"20–30",salary:"₹36,000–₹63,840",lastDate:"10 Feb 2025",daysLeft:13,diff:65,color:"#7c3aed",hot:false,free:false,tag:"Probationary Officer"},
  {id:4,title:"RRB NTPC Graduate Posts 2025",telugu:"రైల్వే NTPC నియామకాలు 2025",org:"RRB NTPC",state:"All India",cat:"Railway",type:"Govt",edu:"12th/Degree",posts:11558,qual:"12th/Degree",age:"18–36",salary:"₹19,900–₹35,400",lastDate:"2 Feb 2025",daysLeft:5,diff:58,color:"#b45309",hot:true,free:true,tag:"Railway Jobs"},
  {id:5,title:"APPSC Group-I Mains 2025",telugu:"APPSC గ్రూప్-I మెయిన్స్ 2025",org:"APPSC",state:"Andhra Pradesh",cat:"State PSC",type:"Govt",edu:"Any Degree",posts:48,qual:"Any Degree",age:"18–42",salary:"₹37,100–₹1,17,800",lastDate:"20 Feb 2025",daysLeft:23,diff:88,color:"#be185d",hot:false,free:false,tag:"IAS Level"},
  {id:6,title:"TCS Ninja Hiring — Freshers 2025",telugu:"TCS Ninja హైరింగ్ 2025",org:"TCS",state:"Pan India",cat:"IT/Software",type:"Private",edu:"B.Tech/BCA/B.Sc",posts:5000,qual:"B.Tech/BCA",age:"No limit",salary:"₹3.36–₹7 LPA",lastDate:"28 Jan 2025",daysLeft:11,diff:45,color:"#0369a1",hot:true,free:false,tag:"Fresher IT"},
  {id:7,title:"Telangana DSC Teachers 2025",telugu:"తెలంగాణ DSC టీచర్స్ 2025",org:"DEO Telangana",state:"Telangana",cat:"Teaching",type:"Govt",edu:"Degree+B.Ed",posts:11000,qual:"Degree+B.Ed",age:"18–44",salary:"₹28,940–₹83,280",lastDate:"Mar 2025",daysLeft:41,diff:55,color:"#0f766e",hot:true,free:true,tag:"Teacher Jobs"},
  {id:8,title:"UPSC Civil Services 2025",telugu:"UPSC సివిల్ సర్వీసెస్ 2025",org:"UPSC",state:"All India",cat:"Central Govt",type:"Govt",edu:"Any Degree",posts:1056,qual:"Any Degree",age:"21–32",salary:"₹56,100–₹2,50,000",lastDate:"11 Feb 2025",daysLeft:14,diff:97,color:"#991b1b",hot:false,free:false,tag:"IAS/IPS/IFS"},
  {id:9,title:"Indian Army Agniveer 2025",telugu:"ఆర్మీ అగ్నివీర్ 2025",org:"Indian Army",state:"All India",cat:"Defence",type:"Govt",edu:"10th/12th",posts:25000,qual:"10th/12th Pass",age:"17.5–21",salary:"₹30,000–₹40,000",lastDate:"Mar 2025",daysLeft:35,diff:62,color:"#4b5320",hot:true,free:true,tag:"Defence"},
  {id:10,title:"TS Police Constable 2025",telugu:"తెలంగాణ పోలీస్ కానిస్టేబుల్ 2025",org:"TSLPRB",state:"Telangana",cat:"Police",type:"Govt",edu:"10th/12th",posts:4000,qual:"10th Pass",age:"18–25",salary:"₹21,430–₹63,010",lastDate:"Feb 2025",daysLeft:16,diff:60,color:"#1e40af",hot:true,free:true,tag:"Police Jobs"},
  {id:11,title:"SBI Clerk 2025",telugu:"SBI క్లర్క్ 2025",org:"SBI",state:"All India",cat:"Banking",type:"Govt",edu:"Any Degree",posts:13735,qual:"Any Degree",age:"20–28",salary:"₹17,900–₹47,920",lastDate:"Feb 2025",daysLeft:19,diff:63,color:"#1f2d7a",hot:false,free:true,tag:"Banking"},
  {id:12,title:"AP High Court Stenographer",telugu:"AP హైకోర్ట్ స్టెనోగ్రాఫర్",org:"AP High Court",state:"Andhra Pradesh",cat:"Court",type:"Govt",edu:"Any Degree",posts:276,qual:"Degree + Shorthand",age:"18–34",salary:"₹22,460–₹67,110",lastDate:"Mar 2025",daysLeft:38,diff:58,color:"#92400e",hot:false,free:true,tag:"Court Jobs"},
];

const ADMIT_CARDS = [
  {exam:"TSPSC Group-II Prelims",date:"March 15, 2025",status:"Available Soon",color:C.green},
  {exam:"SSC CHSL Tier-I",date:"February 28, 2025",status:"Download Now",color:C.blue},
  {exam:"RRB NTPC CBT-1",date:"March 5, 2025",status:"Download Now",color:C.orange},
  {exam:"IBPS Clerk Mains",date:"February 20, 2025",status:"Download Now",color:C.purple},
  {exam:"APPSC Group-I Mains",date:"April 10, 2025",status:"Available Soon",color:C.teal},
  {exam:"TS Police Constable",date:"March 22, 2025",status:"Available Soon",color:"#1e40af"},
  {exam:"UPSC Prelims 2025",date:"May 25, 2025",status:"Available Soon",color:C.red},
  {exam:"SBI PO Prelims",date:"March 8, 2025",status:"Download Now",color:"#1f2d7a"},
];

const RESULTS = [
  {exam:"TSPSC Group-IV Final Result",date:"January 30, 2025",status:"OUT NOW",color:C.green},
  {exam:"SSC GD Constable Result",date:"February 5, 2025",status:"OUT NOW",color:C.blue},
  {exam:"APPSC Panchayat Secretary",date:"January 25, 2025",status:"OUT NOW",color:C.teal},
  {exam:"RRB Group D Result",date:"February 10, 2025",status:"OUT NOW",color:C.orange},
  {exam:"TS Inter 1st Year Results",date:"March 2025",status:"Expected",color:C.purple},
  {exam:"AP SSC 10th Board Result",date:"April 2025",status:"Expected",color:"#be185d"},
  {exam:"TSPSC AEE Final Result",date:"Declared",status:"OUT NOW",color:C.green},
  {exam:"SBI Clerk Prelims Result",date:"February 18, 2025",status:"OUT NOW",color:"#1f2d7a"},
];

const ANSWER_KEYS = [
  {exam:"TSPSC Group-II Prelims 2024",date:"Dec 20, 2024",status:"Official Released",color:C.green},
  {exam:"SSC CGL Tier-I 2024",date:"Jan 5, 2025",status:"Official Released",color:C.blue},
  {exam:"RRB NTPC CBT Phase-1",date:"Dec 28, 2024",status:"Official Released",color:C.orange},
  {exam:"APPSC Group-II Paper-I",date:"Jan 10, 2025",status:"Official Released",color:C.teal},
  {exam:"TS Police SI Prelims",date:"Jan 15, 2025",status:"Official Released",color:"#1e40af"},
  {exam:"SBI Clerk Prelims 2025",date:"Expected Feb 2025",status:"Awaited",color:C.muted},
];

const CURRENT_AFFAIRS = [
  {date:"Today",title:"PM launches Viksit Bharat 2047 roadmap — key highlights",telugu:"PM విక్సిత్ భారత్ 2047 రోడ్‌మ్యాప్ ప్రారంభించారు — ముఖ్యాంశాలు",exam:"UPSC/SSC/TSPSC",importance:"High",cat:"National"},
  {date:"Today",title:"RBI keeps repo rate unchanged at 6.5% — third consecutive hold",telugu:"RBI రెపో రేటు 6.5% వద్ద మార్పు లేకుండా ఉంచింది — మూడవ సారి",exam:"IBPS/SBI/SSC",importance:"High",cat:"Economy"},
  {date:"Today",title:"India becomes world's 3rd largest solar energy producer",telugu:"భారత్ ప్రపంచంలో 3వ అతిపెద్ద సౌర శక్తి ఉత్పత్తిదారుగా మారింది",exam:"UPSC/TSPSC",importance:"Medium",cat:"Science/Tech"},
  {date:"Yesterday",title:"Telangana government launches Rythu Bharosa 3rd installment",telugu:"తెలంగాణ ప్రభుత్వం రైతు భరోసా 3వ వాయిదా విడుదల చేసింది",exam:"TSPSC/APPSC",importance:"High",cat:"Telangana"},
  {date:"Yesterday",title:"ISRO successfully tests Gaganyaan crew module ejection",telugu:"ISRO గగన్‌యాన్ క్రూ మాడ్యూల్ ఎజెక్షన్ విజయవంతంగా పరీక్షించింది",exam:"UPSC/SSC",importance:"Medium",cat:"Science/Tech"},
  {date:"2 days ago",title:"India signs defence deal with France for 26 Rafale Marine jets",telugu:"భారత్ ఫ్రాన్స్‌తో 26 రఫేల్ మెరైన్ యుద్ధ విమానాల రక్షణ ఒప్పందం",exam:"UPSC/CDS/NDA",importance:"High",cat:"Defence"},
];

const HINDU_EDITORIALS = [
  {date:"Today",title:"The promise and peril of AI governance",summary:"Today's editorial discusses India's approach to regulating artificial intelligence...",upscPaper:"GS Paper 3 — Science & Technology",keyPoints:["India's AI regulatory framework still in development","Need to balance innovation with ethics","Global AI governance gaps — India's position"],vocab:["Governance","Regulatory framework","Ethical AI"],questions:["Discuss challenges in AI regulation in India","What are the ethical concerns with AI?"]},
  {date:"Yesterday",title:"Federalism under strain — Centre-State relations",summary:"The editorial examines growing tensions between central and state governments...",upscPaper:"GS Paper 2 — Polity & Governance",keyPoints:["Finance Commission recommendations disputed","Governor's role under scrutiny","Cooperative federalism need of the hour"],vocab:["Federalism","Fiscal autonomy","Governor's discretion"],questions:["Critically analyze Centre-State financial relations","Examine the role of Governor in Indian polity"]},
];

const SCHOLARSHIPS = [
  {name:"Pre-Matric Scholarship SC/ST",amount:"₹1,000–₹3,500/year",deadline:"October 2025",who:"Class 1-10 SC/ST students",state:"Telangana"},
  {name:"Post-Matric Scholarship BC",amount:"₹5,000–₹10,000/year",deadline:"November 2025",who:"Intermediate/Degree BC students",state:"Telangana"},
  {name:"National Merit Scholarship",amount:"₹12,000/year",deadline:"October 2025",who:"Class 10 above 80% students",state:"All India"},
  {name:"EBC Scholarship",amount:"₹5,000/year",deadline:"September 2025",who:"EBC students in higher education",state:"Telangana"},
  {name:"Central Sector Scholarship",amount:"₹10,000–₹20,000/year",deadline:"October 2025",who:"Top 20 percentile in board exams",state:"All India"},
  {name:"PM Yashasvi Scholarship",amount:"₹75,000–₹1,25,000/year",deadline:"September 2025",who:"OBC/EBC/DNT students Class 9-12",state:"All India"},
];

const JOB_MELAS = [
  {name:"Mega Job Mela — Hyderabad",date:"Feb 15, 2025",venue:"Shilpakala Vedika, Madhapur",jobs:"500+ vacancies",companies:"TCS, Wipro, Infosys, HDFC",who:"Any Degree/B.Tech"},
  {name:"Karimnagar District Job Fair",date:"Feb 20, 2025",venue:"Govt Degree College Auditorium",jobs:"200+ vacancies",companies:"Pharma, Manufacturing, Retail",who:"10th to Degree"},
  {name:"Warangal IT Job Mela",date:"Mar 5, 2025",venue:"Kakatiya University",jobs:"300+ IT vacancies",companies:"Tech Mahindra, LTI, Mphasis",who:"B.Tech/BCA/MCA"},
  {name:"Nalgonda Private Jobs Fair",date:"Mar 10, 2025",venue:"Collectorate Grounds",jobs:"150+ vacancies",companies:"FMCG, Banking, Insurance",who:"Intermediate to Degree"},
];

const EXAM_CALENDAR = [
  {month:"January 2025",exams:[{name:"SSC CGL Notification",date:"Jan 15",type:"Notification"},{name:"RRB NTPC Last Date",date:"Jan 28",type:"Last Date"}]},
  {month:"February 2025",exams:[{name:"IBPS Clerk Mains",date:"Feb 20",type:"Exam"},{name:"TSPSC Group-II Last Date",date:"Feb 15",type:"Last Date"},{name:"SBI PO Notification",date:"Feb 10",type:"Notification"}]},
  {month:"March 2025",exams:[{name:"TS Police Admit Card",date:"Mar 22",type:"Admit Card"},{name:"APPSC Group-I Mains",date:"Mar 18",type:"Exam"},{name:"DSC Telangana Apply",date:"Mar 30",type:"Last Date"}]},
  {month:"April 2025",exams:[{name:"AP SSC Results",date:"Apr 15",type:"Result"},{name:"UPSC Prelims",date:"Apr 28",type:"Notification"},{name:"IBPS PO Notification",date:"Apr 5",type:"Notification"}]},
  {month:"May 2025",exams:[{name:"UPSC Prelims Exam",date:"May 25",type:"Exam"},{name:"SSC CHSL Tier-II",date:"May 18",type:"Exam"},{name:"TS Inter Results",date:"May 10",type:"Result"}]},
  {month:"June 2025",exams:[{name:"TSPSC Group-II Exam",date:"June 15",type:"Exam"},{name:"RRB Group D Notification",date:"June 5",type:"Notification"},{name:"APPSC Answer Key",date:"June 20",type:"Answer Key"}]},
];

const ENGLISH_LESSONS = {
  beginner:[
    {id:1,title:"Greeting People",telugu:"పరిచయం చేసుకోవడం",phrases:["Good morning / Good evening","How are you? — I am fine, thank you","What is your name? — My name is...","Nice to meet you!","Where are you from?"],practice:"Say each phrase aloud 3 times. Record yourself and listen back."},
    {id:2,title:"Numbers & Time",telugu:"సంఖ్యలు మరియు సమయం",phrases:["What time is it? — It is 10 o'clock","Today is Monday","The exam is on February 15th","I wake up at 6 AM","I study for 4 hours daily"],practice:"Practice saying today's date and time in English 5 times."},
    {id:3,title:"Basic Office English",telugu:"కార్యాలయ ఆంగ్లం",phrases:["Please have a seat","I have an appointment","Can I speak to the officer?","Please sign here","What documents do I need?"],practice:"Imagine you are at a government office. Practice all sentences."},
  ],
  intermediate:[
    {id:1,title:"Job Interview Basics",telugu:"ఉద్యోగ ఇంటర్వ్యూ",phrases:["Tell me about yourself","I am a graduate from Osmania University","I have 2 years of experience in teaching","My strengths are dedication and hard work","Why do you want this job?"],practice:"Record a 1-minute self-introduction and listen to it."},
    {id:2,title:"Reading Newspaper Headlines",telugu:"వార్తాపత్రిక శీర్షికలు చదవడం",phrases:["Government launches new scheme","Inflation rate drops to 4.5%","Parliament passes important bill","India's GDP grows by 7%","New policy announced for farmers"],practice:"Read The Hindu headline page daily for 15 minutes."},
  ],
  advanced:[
    {id:1,title:"Group Discussion Tips",telugu:"గ్రూప్ డిస్కషన్ సూచనలు",phrases:["I would like to add to that point","In my opinion, the main issue is...","I respectfully disagree because...","To summarize what we have discussed...","The crux of the matter is..."],practice:"Discuss today's current affairs topic for 5 minutes in English."},
    {id:2,title:"UPSC Interview English",telugu:"UPSC ఇంటర్వ్యూ ఆంగ్లం",phrases:["Kindly allow me to elaborate","The constitutional provision states that...","From a policy perspective...","The socioeconomic implications are...","In the context of Indian governance..."],practice:"Read one editorial aloud daily in English."},
  ],
};

const LANGUAGES = [
  {code:"en",name:"English",native:"English",flag:"🇬🇧"},
  {code:"te",name:"Telugu",native:"తెలుగు",flag:"🏛"},
  {code:"hi",name:"Hindi",native:"हिन्दी",flag:"🇮🇳"},
  {code:"ta",name:"Tamil",native:"தமிழ்",flag:"🌺"},
  {code:"kn",name:"Kannada",native:"ಕನ್ನಡ",flag:"🟡"},
  {code:"ml",name:"Malayalam",native:"മലയാളം",flag:"🌴"},
  {code:"mr",name:"Marathi",native:"मराठी",flag:"🟠"},
  {code:"gu",name:"Gujarati",native:"ગુજરાતી",flag:"🔷"},
  {code:"pa",name:"Punjabi",native:"ਪੰਜਾਬੀ",flag:"🌾"},
  {code:"bn",name:"Bengali",native:"বাংলা",flag:"🌸"},
  {code:"or",name:"Odia",native:"ଓଡ଼ିଆ",flag:"🏵"},
  {code:"ur",name:"Urdu",native:"اردو",flag:"☪"},
  {code:"as",name:"Assamese",native:"অসমীয়া",flag:"🍃"},
  {code:"ks",name:"Kashmiri",native:"کٲشُر",flag:"❄"},
  {code:"kok",name:"Konkani",native:"कोंकणी",flag:"🌊"},
  {code:"mai",name:"Maithili",native:"मैथिली",flag:"🌾"},
  {code:"ne",name:"Nepali",native:"नेपाली",flag:"⛰"},
  {code:"sd",name:"Sindhi",native:"سنڌي",flag:"🌊"},
  {code:"sa",name:"Sanskrit",native:"संस्कृतम्",flag:"📿"},
  {code:"doi",name:"Dogri",native:"डोगरी",flag:"🏔"},
  {code:"mni",name:"Manipuri",native:"মেইতেই",flag:"🎭"},
  {code:"bo",name:"Bodo",native:"बड़ो",flag:"🌿"},
];

const NAV_ITEMS = [
  {id:"home",label:"Home",icon:"🏠",sub:[]},
  {id:"jobs",label:"Jobs",icon:"📋",sub:["All Jobs","By State","By Category","By Education","By Salary"]},
  {id:"admit",label:"Admit Cards",icon:"🎫",sub:[]},
  {id:"results",label:"Results",icon:"📊",sub:[]},
  {id:"answer-keys",label:"Answer Keys",icon:"🔑",sub:[]},
  {id:"current-affairs",label:"Current Affairs",icon:"📰",sub:[]},
  {id:"editorial",label:"The Hindu",icon:"📖",sub:[]},
  {id:"mock-tests",label:"Mock Tests",icon:"📝",sub:[]},
  {id:"exam-calendar",label:"Exam Calendar",icon:"📅",sub:[]},
  {id:"english",label:"English Practice",icon:"🗣",sub:["Beginner","Intermediate","Advanced","Level Test"]},
  {id:"scholarships",label:"Scholarships",icon:"🎓",sub:[]},
  {id:"job-mela",label:"Job Mela",icon:"💼",sub:[]},
  {id:"ai-chat",label:"AI Guru",icon:"🤖",sub:[]},
  {id:"premium",label:"Premium",icon:"⭐",sub:[]},
];

/* ═══════════════════════════════════════════════════════
   HELPERS
═══════════════════════════════════════════════════════ */
const diffColor = d => d>=80?C.red:d>=60?C.gold:"#16a34a";
const diffLabel = d => d>=80?"Very Hard":d>=60?"Hard":d>=40?"Medium":"Easy";
const urgColor = n => n<=7?C.red:n<=15?C.gold:C.green;
const urgBg = n => n<=7?C.redBg:n<=15?C.goldLight:C.greenBg;

function Tag({children,bg,color,size=10}){
  return <span style={{background:bg,color,fontSize:size,fontWeight:700,padding:"2px 8px",borderRadius:4,display:"inline-block",marginRight:4,marginBottom:2,whiteSpace:"nowrap"}}>{children}</span>;
}
function SCard({title,icon,accent,children,noPad}){
  return(
    <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:12,marginBottom:16,overflow:"hidden"}}>
      <div style={{background:accent||C.navyMid,padding:"11px 18px",display:"flex",alignItems:"center",gap:8}}>
        <span style={{fontSize:18}}>{icon}</span>
        <span style={{color:"#fff",fontWeight:800,fontSize:14}}>{title}</span>
      </div>
      <div style={noPad?{}:{padding:18}}>{children}</div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   JOB CARD
═══════════════════════════════════════════════════════ */
function JobCard({job,onClick,compact}){
  return(
    <div onClick={()=>onClick(job)} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:12,padding:compact?"12px 14px":"16px 18px",cursor:"pointer",position:"relative",overflow:"hidden",transition:"transform 0.12s, box-shadow 0.12s"}}
      onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow="0 4px 20px rgba(0,0,0,0.08)";}}
      onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow="";}}>
      <div style={{position:"absolute",left:0,top:0,bottom:0,width:4,background:job.color,borderRadius:"12px 0 0 12px"}}/>
      <div style={{paddingLeft:10}}>
        <div style={{display:"flex",gap:6,marginBottom:6,flexWrap:"wrap"}}>
          <Tag bg={job.color+"20"} color={job.color}>{job.org}</Tag>
          <Tag bg={job.type==="Govt"?"#dcfce7":"#dbeafe"} color={job.type==="Govt"?"#166534":"#1e40af"}>{job.type}</Tag>
          <Tag bg="#f1f5f9" color="#475569">{job.state}</Tag>
          {job.hot&&<Tag bg="#fff7ed" color="#c2410c">🔥 HOT</Tag>}
          {!job.free&&<Tag bg={C.goldLight} color="#92400e">⭐ Premium</Tag>}
        </div>
        <div style={{fontSize:compact?13:15,fontWeight:800,color:C.navy,marginBottom:2,lineHeight:1.3}}>{job.title}</div>
        <div style={{fontSize:11,color:C.subtle,marginBottom:8}}>{job.telugu}</div>
        <div style={{display:"flex",gap:14,flexWrap:"wrap",marginBottom:8}}>
          {[["📌",job.posts.toLocaleString()+" posts"],["🎓",job.qual],["💰",compact?job.salary.split("–")[0]+"…":job.salary]].map(([ic,v])=>(
            <div key={v}><div style={{fontSize:9,color:C.subtle}}>{ic}</div><div style={{fontSize:11,fontWeight:700,color:C.text}}>{v}</div></div>
          ))}
        </div>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <div style={{flex:1,height:4,background:"#f1f5f9",borderRadius:2}}>
            <div style={{height:"100%",width:`${job.diff}%`,background:diffColor(job.diff),borderRadius:2}}/>
          </div>
          <span style={{fontSize:10,color:diffColor(job.diff),fontWeight:700,minWidth:55}}>{diffLabel(job.diff)}</span>
          <div style={{background:urgBg(job.daysLeft),color:urgColor(job.daysLeft),fontSize:11,fontWeight:800,padding:"3px 9px",borderRadius:5}}>{job.daysLeft}d left</div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   AI CHAT
═══════════════════════════════════════════════════════ */
function AIChat({lang}){
  const [messages,setMessages]=useState([{role:"assistant",text:"నమస్కారం! 🎓 నేను JobGuru AI. మీకు jobs, exams, preparation గురించి Telugu లో లేదా English లో సహాయం చేస్తాను. అడగండి!"}]);
  const [input,setInput]=useState("");
  const [loading,setLoading]=useState(false);
  const chatEndRef=useRef(null);
  useEffect(()=>chatEndRef.current?.scrollIntoView({behavior:"smooth"}),[messages]);

  async function send(){
    if(!input.trim())return;
    const userMsg=input.trim();
    setInput("");
    setMessages(m=>[...m,{role:"user",text:userMsg}]);
    setLoading(true);
    try{
      const res=await fetch("https://api.anthropic.com/v1/messages",{
        method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:800,messages:[
          {role:"user",content:`You are JobGuru AI assistant for JobGuruWorld.com - India's best job and education platform. You help Indian students with government jobs, exam preparation, study plans, career guidance, and education.

Rules:
- If the user asks in Telugu, reply in Telugu (తెలుగు)
- If the user asks in Hindi, reply in Hindi
- If in English, reply in English
- Always be friendly, helpful, and encouraging
- Keep answers focused on jobs, education, exams, career guidance
- Include specific useful information like exam names, websites, study tips
- For job questions: mention eligibility, salary, preparation tips
- Always end with an encouraging line

User question: ${userMsg}`}
        ]})
      });
      const data=await res.json();
      setMessages(m=>[...m,{role:"assistant",text:data.content[0].text}]);
    }catch(e){
      setMessages(m=>[...m,{role:"assistant",text:"క్షమించండి, కొంచెం error వచ్చింది. దయచేసి మళ్లీ try చేయండి! 🙏"}]);
    }
    setLoading(false);
  }

  const quickQ=["TSPSC Group-II కు ఎలా prepare చేయాలి?","Which govt jobs can I apply with B.Com degree?","What is the syllabus for SSC CGL?","నాకు 6 month study plan ఇవ్వండి","Best books for UPSC preparation?"];

  return(
    <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:12,overflow:"hidden",height:600,display:"flex",flexDirection:"column"}}>
      <div style={{background:`linear-gradient(135deg,${C.navyMid},${C.navyLight})`,padding:"14px 18px",display:"flex",alignItems:"center",gap:10}}>
        <div style={{width:40,height:40,background:C.gold,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22}}>🤖</div>
        <div>
          <div style={{color:"#fff",fontWeight:800,fontSize:15}}>JobGuru AI Mentor</div>
          <div style={{color:"#93c5fd",fontSize:11}}>Telugu · Hindi · English · 22 Languages · Available 24/7</div>
        </div>
        <div style={{marginLeft:"auto",display:"flex",alignItems:"center",gap:5}}>
          <div style={{width:8,height:8,background:"#22c55e",borderRadius:"50%"}}/>
          <span style={{color:"#22c55e",fontSize:11,fontWeight:700}}>Online</span>
        </div>
      </div>

      <div style={{flex:1,overflowY:"auto",padding:14,display:"flex",flexDirection:"column",gap:10}}>
        {messages.map((m,i)=>(
          <div key={i} style={{display:"flex",justifyContent:m.role==="user"?"flex-end":"flex-start"}}>
            <div style={{maxWidth:"80%",padding:"10px 13px",borderRadius:m.role==="user"?"12px 12px 0 12px":"12px 12px 12px 0",background:m.role==="user"?C.navyMid:C.greenBg,color:m.role==="user"?"#fff":C.text,fontSize:13,lineHeight:1.6,whiteSpace:"pre-wrap"}}>
              {m.text}
            </div>
          </div>
        ))}
        {loading&&(
          <div style={{display:"flex",gap:5,padding:"10px 13px",borderRadius:"12px 12px 12px 0",background:C.greenBg,width:"fit-content"}}>
            {[0,1,2].map(i=><div key={i} style={{width:8,height:8,background:C.green,borderRadius:"50%",animation:"bounce 0.8s infinite",animationDelay:`${i*0.15}s`}}/>)}
          </div>
        )}
        <div ref={chatEndRef}/>
      </div>

      <div style={{padding:"10px 14px",borderTop:`1px solid ${C.border}`,background:"#fafaf9"}}>
        <div style={{display:"flex",gap:6,marginBottom:8,overflowX:"auto",paddingBottom:4}}>
          {quickQ.map((q,i)=>(
            <button key={i} onClick={()=>setInput(q)} style={{background:C.navyMid+"15",border:`1px solid ${C.navyMid}30`,borderRadius:20,padding:"4px 10px",fontSize:10,fontWeight:600,color:C.navyMid,cursor:"pointer",whiteSpace:"nowrap",flexShrink:0}}>{q.length>30?q.slice(0,30)+"…":q}</button>
          ))}
        </div>
        <div style={{display:"flex",gap:8}}>
          <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&!e.shiftKey&&send()} placeholder="Telugu లో లేదా English లో అడగండి..." style={{flex:1,padding:"9px 13px",border:`1px solid ${C.border}`,borderRadius:8,fontSize:13,outline:"none"}}/>
          <button onClick={send} disabled={loading||!input.trim()} style={{background:C.gold,color:"#fff",border:"none",borderRadius:8,padding:"9px 16px",fontSize:13,fontWeight:800,cursor:loading||!input.trim()?"not-allowed":"pointer",opacity:loading||!input.trim()?0.6:1}}>Send →</button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   ENGLISH PRACTICE
═══════════════════════════════════════════════════════ */
function EnglishPractice(){
  const [level,setLevel]=useState("beginner");
  const [lesson,setLesson]=useState(0);
  const [testMode,setTestMode]=useState(false);
  const [testScore,setTestScore]=useState(null);
  const [testAnswers,setTestAnswers]=useState({});
  const [aiLoading,setAiLoading]=useState(false);
  const [aiFeedback,setAiFeedback]=useState("");

  const lessons=ENGLISH_LESSONS[level];
  const currentLesson=lessons[lesson];

  const testQuestions=[
    {q:"What is the correct sentence?",options:["I am go to office","I am going to office","I going to office","I goes to office"],ans:1},
    {q:"How do you say 'నేను సంతోషంగా ఉన్నాను' in English?",options:["I am happy","I happy am","Happy I am","I happiness"],ans:0},
    {q:"Fill in the blank: 'The exam ___ on Monday'",options:["are","is","am","be"],ans:1},
    {q:"Which is correct for an interview?",options:["Ya I can do it","Yes, I can certainly do that","Yeah sure","I can do"],ans:1},
    {q:"How do you greet formally in the morning?",options:["Hey!","What's up?","Good morning, Sir/Madam","Hello man"],ans:2},
  ];

  async function getAIFeedback(sentence){
    setAiLoading(true);
    try{
      const res=await fetch("https://api.anthropic.com/v1/messages",{
        method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:400,messages:[{role:"user",content:`You are an English language teacher helping a Telugu student improve their English. Analyze this sentence and provide feedback:

Sentence: "${sentence}"

Provide:
1. Is it correct? (Yes/No)
2. If wrong, what is the correct version?
3. Grammar tip in simple language (with Telugu explanation if helpful)
4. Encourage the student

Keep response brief and encouraging.`}]})
      });
      const data=await res.json();
      setAiFeedback(data.content[0].text);
    }catch(e){setAiFeedback("AI feedback unavailable right now. Please try again!");}
    setAiLoading(false);
  }

  const [practiceInput,setPracticeInput]=useState("");

  return(
    <div>
      <div style={{background:`linear-gradient(135deg,${C.navy},${C.teal})`,padding:"24px 20px",textAlign:"center",marginBottom:20,borderRadius:12}}>
        <div style={{fontSize:32,marginBottom:8}}>🗣️</div>
        <h2 style={{color:"#fff",fontSize:20,fontWeight:900,margin:"0 0 4px"}}>English Speaking Practice</h2>
        <p style={{color:"#99f6e4",fontSize:13,margin:0}}>Basic నుండి Fluent వరకు — Step by Step Learning</p>
      </div>

      {!testMode?(
        <>
          <div style={{display:"flex",gap:8,marginBottom:20,flexWrap:"wrap"}}>
            {[["beginner","🟢 Beginner","Basic English"],["intermediate","🟡 Intermediate","Office & Interview"],["advanced","🔴 Advanced","UPSC & Fluent"]].map(([lv,lbl,sub])=>(
              <button key={lv} onClick={()=>{setLevel(lv);setLesson(0);setAiFeedback("");}} style={{flex:1,minWidth:120,background:level===lv?C.teal:"#f1f5f9",color:level===lv?"#fff":C.text,border:`2px solid ${level===lv?C.teal:C.border}`,borderRadius:10,padding:"10px 14px",cursor:"pointer",textAlign:"center"}}>
                <div style={{fontWeight:800,fontSize:13}}>{lbl}</div>
                <div style={{fontSize:10,opacity:0.8,marginTop:2}}>{sub}</div>
              </button>
            ))}
            <button onClick={()=>setTestMode(true)} style={{flex:1,minWidth:120,background:C.gold,color:"#fff",border:"none",borderRadius:10,padding:"10px 14px",cursor:"pointer",textAlign:"center"}}>
              <div style={{fontWeight:800,fontSize:13}}>📊 Level Test</div>
              <div style={{fontSize:10,opacity:0.8,marginTop:2}}>Find your level</div>
            </button>
          </div>

          <SCard title={`${currentLesson.title} — ${currentLesson.telugu}`} icon="📚" accent={C.teal}>
            <div style={{display:"flex",gap:8,marginBottom:16,overflowX:"auto"}}>
              {lessons.map((_,i)=>(
                <button key={i} onClick={()=>{setLesson(i);setAiFeedback("");}} style={{background:lesson===i?C.teal:"#f1f5f9",color:lesson===i?"#fff":C.muted,border:"none",borderRadius:20,padding:"4px 12px",fontSize:11,fontWeight:700,cursor:"pointer",flexShrink:0}}>Lesson {i+1}</button>
              ))}
            </div>
            <div style={{marginBottom:16}}>
              <div style={{fontSize:12,fontWeight:700,color:C.muted,marginBottom:8}}>📝 PHRASES TO LEARN</div>
              {currentLesson.phrases.map((p,i)=>(
                <div key={i} style={{display:"flex",gap:10,padding:"8px 12px",marginBottom:6,background:"#f8f5f0",borderRadius:7,alignItems:"center"}}>
                  <span style={{color:C.teal,fontWeight:900,fontSize:16}}>→</span>
                  <span style={{fontSize:14,color:C.text,flex:1}}>{p}</span>
                  <button onClick={()=>window.speechSynthesis?.speak?.(Object.assign(new SpeechSynthesisUtterance(p),{lang:"en-IN"}))} style={{background:C.tealBg,color:C.teal,border:"none",borderRadius:5,padding:"3px 9px",fontSize:11,cursor:"pointer"}}>🔊 Listen</button>
                </div>
              ))}
            </div>
            <div style={{background:C.tealBg,borderRadius:8,padding:"10px 14px",marginBottom:16,fontSize:13,color:C.teal,lineHeight:1.6}}>
              <strong>📋 Practice:</strong> {currentLesson.practice}
            </div>
            <div>
              <div style={{fontSize:12,fontWeight:700,color:C.muted,marginBottom:6}}>✍️ AI GRAMMAR CHECK — Type a sentence, get instant feedback</div>
              <div style={{display:"flex",gap:8,marginBottom:8}}>
                <input value={practiceInput} onChange={e=>setPracticeInput(e.target.value)} placeholder="Type an English sentence here..." style={{flex:1,padding:"8px 12px",border:`1px solid ${C.border}`,borderRadius:7,fontSize:13,outline:"none"}}/>
                <button onClick={()=>practiceInput&&getAIFeedback(practiceInput)} disabled={aiLoading||!practiceInput} style={{background:C.teal,color:"#fff",border:"none",borderRadius:7,padding:"8px 14px",fontSize:12,fontWeight:700,cursor:"pointer"}}>
                  {aiLoading?"…":"Check ✓"}
                </button>
              </div>
              {aiFeedback&&(
                <div style={{background:"#f0fdfa",border:"1px solid #99f6e4",borderRadius:8,padding:"10px 12px",fontSize:13,color:C.text,lineHeight:1.7,whiteSpace:"pre-wrap"}}>{aiFeedback}</div>
              )}
            </div>
          </SCard>
        </>
      ):(
        <SCard title="English Level Test — Find Your Current Level" icon="📊" accent={C.teal}>
          {testScore===null?(
            <>
              {testQuestions.map((q,i)=>(
                <div key={i} style={{marginBottom:16,paddingBottom:16,borderBottom:i<4?`1px solid ${C.border}`:"none"}}>
                  <div style={{fontSize:13,fontWeight:700,color:C.navy,marginBottom:8}}>Q{i+1}. {q.q}</div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6}}>
                    {q.options.map((o,j)=>(
                      <button key={j} onClick={()=>setTestAnswers(a=>({...a,[i]:j}))} style={{background:testAnswers[i]===j?C.teal:"#f8f5f0",color:testAnswers[i]===j?"#fff":C.text,border:`1px solid ${testAnswers[i]===j?C.teal:C.border}`,borderRadius:7,padding:"7px 10px",fontSize:12,cursor:"pointer",textAlign:"left"}}>{String.fromCharCode(65+j)}. {o}</button>
                    ))}
                  </div>
                </div>
              ))}
              <button onClick={()=>{
                const score=testQuestions.filter((q,i)=>testAnswers[i]===q.ans).length;
                setTestScore(score);
              }} style={{width:"100%",background:C.gold,color:"#fff",border:"none",borderRadius:8,padding:"11px",fontSize:14,fontWeight:800,cursor:"pointer"}}>Submit Test →</button>
            </>
          ):(
            <div style={{textAlign:"center",padding:20}}>
              <div style={{fontSize:48,marginBottom:12}}>{testScore>=4?"🏆":testScore>=2?"👍":"📚"}</div>
              <div style={{fontSize:32,fontWeight:900,color:C.teal,marginBottom:4}}>{testScore}/5</div>
              <div style={{fontSize:18,fontWeight:700,color:C.navy,marginBottom:8}}>
                {testScore>=4?"Advanced Level — Excellent!":testScore>=2?"Intermediate Level — Good Progress!":"Beginner Level — Great Starting Point!"}
              </div>
              <div style={{fontSize:13,color:C.muted,marginBottom:16,lineHeight:1.7}}>
                {testScore>=4?"You can handle complex English. Focus on UPSC interview preparation and editorial reading.":testScore>=2?"You have basic English skills. Practice office conversations and interview English next.":"Start from Beginner lessons. Daily 15-minute practice will make you fluent in 6 months!"}
              </div>
              <div style={{display:"flex",gap:10,justifyContent:"center"}}>
                <button onClick={()=>{setTestScore(null);setTestAnswers({});}} style={{background:"#f1f5f9",color:C.text,border:"none",borderRadius:7,padding:"9px 18px",fontSize:13,fontWeight:700,cursor:"pointer"}}>Retake Test</button>
                <button onClick={()=>{setTestMode(false);setLevel(testScore>=4?"advanced":testScore>=2?"intermediate":"beginner");}} style={{background:C.teal,color:"#fff",border:"none",borderRadius:7,padding:"9px 18px",fontSize:13,fontWeight:700,cursor:"pointer"}}>Start Learning →</button>
              </div>
            </div>
          )}
        </SCard>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   DETAIL PAGE
═══════════════════════════════════════════════════════ */
function JobDetailPage({job,onBack}){
  const [tab,setTab]=useState("overview");
  const [age,setAge]=useState("");
  const [qual,setQual]=useState("");
  const [cat,setCat]=useState("");
  const [elig,setElig]=useState(null);
  const [secs,setSecs]=useState((job.daysLeft||18)*86400);
  const [lang,setLang]=useState(LANGUAGES[0]);
  const [translation,setTranslation]=useState("");
  const [translating,setTranslating]=useState(false);
  const [showLang,setShowLang]=useState(false);
  useEffect(()=>{const t=setInterval(()=>setSecs(s=>Math.max(0,s-1)),1000);return()=>clearInterval(t);},[]);
  const cd={d:Math.floor(secs/86400),h:Math.floor((secs%86400)/3600),m:Math.floor((secs%3600)/60),s:secs%60};

  async function translate(){
    if(lang.code==="en")return;
    setTranslating(true);
    try{
      const r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1500,messages:[{role:"user",content:`Translate this complete job notification into ${lang.name} (${lang.native}). Use simple everyday language. Keep ₹ amounts, exam names, numbers as-is.\n\nJob: ${job.title}\nPosts: ${job.posts}\nQualification: ${job.qual}\nAge: ${job.age}\nSalary: ${job.salary}\nLast Date: ${job.lastDate}\nState: ${job.state}\nThis is a ${job.type} job. Students should apply before the deadline. Full details at jobguruworld.com`}]})});
      const d=await r.json();setTranslation(d.content[0].text);
    }catch(e){setTranslation("Translation failed. Please try again.");}
    setTranslating(false);
  }

  const TABS=[{id:"overview",l:"Overview",ic:"📋"},{id:"syllabus",l:"Syllabus",ic:"📚"},{id:"roadmap",l:"Study Plan",ic:"🗺"},{id:"cutoff",l:"Cut-offs",ic:"🎯"},{id:"papers",l:"Papers",ic:"📝"},{id:"joblife",l:"Job Life",ic:"💼"},{id:"toppers",l:"Toppers",ic:"🏆"},{id:"similar",l:"Similar",ic:"🔗"},{id:"language",l:"My Language",ic:"🌐"}];

  return(
    <div>
      <div style={{background:job.color,padding:"16px 20px 0"}}>
        <div style={{maxWidth:1040,margin:"0 auto"}}>
          <button onClick={onBack} style={{background:"rgba(255,255,255,0.15)",border:"none",color:"#fff",borderRadius:6,padding:"5px 12px",fontSize:12,cursor:"pointer",marginBottom:10}}>← Back to Jobs</button>
          <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:8}}>
            <Tag bg="rgba(255,255,255,0.2)" color="#fff">{job.org}</Tag>
            <Tag bg="rgba(255,255,255,0.2)" color="#fff">{job.type}</Tag>
            <Tag bg="rgba(255,255,255,0.2)" color="#fff">{job.state}</Tag>
            {job.hot&&<Tag bg="rgba(255,255,255,0.2)" color="#fff">🔥 HOT</Tag>}
          </div>
          <h1 style={{color:"#fff",fontSize:20,margin:"0 0 2px",fontWeight:900,lineHeight:1.2}}>{job.title}</h1>
          <p style={{color:"rgba(255,255,255,0.7)",fontSize:12,margin:"0 0 14px"}}>{job.telugu}</p>
          <div style={{display:"grid",gridTemplateColumns:"repeat(6,1fr)",gap:2}}>
            {[["Posts",job.posts.toLocaleString()],["Salary",job.salary.split("–")[0]+"…"],["Age",job.age],["Edu",job.edu?.slice(0,10)||"Degree"],["Fee","₹200/Free"],["Exam","June 2025"]].map(([l,v])=>(
              <div key={l} style={{background:"rgba(0,0,0,0.25)",padding:"8px 10px",textAlign:"center"}}>
                <div style={{fontSize:8,color:"rgba(255,255,255,0.6)",fontWeight:700,textTransform:"uppercase",marginBottom:2}}>{l}</div>
                <div style={{fontSize:11,fontWeight:800,color:"#fff"}}>{v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{background:"#fff",borderBottom:`1px solid ${C.border}`,padding:"9px 20px"}}>
        <div style={{maxWidth:1040,margin:"0 auto",display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}>
          <div style={{display:"flex",gap:4,alignItems:"center"}}>
            <span style={{fontSize:10,color:C.red,fontWeight:800}}>⏱ Closes:</span>
            {[["d",cd.d],["h",cd.h],["m",cd.m],["s",cd.s]].map(([u,v])=>(
              <div key={u} style={{background:C.red,color:"#fff",borderRadius:4,padding:"2px 6px",textAlign:"center",minWidth:28}}>
                <div style={{fontSize:12,fontWeight:900}}>{String(v).padStart(2,"0")}</div>
                <div style={{fontSize:7,opacity:0.8}}>{u}</div>
              </div>
            ))}
          </div>
          <div style={{flex:1}}/>
          <button onClick={()=>window.open(`https://wa.me/?text=${encodeURIComponent(`🎓 JobGuruWorld.com — ${job.title}\n📌 Posts: ${job.posts}\n💰 ${job.salary}\n📅 Last Date: ${job.lastDate}\njobguruworld.com`)}`)} style={{background:"#25D366",color:"#fff",border:"none",borderRadius:6,padding:"6px 12px",fontSize:11,fontWeight:700,cursor:"pointer"}}>📤 WhatsApp</button>
          <a href="https://tspsc.gov.in" target="_blank" rel="noreferrer" style={{background:"#f1f5f9",color:C.blue,borderRadius:6,padding:"6px 12px",fontSize:11,fontWeight:700,textDecoration:"none"}}>📄 Notification</a>
          <a href="https://tspsc.gov.in/apply" target="_blank" rel="noreferrer" style={{background:C.gold,color:"#fff",borderRadius:6,padding:"6px 14px",fontSize:11,fontWeight:900,textDecoration:"none"}}>✅ Apply Now →</a>
        </div>
      </div>

      <div style={{background:"#fff",borderBottom:`1px solid ${C.border}`,position:"sticky",top:54,zIndex:20}}>
        <div style={{maxWidth:1040,margin:"0 auto",display:"flex",overflowX:"auto"}}>
          {TABS.map(t=>(
            <button key={t.id} onClick={()=>setTab(t.id)} style={{padding:"10px 12px",border:"none",background:"none",cursor:"pointer",whiteSpace:"nowrap",fontSize:11,fontWeight:tab===t.id?800:500,color:tab===t.id?C.navyMid:C.subtle,borderBottom:tab===t.id?`2.5px solid ${C.gold}`:"2.5px solid transparent"}}>
              {t.ic} {t.l}
            </button>
          ))}
        </div>
      </div>

      <div style={{maxWidth:1040,margin:"0 auto",padding:"20px 16px",display:"grid",gridTemplateColumns:"1fr 300px",gap:20}}>
        <div>
          {tab==="overview"&&(
            <div>
              <SCard title="Complete Notification Details — పూర్తి వివరాలు" icon="📋" accent={C.navyMid}>
                <table style={{width:"100%",borderCollapse:"collapse"}}>
                  <tbody>
                    {[["Organisation","TSPSC — Telangana State Public Service Commission"],["Post Names","Deputy Tahsildar, MRO, Sub-Registrar, Municipal Commissioner"],["Total Vacancies","783 Posts"],["Qualification","Any Bachelor's Degree from a recognised university"],["Age Limit","18 to 44 years"],["Age Relaxation","SC/ST/BC: up to 49 years | PH: 10 years extra"],["Last Date","15 February 2025"],["Exam Date","June 2025 (Expected)"],["Fee OC/EWS","₹200"],["Fee SC/ST/PH","FREE — ₹0"],["Salary","₹35,120–₹1,03,740/month"],["In-hand","~₹42,000–₹48,000/month"]].map(([l,v])=>(
                      <tr key={l} style={{borderBottom:`1px solid ${C.border}`}}>
                        <td style={{padding:"7px 10px",color:C.muted,fontWeight:700,width:"38%",background:"#f8f6f2",fontSize:12}}>{l}</td>
                        <td style={{padding:"7px 10px",color:C.text,fontSize:12,lineHeight:1.5}}>{v}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </SCard>
              <SCard title="⚠️ Common Mistakes to Avoid" icon="⚠️" accent={C.red}>
                {["Ignoring Telangana-specific topics — 40% of paper is Telangana only","Starting new books 1 month before exam — stick to your existing material","Skipping previous papers practice — the single biggest mistake","Not revising — reading once is never enough, revise minimum 3 times","Ignoring Current Affairs — 20–25 questions every exam from last 12 months"].map((m,i)=>(
                  <div key={i} style={{display:"flex",gap:9,padding:"6px 0",borderBottom:i<4?`1px solid ${C.redBg}`:"none"}}>
                    <span style={{color:C.red,fontWeight:900,flexShrink:0}}>✗</span>
                    <span style={{fontSize:13,color:C.text,lineHeight:1.6}}>{m}</span>
                  </div>
                ))}
              </SCard>
            </div>
          )}
          {tab==="syllabus"&&(
            <div>
              <div style={{background:"#fff3cd",border:"1px solid #ffc107",borderRadius:8,padding:"9px 13px",marginBottom:14,fontSize:12,color:"#856404"}}>
                📌 2 Papers × 150 marks = 300 total · 2.5 hours per paper · Negative marking ⅓ per wrong answer
              </div>
              {[{p:"Paper I — General Studies",m:150,t:["Telangana History & Culture","Indian History","Indian Polity & Constitution","Geography (Telangana + India)","Indian Economy","Science & Technology","Environment & Ecology","Current Affairs (12 months)","Mental Ability & Reasoning"]},{p:"Paper II — Telangana Movement",m:150,t:["Telangana Movement History","State Formation 2014","Socio-economic Development","Govt Schemes: Rythu Bandhu, Mission Bhagiratha","Tribal Issues & Welfare","Backward Classes Welfare","Women Empowerment Schemes","Urban & Rural Development"]}].map((s,i)=>(
                <SCard key={i} title={`${s.p} — ${s.m} Marks`} icon="📚" accent={i===0?C.navyMid:C.purple}>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"6px 14px",marginBottom:12}}>
                    {s.t.map((t,j)=>(
                      <div key={j} style={{display:"flex",gap:7}}><span style={{color:C.green,fontWeight:900,flexShrink:0}}>✓</span><span style={{fontSize:13,color:C.text,lineHeight:1.5}}>{t}</span></div>
                    ))}
                  </div>
                  <div style={{background:C.greenBg,borderRadius:6,padding:"8px 12px",fontSize:12,color:C.green}}><strong>Best book:</strong> Telugu Academy Material + NCERT 9–12 (free at ncert.nic.in)</div>
                </SCard>
              ))}
            </div>
          )}
          {tab==="roadmap"&&(
            <div>
              {[{m:"Month 1",color:"#16a34a",f:"History & Polity",h:"4 hrs/day",t:["NCERT 9–10 History daily","Telugu Academy Telangana History","Laxmikanth Polity Ch 1–10","Sakshi newspaper 30 min daily"]},{m:"Month 2",color:"#0284c7",f:"Geography & Economy",h:"4 hrs/day",t:["NCERT Geography 9–12","Telangana Budget highlights","Central govt schemes","Ramesh Singh Economy"]},{m:"Month 3",color:"#7c3aed",f:"Telangana Movement",h:"5 hrs/day",t:["Telugu Academy Movement material","State formation timeline","Welfare schemes complete list","Tribal welfare programs"]},{m:"Month 4",color:"#b45309",f:"Science & Current Affairs",h:"5 hrs/day",t:["NCERT Class 10 Science","Science & Tech developments","Last 12 months current affairs","Environment & Ecology"]},{m:"Month 5",color:"#dc2626",f:"Previous Papers",h:"6 hrs/day",t:["Solve all 5 previous year papers","Identify weak areas and revise","Topic-wise mock tests 30/day","Join online test series"]},{m:"Month 6",color:C.navy,f:"Final Revision",h:"6 hrs/day",t:["2 full mock tests per week","Revise notes — no new topics","Time management practice","8 hrs sleep — stay healthy"]}].map((r,i)=>(
                <div key={i} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:12,padding:"16px 18px",marginBottom:12,borderLeft:`5px solid ${r.color}`}}>
                  <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
                    <span style={{background:r.color,color:"#fff",fontSize:10,fontWeight:900,padding:"3px 11px",borderRadius:20}}>{r.m}</span>
                    <span style={{fontSize:14,fontWeight:800,color:C.navy}}>{r.f}</span>
                    <span style={{marginLeft:"auto",fontSize:10,color:C.subtle,background:"#f1f5f9",padding:"2px 8px",borderRadius:5}}>⏱ {r.h}</span>
                  </div>
                  {r.t.map((t,j)=>(
                    <div key={j} style={{display:"flex",gap:8,padding:"4px 0",borderBottom:j<r.t.length-1?`1px solid #f8f5f0`:"none"}}>
                      <span style={{color:r.color,fontWeight:900,flexShrink:0}}>→</span>
                      <span style={{fontSize:13,color:C.text,lineHeight:1.6}}>{t}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
          {tab==="cutoff"&&(
            <SCard title="Last 8 Years Cut-off Marks — కట్-ఆఫ్ మార్కులు" icon="🎯" accent={C.navyMid}>
              <p style={{fontSize:12,color:C.muted,marginBottom:12}}>Out of 900 total marks. Target: <strong style={{color:C.navy}}>420+ (General)</strong> for safe selection.</p>
              <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
                <thead><tr style={{background:C.navyMid}}>{["Year","General","BC","SC","ST","Trend"].map(h=><th key={h} style={{padding:"8px 10px",color:"#fff",textAlign:"left",fontSize:11}}>{h}</th>)}</tr></thead>
                <tbody>
                  {[{y:2023,g:412,b:389,s:358,st:341},{y:2022,g:398,b:375,s:342,st:328},{y:2021,g:421,b:401,s:367,st:352},{y:2020,g:387,b:362,s:331,st:315},{y:2019,g:405,b:381,s:349,st:334},{y:2018,g:378,b:354,s:322,st:308},{y:2017,g:365,b:341,s:309,st:294},{y:2016,g:352,b:328,s:297,st:281}].map((c,i)=>(
                    <tr key={c.y} style={{background:i%2===0?"#fff":"#f8f5f0"}}>
                      <td style={{padding:"7px 10px",fontWeight:800,color:C.navy}}>{c.y}</td>
                      {[[c.g,"#1d4ed8"],[c.b,"#7c3aed"],[c.s,C.red],[c.st,C.gold]].map(([v,col],j)=>(
                        <td key={j} style={{padding:"7px 10px"}}><span style={{fontWeight:700,color:col}}>{v}</span></td>
                      ))}
                      <td style={{padding:"7px 10px",fontSize:11,fontWeight:700,color:i>0&&[412,398,421,387,405,378,365,352][i-1]>c.g?C.green:C.red}}>{i>0?(([412,398,421,387,405,378,365,352][i-1]>c.g)?"▼ Easier":"▲ Tougher"):"—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </SCard>
          )}
          {tab==="papers"&&(
            <SCard title="Previous Year Papers & AI Model Tests" icon="📝" accent={C.navyMid}>
              {[2023,2022,2021,2020,2019,2018].map(yr=>(
                <div key={yr} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 0",borderBottom:`1px solid ${C.border}`}}>
                  <div>
                    <div style={{fontSize:13,fontWeight:700,color:C.navy}}>TSPSC Group-II {yr} — Paper I & II</div>
                    <div style={{fontSize:11,color:C.subtle,marginTop:2}}>150 Questions · 150 Marks · 2.5 Hours</div>
                  </div>
                  <div style={{display:"flex",gap:6}}>
                    <button style={{background:C.blueBg,color:C.blue,border:"none",borderRadius:5,padding:"4px 10px",fontSize:11,fontWeight:700,cursor:"pointer"}}>View</button>
                    <button style={{background:"#dcfce7",color:C.green,border:"none",borderRadius:5,padding:"4px 10px",fontSize:11,fontWeight:700,cursor:"pointer"}}>PDF</button>
                  </div>
                </div>
              ))}
              <div style={{marginTop:14,background:C.greenBg,borderRadius:8,padding:12}}>
                <div style={{fontSize:12,fontWeight:800,color:C.green,marginBottom:8}}>🤖 AI Model Tests by JobGuru</div>
                {["Full GS Mock — 150 Questions","Telangana History Special — 50 Questions","Polity Quick Test — 40 Questions","Current Affairs Monthly — 40 Questions"].map((p,i)=>(
                  <div key={i} style={{display:"flex",justifyContent:"space-between",padding:"5px 0",fontSize:12,borderBottom:i<3?`1px solid #dcfce7`:"none"}}>
                    <span>📝 {p}</span><span style={{color:C.green,fontWeight:700,cursor:"pointer"}}>Start →</span>
                  </div>
                ))}
              </div>
            </SCard>
          )}
          {tab==="joblife"&&(
            <div>
              <SCard title="Daily Job Work After Selection" icon="💼" accent={C.navyMid}>
                <p style={{fontSize:13,color:C.text,lineHeight:1.7,marginBottom:10}}>As MRO/Dy. Tahsildar: Land revenue collection, property registrations, issuing caste/income certificates, land surveys, flood/cyclone relief coordination at mandal level.</p>
                <p style={{fontSize:13,color:C.text,lineHeight:1.7}}>As Sub-Registrar: Property document registration, stamp duty collection, maintaining land records, legal document verification.</p>
              </SCard>
              <SCard title="Complete Salary & Allowances" icon="💰" accent={C.green}>
                <table style={{width:"100%",borderCollapse:"collapse"}}>
                  {[["Basic Pay","₹35,120/month"],["DA (12%)","₹4,214/month"],["HRA (24%)","₹8,429/month"],["Travel Allowance","₹2,500–₹5,000/month"],["Gross Salary","₹52,000–₹58,000/month"],["In-hand Take-home","₹42,000–₹48,000/month"]].map(([l,v],i)=>(
                    <tr key={l} style={{borderBottom:`1px solid ${C.border}`,background:i%2===0?"#fff":"#f8f5f0"}}>
                      <td style={{padding:"7px 10px",color:C.muted,fontWeight:700,fontSize:12,width:"45%"}}>{l}</td>
                      <td style={{padding:"7px 10px",color:C.text,fontWeight:600,fontSize:12}}>{v}</td>
                    </tr>
                  ))}
                </table>
              </SCard>
              <SCard title="Career Growth Path — కెరీర్ వృద్ధి" icon="📈" accent={C.purple}>
                {[["Dy. Tahsildar/MRO","Year 0","₹35,120–₹1,03,740"],["Tahsildar","5–10 yrs","₹44,920–₹1,30,290"],["Revenue Divisional Officer","12–18 yrs","₹56,100–₹1,77,500"],["District Revenue Officer","20–25 yrs","₹67,700–₹2,08,700"],["Joint Collector","28+ yrs","₹1,44,200–₹2,18,200"]].map(([r,y,p],i)=>(
                  <div key={i} style={{display:"flex",gap:12,padding:"10px 0",borderBottom:i<4?`1px solid ${C.border}`:"none"}}>
                    <div style={{width:28,height:28,background:i===0?C.navyMid:i===4?C.gold:"#f1f5f9",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:900,color:i===0||i===4?"#fff":C.muted,flexShrink:0}}>{i+1}</div>
                    <div>
                      <div style={{fontSize:13,fontWeight:800,color:C.navy}}>{r}</div>
                      <div style={{fontSize:11,color:C.muted}}>{y} · <strong style={{color:C.green}}>{p}</strong></div>
                    </div>
                  </div>
                ))}
              </SCard>
            </div>
          )}
          {tab==="toppers"&&(
            <div>
              {[{n:"Ravi Kumar",f:"Karimnagar",r:12,y:2023,m:8,q:"మొదటి ప్రయత్నంలోనే పాస్ అయ్యాను. ప్రతి రోజు 5 గంటలు పట్టుదలతో చదివాను.",s:"Telugu History + daily Sakshi current affairs. Solved 5 years papers 3 times.",t:["Never skip Current Affairs — 20+ questions every year","Telugu Academy material is enough","Revise notes 3 times minimum before exam"]},{n:"Priya Lakshmi Reddy",f:"Warangal",r:7,y:2022,m:10,q:"Previous papers solve చేయడం నన్ను బాగా help చేసింది.",s:"Made handwritten notes for every topic. Solved 10 years papers. Joined test series.",t:["Write notes by hand — memory retention is stronger","Join a test series — mock exams build confidence","Don't panic in last month — just revise"]}].map((t,i)=>(
                <div key={i} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:12,padding:18,marginBottom:14}}>
                  <div style={{display:"flex",gap:12,marginBottom:12}}>
                    <div style={{width:48,height:48,background:C.blueBg,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,color:C.blue,fontSize:16,flexShrink:0}}>{t.n.split(" ").map(x=>x[0]).join("")}</div>
                    <div style={{flex:1}}>
                      <div style={{fontSize:14,fontWeight:800,color:C.navy}}>{t.n}</div>
                      <div style={{fontSize:11,color:C.muted}}>From {t.f} · Rank <strong style={{color:C.gold}}>#{t.r}</strong> · {t.y} · {t.m} months prep</div>
                    </div>
                    <div style={{background:"#fef9c3",color:"#92400e",fontSize:11,fontWeight:900,padding:"3px 11px",borderRadius:20,height:"fit-content"}}>Rank #{t.r}</div>
                  </div>
                  <div style={{background:C.greenBg,borderRadius:8,padding:"10px 13px",marginBottom:10,fontSize:13,color:"#166534",fontStyle:"italic",lineHeight:1.7}}>"{t.q}"</div>
                  <div style={{fontSize:12,color:C.text,marginBottom:8}}><strong>Strategy:</strong> {t.s}</div>
                  {t.t.map((tip,j)=>(
                    <div key={j} style={{display:"flex",gap:7,padding:"3px 0",fontSize:12,color:C.text}}>
                      <span style={{color:C.gold,fontWeight:900}}>★</span>{tip}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
          {tab==="similar"&&(
            <SCard title="Similar Jobs You Can Also Apply For" icon="🔗" accent={C.navyMid}>
              {[{title:"APPSC Group-II 2025",org:"APPSC",posts:312,last:"20 Feb",match:96,days:23},{title:"TSPSC Group-IV 2025",org:"TSPSC",posts:9168,last:"Apr",match:94,days:55},{title:"Telangana DSC Teachers",org:"DEO",posts:11000,last:"Mar",match:87,days:41},{title:"SSC CHSL 2025",org:"SSC",posts:3712,last:"10 Feb",match:79,days:13}].map((s,i)=>(
                <div key={i} style={{display:"flex",alignItems:"center",gap:12,padding:"11px 0",borderBottom:i<3?`1px solid ${C.border}`:"none"}}>
                  <div style={{flex:1}}>
                    <div style={{fontSize:13,fontWeight:800,color:C.navy}}>{s.title}</div>
                    <div style={{fontSize:11,color:C.muted,marginTop:2}}>{s.org} · {s.posts.toLocaleString()} posts · Last: {s.last}</div>
                  </div>
                  <div style={{textAlign:"center"}}>
                    <div style={{fontSize:17,fontWeight:900,color:C.green}}>{s.match}%</div>
                    <div style={{fontSize:9,color:C.subtle}}>match</div>
                  </div>
                  <div>
                    <div style={{background:urgBg(s.days),color:urgColor(s.days),fontSize:10,fontWeight:700,padding:"2px 8px",borderRadius:4,marginBottom:5}}>{s.days}d left</div>
                    <button style={{background:C.gold,color:"#fff",border:"none",borderRadius:5,padding:"4px 11px",fontSize:11,fontWeight:700,cursor:"pointer"}}>View →</button>
                  </div>
                </div>
              ))}
            </SCard>
          )}
          {tab==="language"&&(
            <SCard title="Read in Your Language — మీ భాషలో చదవండి" icon="🌐" accent={C.navyMid}>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(115px,1fr))",gap:7,marginBottom:16}}>
                {LANGUAGES.map(l=>(
                  <button key={l.code} onClick={()=>{setLang(l);setTranslation("");}} style={{background:lang.code===l.code?C.navyMid:"#f8f5f0",border:lang.code===l.code?`2px solid ${C.gold}`:`1px solid ${C.border}`,borderRadius:8,padding:"8px 9px",cursor:"pointer",textAlign:"left"}}>
                    <div style={{display:"flex",gap:5,alignItems:"center"}}>
                      <span style={{fontSize:15}}>{l.flag}</span>
                      <div>
                        <div style={{fontSize:12,fontWeight:800,color:lang.code===l.code?"#fff":C.navy,lineHeight:1.2}}>{l.native}</div>
                        <div style={{fontSize:9,color:lang.code===l.code?"#93c5fd":C.subtle}}>{l.name}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              {lang.code!=="en"&&!translation&&(
                <button onClick={translate} disabled={translating} style={{background:translating?"#94a3b8":C.gold,color:"#fff",border:"none",borderRadius:9,padding:"12px 24px",fontSize:13,fontWeight:900,cursor:translating?"default":"pointer",width:"100%",marginBottom:14}}>
                  {translating?`⏳ Translating into ${lang.native}...`:`🌐 Translate into ${lang.native} →`}
                </button>
              )}
              {translation&&(
                <div style={{background:C.greenBg,border:"1px solid #bbf7d0",borderRadius:10,padding:16}}>
                  <div style={{fontSize:11,color:C.green,fontWeight:800,marginBottom:10}}>✅ {lang.native} Translation</div>
                  <div style={{fontSize:14,color:C.text,lineHeight:2.0,whiteSpace:"pre-wrap"}}>{translation}</div>
                </div>
              )}
              {lang.code==="en"&&<div style={{background:"#f0f9ff",border:"1px solid #bae6fd",borderRadius:8,padding:"10px 14px",fontSize:13,color:"#0369a1"}}>ℹ️ English is the default. Select any language above for translation.</div>}
            </SCard>
          )}
        </div>

        {/* SIDEBAR */}
        <div>
          <div style={{background:C.card,border:`2px solid ${C.gold}`,borderRadius:12,padding:14,marginBottom:14}}>
            <div style={{fontSize:13,fontWeight:900,color:C.navy,marginBottom:11}}>🎯 Am I Eligible?</div>
            {[["YOUR AGE",<input key="age" value={age} onChange={e=>setAge(e.target.value)} placeholder="e.g. 26" type="number" style={{width:"100%",padding:"7px 10px",border:`1px solid ${C.border}`,borderRadius:6,fontSize:12,outline:"none"}}/>],["QUALIFICATION",<select key="qual" value={qual} onChange={e=>setQual(e.target.value)} style={{width:"100%",padding:"7px 10px",border:`1px solid ${C.border}`,borderRadius:6,fontSize:12,outline:"none"}}><option value="">Select degree</option>{["B.A.","B.Com","B.Sc","B.Tech","BCA","Any Degree","12th Pass","10th Pass"].map(o=><option key={o}>{o}</option>)}</select>],["CATEGORY",<select key="cat" value={cat} onChange={e=>setCat(e.target.value)} style={{width:"100%",padding:"7px 10px",border:`1px solid ${C.border}`,borderRadius:6,fontSize:12,outline:"none"}}><option value="">Select</option>{[["oc","OC/General"],["ews","EWS"],["bc","BC"],["sc","SC"],["st","ST"],["ph","PH/Disabled"]].map(([v,l])=><option key={v} value={v}>{l}</option>)}</select>]].map(([l,inp])=>(
              <div key={l} style={{marginBottom:8}}>
                <label style={{fontSize:10,color:C.muted,fontWeight:700,display:"block",marginBottom:3}}>{l}</label>
                {inp}
              </div>
            ))}
            <button onClick={()=>{const a=parseInt(age);const mx=cat==="sc"||cat==="st"?49:cat==="bc"?49:44;setElig({ok:!isNaN(a)&&a>=18&&a<=mx&&qual!=="",ageOk:!isNaN(a)&&a>=18&&a<=mx,qualOk:qual!==""});}} style={{width:"100%",background:C.navyMid,color:"#fff",border:"none",borderRadius:7,padding:"9px",fontSize:12,fontWeight:800,cursor:"pointer"}}>Check My Eligibility →</button>
            {elig&&(
              <div style={{marginTop:9,padding:"9px 11px",borderRadius:7,background:elig.ok?C.greenBg:C.redBg,border:`1px solid ${elig.ok?"#bbf7d0":"#fecaca"}`}}>
                <div style={{fontSize:13,fontWeight:800,color:elig.ok?C.green:C.red,marginBottom:3}}>{elig.ok?"✅ You ARE Eligible!":"❌ Not Eligible"}</div>
                <div style={{fontSize:11,color:C.text,lineHeight:1.6}}>
                  {!elig.ageOk&&"• Age outside allowed range.\n"}
                  {!elig.qualOk&&"• Select your qualification.\n"}
                  {elig.ok&&`Apply before ${job.lastDate}!`}
                </div>
              </div>
            )}
          </div>

          <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:12,padding:14,marginBottom:14}}>
            <div style={{fontSize:12,fontWeight:900,color:C.navy,marginBottom:11}}>📊 Difficulty Meter</div>
            <div style={{textAlign:"center",marginBottom:9}}>
              <div style={{fontSize:38,fontWeight:900,color:diffColor(job.diff)}}>{job.diff}</div>
              <div style={{fontSize:12,fontWeight:700,color:diffColor(job.diff)}}>{diffLabel(job.diff)}</div>
            </div>
            <div style={{height:9,background:"#f1f5f9",borderRadius:5,overflow:"hidden",marginBottom:9}}>
              <div style={{height:"100%",width:`${job.diff}%`,background:`linear-gradient(90deg,#22c55e 0%,#f59e0b 60%,#dc2626 100%)`,borderRadius:5}}/>
            </div>
            {[["Competition","12.4 lakh for 783 seats"],["Selection","1 in 1,583 applicants"]].map(([l,v])=>(
              <div key={l} style={{display:"flex",justifyContent:"space-between",padding:"4px 0",fontSize:11,borderBottom:`1px solid ${C.border}`}}>
                <span style={{color:C.muted}}>{l}</span><span style={{fontWeight:700}}>{v}</span>
              </div>
            ))}
          </div>

          <div style={{background:C.navyMid,borderRadius:12,padding:14,marginBottom:14}}>
            <div style={{fontSize:12,fontWeight:900,color:"#fff",marginBottom:10}}>📅 Important Dates</div>
            {[["Notification","10 Jan 2025","#22c55e"],["App. Opens","20 Jan 2025","#22c55e"],["Last Date","15 Feb 2025","#f97316"],["Admit Card","May 2025","#60a5fa"],["Exam","June 2025","#a78bfa"],["Result","Dec 2025","#fbbf24"]].map(([l,d,col])=>(
              <div key={l} style={{display:"flex",justifyContent:"space-between",padding:"5px 0",borderBottom:"1px solid rgba(255,255,255,0.08)"}}>
                <span style={{fontSize:11,color:"#94a3b8"}}>{l}</span>
                <span style={{fontSize:11,fontWeight:800,color:col}}>{d}</span>
              </div>
            ))}
          </div>

          <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:12,padding:14}}>
            <div style={{fontSize:12,fontWeight:900,color:C.navy,marginBottom:9}}>Quick Actions</div>
            {[["✅ Apply Now →",C.gold,"#fff","https://tspsc.gov.in/apply"],["📄 Official Notification","#dbeafe",C.blue,"https://tspsc.gov.in"],["📤 WhatsApp Share","#dcfce7",C.green,null],["🌐 Translate to My Language",C.goldLight,"#92400e",null]].map(([l,bg,col,href])=>(
              href?<a key={l} href={href} target="_blank" rel="noreferrer" style={{display:"block",background:bg,color:col,borderRadius:7,padding:"8px 12px",fontSize:12,fontWeight:700,marginBottom:6,textDecoration:"none",textAlign:"center"}}>{l}</a>
              :<button key={l} onClick={l.includes("WhatsApp")?()=>window.open(`https://wa.me/?text=${encodeURIComponent(`JobGuruWorld: ${job.title} — ${job.salary} — Last Date: ${job.lastDate}\njobguruworld.com`)}`):()=>setTab("language")} style={{display:"block",width:"100%",background:bg,color:col,border:"none",borderRadius:7,padding:"8px 12px",fontSize:12,fontWeight:700,marginBottom:6,cursor:"pointer",textAlign:"left"}}>{l}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   PAGES
═══════════════════════════════════════════════════════ */
function HomePage({setPage,setSelectedJob}){
  const [search,setSearch]=useState("");
  const [filter,setFilter]=useState("All");
  const [eduFilter,setEduFilter]=useState("All");
  const filtered=JOBS.filter(j=>{
    const q=search.toLowerCase();
    const matchQ=!q||j.title.toLowerCase().includes(q)||j.org.toLowerCase().includes(q);
    const matchF=filter==="All"||j.cat===filter||j.type===filter;
    const matchE=eduFilter==="All"||j.edu?.toLowerCase().includes(eduFilter.toLowerCase());
    return matchQ&&matchF&&matchE;
  });

  return(
    <div>
      {/* HERO */}
      <div style={{background:`linear-gradient(160deg,${C.navy} 0%,#0d2040 55%,${C.navyMid} 100%)`,padding:"40px 20px 48px",textAlign:"center"}}>
        <div style={{display:"inline-block",background:"rgba(245,158,11,0.15)",border:"1px solid rgba(245,158,11,0.3)",borderRadius:20,padding:"4px 16px",fontSize:11,fontWeight:800,color:C.gold,letterSpacing:"0.14em",marginBottom:14}}>
          🇮🇳 ALL INDIA · 500+ SOURCES · 26 FEATURES · UPDATED DAILY 7 AM
        </div>
        <h1 style={{color:"#fff",fontSize:36,margin:"0 0 5px",fontWeight:900,letterSpacing:"-0.03em",lineHeight:1.15}}>Job<span style={{color:C.gold}}>Guru</span>World.com</h1>
        <p style={{color:"#93c5fd",fontSize:16,margin:"0 0 4px",fontWeight:700}}>Your Personal Job Mentor — మీ స్వంత జాబ్ గురువు</p>
        <p style={{color:"#64748b",fontSize:13,margin:"0 0 24px",maxWidth:600,marginLeft:"auto",marginRight:"auto"}}>India's most complete job & education platform · Jobs · Admit Cards · Results · Current Affairs · English Practice · AI Mentor · 22 Languages</p>

        <div style={{maxWidth:620,margin:"0 auto 14px",display:"flex",gap:8}}>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍  Search job, exam, organisation... e.g. TSPSC, Railway, Bank, TCS" style={{flex:1,padding:"13px 16px",borderRadius:10,border:"2px solid rgba(255,255,255,0.12)",background:"rgba(255,255,255,0.07)",color:"#f1f5f9",fontSize:14,outline:"none"}}/>
          <button style={{background:C.gold,color:"#fff",border:"none",borderRadius:10,padding:"13px 20px",fontSize:14,fontWeight:900,whiteSpace:"nowrap"}}>Search</button>
        </div>

        <div style={{display:"flex",gap:7,flexWrap:"wrap",justifyContent:"center",maxWidth:720,margin:"0 auto 12px"}}>
          {["All","Central Govt","State PSC","Banking","Railway","Teaching","IT/Software","Defence","Police"].map(f=>(
            <button key={f} onClick={()=>setFilter(f)} style={{background:filter===f?C.gold:"rgba(255,255,255,0.08)",color:filter===f?"#fff":"#93c5fd",border:filter===f?"none":"1px solid rgba(255,255,255,0.15)",borderRadius:20,padding:"5px 12px",fontSize:11,fontWeight:700,cursor:"pointer"}}>{f}</button>
          ))}
        </div>

        <div style={{display:"flex",gap:7,flexWrap:"wrap",justifyContent:"center",maxWidth:620,margin:"0 auto 18px"}}>
          <span style={{color:"#64748b",fontSize:11,alignSelf:"center"}}>Filter by Education:</span>
          {["All","10th Pass","12th Pass","Diploma","Any Degree","B.Tech","B.Ed"].map(e=>(
            <button key={e} onClick={()=>setEduFilter(e)} style={{background:eduFilter===e?"#7c3aed":"rgba(255,255,255,0.06)",color:eduFilter===e?"#fff":"#93c5fd",border:eduFilter===e?"none":"1px solid rgba(255,255,255,0.1)",borderRadius:20,padding:"4px 10px",fontSize:11,fontWeight:700,cursor:"pointer"}}>{e}</button>
          ))}
        </div>

        <div style={{display:"flex",gap:10,flexWrap:"wrap",justifyContent:"center"}}>
          {[["🔴","8","Urgent <7 days","#fef2f2","#991b1b"],["🟡","14","Closing Soon","#fef3c7","#92400e"],["🟢","47","New Today","#dcfce7","#166534"],["📋","283","Total Active","#dbeafe","#1e40af"],["🌐","22","Languages","#f3e8ff","#6b21a8"],["🏛","28","States","#fff7ed","#c2410c"]].map(([ic,n,l,bg,col])=>(
            <div key={l} style={{background:bg,color:col,fontSize:12,fontWeight:700,padding:"5px 12px",borderRadius:20,display:"flex",alignItems:"center",gap:5}}>{ic} <strong>{n}</strong> {l}</div>
          ))}
        </div>
      </div>

      {/* GOLD TICKER */}
      <div style={{background:C.gold,padding:"8px 0",overflow:"hidden"}}>
        <div style={{display:"flex",animation:"ticker 22s linear infinite",whiteSpace:"nowrap"}}>
          {["🔔 TSPSC Group-II — 783 Posts — Last Date 15 Feb 2025","⚡ SSC CGL 2025 — 17,727 Posts — Apply Now","📢 RRB NTPC — 11,558 Posts — Only 5 Days Left!","🏦 IBPS PO — 4,455 Posts — 13 Days Left","🎓 Telangana DSC — 11,000 Teacher Posts","🎫 SSC CHSL Admit Card — Download Now","📊 TSPSC Group-IV Result — OUT NOW","🔔 TSPSC Group-II — 783 Posts — Last Date 15 Feb 2025","⚡ SSC CGL 2025 — 17,727 Posts"].map((t,i)=>(
            <span key={i} style={{fontSize:12,fontWeight:800,color:"#fff",paddingRight:60}}>{t}</span>
          ))}
        </div>
      </div>

      {/* QUICK ACCESS TILES */}
      <div style={{maxWidth:1000,margin:"0 auto",padding:"20px 16px 0"}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(140px,1fr))",gap:10,marginBottom:24}}>
          {[["📋","All Jobs","Browse all notifications",C.navyMid,"jobs"],["🎫","Admit Cards","Download hall tickets",C.blue,"admit"],["📊","Results","Check exam results",C.green,"results"],["🔑","Answer Keys","Official keys",C.orange,"answer-keys"],["📰","Current Affairs","Daily news",C.teal,"current-affairs"],["📖","The Hindu","Editorial analysis",C.purple,"editorial"],["📝","Mock Tests","Free practice tests","#0369a1","mock-tests"],["📅","Exam Calendar","All exam dates",C.navyMid,"exam-calendar"],["🗣️","English Practice","Beginner to fluent",C.teal,"english"],["🎓","Scholarships","BC/SC/ST/EBC",C.green,"scholarships"],["💼","Job Mela","Walk-in drives",C.orange,"job-mela"],["🤖","AI Guru","Ask anything 24/7",C.gold,"ai-chat"]].map(([ic,t,s,col,pid])=>(
            <div key={t} onClick={()=>setPage(pid)} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:10,padding:"14px 12px",cursor:"pointer",textAlign:"center",transition:"transform 0.1s,box-shadow 0.1s",borderTop:`3px solid ${col}`}}
              onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.boxShadow="0 6px 20px rgba(0,0,0,0.1)";}}
              onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow="";}}>
              <div style={{fontSize:28,marginBottom:6}}>{ic}</div>
              <div style={{fontSize:12,fontWeight:800,color:C.navy,marginBottom:2}}>{t}</div>
              <div style={{fontSize:10,color:C.subtle,lineHeight:1.4}}>{s}</div>
            </div>
          ))}
        </div>

        {/* JOBS GRID */}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
          <span style={{fontWeight:800,fontSize:16,color:C.navy}}>Latest Job Notifications — తాజా ఉద్యోగ నోటిఫికేషన్లు</span>
          <span style={{fontSize:11,color:C.green,fontWeight:700}}>✓ Updated today 7:04 AM by AI</span>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(440px,1fr))",gap:12,marginBottom:24}}>
          {filtered.map(job=><JobCard key={job.id} job={job} onClick={j=>{setSelectedJob(j);setPage("job-detail");}} compact={false}/>)}
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div style={{background:C.navy,padding:"36px 20px"}}>
        <div style={{maxWidth:900,margin:"0 auto",textAlign:"center"}}>
          <div style={{fontSize:11,color:C.gold,fontWeight:800,letterSpacing:"0.12em",marginBottom:8}}>WHY JOBGURUWORLD IS INDIA'S BEST</div>
          <h2 style={{color:"#fff",fontSize:22,fontWeight:900,margin:"0 0 24px"}}>26 Features. 22 Languages. One Website. All Free.</h2>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(170px,1fr))",gap:14}}>
            {[["🤖","AI Collects","500+ sources scanned daily at 5 AM"],["🌐","22 Languages","Telugu, Hindi, Tamil, Kannada + 18 more"],["📋","Complete Guide","Syllabus + roadmap + cut-offs + career path"],["🗣️","English Practice","Beginner to fluent — free AI coaching"],["🤖","AI Mentor","Ask anything in Telugu 24/7"],["📰","Editorial Analysis","The Hindu simplified in Telugu daily"]].map(([ic,t,s])=>(
              <div key={t} style={{background:"rgba(255,255,255,0.06)",borderRadius:10,padding:16,border:"1px solid rgba(255,255,255,0.08)"}}>
                <div style={{fontSize:30,marginBottom:8}}>{ic}</div>
                <div style={{color:"#fff",fontWeight:800,fontSize:13,marginBottom:5}}>{t}</div>
                <div style={{color:"#64748b",fontSize:11,lineHeight:1.6}}>{s}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{background:`linear-gradient(135deg,${C.navy},#0d2040)`,padding:"28px 20px",textAlign:"center",borderTop:`3px solid ${C.gold}`}}>
        <h2 style={{color:"#fff",fontSize:18,fontWeight:900,margin:"0 0 4px"}}>Never miss a government job again</h2>
        <p style={{color:"#64748b",fontSize:13,margin:"0 0 16px"}}>Join 50,000+ students getting free daily alerts</p>
        <div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap"}}>
          <button style={{background:"#25D366",color:"#fff",border:"none",borderRadius:8,padding:"9px 18px",fontSize:13,fontWeight:800,cursor:"pointer"}}>📱 Join WhatsApp</button>
          <button style={{background:"#2CA5E0",color:"#fff",border:"none",borderRadius:8,padding:"9px 18px",fontSize:13,fontWeight:800,cursor:"pointer"}}>✈️ Join Telegram</button>
          <button onClick={()=>setPage("premium")} style={{background:C.gold,color:"#fff",border:"none",borderRadius:8,padding:"9px 18px",fontSize:13,fontWeight:800,cursor:"pointer"}}>⭐ Get Premium ₹149/mo</button>
        </div>
      </div>
    </div>
  );
}

function AllJobsPage({setPage,setSelectedJob}){
  const [search,setSearch]=useState("");
  const [cat,setCat]=useState("All");
  const [type,setType]=useState("All");
  const [edu,setEdu]=useState("All");
  const filtered=JOBS.filter(j=>{
    const q=search.toLowerCase();
    return(!q||j.title.toLowerCase().includes(q)||j.org.toLowerCase().includes(q))&&(cat==="All"||j.cat===cat)&&(type==="All"||j.type===type)&&(edu==="All"||j.edu?.toLowerCase().includes(edu.toLowerCase()));
  });
  return(
    <div style={{maxWidth:1000,margin:"0 auto",padding:"24px 16px"}}>
      <h1 style={{fontSize:22,fontWeight:900,color:C.navy,marginBottom:16}}>📋 All Job Notifications — అన్ని ఉద్యోగ నోటిఫికేషన్లు</h1>
      <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:16}}>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search jobs..." style={{flex:1,minWidth:200,padding:"9px 13px",border:`1px solid ${C.border}`,borderRadius:8,fontSize:13,outline:"none"}}/>
        {[["Category",["All","Central Govt","State PSC","Banking","Railway","Teaching","IT/Software","Defence","Police"],cat,setCat],["Type",["All","Govt","Private"],type,setType],["Education",["All","10th Pass","12th Pass","Diploma","Any Degree","B.Tech","B.Ed"],edu,setEdu]].map(([l,opts,val,setter])=>(
          <select key={l} value={val} onChange={e=>setter(e.target.value)} style={{padding:"9px 12px",border:`1px solid ${C.border}`,borderRadius:8,fontSize:13,background:C.card,cursor:"pointer",outline:"none"}}>
            {opts.map(o=><option key={o}>{o}</option>)}
          </select>
        ))}
      </div>
      <div style={{fontSize:12,color:C.muted,marginBottom:14}}>Showing <strong>{filtered.length}</strong> notifications · Updated today</div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(420px,1fr))",gap:12}}>
        {filtered.map(job=><JobCard key={job.id} job={job} onClick={j=>{setSelectedJob(j);setPage("job-detail");}} compact={false}/>)}
      </div>
    </div>
  );
}

function AdmitCardsPage(){
  return(
    <div style={{maxWidth:960,margin:"0 auto",padding:"24px 16px"}}>
      <h1 style={{fontSize:22,fontWeight:900,color:C.navy,marginBottom:6}}>🎫 Admit Cards — హాల్ టికెట్లు</h1>
      <p style={{fontSize:13,color:C.muted,marginBottom:20}}>Download admit cards for all upcoming government exams. New admit cards added daily!</p>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:12}}>
        {ADMIT_CARDS.map((a,i)=>(
          <div key={i} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:10,padding:16,borderLeft:`4px solid ${a.color}`}}>
            <div style={{fontSize:14,fontWeight:800,color:C.navy,marginBottom:5}}>{a.exam}</div>
            <div style={{fontSize:12,color:C.muted,marginBottom:10}}>📅 Exam Date: {a.date}</div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <span style={{fontSize:11,fontWeight:700,padding:"3px 9px",borderRadius:5,background:a.status==="Download Now"?C.greenBg:C.goldLight,color:a.status==="Download Now"?C.green:"#92400e"}}>{a.status}</span>
              <button style={{background:a.status==="Download Now"?a.color:"#94a3b8",color:"#fff",border:"none",borderRadius:6,padding:"5px 12px",fontSize:11,fontWeight:700,cursor:a.status==="Download Now"?"pointer":"not-allowed"}}>
                {a.status==="Download Now"?"⬇ Download":"🔔 Alert Me"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ResultsPage(){
  return(
    <div style={{maxWidth:960,margin:"0 auto",padding:"24px 16px"}}>
      <h1 style={{fontSize:22,fontWeight:900,color:C.navy,marginBottom:6}}>📊 Results — ఫలితాలు</h1>
      <p style={{fontSize:13,color:C.muted,marginBottom:20}}>Latest exam results for government jobs and board exams. Refreshed daily!</p>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:12}}>
        {RESULTS.map((r,i)=>(
          <div key={i} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:10,padding:16,borderLeft:`4px solid ${r.color}`}}>
            <div style={{fontSize:14,fontWeight:800,color:C.navy,marginBottom:5}}>{r.exam}</div>
            <div style={{fontSize:12,color:C.muted,marginBottom:10}}>📅 Date: {r.date}</div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <span style={{fontSize:11,fontWeight:700,padding:"3px 9px",borderRadius:5,background:r.status==="OUT NOW"?C.greenBg:C.goldLight,color:r.status==="OUT NOW"?C.green:"#92400e"}}>{r.status}</span>
              <button style={{background:r.status==="OUT NOW"?r.color:"#94a3b8",color:"#fff",border:"none",borderRadius:6,padding:"5px 12px",fontSize:11,fontWeight:700,cursor:r.status==="OUT NOW"?"pointer":"not-allowed"}}>
                {r.status==="OUT NOW"?"View Result":"Expected"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AnswerKeysPage(){
  return(
    <div style={{maxWidth:960,margin:"0 auto",padding:"24px 16px"}}>
      <h1 style={{fontSize:22,fontWeight:900,color:C.navy,marginBottom:6}}>🔑 Answer Keys — సమాధాన తాళాలు</h1>
      <p style={{fontSize:13,color:C.muted,marginBottom:20}}>Official and unofficial answer keys with AI-powered score estimation!</p>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:12,marginBottom:20}}>
        {ANSWER_KEYS.map((a,i)=>(
          <div key={i} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:10,padding:16,borderLeft:`4px solid ${a.color}`}}>
            <div style={{fontSize:14,fontWeight:800,color:C.navy,marginBottom:5}}>{a.exam}</div>
            <div style={{fontSize:12,color:C.muted,marginBottom:10}}>📅 {a.date}</div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <span style={{fontSize:11,fontWeight:700,padding:"3px 9px",borderRadius:5,background:a.status==="Official Released"?C.greenBg:C.goldLight,color:a.status==="Official Released"?C.green:"#92400e"}}>{a.status}</span>
              <button style={{background:a.status==="Official Released"?a.color:"#94a3b8",color:"#fff",border:"none",borderRadius:6,padding:"5px 12px",fontSize:11,fontWeight:700,cursor:"pointer"}}>
                {a.status==="Official Released"?"⬇ Download":"Awaiting"}
              </button>
            </div>
          </div>
        ))}
      </div>
      <div style={{background:C.blueBg,borderRadius:10,padding:16,border:`1px solid ${C.navyLight}30`}}>
        <div style={{fontSize:14,fontWeight:800,color:C.blue,marginBottom:8}}>🤖 AI Score Estimator</div>
        <div style={{fontSize:13,color:C.text,marginBottom:12}}>After downloading the answer key, use our AI tool to estimate your score and predict your chances of selection based on last year's cut-offs.</div>
        <button style={{background:C.blue,color:"#fff",border:"none",borderRadius:8,padding:"9px 18px",fontSize:13,fontWeight:700,cursor:"pointer"}}>Calculate My Score → (Premium)</button>
      </div>
    </div>
  );
}

function CurrentAffairsPage(){
  return(
    <div style={{maxWidth:860,margin:"0 auto",padding:"24px 16px"}}>
      <h1 style={{fontSize:22,fontWeight:900,color:C.navy,marginBottom:6}}>📰 Daily Current Affairs</h1>
      <p style={{fontSize:13,color:C.muted,marginBottom:20}}>AI-curated current affairs in Telugu & English — every morning by 8 AM · Tagged to relevant exams!</p>
      {["Today","Yesterday","2 days ago"].map(dateGroup=>{
        const items=CURRENT_AFFAIRS.filter(c=>c.date===dateGroup);
        if(!items.length)return null;
        return(
          <div key={dateGroup} style={{marginBottom:20}}>
            <div style={{fontSize:11,fontWeight:800,color:C.muted,letterSpacing:"0.08em",marginBottom:10,textTransform:"uppercase",paddingLeft:4,borderLeft:`3px solid ${C.gold}`}}>&nbsp;{dateGroup.toUpperCase()}</div>
            {items.map((c,i)=>(
              <div key={i} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:10,padding:"13px 16px",marginBottom:9}}>
                <div style={{display:"flex",gap:8,marginBottom:7,flexWrap:"wrap"}}>
                  <Tag bg={C.blueBg} color={C.blue}>{c.cat}</Tag>
                  <Tag bg={c.importance==="High"?C.redBg:C.goldLight} color={c.importance==="High"?C.red:"#92400e"}>{"★".repeat(c.importance==="High"?3:2)} {c.importance}</Tag>
                  <Tag bg={C.greenBg} color={C.green}>{c.exam}</Tag>
                </div>
                <div style={{fontSize:14,fontWeight:700,color:C.navy,marginBottom:5}}>{c.title}</div>
                <div style={{fontSize:12,color:C.teal,fontStyle:"italic"}}>{c.telugu}</div>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}

function EditorialPage(){
  const [selected,setSelected]=useState(0);
  const ed=HINDU_EDITORIALS[selected];
  return(
    <div style={{maxWidth:860,margin:"0 auto",padding:"24px 16px"}}>
      <div style={{background:`linear-gradient(135deg,${C.navy},#7c1d1d)`,padding:"20px 20px",borderRadius:12,marginBottom:20,textAlign:"center"}}>
        <div style={{fontSize:13,color:"#fca5a5",fontWeight:700,marginBottom:6}}>THE HINDU — UPSC Editorial Analysis</div>
        <h2 style={{color:"#fff",fontSize:20,fontWeight:900,margin:"0 0 4px"}}>Daily Editorial Simplified</h2>
        <p style={{color:"#fecaca",fontSize:12,margin:0}}>AI simplifies The Hindu editorial for UPSC preparation — in Telugu + English</p>
      </div>
      <div style={{display:"flex",gap:8,marginBottom:16}}>
        {HINDU_EDITORIALS.map((e,i)=>(
          <button key={i} onClick={()=>setSelected(i)} style={{flex:1,background:selected===i?C.red:"#f8f5f0",color:selected===i?"#fff":C.text,border:`1px solid ${selected===i?C.red:C.border}`,borderRadius:8,padding:"8px 12px",cursor:"pointer",fontSize:12,fontWeight:700}}>{e.date} — {e.title.slice(0,30)}…</button>
        ))}
      </div>
      <SCard title={ed.title} icon="📖" accent={C.red}>
        <div style={{background:C.redBg,borderRadius:7,padding:"8px 12px",marginBottom:14,fontSize:12,color:C.red,fontWeight:700}}>📚 UPSC Relevance: {ed.upscPaper}</div>
        <p style={{fontSize:13,color:C.text,lineHeight:1.8,marginBottom:14}}>{ed.summary}</p>
        <div style={{marginBottom:14}}>
          <div style={{fontSize:12,fontWeight:800,color:C.navy,marginBottom:8}}>📌 Key Points for UPSC Notes:</div>
          {ed.keyPoints.map((p,i)=>(
            <div key={i} style={{display:"flex",gap:8,padding:"5px 0",fontSize:13,borderBottom:`1px solid ${C.border}`}}>
              <span style={{color:C.red,fontWeight:900}}>→</span>{p}
            </div>
          ))}
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
          <div style={{background:C.blueBg,borderRadius:8,padding:12}}>
            <div style={{fontSize:12,fontWeight:800,color:C.blue,marginBottom:6}}>📚 Vocabulary</div>
            {ed.vocab.map((v,i)=><div key={i} style={{fontSize:12,color:C.text,padding:"3px 0"}}>{i+1}. {v}</div>)}
          </div>
          <div style={{background:C.goldLight,borderRadius:8,padding:12}}>
            <div style={{fontSize:12,fontWeight:800,color:"#92400e",marginBottom:6}}>❓ Possible UPSC Questions</div>
            {ed.questions.map((q,i)=><div key={i} style={{fontSize:11,color:C.text,padding:"3px 0",lineHeight:1.5}}>{i+1}. {q}</div>)}
          </div>
        </div>
      </SCard>
    </div>
  );
}

function MockTestsPage(){
  const [active,setActive]=useState(null);
  const [answers,setAnswers]=useState({});
  const [submitted,setSubmitted]=useState(false);
  const mockTests=[
    {id:1,name:"TSPSC Group-II Full Mock",questions:5,marks:150,time:"2.5 hrs",diff:"Hard",free:true,color:C.navyMid,
    qs:[{q:"Who was the first Chief Minister of Telangana?",opts:["K. Chandrashekar Rao","N. Chandrababu Naidu","K. Rosaiah","T. Anjaiah"],ans:0},{q:"Telangana state was formed on which date?",opts:["2 June 2014","26 January 2014","15 August 2014","2 June 2013"],ans:0},{q:"Which river is known as the 'Ganges of Telangana'?",opts:["Krishna","Godavari","Manjira","Musi"],ans:1},{q:"TSPSC stands for?",opts:["Telangana State Public Service Commission","Telangana State Police Service Commission","Telangana Service Public Commission","None of these"],ans:0},{q:"Rythu Bandhu scheme provides financial support to?",opts:["Farmers","Students","Women","Unemployed youth"],ans:0}]},
    {id:2,name:"SSC CGL Tier-I Mock",questions:5,marks:200,time:"60 mins",diff:"Hard",free:true,color:C.blue,
    qs:[{q:"The headquarters of ISRO is located in?",opts:["Mumbai","Bengaluru","Hyderabad","Chennai"],ans:1},{q:"Who is known as the 'Father of the Indian Constitution'?",opts:["Jawaharlal Nehru","Mahatma Gandhi","B.R. Ambedkar","Vallabhbhai Patel"],ans:2},{q:"How many fundamental rights are there in the Indian Constitution?",opts:["6","7","8","9"],ans:0},{q:"The chemical formula of water is?",opts:["H2O2","H2O","HO","H3O"],ans:1},{q:"Which planet is known as the Red Planet?",opts:["Venus","Jupiter","Mars","Saturn"],ans:2}]},
  ];

  const currentTest=active!==null?mockTests.find(t=>t.id===active):null;

  if(currentTest&&!submitted){
    return(
      <div style={{maxWidth:760,margin:"0 auto",padding:"24px 16px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
          <h2 style={{fontSize:18,fontWeight:900,color:C.navy,margin:0}}>{currentTest.name}</h2>
          <button onClick={()=>{setActive(null);setAnswers({});setSubmitted(false);}} style={{background:"#f1f5f9",border:"none",borderRadius:6,padding:"6px 12px",fontSize:12,cursor:"pointer"}}>✕ Exit</button>
        </div>
        {currentTest.qs.map((q,i)=>(
          <div key={i} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:10,padding:16,marginBottom:12}}>
            <div style={{fontSize:13,fontWeight:700,color:C.navy,marginBottom:10}}>Q{i+1}. {q.q}</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:7}}>
              {q.opts.map((o,j)=>(
                <button key={j} onClick={()=>setAnswers(a=>({...a,[i]:j}))} style={{background:answers[i]===j?C.navyMid:"#f8f5f0",color:answers[i]===j?"#fff":C.text,border:`1px solid ${answers[i]===j?C.navyMid:C.border}`,borderRadius:7,padding:"8px 10px",fontSize:12,cursor:"pointer",textAlign:"left"}}>{String.fromCharCode(65+j)}. {o}</button>
              ))}
            </div>
          </div>
        ))}
        <button onClick={()=>setSubmitted(true)} style={{width:"100%",background:C.gold,color:"#fff",border:"none",borderRadius:8,padding:"12px",fontSize:14,fontWeight:800,cursor:"pointer"}}>Submit Test →</button>
      </div>
    );
  }

  if(currentTest&&submitted){
    const score=currentTest.qs.filter((q,i)=>answers[i]===q.ans).length;
    return(
      <div style={{maxWidth:760,margin:"0 auto",padding:"24px 16px",textAlign:"center"}}>
        <div style={{fontSize:48,marginBottom:12}}>{score>=4?"🏆":score>=2?"👍":"📚"}</div>
        <div style={{fontSize:32,fontWeight:900,color:C.navyMid,marginBottom:4}}>{score}/{currentTest.qs.length}</div>
        <div style={{fontSize:18,fontWeight:700,color:C.navy,marginBottom:8}}>{score>=4?"Excellent!":score>=2?"Good Attempt!":"Keep Practicing!"}</div>
        <div style={{fontSize:13,color:C.muted,marginBottom:20}}>Correct: {score} · Wrong: {currentTest.qs.length-score} · Score: {Math.round((score/currentTest.qs.length)*100)}%</div>
        <div style={{display:"flex",gap:10,justifyContent:"center"}}>
          <button onClick={()=>{setSubmitted(false);setAnswers({});}} style={{background:"#f1f5f9",color:C.text,border:"none",borderRadius:7,padding:"9px 18px",fontSize:13,fontWeight:700,cursor:"pointer"}}>Retry Test</button>
          <button onClick={()=>{setActive(null);setAnswers({});setSubmitted(false);}} style={{background:C.navyMid,color:"#fff",border:"none",borderRadius:7,padding:"9px 18px",fontSize:13,fontWeight:700,cursor:"pointer"}}>All Tests</button>
        </div>
      </div>
    );
  }

  return(
    <div style={{maxWidth:900,margin:"0 auto",padding:"24px 16px"}}>
      <h1 style={{fontSize:22,fontWeight:900,color:C.navy,marginBottom:6}}>📝 Free Mock Tests — మోడల్ పేపర్లు</h1>
      <p style={{fontSize:13,color:C.muted,marginBottom:20}}>AI-generated tests based on latest syllabus and exam patterns. Free tests every month!</p>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:12}}>
        {mockTests.map(t=>(
          <div key={t.id} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:10,padding:16,borderTop:`4px solid ${t.color}`}}>
            <div style={{display:"flex",gap:6,marginBottom:8}}>
              <Tag bg={t.free?"#dcfce7":C.goldLight} color={t.free?C.green:"#92400e"}>{t.free?"Free":"Premium"}</Tag>
              <Tag bg={t.diff==="Hard"?C.redBg:C.goldLight} color={t.diff==="Hard"?C.red:"#92400e"}>{t.diff}</Tag>
            </div>
            <div style={{fontSize:14,fontWeight:800,color:C.navy,marginBottom:5}}>{t.name}</div>
            <div style={{fontSize:12,color:C.muted,marginBottom:12}}>{t.questions} Questions · {t.marks} Marks · {t.time}</div>
            <button onClick={()=>setActive(t.id)} style={{width:"100%",background:t.color,color:"#fff",border:"none",borderRadius:7,padding:"8px",fontSize:13,fontWeight:700,cursor:"pointer"}}>Start Test →</button>
          </div>
        ))}
        {[["IBPS PO Prelims Mock","100 Qs · 100 Marks · 60 mins","Hard",C.purple,false],["RRB NTPC Mock","100 Qs · 100 Marks · 90 mins","Medium",C.orange,false],["UPSC Prelims GS-I","100 Qs · 200 Marks · 2 hrs","Very Hard",C.red,false],["Current Affairs Quiz","40 Qs · Latest events · 30 mins","Easy",C.teal,true]].map(([name,desc,diff,col,free])=>(
          <div key={name} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:10,padding:16,borderTop:`4px solid ${col}`}}>
            <div style={{display:"flex",gap:6,marginBottom:8}}>
              <Tag bg={free?"#dcfce7":C.goldLight} color={free?C.green:"#92400e"}>{free?"Free":"Premium"}</Tag>
              <Tag bg={diff==="Very Hard"?C.redBg:diff==="Hard"?C.redBg:diff==="Medium"?C.goldLight:C.greenBg} color={diff==="Easy"?C.green:diff==="Medium"?"#92400e":C.red}>{diff}</Tag>
            </div>
            <div style={{fontSize:14,fontWeight:800,color:C.navy,marginBottom:5}}>{name}</div>
            <div style={{fontSize:12,color:C.muted,marginBottom:12}}>{desc}</div>
            <button style={{width:"100%",background:free?col:"#94a3b8",color:"#fff",border:"none",borderRadius:7,padding:"8px",fontSize:13,fontWeight:700,cursor:"pointer"}}>{free?"Start Free →":"Unlock Premium"}</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function ExamCalendarPage(){
  return(
    <div style={{maxWidth:900,margin:"0 auto",padding:"24px 16px"}}>
      <h1 style={{fontSize:22,fontWeight:900,color:C.navy,marginBottom:6}}>📅 Exam Calendar 2025-26</h1>
      <p style={{fontSize:13,color:C.muted,marginBottom:20}}>All important exam dates in one place. Bookmark this page! Updated regularly.</p>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:14}}>
        {EXAM_CALENDAR.map((m,i)=>(
          <div key={i} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:10,overflow:"hidden"}}>
            <div style={{background:C.navyMid,padding:"9px 14px",fontSize:13,fontWeight:800,color:"#fff"}}>{m.month}</div>
            <div style={{padding:"10px 14px"}}>
              {m.exams.map((e,j)=>(
                <div key={j} style={{display:"flex",gap:10,padding:"6px 0",borderBottom:j<m.exams.length-1?`1px solid ${C.border}`:"none",alignItems:"center"}}>
                  <div style={{fontSize:11,fontWeight:700,padding:"2px 7px",borderRadius:4,background:e.type==="Exam"?C.redBg:e.type==="Notification"?C.blueBg:e.type==="Last Date"?C.goldLight:e.type==="Admit Card"?C.purpleBg:C.greenBg,color:e.type==="Exam"?C.red:e.type==="Notification"?C.blue:e.type==="Last Date"?"#92400e":e.type==="Admit Card"?C.purple:C.green,whiteSpace:"nowrap",flexShrink:0}}>{e.type}</div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:12,fontWeight:700,color:C.navy}}>{e.name}</div>
                    <div style={{fontSize:10,color:C.subtle}}>{e.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div style={{marginTop:16,background:C.blueBg,borderRadius:10,padding:"12px 16px",fontSize:13,color:C.blue}}>
        📥 <strong>Download Calendar PDF</strong> — Save on your phone and never miss any exam deadline! <button style={{background:C.blue,color:"#fff",border:"none",borderRadius:6,padding:"4px 12px",fontSize:12,fontWeight:700,cursor:"pointer",marginLeft:10}}>Download Free →</button>
      </div>
    </div>
  );
}

function ScholarshipsPage(){
  return(
    <div style={{maxWidth:900,margin:"0 auto",padding:"24px 16px"}}>
      <h1 style={{fontSize:22,fontWeight:900,color:C.navy,marginBottom:6}}>🎓 Scholarship Alerts — స్కాలర్‌షిప్ అలర్ట్లు</h1>
      <p style={{fontSize:13,color:C.muted,marginBottom:20}}>All BC/SC/ST/EBC/National scholarships — application dates, amounts, how to apply</p>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:12}}>
        {SCHOLARSHIPS.map((s,i)=>(
          <div key={i} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:10,padding:16}}>
            <div style={{display:"flex",gap:6,marginBottom:8}}>
              <Tag bg={C.greenBg} color={C.green}>{s.state}</Tag>
            </div>
            <div style={{fontSize:14,fontWeight:800,color:C.navy,marginBottom:5}}>{s.name}</div>
            <div style={{fontSize:13,color:C.green,fontWeight:700,marginBottom:4}}>{s.amount}</div>
            <div style={{fontSize:12,color:C.muted,marginBottom:4}}>👤 {s.who}</div>
            <div style={{fontSize:12,color:C.red,fontWeight:600,marginBottom:12}}>📅 Deadline: {s.deadline}</div>
            <button style={{width:"100%",background:C.green,color:"#fff",border:"none",borderRadius:7,padding:"8px",fontSize:12,fontWeight:700,cursor:"pointer"}}>How to Apply →</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function JobMelaPage(){
  return(
    <div style={{maxWidth:900,margin:"0 auto",padding:"24px 16px"}}>
      <h1 style={{fontSize:22,fontWeight:900,color:C.navy,marginBottom:6}}>💼 Job Mela & Walk-in Drives</h1>
      <p style={{fontSize:13,color:C.muted,marginBottom:20}}>Telangana & AP job fairs, campus drives and walk-in interviews — attend and get placed!</p>
      <div style={{display:"flex",flexDirection:"column",gap:12}}>
        {JOB_MELAS.map((j,i)=>(
          <div key={i} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:12,padding:18}}>
            <div style={{display:"flex",gap:10,alignItems:"flex-start"}}>
              <div style={{width:50,height:50,background:C.goldLight,borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,flexShrink:0}}>💼</div>
              <div style={{flex:1}}>
                <div style={{fontSize:16,fontWeight:800,color:C.navy,marginBottom:4}}>{j.name}</div>
                <div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:8}}>
                  <span style={{fontSize:12,color:C.muted}}>📅 {j.date}</span>
                  <span style={{fontSize:12,color:C.muted}}>📍 {j.venue}</span>
                  <span style={{fontSize:12,color:C.green,fontWeight:700}}>📌 {j.jobs}</span>
                </div>
                <div style={{fontSize:12,color:C.text,marginBottom:8}}>🏢 <strong>Companies:</strong> {j.companies}</div>
                <div style={{fontSize:12,color:C.muted}}>🎓 <strong>Who can attend:</strong> {j.who}</div>
              </div>
              <button style={{background:C.gold,color:"#fff",border:"none",borderRadius:8,padding:"8px 16px",fontSize:12,fontWeight:700,cursor:"pointer",flexShrink:0}}>Register →</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PremiumPage(){
  return(
    <div style={{maxWidth:900,margin:"0 auto",padding:"28px 16px"}}>
      <div style={{textAlign:"center",marginBottom:28}}>
        <div style={{fontSize:40,marginBottom:10}}>⭐</div>
        <div style={{fontSize:11,color:C.gold,fontWeight:800,letterSpacing:"0.12em",marginBottom:4}}>JOBGURU PREMIUM</div>
        <h1 style={{fontSize:26,fontWeight:900,color:C.navy,marginBottom:6}}>Unlock All 26 Features</h1>
        <div style={{fontSize:36,fontWeight:900,color:C.navy}}>₹149<span style={{fontSize:16,fontWeight:400,color:C.muted}}>/month</span></div>
        <div style={{fontSize:13,color:C.muted}}>= ₹5/day · Less than one chai ☕ · Cancel anytime</div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:12,marginBottom:24}}>
        {[["🔒","Unlimited Mock Tests","Full tests for every exam with detailed solutions and AI analysis"],["🌐","22 Language Everything","All sections in Telugu, Hindi, Tamil, Kannada and 18 more"],["🤖","AI Mentor Unlimited","Unlimited questions to AI Guru in Telugu 24/7"],["📥","PDF Downloads","Study plans, notes, question banks for offline studying"],["📰","The Hindu Full Analysis","Daily editorial with UPSC questions and vocabulary in Telugu"],["🗣️","English Practice Premium","All 3 levels + AI speaking coach + pronunciation feedback"],["📊","Score Predictor","AI predicts your selection chances based on your mock scores"],["🔔","Smart Personalized Alerts","Get jobs matching YOUR qualification, age, state preferences"]].map(([ic,t,d])=>(
          <div key={t} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:10,padding:16}}>
            <div style={{fontSize:26,marginBottom:8}}>{ic}</div>
            <div style={{fontSize:14,fontWeight:800,color:C.navy,marginBottom:5}}>{t}</div>
            <div style={{fontSize:12,color:C.muted,lineHeight:1.6}}>{d}</div>
          </div>
        ))}
      </div>
      <div style={{textAlign:"center"}}>
        <button style={{background:C.gold,color:"#fff",border:"none",borderRadius:10,padding:"14px 36px",fontSize:16,fontWeight:900,cursor:"pointer",display:"inline-block",marginBottom:8}}>Start Premium — ₹149/month →</button>
        <div style={{fontSize:12,color:C.muted}}>🔒 Secure payment via Razorpay · UPI / Card / NetBanking</div>
      </div>
    </div>
  );
}

function AboutPage(){
  return(
    <div style={{maxWidth:900,margin:"0 auto",padding:"28px 16px"}}>
      <h1 style={{fontSize:22,fontWeight:900,color:C.navy,marginBottom:20}}>ℹ️ About JobGuruWorld.com</h1>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
        {[["🎓 Our Mission","JobGuruWorld.com was created to ensure no Indian student misses a government job opportunity due to lack of information or language barrier. We use AI to collect, translate, and explain every job notification in simple language across all 22 Indian languages — completely free."],["🤖 How We Work","Every morning at 5 AM, our AI scans 500+ newspapers, official government websites, and job portals across India. Claude AI processes each notification and creates complete guides with study plans, syllabus, cut-offs, salary information, and career guidance."],["📊 Our Numbers (2025)",null],["💡 Why JobGuru is Different",null]].map(([t,d],i)=>(
          <div key={i} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:10,padding:20}}>
            <div style={{fontSize:15,fontWeight:800,color:C.navy,marginBottom:10}}>{t}</div>
            {d?<p style={{fontSize:13,color:C.text,lineHeight:1.8,margin:0}}>{d}</p>:
              i===2?[["283","Active job notifications"],["50,000+","Students using JobGuru"],["22","Indian languages supported"],["500+","Sources monitored daily"],["28","States covered"],["26","Features — all in one platform"]].map(([n,l])=>(
                <div key={l} style={{display:"flex",gap:10,padding:"5px 0",fontSize:13,borderBottom:`1px solid ${C.border}`}}>
                  <strong style={{color:C.gold,minWidth:55}}>{n}</strong>
                  <span style={{color:C.text}}>{l}</span>
                </div>
              )):["26 features — all competitors have at most 5–6","22 Indian languages — all competitors: English/Hindi only","AI Chat Mentor in Telugu — nobody else has this free","Complete job guide: daily work, career path, salary breakdown","English practice built-in — Duolingo quality, free","The Hindu editorial in Telugu — costs ₹500/month elsewhere"].map((p,j)=>(
                <div key={j} style={{display:"flex",gap:8,fontSize:13,padding:"3px 0"}}>
                  <span style={{color:C.gold,fontWeight:900}}>★</span>{p}
                </div>
              ))
            }
          </div>
        ))}
      </div>
    </div>
  );
}

function ContactPage(){
  return(
    <div style={{maxWidth:900,margin:"0 auto",padding:"28px 16px"}}>
      <h1 style={{fontSize:22,fontWeight:900,color:C.navy,marginBottom:20}}>📞 Contact Us</h1>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
        <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:10,padding:20}}>
          <div style={{fontSize:15,fontWeight:800,color:C.navy,marginBottom:14}}>📬 Get in Touch</div>
          {[["Email","support@jobguruworld.com","📧"],["WhatsApp","Join our channel","📱"],["Telegram","@JobGuruWorld","✈️"],["YouTube","JobGuruWorld","▶️"],["Twitter/X","@JobGuruWorld","🐦"]].map(([l,v,ic])=>(
            <div key={l} style={{display:"flex",gap:10,padding:"9px 0",borderBottom:`1px solid ${C.border}`,fontSize:13}}>
              <span style={{fontSize:20}}>{ic}</span>
              <div><div style={{fontWeight:700,color:C.navy}}>{l}</div><div style={{color:C.blue}}>{v}</div></div>
            </div>
          ))}
        </div>
        <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:10,padding:20}}>
          <div style={{fontSize:15,fontWeight:800,color:C.navy,marginBottom:14}}>✉️ Send a Message</div>
          {[["Your Name","Enter your full name"],["Email or Phone","Enter email or phone number"]].map(([l,ph])=>(
            <div key={l} style={{marginBottom:10}}>
              <label style={{fontSize:11,color:C.muted,fontWeight:700,display:"block",marginBottom:3}}>{l}</label>
              <input placeholder={ph} style={{width:"100%",padding:"9px 11px",border:`1px solid ${C.border}`,borderRadius:6,fontSize:13,outline:"none",boxSizing:"border-box"}}/>
            </div>
          ))}
          <div style={{marginBottom:12}}>
            <label style={{fontSize:11,color:C.muted,fontWeight:700,display:"block",marginBottom:3}}>Message</label>
            <textarea placeholder="Your question, suggestion or feedback..." rows={3} style={{width:"100%",padding:"9px 11px",border:`1px solid ${C.border}`,borderRadius:6,fontSize:13,outline:"none",resize:"vertical",boxSizing:"border-box"}}/>
          </div>
          <button style={{background:C.gold,color:"#fff",border:"none",borderRadius:7,padding:"10px 20px",fontSize:13,fontWeight:800,cursor:"pointer"}}>Send Message →</button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   ROOT APP
═══════════════════════════════════════════════════════ */
export default function App(){
  const [page,setPage]=useState("home");
  const [selectedJob,setSelectedJob]=useState(JOBS[0]);
  const [mobileMenu,setMobileMenu]=useState(false);

  useEffect(()=>{window.scrollTo(0,0);setMobileMenu(false);},[page]);

  const PAGES={
    "home":<HomePage setPage={setPage} setSelectedJob={setSelectedJob}/>,
    "jobs":<AllJobsPage setPage={setPage} setSelectedJob={setSelectedJob}/>,
    "admit":<AdmitCardsPage/>,
    "results":<ResultsPage/>,
    "answer-keys":<AnswerKeysPage/>,
    "current-affairs":<CurrentAffairsPage/>,
    "editorial":<EditorialPage/>,
    "mock-tests":<MockTestsPage/>,
    "exam-calendar":<ExamCalendarPage/>,
    "english":<EnglishPractice/>,
    "scholarships":<ScholarshipsPage/>,
    "job-mela":<JobMelaPage/>,
    "ai-chat":<div style={{maxWidth:860,margin:"0 auto",padding:"24px 16px"}}><h1 style={{fontSize:22,fontWeight:900,color:C.navy,marginBottom:16}}>🤖 AI Guru — Telugu లో అడగండి</h1><AIChat lang="te"/></div>,
    "premium":<PremiumPage/>,
    "about":<AboutPage/>,
    "contact":<ContactPage/>,
    "job-detail":<JobDetailPage job={selectedJob} onBack={()=>setPage("jobs")}/>,
  };

  return(
    <div style={{fontFamily:"'Segoe UI',system-ui,sans-serif",background:C.bg,minHeight:"100vh",color:C.text}}>
      <style>{`
        @keyframes ticker{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
        @keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
        *{box-sizing:border-box}
        ::-webkit-scrollbar{width:5px;height:5px}
        ::-webkit-scrollbar-thumb{background:#cbd5e1;border-radius:3px}
        a{text-decoration:none}
      `}</style>

      {/* NAVIGATION */}
      <nav style={{background:C.navy,borderBottom:`3px solid ${C.gold}`,position:"sticky",top:0,zIndex:100}}>
        <div style={{maxWidth:1280,margin:"0 auto",padding:"0 12px",display:"flex",alignItems:"center",height:52,gap:6}}>
          {/* LOGO */}
          <div onClick={()=>setPage("home")} style={{display:"flex",alignItems:"center",gap:7,cursor:"pointer",marginRight:8,flexShrink:0}}>
            <div style={{width:32,height:32,background:C.gold,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>🎓</div>
            <div>
              <div style={{color:"#fff",fontWeight:900,fontSize:17,letterSpacing:"-0.04em",lineHeight:1}}>Job<span style={{color:C.gold}}>Guru</span></div>
              <div style={{color:"#93c5fd",fontSize:8,letterSpacing:"0.08em"}}>WORLD.COM</div>
            </div>
          </div>

          {/* DESKTOP NAV */}
          <div style={{display:"flex",flex:1,gap:1,overflowX:"auto"}}>
            {NAV_ITEMS.filter(n=>n.id!=="premium").map(n=>(
              <button key={n.id} onClick={()=>setPage(n.id)} style={{background:page===n.id?"rgba(245,158,11,0.15)":"none",border:"none",cursor:"pointer",padding:"5px 8px",borderRadius:5,whiteSpace:"nowrap",color:page===n.id?C.gold:"#93c5fd",fontWeight:page===n.id?800:400,fontSize:11,display:"flex",alignItems:"center",gap:3,flexShrink:0}}>
                <span style={{fontSize:12}}>{n.icon}</span>{n.label}
              </button>
            ))}
          </div>

          <button onClick={()=>setPage("premium")} style={{background:C.gold,color:"#fff",border:"none",borderRadius:7,padding:"6px 12px",fontSize:11,fontWeight:900,cursor:"pointer",flexShrink:0,whiteSpace:"nowrap"}}>⭐ Premium ₹149</button>
        </div>

        {/* SECONDARY NAV ROW */}
        <div style={{background:"rgba(0,0,0,0.2)",padding:"3px 12px",display:"flex",gap:4,overflowX:"auto"}}>
          {[["about","About Us"],["contact","Contact"],["jobs","By State"],["jobs","By Category"],["jobs","10th Pass Jobs"],["jobs","12th Pass Jobs"],["jobs","Degree Jobs"],["jobs","Telangana Jobs"],["jobs","AP Jobs"]].map(([pid,lbl],i)=>(
            <button key={i} onClick={()=>setPage(pid)} style={{background:"none",border:"none",color:"#64748b",fontSize:10,cursor:"pointer",whiteSpace:"nowrap",padding:"2px 6px",borderRadius:3}}>{lbl}</button>
          ))}
        </div>
      </nav>

      {/* PAGE CONTENT */}
      <div key={page} style={{animation:"fadeIn 0.2s ease"}}>
        {PAGES[page]||PAGES["home"]}
      </div>

      {/* FOOTER */}
      <footer style={{background:C.navy,borderTop:`3px solid ${C.gold}`,padding:"28px 20px",marginTop:20}}>
        <div style={{maxWidth:1000,margin:"0 auto"}}>
          <div style={{display:"flex",gap:20,flexWrap:"wrap",marginBottom:18}}>
            <div style={{flex:2,minWidth:180}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
                <div style={{width:28,height:28,background:C.gold,borderRadius:7,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16}}>🎓</div>
                <span style={{color:"#fff",fontWeight:900,fontSize:16}}>Job<span style={{color:C.gold}}>Guru</span>World.com</span>
              </div>
              <div style={{color:"#64748b",fontSize:11,lineHeight:1.8}}>మీ స్వంత జాబ్ గురువు<br/>Your Personal Job Mentor<br/>26 Features · 22 Languages · All Free</div>
            </div>
            {[["Quick Links",["Home","All Jobs","Admit Cards","Results","Answer Keys","Current Affairs"],["home","jobs","admit","results","answer-keys","current-affairs"]],["Learn",["The Hindu","Mock Tests","Exam Calendar","English Practice","Scholarships","Job Mela"],["editorial","mock-tests","exam-calendar","english","scholarships","job-mela"]],["About",["About Us","Contact","Premium Plans","AI Guru"],["about","contact","premium","ai-chat"]]].map(([title,links,ids])=>(
              <div key={title} style={{minWidth:110}}>
                <div style={{color:C.gold,fontWeight:800,fontSize:10,marginBottom:8,letterSpacing:"0.06em"}}>{title.toUpperCase()}</div>
                {links.map((l,i)=><div key={l} onClick={()=>setPage(ids[i])} style={{color:"#64748b",fontSize:11,padding:"2px 0",cursor:"pointer"}}>{l}</div>)}
              </div>
            ))}
            <div style={{minWidth:140}}>
              <div style={{color:C.gold,fontWeight:800,fontSize:10,marginBottom:8,letterSpacing:"0.06em"}}>JOIN US FREE</div>
              {[["📱 WhatsApp Channel","#25D366"],["✈️ Telegram Channel","#2CA5E0"],["▶️ YouTube","#ff0000"],["📘 Facebook","#1877f2"]].map(([l,bg])=>(
                <button key={l} style={{display:"block",background:bg,color:"#fff",border:"none",borderRadius:5,padding:"4px 10px",fontSize:11,fontWeight:700,cursor:"pointer",marginBottom:5}}>{l}</button>
              ))}
            </div>
          </div>
          <div style={{borderTop:"1px solid rgba(255,255,255,0.08)",paddingTop:12,display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:6}}>
            <div style={{fontSize:10,color:"#475569"}}>© 2025 JobGuruWorld.com · Powered by AI · Built for India's 50 crore job seekers</div>
            <div style={{fontSize:10,color:"#475569"}}>26 Features · 22 Languages · 28 States · 500+ Sources · Updated Daily 7 AM</div>
          </div>
        </div>
      </footer>

      <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}`}</style>
    </div>
  );
}
