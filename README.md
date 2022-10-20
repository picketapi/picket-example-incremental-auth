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

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

