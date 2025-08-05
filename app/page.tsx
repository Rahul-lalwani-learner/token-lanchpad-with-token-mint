import { WalletContextProvider } from "./component/WalletProvider";
import { NavBar } from "./component/Navbar";
import { LanchPad } from "./component/LanchPad";

export default function Home(){
  return (
    <WalletContextProvider>
      <NavBar/>
      <LanchPad/>
    </WalletContextProvider>
  );
}