import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";
import { getFirestore, doc, onSnapshot, setDoc } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDG9sQtI8x4tjLGa---by-eGWUuShF5g_Y",
  authDomain: "icodeguru-session-website.firebaseapp.com",
  projectId: "icodeguru-session-website",
  storageBucket: "icodeguru-session-website.firebasestorage.app",
  messagingSenderId: "865746833524",
  appId: "1:865746833524:web:004587f3a61faa30af8121"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();
const contentRef = doc(db, "site", "content");
const ADMIN_EMAILS = ["eisha.ashraf86@gmail.com", "ayeshasajid052@gmail.com"];

const defaults = {
  assignments: [
    {
      title: "Assignment No. 1",
      details: "Assignment No. 1 is now open for submission. Please review the assignment instructions carefully and submit your work through the Google Form.",
      instructions: "https://docs.google.com/document/d/1qPDgztjt_IcgV7T13TDCpTpM7nY_WOT1GIkZuO8WYN8/edit?usp=sharing",
      submission: "https://forms.gle/QTbSceDmSDTXdC7n6"
    },
    {
      title: "Assignment No. 2 – GitHub Profile README",
      details: "Create and customize your GitHub profile README by following the instructions provided in the assignment document. Submit your GitHub profile link through the provided form.",
      instructions: "https://docs.google.com/document/d/1fU2axF1RX5FEfP6UucVaB35YudkPTTN-y7P1PtcgwS8/edit?usp=sharing",
      submission: "https://forms.gle/PrvXAGE32AmUMf11A"
    },
    {
      title: "Assignment No. 3 – Real-World Problem & Technology Solution",
      details: "Identify a real-world problem from your daily life, university, or surroundings and propose a simple technology-based solution. Submit your responses through the provided form.",
      instructions: "https://docs.google.com/document/d/1BBfBa0tVnMj3_DMJojRyQrluulVKT7uLXWvVsYc-CVU/edit?usp=sharing",
      submission: "https://forms.gle/iqVN8DVpSGJDKczQA"
    },
    {
      title: "Assignment No. 4 – 10 MCQs",
      details: "Complete 10 multiple-choice questions based on the concepts covered in the sessions so far. Read the assignment instructions carefully and submit before the deadline.",
      instructions: "https://docs.google.com/document/d/1B-mRLI4bw7LOtaxPvy0MB5lv5o445H2yag3qC-v2GeU/edit",
      submission: "https://forms.gle/tjzDEN2rHQw3UzV6A"
    },
    {
      title: "Week 5 Assignment",
      details: "Add assignment details here using Admin access.",
      instructions: "",
      submission: ""
    },
    {
      title: "Week 6 Assignment",
      details: "Add assignment details here using Admin access.",
      instructions: "",
      submission: ""
    }
  ],
  recordings: "", feedback: "", facebook: "", instagram: "", linkedin: ""
};
let data = JSON.parse(JSON.stringify(defaults));
const lectureWeeks = [{"week":1,"items":[["26 Oct 2026","Monday","Inaugural Ceremony of the Latest Trends in Technology 2026","Guest Speakers","https://www.youtube.com/live/d108XE8b3uQ?si=4jyj4MC9EcbkhWbY",null,"Part 01 & Part 02"],["27 Oct 2026","Tuesday","How to Create LinkedIn Profile for Career Growth","Muhammad Talha","https://youtu.be/Xv42FpgfSJ0","https://docs.google.com/presentation/d/1zncjbZWZ__zbmprrSf2YRjS2ug-vNhTdHC55LsCQ-nA/edit?usp=sharing"],["28 Oct 2026","Wednesday","How to Find Fully Funded Scholarships","Saher Nadeem","https://youtube.com/live/prJFq3CI0mc","https://docs.google.com/presentation/d/1z9-z2Jg3ij06zlYEhCQwu90RCjwwXUj4wTxgDM2Cl_0/edit?usp=sharing"],["29 Oct 2026","Thursday","Mastering CV and Email Writing For Scholarships","Fatima Shahid","https://www.youtube.com/live/gk_oNYbRuZc?si=RBXmQE5uPoGc8sBH"],["30 Oct 2026","Friday","A Fully Funded Scholarship Journey","Ahmad Talha Ansari","https://www.youtube.com/live/Y2-4YKuFQ_w?si=S1FGGVd12TKmX7aV"]]},{"week":2,"items":[["2 Nov 2026","Monday","Practice Class On LinkedIn","Muhammad Farhan","https://www.youtube.com/live/uk2OHc0UU2o?si=glCpNBWEua2BkArT"],["3 Nov 2026","Tuesday","Why a Video CV Matters?","Sana Sajid","https://youtu.be/54hcz4JkRbE","https://docs.google.com/presentation/d/1whAPxw-hJs3vNwdlZADmKUd1C24t48FW98cf4utSK5M/edit?usp=sharing"],["4 Nov 2026","Wednesday","GitHub: Build Your Profile & Showcase Your Skills","Haris Mugal","https://youtu.be/_6H4wdbh478"],["5 Nov 2026","Thursday","Building & Personalizing Your GitHub Profile","Haris Mugal","https://youtu.be/Zc5mcy26f5I?si=9FfH9p-fCslc6Dlr"],["6 Nov 2026","Friday","Building Projects & Creating Professional READMEs","Yasir Ali","https://youtu.be/KVuMs80E9Z0"]]},{"week":3,"items":[["9 Nov 2026","Monday","Git & GitHub Basics for Beginners","Yasir Ali","https://www.youtube.com/live/GFATwvwluok?si=7AQf0DviO6I8hgwc"],["10 Nov 2026","Tuesday","How to Join Hackathons & Why They Matter","Abdul Rehman","https://www.youtube.com/live/sl_bbdpXY4Y?si=VBxoodAvEes_ULnC"],["11 Nov 2026","Wednesday","Coding Competitions: How to Participate & Compete Globally","Moneeb Hussain","https://www.youtube.com/live/Cayi5nwj-CA?si=eph5H1x_sD4PMQKT"],["12 Nov 2026","Thursday","Hackathon Preparation: Skills & Strategies","M. Farhan","https://www.youtube.com/live/s6LueNYdccY?si=OclfWhJaUG88T4Nq"],["13 Nov 2026","Friday","Networking & Teamwork in Hackathons","Alisha Fatima","https://youtu.be/-HWFmtxHScw?si=OUyeaJDsP1_POf3M"]]},{"week":4,"items":[["16 Nov 2026","Monday","Class On Coding Competitions","M. Anas","https://youtu.be/PgaMEH2HTMU?si=lf62yZ2s9mS0_V3l"],["17 Nov 2026","Tuesday","Introduction to Python Programming","Wahab Khan","https://youtu.be/YJQfPabTyVU"],["18 Nov 2026","Wednesday","Getting Started with Machine Learning","Abdul Rehman Manzoor","https://youtu.be/mreqmlNPjFs"],["19 Nov 2026","Thursday","Building Python Skills Through Practice","Muhammad Bilal","https://youtu.be/ddPXoL4SL4Q"],["20 Nov 2026","Friday","Data Handling & Visualization using Python Libraries","Ahmad Yousaf","https://youtu.be/G7EG5GqU-WQ"]]}];
let currentUser = null;
let isAdmin = false;
let unsubscribeContent = null;
const $ = id => document.getElementById(id);
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const url = s => { try { const u = new URL(s); return ["http:","https:"].includes(u.protocol) ? u.href : ""; } catch { return ""; } };

