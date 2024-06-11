import React, { useEffect } from "react";
import { ConnectButton } from "@particle-network/connect-react-ui";
import { useAccount } from "@particle-network/connect-react-ui";
import { useDispatch, useSelector } from "react-redux";
import { root } from "../store/store";
import { setUserId } from "@/store/slices/statesSlice";

const WalletLogin = () => {
  const account = useAccount();

  const dispatch = useDispatch();

  const userId = useSelector((state) => state.generalStates.userId);
  // console.log(userId);

  useEffect(() => {
    dispatch(setUserId(account));
  }, [account]);

  return <ConnectButton />;
};

export default WalletLogin;
