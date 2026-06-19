const publicationForm = document.querySelector("#publicationForm");
const previewArea = document.querySelector("#previewArea");
const codeOutput = document.querySelector("#codeOutput");
const copyCode = document.querySelector("#copyCode");

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function buildPost({ date, title, description, buttonText, buttonLink }) {
  return `<article class="post-card">
  <p class="post-date">${escapeHtml(date)}</p>
  <h3>${escapeHtml(title)}</h3>
  <p>
    ${escapeHtml(description)}
  </p>
  <a href="${escapeHtml(buttonLink)}" target="_blank" rel="noopener">${escapeHtml(buttonText)}</a>
</article>`;
}

publicationForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(publicationForm);
  const post = {
    date: formData.get("date").toString().trim(),
    title: formData.get("title").toString().trim(),
    description: formData.get("description").toString().trim(),
    buttonText: formData.get("buttonText").toString().trim(),
    buttonLink: formData.get("buttonLink").toString().trim(),
  };

  const html = buildPost(post);
  previewArea.innerHTML = html;
  codeOutput.value = html;
});

copyCode?.addEventListener("click", async () => {
  if (!codeOutput.value.trim()) {
    return;
  }

  await navigator.clipboard.writeText(codeOutput.value);
  copyCode.textContent = "Code copie";

  setTimeout(() => {
    copyCode.textContent = "Copier le code";
  }, 1800);
});