function renderAssignments() {
  $("assignmentList").innerHTML = data.assignments.map((a,i) =>
    '<article class="assignment"><div><div class="week">WEEK '+(i+1)+' · ASSIGNMENT</div><h3>'+esc(a.title)+'</h3><p>'+esc(a.details)+'</p></div><div class="actions">'+link(a.instructions,"Instructions","secondary")+link(a.submission,"Submit assignment","primary")+'</div></article>'
  ).join("");
}
function link(s,label,cls) {
  const u = url(s);
  return u ? '<a class="small-btn '+cls+'" href="'+u+'" target="_blank" rel="noopener">'+label+' ↗</a>' : '<span class="small-btn secondary">'+label+' · Add link</span>';
}
function renderLinks() {
  const u = url(data.recordings), r = $("recordingsLink");
  r.href = u || "#"; r.classList.toggle("disabled", !u);
  $("recordingsHint").textContent = u ? "Recordings are organized in your linked Google Sheet." : "The recordings sheet link will be added by the administrator.";
  const f = url(data.feedback);
  $("feedbackLink").href = f || "#"; $("feedbackLink").style.opacity = f ? 1 : .5;
  $("socialLinks").innerHTML = [["Facebook",data.facebook],["Instagram",data.instagram],["LinkedIn",data.linkedin]]
    .filter(x => url(x[1])).map(x => '<a href="'+url(x[1])+'" target="_blank" rel="noopener">'+x[0]+'</a>').join("");
}
function renderRecordings() {
  $("recordingList").innerHTML = lectureWeeks.map(group =>
    '<section class="recording-week"><div class="recording-week-head"><div><span>WEEK '+group.week+'</span><h2>Week '+group.week+'</h2></div><small>'+group.items.length+' recorded sessions</small></div><div class="lecture-grid">' +
    group.items.map(item => '<article class="lecture-card"><div class="lecture-meta"><span>'+esc(item[0])+'</span><span>'+esc(item[1])+'</span></div><h3>'+esc(item[2])+'</h3><p>Speaker: '+esc(item[3])+'</p><div class="lecture-actions"><a class="small-btn primary" href="'+url(item[4])+'" target="_blank" rel="noopener">Watch recording ↗</a>'+(item[5] ? '<a class="small-btn secondary" href="'+url(item[5])+'" target="_blank" rel="noopener">View slides ↗</a>' : '')+'</div>'+(item[6] ? '<small class="hint">'+esc(item[6])+'</small>' : '')+'</article>').join('') +
    '</div></section>'
  ).join('');
}
function render() { renderAssignments(); renderLinks(); renderRecordings(); }
function go(page) {
  document.querySelectorAll(".page").forEach(p => p.classList.toggle("active", p.id === "page-"+page));
  document.querySelectorAll(".nav").forEach(b => b.classList.toggle("active", b.dataset.page === page));
  $("crumb").textContent = ({home:"Home",session:"Session Details",assignments:"Assignments",recordings:"Recorded Lectures",about:"About"})[page];
  $("sidebar").classList.remove("open"); window.scrollTo(0,0);
}
document.querySelectorAll("[data-page]").forEach(b => b.addEventListener("click", () => go(b.dataset.page)));
$("menuToggle").onclick = () => $("sidebar").classList.toggle("open");
$("adminOpen").onclick = () => $("adminModal").classList.add("open");
$("adminClose").onclick = () => $("adminModal").classList.remove("open");
$("adminModal").onclick = e => { if (e.target === $("adminModal")) $("adminModal").classList.remove("open"); };

