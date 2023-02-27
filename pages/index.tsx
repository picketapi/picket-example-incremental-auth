import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";

import { usePicket } from "@picketapi/picket-react";
import TokenGatedBadge from "../components/TokenGatedBadge";
import AuthorizedBadge from "../components/AuthorizedBadge";
import AccessDeniedBadge from "../components/AccessDeniedBadge";

const displayAddress = (address: string) => {
  return address.startsWith("0x")
    ? address.slice(0, 6) + "..." + address.slice(-4)
    : address;
};

const tokens = [
  {
    name: "ENS",
    image: "/ens.svg",
    description:
      "Ethereum Name Service is decentralised naming for wallets, websites, & more",
    contractAddress: "0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85",
  },
  {
    name: "Doodles",
    image: "/doodles.webp",
    description:
      "Doodles is a community-driven collectibles project featuring art by Burnt Toast",
    contractAddress: "0x8a90cab2b38dba80c64b7734e58ee1db38b8992e",
  },
  {
    name: "BYAC",
    image: "/byac.jpeg",
    description:
      "The Bored Ape Yacht Club is a collection of 10,000 unique Bored Ape NFTs",
    contractAddress: "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d",
  },
];

const Home: NextPage = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const {
    login,
    logout,
    isAuthenticated,
    isAuthorized,
    isAlreadyAuthorized,
    authState,
  } = usePicket();
  const { user } = authState || {};

  const authorize = async (contractAddress: string) => {
    // make sure user is logged in
    if (!isAuthenticated) {
      const data = await login();
      // do nothing if user cancels login
      if (!data) return;
    }

    const allowed = await isAuthorized({
      requirements: {
        contractAddress,
      },
    });

    if (!allowed) {
      setErrors({ ...errors, [contractAddress]: "User is not authorized" });
      return;
    }

    setErrors({ ...errors, [contractAddress]: "" });

    // success state
    // if you have token gated pages, you can redirect the user to those pages
  };

  useEffect(() => {
    if (!user) {
      // clear errors if user logs out
      setErrors({});
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-purple-50 text-[#3A3A3A]">
      <Head>
        <title>Incremental Authorization | Picket API</title>
        <meta
          name="description"
          content="Incremental Authorization with Picket API Example"
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="shortcut icon" href="/favicon.ico" />

        {/* Social metadata */}
        <meta
          property="og:title"
          content="Incremental Authorization | Picket API"
        />
        <meta
          property="og:description"
          content="Incremental Authorization Demo with Picket API"
        />
        <meta
          property="og:site_name"
          content="Incremental Authorization | Picket"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://incremental-auth-demo.picketapi.com"
        />
        <meta
          name="image"
          property="og:image"
          content="https://incremental-auth-demo.picketapi.com/social.png"
        />
        <meta property="og:image:type" content="image/png" />
        <meta
          property="og:image:alt"
          content="Incremental Authorization Demo with Picket API"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:image"
          content="https://incremental-auth-demo.picketapi.com/social.png"
        />
        <link rel="preconnect" href="https://rsms.me/" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </Head>
      <div className="fixed top-auto bottom-0 left-2 z-10 flex items-center space-x-4 py-4 text-sm sm:top-0 sm:bottom-auto sm:text-base">
        <a
          href="https://picketapi.com"
          target="_blank"
          rel="noopener noreferrer"
          className="border-grey-300 flex items-center space-x-4 rounded-xl border bg-white px-5 py-2"
        >
          <img src="/favicon.ico" alt="Picket API" className="h-5" />
          <span>Build with Incremental Authz &rarr;</span>
        </a>
      </div>
      {user ? (
        <div className="fixed bottom-12 right-auto left-2 z-10 flex items-center space-x-4 py-4 text-sm sm:top-0 sm:bottom-auto sm:right-2 sm:left-auto sm:text-base">
          <div className="rounded-xl bg-gray-300 px-5 py-2">
            {displayAddress(user.displayAddress)}
          </div>
          <button
            className="rounded-xl bg-picket-purple px-5 py-2 text-white"
            onClick={() => logout()}
          >
            Logout to Switch Wallets
          </button>
        </div>
      ) : (
        <div className="fixed bottom-12 right-auto left-2 z-10 flex items-center space-x-4 py-4 text-sm sm:top-0 sm:bottom-auto sm:right-2 sm:left-auto sm:text-base">
          <button
            onClick={() => login()}
            className="rounded-xl bg-picket-purple px-5 py-2 text-white"
          >
            Login With Your Wallet
          </button>
        </div>
      )}

      <main className="mx-8 flex flex-col items-start justify-start pt-8 pb-20 text-left sm:items-center lg:mx-auto">
        <div className="text-4xl sm:text-6xl">🔐</div>
        <h1 className="pb-8 pt-4 text-3xl sm:text-4xl">
          Welcome to the{" "}
          <span className="text-picket-purple">
            <a className="text-picket-purple" href="https://picketapi.com">
              Picket
            </a>{" "}
            Incremental Authorization
          </span>{" "}
          Example
        </h1>
        <h2 className="mb-6 text-2xl text-gray-700">
          💭 What is Incremental Authorization?
        </h2>
        <p className="max-w-xl text-left text-lg leading-snug">
          The best example of{" "}
          <span className="underline">incremental authorization</span> is a Web3
          community site. Imagine every NFT has an exclusive community site.
          Only token holders can access their NFTs{"'"} respective communities
          and content. With an infinite number of possible NFT-based
          communities, it would be impossible to check if a user has access to
          every community on the site at once; instead, we want to verify a user
          {"'"}s token ownership <span className="italic">incrementally</span>.
          <br />
          <br />
          Picket <span className="underline">
            incremental authorization
          </span>{" "}
          managing access across different token-gated communities and content
          simple. With Picket{" "}
          <span className="underline">incremental authorization</span>, users
          log in once and gradually prove token ownership to access various
          token-gated communities.
          <br />
          <br />
          Once users prove token ownership, they don
          {"'"}t need to be re-authorized until they log out. Picket handles the
          complexity of caching, refreshing, and validating token balances for a
          developers.
          <br />
          <br />
          <a
            href="https://docs.picketapi.com/picket-docs/reference/concepts/incremental-authorization"
            target="_blank"
            rel="noopener noreferrer"
            className="text-picket-purple underline"
          >
            Learn more &rarr;
          </a>
        </p>

        <h2 className="my-6 text-2xl">🏰 Example Communities</h2>
        <p className="max-w-xl text-left text-lg leading-snug">
          Each card below represents a token gated community. Click on a
          community card to check if you have access. If you have access, you
          {"'"}ll see a success message and your Picket session will be updated
          to allow you access to that community.
        </p>
        <div className="mx-auto mt-12 grid max-w-md gap-8 px-4 sm:max-w-lg sm:px-6 lg:max-w-7xl lg:grid-cols-3 lg:px-8">
          {tokens.map(({ name, image, description, contractAddress }) => (
            <button
              key={contractAddress}
              onClick={() => authorize(contractAddress)}
              className="relative"
            >
              <div className="flex flex-col overflow-hidden rounded-2xl text-left shadow-lg">
                <div className="relative flex-shrink-0 ">
                  <img
                    className="h-48 w-full object-cover"
                    src={image}
                    alt={name}
                  />
                  <div className="absolute -bottom-5 right-4">
                    {isAlreadyAuthorized({ contractAddress }) && (
                      <AuthorizedBadge />
                    )}
                    {!isAlreadyAuthorized({ contractAddress }) &&
                      !errors[contractAddress] && <TokenGatedBadge />}
                    {!isAlreadyAuthorized({ contractAddress }) &&
                      errors[contractAddress] && <AccessDeniedBadge />}
                  </div>
                </div>
                <div className="flex flex-1 flex-col justify-between bg-white p-6">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-600">
                      {displayAddress(contractAddress)}
                    </p>
                    <div className="mt-2 block">
                      <p className="text-xl font-semibold text-gray-900">
                        {name}
                      </p>
                      <p className="mt-3 text-base text-gray-500">
                        {description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
};
export default Home;
