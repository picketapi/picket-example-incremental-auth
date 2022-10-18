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
        <title>Incremental Auth | Picket API</title>
        <meta
          name="description"
          content="Incremental Auth with Picket API Example"
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="shortcut icon" href="/favicon.ico" />

        {/* Social metadata */}
        <meta property="og:title" content="Incremental Auth | Picket API" />
        <meta
          property="og:description"
          content="Incremental Auth Demo with Picket API"
        />
        <meta property="og:site_name" content="Incremental Auth | Picket" />
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
          content="Incremental Auth Demo with Picket API"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:image"
          content="https://incremental-auth-demo.picketapi.com/social.png"
        />
      </Head>
      {user ? (
        <div className="text-base z-10 fixed top-0 right-2 py-4 flex items-center space-x-4">
          <div className="bg-gray-300 rounded-xl px-3 py-2">
            {displayAddress(user.displayAddress)}
          </div>
          <button
            className="px-3 py-2 bg-picket-purple text-white rounded-xl"
            onClick={() => logout()}
          >
            Logout to Switch Wallets
          </button>
        </div>
      ) : (
        <div className="text-base z-10 fixed top-0 right-2 py-4 flex items-center space-x-4">
          <button
            onClick={() => login()}
            className="bg-picket-purple text-white rounded-xl px-3 py-2"
          >
            Login With Your Wallet
          </button>
        </div>
      )}

      <main className="py-8 text-left flex flex-col justify-start items-center mx-8 lg:mx-auto">
        <div className="pt-10 lg:pt-0 text-6xl">🔐</div>
        <h1 className="text-4xl pb-8 pt-4">
          Welcome to the{" "}
          <span className="text-picket-purple">
            <a className="text-picket-purple" href="https://picketapi.com">
              Picket
            </a>{" "}
            Incremental Auth
          </span>{" "}
          Example
        </h1>
        <h2 className="text-2xl pb-4 text-gray-700">
          💭 What is Incremental Auth?
        </h2>
        <p className="max-w-xl text-lg pb-6 text-left leading-snug">
          The best example of{" "}
          <span className="underline">incremental auth</span> is a Web3
          community site. Imagine every NFT has its own community site and only
          token holders can access their respective community site and content.
          <br />
          <br />
          Picket <span className="underline">incremental auth</span> makes it
          simple to manage access across different token gated communities and
          content. With Picket{" "}
          <span className="underline">incremental auth</span>, users login once
          and gradually prove token ownership, or authorize, to get access to
          different gated content. Once users prove token ownership, they don
          {"'"}t need to re-authorized until they logout.
        </p>

        <h2 className="text-2xl pu-8">🏰 Example Communities</h2>
        <div className="mx-auto mt-12 grid max-w-md gap-8 px-4 sm:max-w-lg sm:px-6 lg:max-w-7xl lg:grid-cols-3 lg:px-8">
          {tokens.map(({ name, image, description, contractAddress }) => (
            <button
              key={contractAddress}
              onClick={() => authorize(contractAddress)}
              className="relative"
            >
              <div className="flex flex-col overflow-hidden rounded-2xl shadow-lg text-left">
                <div className="flex-shrink-0 relative ">
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