function fillAdminForm() {
  $("adminAssignments").innerHTML = data.assignments.map((a,i) =>
    '<div class="week-edit"><b>WEEK '+(i+1)+'</b><label>Assignment title<input data-i="'+i+'" data-k="title" value="'+esc(a.title)+'"></label><label>Assignment details<textarea data-i="'+i+'" data-k="details">'+esc(a.details)+'</textarea></label><div class="fields"><label>Instructions URL<input data-i="'+i+'" data-k="instructions" value="'+esc(a.instructions)+'" placeholder="Paste Google Docs/Sheets URL"></label><label>Submission URL<input data-i="'+i+'" data-k="submission" value="'+esc(a.submission)+'" placeholder="Paste submission form URL"></label></div></div>'
  ).join("") + '<button class="btn primary" id="saveAssignments">Save all assignments</button>';
  $("saveAssignments").onclick = async () => {
    document.querySelectorAll("[data-i]").forEach(e => data.assignments[+e.dataset.i][e.dataset.k] = e.value.trim());
    await saveContent("Assignments saved for everyone.");
  };
  ["recordings","feedback","facebook","instagram","linkedin"].forEach(k => $("edit"+k[0].toUpperCase()+k.slice(1)).value = data[k] || "");
}
async function saveContent(message) {
  if (!isAdmin) return;
  try {
    await setDoc(contentRef, data);
    $("saveStatus").textContent = message;
  } catch (error) {
    console.error(error);
    $("saveStatus").textContent = "Could not save. Check Firestore rules and your internet connection.";
  }
}
document.querySelectorAll(".tab").forEach(t => t.onclick = () => {
  document.querySelectorAll(".tab").forEach(x => x.classList.toggle("active", x === t));
  $("adminAssignments").classList.toggle("hidden", t.dataset.tab !== "assignments");
  $("adminLinks").classList.toggle("hidden", t.dataset.tab !== "links");
});
$("saveLinks").onclick = async () => {
  ["recordings","feedback","facebook","instagram","linkedin"].forEach(k => data[k] = $("edit"+k[0].toUpperCase()+k.slice(1)).value.trim());
  await saveContent("Website links saved for everyone.");
};
$("resetData").onclick = async () => {
  if (confirm("Reset all assignment and link data for every visitor?")) {
    data = JSON.parse(JSON.stringify(defaults));
    fillAdminForm(); render();
    await saveContent("Content reset to defaults.");
  }
};

$("signInButton").onclick = async () => {
  try { await signInWithPopup(auth, provider); }
  catch (error) {
    console.error(error);
    $("authStatus").textContent = "Sign-in failed: " + (error.code || error.message);
  }
};
$("signOutButton").onclick = () => signOut(auth);
onAuthStateChanged(auth, user => {
  currentUser = user;
  isAdmin = !!user && user.emailVerified && ADMIN_EMAILS.includes((user.email || "").toLowerCase());
  $("authStatus").textContent = user ? "Signed in: " + user.email + (isAdmin ? " · Admin access" : " · View-only account") : "Not signed in";
  $("signInButton").classList.toggle("hidden", !!user);
  $("signOutButton").classList.toggle("hidden", !user);
  $("adminEditor").classList.toggle("hidden", !isAdmin);
  if (isAdmin) fillAdminForm();
  if (user && !isAdmin) $("authStatus").textContent += " (This account is not on the admin list.)";
});

onSnapshot(contentRef, snapshot => {
  if (snapshot.exists()) {
    const saved = snapshot.data();
    data = {...defaults, ...saved};
    // Ensure the latest Week 1–4 assignment announcements and links appear
    // even when an older version is already stored in Firestore.
    const savedAssignments = Array.isArray(saved.assignments) ? saved.assignments : [];
    data.assignments = defaults.assignments.map((item, i) => {
      if (i < 4) return {...(savedAssignments[i] || {}), ...item};
      return {...item, ...(savedAssignments[i] || {})};
    });
  } else {
    data = JSON.parse(JSON.stringify(defaults));
  }
  render();
  if (isAdmin && $("adminModal").classList.contains("open")) fillAdminForm();
}, error => {
  console.error(error);
  $("recordingsHint").textContent = "Unable to load shared content. Check Firestore security rules.";
});
render();
