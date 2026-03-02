# 🚀 DCT Dula Baileys - Advanced WhatsApp API

<div align="center">

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js->=20.0.0-green.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](#)
[![WhatsApp](https://img.shields.io/badge/WhatsApp-API-25D366.svg)](#)

**A powerful, feature-rich WhatsApp Web API for Node.js with Desktop App Support**

[Features](#-features) • [Installation](#-installation) • [Quick Start](#-quick-start) • [Desktop App](#-desktop-app) • [API Docs](#-api-documentation) • [Support](#-support)

</div>

---

## 📋 Table of Contents

- [Features](#-features)
- [Requirements](#-requirements)
- [Installation](#-installation)
- [Quick Start](#-quick-start)
- [Desktop Application](#-desktop-app)
- [API Documentation](#-api-documentation)
- [Newsletter Features](#-newsletter-features)
- [Button Messages](#-button-messages)
- [Examples](#-examples)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [License](#-license)
- [Support](#-support)

---

## ✨ Features

### Core Features
- ✅ **WhatsApp Web Integration** - Connect to WhatsApp Web seamlessly
- ✅ **Web & PC Support** - Works on browsers and native desktop app
- ✅ **Desktop Application** - Native Electron-based desktop client
- ✅ **Multiple Message Types** - Text, Media, Buttons, Lists, Templates
- ✅ **Group Management** - Create, modify, and manage groups
- ✅ **Contact Management** - Full contact access and management
- ✅ **Auto-Reply System** - Automated message responses
- ✅ **Newsletter Support** - Auto-follow and auto-react features
- ✅ **QR Code Authentication** - Secure login via QR
- ✅ **Signal Protocol** - End-to-end encryption support

### Newsletter Features
- 🔔 Auto-follow newsletters
- 👍 Auto-react with emojis
- 📊 View statistics
- 📈 Track reactions and views
- 🎯 Manage metadata

### Interactive Messages
- 🔘 Interactive buttons
- 📋 List messages
- 🎨 Rich templates
- 📱 Media sharing

---

## 📦 Requirements

- **Node.js**: >= 20.0.0
- **npm** or **yarn**
- **WhatsApp Account**: Active account
- **Browser**: Modern browser (for Web version)
- Optional: **Electron** (for Desktop App)

## 📥 Installation

### Via NPM
```bash
npm install dct-dula-baileys
```

### Via Yarn
```bash
yarn add dct-dula-baileys
```

### Clone Repository
```bash
git clone <repository-url>
npm install
```

---

## 🚀 Quick Start

### Basic Bot

```javascript
const { makeWASocket, useMultiFileAuthState, DisconnectReason } = require('dct-dula-baileys');
const P = require('pino');

async function startBot() {
  // Auth
  const { state, saveCreds } = await useMultiFileAuthState('baileys-creds');

  // Socket
  const sock = makeWASocket({
    auth: state,
    printQRInTerminal: true,
    logger: P({ level: 'debug' })
  });

  // Connection update
  sock.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect } = update;
    
    if (connection === 'open') {
      console.log('✅ Connected!');
    } else if (connection === 'close') {
      const reason = lastDisconnect?.error?.output?.statusCode;
      if (reason === DisconnectReason.loggedOut) {
        console.log('❌ Logged out');
      }
    }
  });

  // Save credentials
  sock.ev.on('creds.update', saveCreds);

  // Listen for messages
  sock.ev.on('messages.upsert', async (m) => {
    const message = m.messages[0];
    
    if (!message.key.fromMe && message.message) {
      console.log(`📨 ${message.key.remoteJid}: ${message.message.conversation}`);
      
      // Reply
      await sock.sendMessage(message.key.remoteJid, {
        text: 'Thanks for your message!'
      });
    }
  });
}

startBot().catch(console.error);
```

---

## 🖥️ Desktop App

Complete native WhatsApp PC application built with Electron.

### Setup

```bash
cd desktop
npm install
npm start
```

### Features

- 📱 Native desktop interface
- 💬 Chat management
- 👥 Contacts list
- ✉️ Send messages & media
- 🔘 Interactive buttons
- 📊 Real-time status
- 🔐 Secure storage

### Structure

```
desktop/
├── main.js              # Electron process
├── preload.js           # IPC bridge
├── renderer.js          # Frontend logic
├── bot-instance.js      # Baileys integration
├── index.html           # UI
├── styles.css           # Design
└── package.json
```

---

## 📚 API Documentation

### Authentication

#### Create Socket
```javascript
const sock = makeWASocket({
  auth: state,
  printQRInTerminal: true,
  logger: P({ level: 'info' })
});
```

#### Initialize Auth State
```javascript
const { state, saveCreds } = await useMultiFileAuthState('creds');
sock.ev.on('creds.update', saveCreds);
```

### Messaging

#### Send Text
```javascript
await sock.sendMessage(jid, { 
  text: 'Hello World!' 
});
```

#### Send Media
```javascript
const media = require('fs').readFileSync('image.jpg');
await sock.sendMessage(jid, {
  image: media,
  caption: 'Image caption'
});
```

#### Send Buttons
```javascript
await sock.sendMessage(jid, {
  text: 'Choose:',
  buttons: [
    { buttonId: '1', buttonText: { displayText: 'Option 1' }, type: 1 },
    { buttonId: '2', buttonText: { displayText: 'Option 2' }, type: 1 }
  ]
});
```

#### Send List
```javascript
await sock.sendMessage(jid, {
  text: 'Select:',
  sections: [{
    title: 'Options',
    rows: [
      { rowId: '1', title: 'Item 1' },
      { rowId: '2', title: 'Item 2' }
    ]
  }]
});
```

### Events

#### Message Received
```javascript
sock.ev.on('messages.upsert', (m) => {
  console.log('New message:', m.messages[0]);
});
```

#### Message Updated
```javascript
sock.ev.on('messages.update', (m) => {
  console.log('Message updated:', m);
});
```

#### Connection Status
```javascript
sock.ev.on('connection.update', (update) => {
  if (update.qr) console.log('Scan QR');
  if (update.connection === 'open') console.log('Connected');
});
```

### Groups

#### Create Group
```javascript
const groupId = await sock.groupCreate('Group Name', [
  '1234567890@s.whatsapp.net'
]);
```

#### Add Members
```javascript
await sock.groupParticipantsUpdate(
  groupId,
  ['1234567890@s.whatsapp.net'],
  'add'
);
```

#### Remove Members
```javascript
await sock.groupParticipantsUpdate(
  groupId,
  ['1234567890@s.whatsapp.net'],
  'remove'
);
```

#### Update Subject
```javascript
await sock.groupUpdateSubject(groupId, 'New Name');
```

---

## 📰 Newsletter Features

### Follow Newsletter
```javascript
await sock.newsletterFollow('id@newsletter');
```

### React to Message
```javascript
await sock.newsletterReactMessage(
  'id@newsletter',
  'serverId',
  '👍'
);
```

### Get Metadata
```javascript
const data = await sock.newsletterMetadata(
  'type', 'key', 'GUEST'
);
```

### Listen to Events
```javascript
sock.ev.on('newsletter.reaction', ({ id, reaction }) => {
  console.log('Reaction:', reaction);
});

sock.ev.on('newsletter.view', ({ id, count }) => {
  console.log('Views:', count);
});
```

---

## 🔘 Button Messages

### Text Buttons
```javascript
const buttons = [
  { buttonId: '1', buttonText: { displayText: 'Yes' }, type: 1 },
  { buttonId: '2', buttonText: { displayText: 'No' }, type: 1 }
];

await sock.sendMessage(jid, {
  text: 'Your question?',
  buttons,
  footer: 'Choose one'
});
```

### Image Buttons
```javascript
const buttons = [
  { buttonId: '1', buttonText: { displayText: 'View' }, type: 1 }
];

await sock.sendMessage(jid, {
  image: { url: 'https://example.com/image.jpg' },
  caption: 'Beautiful image',
  buttons
});
```

### Video Buttons
```javascript
const buttons = [
  { buttonId: '1', buttonText: { displayText: 'Play' }, type: 1 }
];

await sock.sendMessage(jid, {
  video: { url: 'https://example.com/video.mp4' },
  caption: 'Watch this',
  buttons
});
```

---

## 💡 Examples

### Auto-Reply Bot
```javascript
sock.ev.on('messages.upsert', async (m) => {
  const message = m.messages[0];
  
  if (!message.key.fromMe && message.message) {
    await sock.sendMessage(message.key.remoteJid, {
      text: '🤖 Thanks! We will reply soon.'
    });
  }
});
```

### Newsletter Auto-Follow
```javascript
setTimeout(async () => {
  try {
    await sock.newsletterFollow('120363408629601473@newsletter');
    console.log('✅ Followed!');
  } catch (error) {
    console.error('Error:', error);
  }
}, 5000);
```

### Chat Statistics
```javascript
async function getStats() {
  const chats = await sock.fetchAllChats();
  console.log(`
    📊 Stats
    Total: ${chats.length}
    Groups: ${chats.filter(c => c.isGroup).length}
    Contacts: ${chats.filter(c => !c.isGroup).length}
  `);
}
```

---

## 🛠️ Troubleshooting

### QR Code Issues
- Ensure terminal supports Unicode
- Use `printQRInTerminal: true`
- Try desktop app for visual QR

### Connection Problems
- Check internet
- Clear credentials folder
- Update Node.js
- Restart WhatsApp

### Send Failures
- Verify JID format
- Check permissions
- Ensure phone is online

### Desktop App Issues
```bash
rm -rf node_modules package-lock.json
npm install
npm start
```

---

## 🤝 Contributing

1. Fork repository
2. Create feature branch
3. Commit changes
4. Push branch
5. Open Pull Request

### Development
```bash
npm install
npm run build:tsc
npm test
```

---

## 📄 License

MIT License - See [LICENSE](LICENSE) for details

---

## ⚠️ Disclaimer

- Not affiliated with WhatsApp Inc.
- Use responsibly and follow WhatsApp's ToS
- No spam or illegal activities
- Use at your own risk

---

## 🤖 Support

- 📖 **Documentation**: Read this README
- 🐛 **Issues**: Report on GitHub
- 💬 **Community**: Join discussions
- 📧 **Contact**: See repository
- 📱 **WhatsApp**: Join our channel

### Community

- ⭐ Star if useful
- 🔗 Share with others
- 👥 Contribute
- 💡 Suggest features

---

<div align="center">

**Made with ❤️ by DCT Dula Dev**

[GitHub](https://github.com) • [WhatsApp Channel](https://whatsapp.com/channel/0029VbCbYpSEquiIsz0brA3D) • [Twitter]()

</div>
