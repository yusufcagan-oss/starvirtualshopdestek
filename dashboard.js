<script type="module">
import { auth, db } from "./firebase.js";
import {
collection, addDoc, getDocs, query, where
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const games = ["GTA 5","CS2","Forza Horizon 4","Ghost of Tsushima"];

window.openRequest = async () => {
  const g = prompt("Oyun adı");
  const t = prompt("guardkod / hesap problemi");
  const n = prompt("Not");

  await addDoc(collection(db,"requests"),{
    uid: auth.currentUser.uid,
    game: g,
    type: t,
    note: n,
    status: "bekliyor",
    time: Date.now()
  });

  load();
};

async function load(){
  list.innerHTML="";
  const q = query(collection(db,"requests"), where("uid","==",auth.currentUser.uid));
  const s = await getDocs(q);
  s.forEach(d=>{
    const r=d.data();
    list.innerHTML+=`<div>${r.game} | ${r.status}</div>`;
  });
}
load();
</script>
