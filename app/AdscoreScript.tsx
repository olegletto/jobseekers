"use client";

import Script from "next/script";

export default function AdscoreScript() {
  return (
    <Script
      async
      id="adscore-script"
      src="//c.adsco.re"
      type="text/javascript"
      strategy="beforeInteractive"
      onLoad={() => {
        if (typeof window !== "undefined") {
          // @ts-expect-error — API появляется после загрузки
          AdscoreInit("Qv06BQAAAAAA9Hmnvkz30zdCa_kTrfnRr71Fnfg", {
            async_callback: 1,
          });
        }
      }}
    ></Script>
  );
}
