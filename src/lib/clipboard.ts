export async function copyToClipboard(text: string) {
  if (!navigator.clipboard) {
    throw new Error("Clipboard is not available in this browser.");
  }

  await navigator.clipboard.writeText(text);
}

export function downloadMarkdown(filename: string, markdown: string) {
  const blob = new Blob([markdown], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}
