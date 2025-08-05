import { NavBar } from "../component/Navbar";
import { LanchPad } from "../component/LanchPad";
import { NetworkStatus } from "../component/NetworkStatus";

export default function TokenPage() {
  return (
    <>
      <NavBar />
      <div className="py-8">
        <LanchPad />
      </div>
      <NetworkStatus />
    </>
  );
}
