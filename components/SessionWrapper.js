"use client";

// import { SessionProvider } from "next-auth/react"

// export default function SessionWrapper({ children }) {
//   return (
//     <SessionProvider>
//       {children}
//     </SessionProvider>
//   )
// }
import { SessionProvider } from "next-auth/react"
export default function SessionWrapper({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session} basePath="/api/auth">
      <Component {...pageProps} />
    </SessionProvider>
  )
}