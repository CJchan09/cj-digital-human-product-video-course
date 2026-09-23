(() => {
  const dialog = document.querySelector(".image-dialog");
  const dialogImage = document.querySelector(".dialog-image");
  const dialogCaption = document.querySelector(".dialog-caption");
  let lastOpener = null;

  document.querySelectorAll(".image-zoom[data-image]").forEach((button) => {
    button.addEventListener("click", () => {
      if (!dialog || typeof dialog.showModal !== "function") return;
      lastOpener = button;
      dialogImage.src = button.dataset.image;
      dialogImage.alt = button.querySelector("img")?.alt || button.getAttribute("aria-label") || "项目图片";
      dialogCaption.textContent = button.dataset.caption || "查看项目图片";
      dialog.showModal();
    });
  });

  document.querySelector(".dialog-close")?.addEventListener("click", () => dialog?.close());
  dialog?.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
  dialog?.addEventListener("close", () => {
    dialogImage.removeAttribute("src");
    lastOpener?.focus();
  });

  const videos = [...document.querySelectorAll("video")];
  videos.forEach((video) => {
    video.addEventListener("play", () => {
      videos.forEach((other) => {
        if (other !== video && !other.paused) other.pause();
      });
    });
  });

  document.querySelectorAll(".copy-button").forEach((button) => {
    button.addEventListener("click", async () => {
      const status = button.parentElement.querySelector(".copy-status");
      try {
        const prompt = button.dataset.copy || button.parentElement.querySelector("pre")?.textContent;
        if (!prompt) throw new Error("提示词内容不存在");
        await navigator.clipboard.writeText(prompt);
        status.textContent = "已复制";
      } catch {
        status.textContent = "复制未成功；请手动选中上方文字";
      }
    });
  });
})();
