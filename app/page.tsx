import { NavBar } from "./component/Navbar";
import { NetworkStatus } from "./component/NetworkStatus";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <NavBar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/20"></div>
          <div className="relative px-6 py-24 sm:py-32 lg:px-8">
            <div className="mx-auto max-w-4xl text-center">
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl animate-fade-in">
                Launch Your
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                  Solana Token
                </span>
                in Minutes
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-300 max-w-2xl mx-auto animate-slide-in">
                Create, deploy, and manage SPL tokens on Solana with our easy-to-use launchpad. 
                No coding required - just fill out a form and launch your token to the world.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6 animate-fade-in">
                <Link
                  href="/token"
                  className="rounded-lg px-6 py-3 text-base font-semibold text-white shadow-sm from-blue-500 via-purple-500 to-pink-500  bg-gradient-to-r transition-all duration-500  hover:shadow-lg "
                >
                  Launch Token Now
                </Link>
                <a
                  href="#features"
                  className="text-base font-semibold leading-6 text-gray-300 hover:text-white transition-colors"
                >
                  Learn more <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 sm:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/8 via-purple-600/8 to-pink-600/15"></div>
          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Everything you need to launch
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-300">
                Our platform provides all the tools and features you need to create and manage your Solana tokens.
              </p>
            </div>
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
              <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                <div className="flex flex-col card animate-fade-in bg-gradient-to-br from-blue-600/15 via-purple-600/8 to-pink-600/5 border-blue-500/20">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">
                    <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-purple-600">
                      <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                      </svg>
                    </div>
                    Easy Token Creation
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-300">
                    <p className="flex-auto">
                      Create SPL tokens with just a few clicks. No coding knowledge required - simply fill out our intuitive form.
                    </p>
                  </dd>
                </div>
                <div className="flex flex-col card animate-fade-in bg-gradient-to-br from-purple-600/15 via-pink-600/8 to-blue-600/5 border-purple-500/20">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">
                    <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-gradient-to-r from-purple-600 to-pink-600">
                      <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    Instant Minting
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-300">
                    <p className="flex-auto">
                      Mint tokens instantly to any wallet address. Perfect for airdrops, rewards, or initial distribution.
                    </p>
                  </dd>
                </div>
                <div className="flex flex-col card animate-fade-in bg-gradient-to-br from-pink-600/15 via-blue-600/8 to-purple-600/5 border-pink-500/20">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">
                    <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-gradient-to-r from-pink-600 to-blue-600">
                      <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.623 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                      </svg>
                    </div>
                    Secure & Reliable
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-300">
                    <p className="flex-auto">
                      Built on Solana&apos;s robust infrastructure with best-in-class security practices and reliable performance.
                    </p>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        {/* Network Features */}
        <section className="py-24 sm:py-32 border-t border-gray-800/50 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/6 via-purple-600/6 to-pink-600/12"></div>
          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:mx-0">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Multi-Network Support
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-300">
                Test your tokens on Devnet or deploy directly to Mainnet when you&apos;re ready to go live.
              </p>
            </div>
            <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-2">
              <div className="card bg-gradient-to-br from-blue-600/12 via-purple-600/8 to-pink-600/4 border-blue-500/30">
                <div className="flex items-center gap-x-3 mb-4">
                  <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-purple-600">
                    <span className="text-white font-bold text-sm">D</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white">Devnet</h3>
                </div>
                <p className="text-gray-300 mb-4">
                  Perfect for testing and development. Use fake SOL to experiment with token creation and minting without any cost.
                </p>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li className="flex items-center gap-x-2">
                    <svg className="h-4 w-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Free testing environment
                  </li>
                  <li className="flex items-center gap-x-2">
                    <svg className="h-4 w-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    No real costs
                  </li>
                  <li className="flex items-center gap-x-2">
                    <svg className="h-4 w-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Ideal for learning
                  </li>
                </ul>
              </div>
              <div className="card bg-gradient-to-br from-purple-600/12 via-pink-600/8 to-blue-600/4 border-purple-500/30">
                <div className="flex items-center gap-x-3 mb-4">
                  <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-gradient-to-r from-purple-600 to-pink-600">
                    <span className="text-white font-bold text-sm">M</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white">Mainnet</h3>
                </div>
                <p className="text-gray-300 mb-4">
                  Ready for production. Deploy your tokens to the live Solana network where they can be traded and used.
                </p>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li className="flex items-center gap-x-2">
                    <svg className="h-4 w-4 text-pink-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Live production environment
                  </li>
                  <li className="flex items-center gap-x-2">
                    <svg className="h-4 w-4 text-pink-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Real SOL costs
                  </li>
                  <li className="flex items-center gap-x-2">
                    <svg className="h-4 w-4 text-pink-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Tradeable tokens
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 sm:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/4 via-purple-600/4 to-pink-600/8"></div>
          <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Ready to launch your token?
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
                Join thousands of developers and creators who have launched their tokens on Solana using our platform.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link
                  href="/token"
                  className="rounded-lg bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:from-blue-500 hover:via-purple-500 hover:to-pink-500 transition-all duration-200 hover:scale-105 hover:shadow-lg"
                >
                  Get Started Now
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/2 via-purple-600/2 to-pink-600/4"></div>
        <div className="relative mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="text-xl font-bold text-white">SolLaunch</span>
            </div>
            <p className="text-sm leading-6 text-gray-400">
              &copy; 2025 SolLaunch. Built on Solana.
            </p>
          </div>
        </div>
      </footer>

      <NetworkStatus />
    </>
  );
}