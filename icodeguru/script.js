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
  assignments: Array.from({length:6}, (_,i) => ({
    title: "Week " + (i+1) + " Assignment",
    details: "Add assignment details here using Admin access.",
    instructions: "",
    submission: ""
  })),
  recordings: "", feedback: "", facebook: "", instagram: "", linkedin: ""
};
let data = JSON.parse(JSON.stringify(defaults));
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
function render() { renderAssignments(); renderLinks(); }
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
  if (snapshot.exists()) data = {...defaults, ...snapshot.data()};
  else data = JSON.parse(JSON.stringify(defaults));
  render();
  if (isAdmin && $("adminModal").classList.contains("open")) fillAdminForm();
}, error => {
  console.error(error);
  $("recordingsHint").textContent = "Unable to load shared content. Check Firestore security rules.";
});
render();
