'use client';

import Script from 'next/script';
import {useLocale} from 'next-intl';

function WhatsAppIcon({size = 29}: {size?: number}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M16.04 3C8.86 3 3.02 8.78 3.02 15.9c0 2.52.74 4.98 2.13 7.08L3 29l6.2-2.03a13.12 13.12 0 0 0 6.83 1.9h.01c7.18 0 13.02-5.79 13.02-12.9C29.06 8.79 23.22 3 16.04 3Zm0 23.69h-.01a10.9 10.9 0 0 1-5.55-1.52l-.4-.24-3.68 1.2 1.22-3.57-.26-.41a10.66 10.66 0 0 1-1.68-5.75c0-5.91 4.64-10.72 10.36-10.72 2.77 0 5.37 1.12 7.33 3.14a10.72 10.72 0 0 1 3.03 7.58c0 5.9-4.65 10.69-10.36 10.69Zm5.68-8.02c-.31-.15-1.85-.89-2.14-.99-.29-.1-.5-.15-.71.16-.21.31-.81.99-.99 1.19-.18.21-.37.23-.68.08-.31-.16-1.32-.48-2.51-1.52a9.4 9.4 0 0 1-1.74-2.11c-.18-.31-.02-.48.14-.63.14-.14.31-.36.47-.54.16-.18.21-.31.31-.52.1-.21.05-.39-.03-.54-.08-.16-.71-1.67-.97-2.29-.25-.61-.51-.53-.71-.54h-.6c-.21 0-.55.08-.84.39-.29.31-1.1 1.05-1.1 2.56 0 1.51 1.13 2.97 1.28 3.18.16.21 2.22 3.32 5.38 4.66.75.32 1.34.51 1.8.65.76.23 1.44.2 1.98.12.61-.09 1.85-.74 2.12-1.45.26-.72.26-1.33.18-1.46-.08-.13-.29-.21-.6-.36Z" />
    </svg>
  );
}

export function FloatingAssist() {
  const locale = useLocale();
  const isHindi = locale === 'hi';

  const whatsappLabel = isHindi
    ? 'WhatsApp पर SystemMaster से बात करें'
    : 'Chat with SystemMaster on WhatsApp';

  return (
    <>
      {/*
        This is the original Shyama AI agent from the user's live website.
        The script injects its own AI launcher + chat window.
      */}
      <Script src="/js/shyama.js" strategy="afterInteractive" id="systemmaster-shyama-agent" />

      <a
        href="https://wa.me/919027965956?text=Hello%20SystemMaster%2C%20I%20would%20like%20to%20know%20more%20about%20your%20products%20and%20services."
        target="_blank"
        rel="noreferrer"
        aria-label={whatsappLabel}
        title={whatsappLabel}
        className="
          group fixed bottom-[20px] right-[20px] z-[99997]
          flex h-[62px] w-[62px] items-center justify-center rounded-full
          bg-[#25D366] text-white
          shadow-[0_10px_30px_rgba(37,211,102,.45)]
          transition duration-200 hover:-translate-y-1 hover:scale-105
          focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/30
          max-[480px]:bottom-[12px] max-[480px]:right-[12px]
        "
      >
        <span
          className="
            pointer-events-none absolute inset-0 rounded-full
            animate-ping bg-[#25D366]/20
            [animation-duration:2.5s]
          "
          aria-hidden="true"
        />
        <span className="relative">
          <WhatsAppIcon />
        </span>

        <span
          className="
            pointer-events-none absolute right-[72px] hidden whitespace-nowrap
            rounded-xl border border-white/10 bg-[#071326]/95 px-3 py-2
            text-xs font-extrabold text-white shadow-xl backdrop-blur-xl
            group-hover:block
          "
        >
          {isHindi ? 'WhatsApp पर चैट करें' : 'Chat on WhatsApp'}
        </span>
      </a>
    </>
  );
}
