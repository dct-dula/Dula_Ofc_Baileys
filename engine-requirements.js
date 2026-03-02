const major = parseInt(process.versions.node.split('.')[0], 10);

if (major < 20) {
  console.error(`
╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║   ⚡️  NODE.JS VERSION DETECTED: v${process.versions.node.padEnd(8)}                    ║
║                                                              ║
║   ⚠️  This package requires Node.js 20 or higher            ║
║                                                              ║
║   ❌ Current version doesn't meet requirements              ║
║                                                              ║
║   🚀  Recommended: Install Node.js 20+ (LTS preferred)     ║
║   📦  Download: https://nodejs.org/                         ║
║   🔧  Using nvm: nvm install 20 && nvm use 20               ║
║                                                              ║
║   ✨  Quick fix:                                             ║
║       • Upgrade your Node.js installation                    ║
║       • Or use a version manager (nvm, fnm, etc.)           ║
║                                                              ║
║   🎯  After upgrading, run your command again!              ║
║                                                              ║
║   ⏸️  Exiting to prevent unexpected behavior...             ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
`);
  process.exit(1);
}