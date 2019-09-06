import { IApplicationTheme } from "@Lib/theme";

export const initTheme = () => {

  const rawStr = localStorage.getItem(btoa("theme")) || null;

  if (rawStr) {

    const theme: IApplicationTheme = JSON.parse(atob(rawStr));

    document.body.style.backgroundColor = theme.palette.background.default;
    document.body.style.color = theme.palette.text.primary;
    document.head.getElementsByTagName("meta")["theme-color" as any].content = theme.palette.primary.main;
  }
};
