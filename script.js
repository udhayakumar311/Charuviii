/*
  ==============================
  CUSTOMIZE THESE TWO SETTINGS
  ==============================

  1) YOUR_WHATSAPP_NUMBER:
     Put your WhatsApp number with country code, digits only.
     Example format: 91XXXXXXXXXX

  2) SPOTIFY_TRACK_ID:
     The BeMyVal page exposes a Spotify player, but the exact track ID
     is not visible in the public page text. Put the track ID from your
     BeMyVal Spotify embed here.

     Example:
     If the Spotify URL is:
     https://open.spotify.com/track/4LRPiXqCikLlN15c3yImP6
     then use:
     SPOTIFY_TRACK_ID = "4LRPiXqCikLlN15c3yImP6"
*/

const YOUR_WHATSAPP_NUMBER = "918072660518";
const SPOTIFY_TRACK_ID = "3j849LjxCe8WZMQjiKsl8Z";

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const noMessage = document.getElementById("noMessage");

const pageOne = document.getElementById("pageOne");
const pageTwo = document.getElementById("pageTwo");

const noteModal = document.getElementById("noteModal");
const modalClose = document.getElementById("modalClose");
const whatsappInput = document.getElementById("whatsappInput");
const whatsappBtn = document.getElementById("whatsappBtn");

const musicModal = document.getElementById("musicModal");
const musicBtn = document.getElementById("musicBtn");
const musicClose = document.getElementById("musicClose");
const spotifyPlayer = document.getElementById("spotifyPlayer");
const musicHelp = document.getElementById("musicHelp");





const heartsContainer = document.getElementById("hearts");

let noCount = 0;

const noMessages = [
  '"No" seems a bit shy 💖',
  'Are you sure? 👀',
  'Think again, Cutie 😌',
  'That button looks suspiciously wrong 😂',
  'I think you meant YES 🥺',
  'Okayyy... one more chance? 💗',
  'You really want to say no? 😭',
  'Fine... but I know you want to say yes 😏'
];

noBtn.addEventListener("click", () => {
  noCount++;

  noMessage.textContent = noMessages[Math.min(noCount, noMessages.length - 1)];

  const scale = Math.max(0.65, 1 - noCount * 0.06);
  const yesScale = Math.min(1.18, 1 + noCount * 0.025);

  yesBtn.style.transform = `scale(${yesScale})`;

  if (noCount >= 3) {
    const x = Math.random() * 120 - 60;
    const y = Math.random() * 80 - 40;
    noBtn.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
  } else {
    noBtn.style.transform = `scale(${scale})`;
  }

  if (noCount >= 6) noBtn.textContent = "Okay fine 😭";
});

yesBtn.addEventListener("click", () => {
  pageOne.style.display = "none";
  pageTwo.classList.add("show");
  pageTwo.setAttribute("aria-hidden", "false");

  for (let i = 0; i < 20; i++) {
    setTimeout(createHeart, i * 80);
  }

  startMusic();

  // Show the love note after the second page appears.
  setTimeout(() => openModal(noteModal), 900);
});

document.querySelector(".love-note").addEventListener("click", () => {
  openModal(noteModal);
});

function openModal(modal) {
  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
}

function closeModal(modal) {
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
}

modalClose.addEventListener("click", () => closeModal(noteModal));

whatsappBtn.addEventListener("click", () => {
  const herNumber = whatsappInput.value.replace(/\D/g, "");

  if (!herNumber || herNumber.length < 8) {
    whatsappInput.focus();
    whatsappInput.style.borderColor = "#ff4f78";
    return;
  }

  if (!YOUR_WHATSAPP_NUMBER || YOUR_WHATSAPP_NUMBER === "YOUR_NUMBER_HERE") {
    alert("Add your WhatsApp number in script.js first.");
    return;
  }

  const message =
    `Hey! It's Charuvi 💗 My WhatsApp number is ${herNumber}. ` +
    `Looks like we finally won't miss each other anymore 😌`;

  const url =
    `https://wa.me/${YOUR_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  window.location.href = url;
});

musicBtn.addEventListener("click", () => {
  openModal(musicModal);
  startMusic();
});

musicClose.addEventListener("click", () => closeModal(musicModal));


function startMusic() {
  if (!SPOTIFY_TRACK_ID || SPOTIFY_TRACK_ID === "PASTE_TRACK_ID_HERE") {
    musicHelp.innerHTML =
      'The Spotify track is not configured yet. Put the track ID from your BeMyVal Spotify player in <b>script.js</b>.';
    return;
  }

  const src =
    `https://open.spotify.com/embed/track/${SPOTIFY_TRACK_ID}` +
    `?utm_source=generator&theme=0`;

  if (spotifyPlayer.src !== src) {
    spotifyPlayer.src = src;
  }
}

function createHeart() {
  const heart = document.createElement("div");
  heart.className = "heart";

  const types = ["💗", "💕", "💖", "💓", "💘", "🌸"];
  heart.textContent = types[Math.floor(Math.random() * types.length)];

  heart.style.left = Math.random() * 100 + "%";
  heart.style.fontSize = (14 + Math.random() * 15) + "px";
  heart.style.animationDuration = (5 + Math.random() * 6) + "s";

  heartsContainer.appendChild(heart);

  setTimeout(() => heart.remove(), 12000);
}

setInterval(createHeart, 900);

for (let i = 0; i < 8; i++) {
  setTimeout(createHeart, i * 450);
}

// Close modals when tapping outside their card.
[noteModal, musicModal, memoryModal].forEach((modal) => {
  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeModal(modal);
  });
});
