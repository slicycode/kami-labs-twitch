import Navbar from "./components/Navbar"
import Head from "next/head"
import LiveOn from "./components/LiveOn"

export default function Home() {
  return (
    <div>
      <Head>
        <title>WOTLK Classic : lives</title>
      </Head>

      <Navbar />
      <LiveOn />
    </div>
  )
}
