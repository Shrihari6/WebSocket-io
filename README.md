# WebSocket-io
it is  a realtime chat application Using socket io. which establishes the http connection with server and allows the connected users to exchange their messages.  




---

# KernelChat

**KernelChat** is a minimalist, real-time, end-to-end encrypted web chat application inspired by the **Linux kernel philosophy** (clarity, minimalism, correctness) and the **macOS UI ethos** (smoothness, typography, visual polish).

It is designed as a **secure, zero-knowledge messaging system** where the server acts only as a transport layer and never sees plaintext messages.

---

## Key Features

* Real-time group chat (2–3+ users)
* End-to-end encryption using **AES-256-GCM**
* Per-room shared encryption keys
* Zero-knowledge server (blind relay)
* Socket.IO-based WebSocket communication
* Terminal-style Linux UI with macOS-like smoothness
* Glassmorphism design with blur & motion
* Runtime theme and wallpaper switching
* Lightweight, dependency-minimal architecture

---

## Security Model (Core Design Principle)

KernelChat follows a **client-side cryptography model**.

### What this means:

* Messages are encrypted **before** leaving the browser
* Messages are decrypted **only** in the browser
* The server never has access to plaintext
* Network interception yields only ciphertext
* Message tampering is detected automatically

### Cryptographic Details:

* **Algorithm:** AES-256-GCM
* **Key Derivation:** PBKDF2 (SHA-256, 100k iterations)
* **IV:** Secure random per message
* **Integrity:** Built-in authenticated encryption (GCM)

> ⚠️ SHA-256 is intentionally not used for message encryption, as hashing is irreversible and unsuitable for chat systems.

---

## Architecture Overview

```
Browser (Client)
  ├─ Encrypt message (AES-GCM)
  ├─ Send ciphertext via Socket.IO
  └─ Decrypt received ciphertext locally

Server (Node.js + Express)
  ├─ Accept WebSocket connections
  ├─ Relay encrypted payloads only
  └─ No access to message content
```

This architecture ensures **confidentiality by design**, not by policy.

---

## Tech Stack

### Frontend

* HTML5
* CSS3 (Glassmorphism, blur, transitions)
* Vanilla JavaScript
* Web Crypto API

### Backend

* Node.js
* Express
* Socket.IO

### Cryptography

* Web Crypto API (native browser crypto)
* AES-256-GCM
* PBKDF2 (SHA-256)

---

## Project Structure

```
kernel-chat/
│
├── server/
│   └── index.js          # Express + Socket.IO server
│
├── public/
│   ├── index.html        # UI shell
│   ├── style.css         # Terminal + macOS-style UI
│   ├── app.js            # Client logic + encryption
│   └── wallpapers/       # Theme backgrounds
│
├── package.json
└── README.md
```

---

## Getting Started (Local Setup)

### Prerequisites

* Node.js v18+
* Modern browser (Chrome / Firefox / Edge)

### Installation

```bash
git clone https://github.com/your-username/kernel-chat.git
cd kernel-chat
npm install express socket.io
node server/index.js
```

Open in browser:

```
http://localhost:3000
```

Open the same URL in multiple tabs or devices to test real-time encrypted chat.

---

## Deployment

KernelChat **cannot** be deployed on static hosting platforms.

### Supported Platforms

* Render (recommended)
* Fly.io
* Railway
* DigitalOcean App Platform

### Not Supported

* GitHub Pages ❌
* Vercel (Socket.IO incompatible) ❌

> Recommended: deploy as a single service where the backend serves the frontend.

---

## Current Limitations

This project is intentionally minimal.

* Single shared room key
* No authentication
* No key rotation
* No forward secrecy
* No message persistence

These are **design decisions**, not oversights.

---

## Roadmap (Planned Enhancements)

* ECDH key exchange per room
* Forward secrecy
* Secure room join (`/secure-join`)
* Identity verification (fingerprints / QR)
* Command-based terminal UX
* Message persistence with encrypted storage
* PWA support
* Mobile-first UI refinement

---

## Threat Model (At a Glance)

| Threat             | Mitigated |
| ------------------ | --------- |
| Server compromise  | ✅         |
| Network sniffing   | ✅         |
| Message tampering  | ✅         |
| Malicious client   | ❌         |
| Shared key leakage | ⚠️        |

This is a **learning-oriented secure system**, not a Signal replacement (yet).

---

## Philosophy

> “Simple things should be simple. Complex things should be possible.”

KernelChat prioritizes:

* Correctness over convenience
* Transparency over abstraction
* Security by design, not by patching

---





