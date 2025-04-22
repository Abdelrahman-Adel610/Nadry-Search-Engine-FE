export const getIcon = (url: string) => {
  if (url.includes("github")) return "📂";
  if (url.includes("docs") || url.includes("documentation")) return "📄";
  if (url.includes("learn") || url.includes("edu")) return "📚";
  if (url.includes("tools") || url.includes("kit")) return "🔧";
  if (url.includes("community") || url.includes("forum")) return "👥";
  return "🌐";
};
export const getDomain = (url: string) =>
  new URL(url).hostname.replace("www.", "");
