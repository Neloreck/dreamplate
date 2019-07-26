const rawStr = localStorage.getItem(btoa("theme")) || null;

if (rawStr) {

  const theme = JSON.parse(atob(rawStr));

  // Set correct DOM colors.
  document.body.style.backgroundColor = theme.palette.background.default;
  document.body.style.color = theme.palette.text.primary;
  document.head.getElementsByTagName("meta")["theme-color" as any].content = theme.palette.primary.main;
}
