# SolLaunch - Solana Token Launchpad

A modern, user-friendly platform for creating and minting SPL tokens on the Solana blockchain. Built with Next.js 15, React 19, and featuring a beautiful dark theme with gradient accents.

## ✨ Features

- **Easy Token Creation**: Create SPL tokens with just a few clicks - no coding required
- **Instant Minting**: Mint tokens directly to any wallet address
- **Multi-Network Support**: Switch between Devnet (testing) and Mainnet (production)
- **Modern UI**: Beautiful dark theme with blue-purple-pink gradient design
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Wallet Integration**: Seamless integration with popular Solana wallets
- **Real-time Network Status**: Visual indicator of current network connection

## 🚀 Tech Stack

- **Frontend**: Next.js 15.4.5 with React 19.1.0
- **Blockchain**: Solana Web3.js, SPL Token library
- **Wallet**: Solana Wallet Adapter with multiple wallet support
- **Styling**: Tailwind CSS with custom CSS variables
- **TypeScript**: Full type safety throughout the application
- **Build Tool**: Turbopack for fast development

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Rahul-lalwani-learner/token-lanchpad-with-token-mint.git
   cd simple-token-lanchpad
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory and add your RPC endpoints:
   ```env
   NEXT_PUBLIC_ALCHEMY_MAINNET_ENDPOINT=your_mainnet_rpc_url
   NEXT_PUBLIC_ALCHEMY_DEVNET_ENDPOINT=your_devnet_rpc_url
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 🎯 Usage

### Landing Page
- Visit the homepage to learn about the platform features
- Explore multi-network support information
- Navigate to the token creation page

### Creating Tokens
1. Navigate to `/token` page
2. Connect your Solana wallet
3. Choose your network (Devnet for testing, Mainnet for production)
4. Fill out the token details:
   - Token Name
   - Token Symbol
   - Token Description
   - Token Image URL
   - Decimals (0-9)
   - Initial Supply
5. Click "Create Token" and confirm the transaction

### Minting Tokens
1. After creating a token, use the minting section
2. Enter the recipient wallet address
3. Specify the amount to mint
4. Click "Mint Tokens" and confirm the transaction

## 🌐 Network Support

- **Devnet**: Perfect for testing and development
  - Free testing environment
  - No real costs
  - Ideal for learning and experimentation

- **Mainnet**: Ready for production
  - Live production environment
  - Real SOL costs for transactions
  - Tradeable tokens

## 📱 Responsive Design

The application is fully responsive and works seamlessly across:
- Desktop computers
- Tablets
- Mobile devices

## 🎨 Design Features

- **Dark Theme**: Professional dark UI with excellent contrast
- **Gradient Accents**: Beautiful blue-purple-pink gradient theme
- **Smooth Animations**: Subtle animations and transitions
- **Modern Typography**: Clean, readable fonts throughout
- **Accessible**: Designed with accessibility in mind

## 🔧 Configuration

### Wallet Adapters
The application supports multiple Solana wallets:
- Phantom
- Solflare
- Backpack
- And more through the Solana Wallet Adapter

### Network Configuration
Switch between networks using the network selector in the navigation bar. The application will warn you when switching to Mainnet to prevent accidental real transactions.

## 📂 Project Structure

```
simple-token-lanchpad/
├── app/
│   ├── component/
│   │   ├── LanchPad.tsx      # Token creation and minting component
│   │   ├── Navbar.tsx        # Navigation with wallet and network controls
│   │   ├── NetworkStatus.tsx # Network status indicator
│   │   └── WalletProvider.tsx # Wallet context provider
│   ├── context/
│   │   └── NetworkContext.tsx # Network state management
│   ├── token/
│   │   └── page.tsx          # Token creation page
│   ├── globals.css           # Global styles and CSS variables
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Landing page
├── public/                   # Static assets
├── .env                      # Environment variables
└── package.json              # Dependencies and scripts
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built on the robust Solana blockchain
- Powered by Next.js and React
- UI components styled with Tailwind CSS
- Wallet integration via Solana Wallet Adapter

## 📞 Support

For support, please open an issue on GitHub or contact the development team.

---

**Happy Token Launching! 🚀**
