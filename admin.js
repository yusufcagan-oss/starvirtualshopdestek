<script type="module">
import { db } from "./firebase.js";
import {
collection, getDocs, updateDoc, doc
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const s = await getDocs(collection(db,"requests"));
s.forEach(d=>{
  const r=d.data();
  all.innerHTML+=`
  <div>
    ${r.game} | ${r.type}
    <button onclick="reply('${d.id}')">Cevapla</button>
  </div>`;
});

window.reply = async (id)=>{
  const msg=prompt("Cevap");
  await updateDoc(doc(db,"requests",id),{
    status:"cevaplandı",
    answer:msg
  });
};
</script>
