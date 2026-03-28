# Scam · Steal · Scheme

An interactive ternary triangle where the public votes on whether stories are a **Scam**, a **Steal**, or a **Scheme**.

## Live Site

[www.scamstealscheme.com](https://www.scamstealscheme.com)

## How It Works

1. Read a story
2. Tap the triangle where you think it belongs
3. Lock in your answer
4. See three results: **Your Pick** (cyan), **Official** (pink), **Public Average** (gold)

## Tech Stack

- Single-page HTML app (GitHub Pages)
- Firebase Firestore for persistent data (votes, stories, submissions)
- No auth required — anonymous voting via random visitor ID

## Firebase Setup (Required for Persistence)

The app runs with mock data out of the box. To enable real persistence:

### 1. Create a Firebase project
- Go to [console.firebase.google.com](https://console.firebase.google.com)
- Click "Create a project" and follow the steps

### 2. Enable Firestore
- In Firebase console, go to **Build > Firestore Database**
- Click "Create database"
- Choose production mode
- Select a region close to your users

### 3. Get your web app config
- Go to **Project Settings > General**
- Under "Your apps", click the web icon (`</>`)
- Register an app (any name)
- Copy the `firebaseConfig` object

### 4. Paste config into index.html
Find this block near the top of the `<script>` section:

```js
const FIREBASE_CONFIG = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "000000000000",
  appId: "YOUR_APP_ID"
};
```

Replace with your actual values.

### 5. Set Firestore security rules
In Firebase console, go to **Firestore > Rules** and paste the contents of `firestore.rules` from this repo.

### 6. Seed initial stories
Run the seed script to add your first stories:

```bash
node seed-stories.js
```

## Firestore Data Model

### `stories/{storyId}`
```
{
  title: "Story headline",
  summary: "Story description",
  source: "AP NEWS",
  date: "MAR 28, 2026",
  official: { scam: 75, scheme: 15, steal: 10 },
  status: "live" | "pending",
  createdAt: Timestamp
}
```

### `stories/{storyId}/votes/{visitorId}`
```
{
  scam: 68,
  scheme: 20,
  steal: 12,
  votedAt: Timestamp
}
```

### `submissions/{submissionId}`
```
{
  type: "xpost" | "url" | "text",
  content: "https://x.com/...",
  submittedBy: "v_abc123",
  status: "pending" | "approved" | "rejected",
  createdAt: Timestamp
}
```

## Admin Mode

Add `?admin=true` to the URL to see the admin queue with live stories, pending stories, and user submissions.

## Custom Domain (GoDaddy)

DNS records needed:

| Type  | Name | Value                    |
|-------|------|--------------------------|
| CNAME | www  | paulhinrichsen.github.io |
| A     | @    | 185.199.108.153          |
| A     | @    | 185.199.109.153          |
| A     | @    | 185.199.110.153          |
| A     | @    | 185.199.111.153          |
