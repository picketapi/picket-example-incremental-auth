# Picket Incremental Auth Demo

## Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/picketapi/picket-example-incremental-auth.git
cd picket-example-incremental-auth
```

### 2. Install Dependencies

From the root directory, run
```bash
npm i
```

### 3. Add Your Picket API Key

1. Navigate to the [projects section of your Picket account](https://picketapi.com/dashboard#projects). 
2. Copy the **Publishable Key** from on of your projects
3. Create a local `.env` file with your API key by running

```bash
echo "NEXT_PUBLIC_PICKET_PUBLISHABLE_KEY=YOUR_PUBLISHABLE_KEY_GOES_HERE" >> .env
```

### 4. Run the Development Server

```bash
npm run dev
```

### 5. View the App

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### 6. Modifying the App

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file. Feel free to modify the app as much as you like to learn about Picket. 

One idea for how to change the app is to add a token that you have access to!

#### Modifying the Demo Tokens

For the demo, we picked three popular Ethereum mainnet tokens: ENS, Doodles, and BYAC. You'll find these tokens defined at the top of `pages/index.tsx`. 

Let's say we want to remove BYAC in favor of the [Okay Zombie Bears Club](https://opensea.io/collection/okay-zombie-bears-club). We can do this by modifying the `tokens` variable in `pages/index.tsx`

```tsx
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
  // Replace BYAC with Okay Zombie Bears Club
  {
    name: "Okay Zombie Bears Club",
    image: "https://i.seadn.io/gcs/files/e7732689e69a07bd104e2fc7c0302912.gif?auto=format&w=3840",
    description:
      "Infected, diseased, dead, and brought back to life. Join the Zombie Bear Club.",
    contractAddress: "0x8137A2fDC9111aAa8BeeD9eb72905F2C391FD55F",
  },
];
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. [Okay Zombie Bears Club](https://opensea.io/collection/okay-zombie-bears-club) is an example NFT, but try it out with an NFT or SPL token that you own!
