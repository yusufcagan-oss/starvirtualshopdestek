<script type="module">
import { auth, db } from "./firebase.js";
import {
createUserWithEmailAndPassword,
signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import {
doc, setDoc, getDoc
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

window.register = async () => {
  const u = username.value;
  const p = password.value;
  const p2 = password2.value;

  if (u.length < 1) return alert("Kullanıcı adı boş olamaz");
  if (p.length < 8) return alert("Şifre en az 8 karakter");
  if (p !== p2) return alert("Şifreler eşleşmiyor");

  const cred = await createUserWithEmailAndPassword(auth, u+"@svs.com", p);

  await setDoc(doc(db,"users",cred.user.uid),{
    username: u,
    role: "user",
    created: Date.now()
  });

  location.href="dashboard.html";
};

window.login = async () => {
  const u = username.value;
  const p = password.value;

  const cred = await signInWithEmailAndPassword(auth, u+"@svs.com", p);
  const snap = await getDoc(doc(db,"users",cred.user.uid));

  if (snap.data().role === "admin")
    location.href="admin.html";
  else
    location.href="dashboard.html";
};
</script>
