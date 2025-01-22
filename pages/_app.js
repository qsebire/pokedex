import "../styles/globals.css";
import Head from "next/head";

function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Pokedex</title>
        <link rel="icon" href="/avatar.png"></link>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default App;
