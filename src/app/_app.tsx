import { AppProps } from "next/app"
import Head from "next/head"
import { useRouter } from "next/navigation"
import { Suspense } from "react"

function MyApp({ Component, pageProps }: AppProps) {
    const router = useRouter()
    return (
      <Suspense>
        <Head>
             <title>{pageProps?.title}</title>
             <meta name="description"  content={pageProps?.description}/>
             <meta property="og:title" content={pageProps?.title} />
        </Head>
        <Component {...pageProps} />
      </Suspense>
    )
  }
  