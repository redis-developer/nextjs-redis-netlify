import Head from "next/head";
import Header from "@components/Header";
import Example from "@components/Example";

export default function Home() {
  return (
    <>
      <Head>
        <title>Next.js + Tailwind + Redis Starter!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="mx-auto max-w-3xl">
        <Header title="Next.js + Tailwind + Redis Starter!" />
        <Example />
      </main>
    </>
  );
}
