import { useEffect } from "react";

export default function useExternalScripts({ url }: any) {
  useEffect(() => {
    const head: any = document.querySelector("head");
    const script: any = document.createElement("script");

    script.setAttribute("src", url);
    head.appendChild(script);

    return () => {
      head.removeChild(script);
    };
  }, [url]);
}
