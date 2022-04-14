import { useContext } from "preact/hooks";
import { WalletContext } from "./walletContext.js";

export default function ConnectTestBtn() {
  const [address, connect] = useContext(WalletContext);
  return (
    <>
      <button onClick={connect}>{address ? address : "连接钱包"}</button>
    </>
  );
}
