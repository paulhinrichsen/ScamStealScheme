#!/usr/bin/env node
/**
 * Seed script for Scam · Steal · Scheme
 *
 * Usage:
 *   1. npm install firebase-admin
 *   2. Download a service account key from Firebase Console
 *      (Project Settings > Service Accounts > Generate new private key)
 *   3. Set the path: export GOOGLE_APPLICATION_CREDENTIALS="./serviceAccountKey.json"
 *   4. Set your project ID below
 *   5. Run: node seed-stories.js
 */

const admin = require('firebase-admin');

// ═══ CONFIG ═══
const PROJECT_ID = 'YOUR_PROJECT_ID'; // <-- Replace with your Firebase project ID

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  projectId: PROJECT_ID
});

const db = admin.firestore();

const SEED_STORIES = [
  {
    title: 'Fake FEMA Agents Collected Donations Door-to-Door After Tornado',
    summary: 'Two men posing as FEMA agents went door-to-door in tornado-ravaged neighborhoods collecting cash donations for "disaster relief." They wore matching polo shirts with fake ID badges and collected over $14,000 before a resident recognized one from an unrelated fraud case.',
    source: 'AP NEWS',
    date: 'MAR 28, 2026',
    official: { scam: 75, scheme: 15, steal: 10 },
    status: 'live',
    createdAt: admin.firestore.FieldValue.serverTimestamp()
  },
  {
    title: 'Crypto Exchange Vanishes Overnight With $230M in Customer Funds',
    summary: 'A mid-size cryptocurrency exchange abruptly shut down its website and social media, leaving 45,000 users unable to access their funds. The CEO\'s identity appears to have been entirely fabricated. Blockchain analysis shows funds being moved through mixers within hours of the shutdown.',
    source: 'REUTERS',
    date: 'MAR 28, 2026',
    official: { scam: 20, scheme: 55, steal: 25 },
    status: 'live',
    createdAt: admin.firestore.FieldValue.serverTimestamp()
  },
  {
    title: 'Hospital Employee Diverted Painkiller Shipments for 3 Years',
    summary: 'A pharmacy technician at a regional hospital systematically rerouted incoming painkiller shipments to a storage unit, replacing them with placebos. The operation went undetected for three years, with the stolen medications sold on the black market netting an estimated $2.1M.',
    source: 'LOCAL 5',
    date: 'MAR 28, 2026',
    official: { scam: 5, scheme: 35, steal: 60 },
    status: 'live',
    createdAt: admin.firestore.FieldValue.serverTimestamp()
  }
];

async function seed() {
  console.log('Seeding stories to Firestore...\n');

  for (const story of SEED_STORIES) {
    const ref = await db.collection('stories').add(story);
    console.log(`  + ${story.title}`);
    console.log(`    ID: ${ref.id}\n`);
  }

  console.log('Done! Stories are now live.');
  process.exit(0);
}

seed().catch(e => {
  console.error('Seed failed:', e);
  process.exit(1);
});
