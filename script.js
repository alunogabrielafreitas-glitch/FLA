const previewText = document.getElementById("previewText");
const fontSelect = document.getElementById("fontSelect");
const fontSize = document.getElementById("fontSize");
const lineHeight = document.getElementById("lineHeight");
const paragraphSpacing = document.getElementById("paragraphSpacing");
const letterSpacing = document.getElementById("letterSpacing");
const wordSpacing = document.getElementById("wordSpacing");
const textColor = document.getElementById("textColor");
const bgColor = document.getElementById("bgColor");
const textAlign = document.getElementById("textAlign");

const imageInput = document.getElementById("imageInput");

const ttsBtn = document.getElementById("ttsBtn");
const ttsStopBtn = document.getElementById("ttsStopBtn");

const autoFormatBtn = document.getElementById("autoFormat");
const showDicasBtn = document.getElementById("showDicas");
const dicasDiv = document.getElementById("dicas");
const toggleDarkBtn = document.getElementById("toggleDark");
const menuToggle = document.getElementById("menuToggle");
const sidebar = document.getElementById("sidebar");

const collapsibles = document.querySelectorAll(".collapsible");
collapsibles.forEach(btn => {
  btn.addEventListener("click", () => {
    btn.classList.toggle("active");
    const content = btn.nextElementSibling;
    content.style.display = content.style.display === "flex" ? "none" : "flex";
  });
});

const speechSynthesisInstance = window.speechSynthesis;

// Atualiza estilo do texto
function atualizarPreview() {
  previewText.style.fontFamily = fontSelect.value;
  previewText.style.fontSize = fontSize.value + "px";
  previewText.style.lineHeight = lineHeight.value;
  previewText.style.color = textColor.value;
  previewText.style.backgroundColor = bgColor.value;
  previewText.style.textAlign = textAlign.value;
  previewText.style.letterSpacing = letterSpacing.value + "em";
  previewText.style.wordSpacing = wordSpacing.value + "em";
  previewText.style.paddingBottom = paragraphSpacing.value + "px";
}

// Eventos de inputs
previewText.addEventListener("input", atualizarPreview);
fontSelect.addEventListener("change", atualizarPreview);
fontSize.addEventListener("input", atualizarPreview);
lineHeight.addEventListener("input", atualizarPreview);
paragraphSpacing.addEventListener("input", atualizarPreview);
letterSpacing.addEventListener("input", atualizarPreview);
wordSpacing.addEventListener("input", atualizarPreview);
textColor.addEventListener("input", atualizarPreview);
bgColor.addEventListener("input", atualizarPreview);
textAlign.addEventListener("change", atualizarPreview);

// TTS
ttsBtn.addEventListener("click", () => {
  if (speechSynthesisInstance.speaking) speechSynthesisInstance.cancel();
  const utterance = new SpeechSynthesisUtterance(previewText.innerText);
  utterance.lang = "pt-BR";
  speechSynthesisInstance.speak(utterance);
});
ttsStopBtn.addEventListener("click", () => { speechSynthesisInstance.cancel(); });

// OCR automático ao selecionar arquivo (sem TTS)
imageInput.addEventListener("change", () => {
  if (imageInput.files.length > 0) {
    Tesseract.recognize(imageInput.files[0], 'por', { logger: m => console.log(m) })
      .then(({ data: { text } }) => {
        previewText.innerText = text;
        atualizarPreview();
      });
  }
});

// Auto formatação
autoFormatBtn.addEventListener("click", () => {
  fontSelect.value = "Arial";
  fontSize.value = 20;
  lineHeight.value = 1.5;
  paragraphSpacing.value = 12;
  letterSpacing.value = 0.12;
  wordSpacing.value = 0.16;
  textColor.value = "#000000";
  bgColor.value = "#ffffcc";
  textAlign.value = "center";
  atualizarPreview();
});

// Mostrar/ocultar dicas
showDicasBtn.addEventListener("click", () => {
  dicasDiv.style.display = dicasDiv.style.display === "none" ? "block" : "none";
});

// Tema escuro
toggleDarkBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  atualizarPreview();
});

// Toggle menu
menuToggle.addEventListener("click", () => {
  sidebar.classList.toggle("hidden");
  // Expande container quando menu oculto
  if (sidebar.classList.contains("hidden")) {
    document.getElementById("editorContainer").style.marginLeft = "0";
  } else {
    document.getElementById("editorContainer").style.marginLeft = "";
  }
});

// Inicializa
atualizarPreview();
