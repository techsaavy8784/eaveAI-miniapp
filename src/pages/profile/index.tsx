import { type ReactNode, useMemo, JSX, useState, useEffect } from "react";
import { useInitData, type User, useLaunchParams } from "@tma.js/sdk-react";
import CardWrapper from "@/components/CardWrapper";
import { truncateAddress } from "@/lib/utils";

import {
  DisplayData,
  type DisplayDataRow,
} from "@/components/DisplayData/DisplayData";
import { Link } from "@/components/Link/Link";
import { Page } from "@/components/Page/Page";

import styles from "./styles.module.css";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PiWalletBold } from "react-icons/pi";
import { CgCreditCard } from "react-icons/cg";
import { LuCalendar } from "react-icons/lu";
import useUserStore from "@/store/useStore";
import api from "@/lib/api";

type T_UserInforItem = {
  icon: JSX.Element;
  title: string;
  value: string | undefined;
  wallet?: boolean;
};

const UserInforItem: React.FC<T_UserInforItem> = ({
  icon,
  title,
  value,
  wallet,
}) => {
  return (
    <div className="flex w-full justify-between">
      <div className="flex items-center gap-1 text-white">
        {icon}
        <p className="text-[13px] leading-4">{title}</p>
      </div>
      <div className="w-28 flex justify-end items-center overflow-hidden">
        <p className="text-white truncate text-[17px] leading-6">
          {wallet ? truncateAddress(value ?? "") : value}
        </p>
      </div>
    </div>
  );
};

type T_UserData = {
  id: number;
  telegram_entity_id: string;
  telegram_username: string;
  wallet_address: string | null;
  encrypted_private_key: string | null;
  subscription_end: string | null;
  notifications_enabled: boolean;
  plan: string | null;
};

export default function ProfilePage() {
  const [userData, setUserData] = useState<T_UserData>();

  const { userId, username } = useUserStore((state: any) => ({
    userId: state.userId,
    username: state.username,
  }));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(
          `/get_by_telegram_entity_id/?telegram_entity_id=${userId}`
        );

        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Page
    // title="Init Data"
    // disclaimer={
    //   <>
    //     This page displays application{" "}
    //     <Link href="https://docs.telegram-mini-apps.com/platform/init-data">
    //       init data
    //     </Link>
    //     .
    //   </>
    // }
    >
      {/* {contentNode} */}
      <CardWrapper className="flex h-[410px] flex-col gap-2 justify-between items-center bg-[#0F0F0F] pt-4">
        <Avatar className="w-[113px] h-[113px]">
          <AvatarImage src={"/images/avatar-lg.png"} />
          <AvatarFallback>Host</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-1 items-center">
          <span className="text-white text-sm font-semibold">@{username}</span>
          <p className="text-[#AAAAAA] text-xs">{userData?.plan ?? "N/A"}</p>
        </div>
        <CardWrapper className="bg-background h-[60px]">
          <UserInforItem
            icon={<PiWalletBold className="w-6 h-6 stroke-1" />}
            title="Connected Wallet"
            value={userData?.wallet_address ?? "N/A"}
            wallet={true}
          />
        </CardWrapper>
        <CardWrapper className="bg-background h-[60px]">
          <UserInforItem
            icon={<CgCreditCard className="w-6 h-6 stroke-1" />}
            title="Payment Method"
            value="ETH"
          />
        </CardWrapper>
        <CardWrapper className="bg-background h-[60px]">
          <UserInforItem
            icon={<LuCalendar className="w-6 h-6 stroke-2" />}
            title="Subscription Ending"
            value={userData?.subscription_end ?? "N/A"}
          />
        </CardWrapper>
      </CardWrapper>

      <div className="flex flex-1 w-full flex-col justify-end items-center p-2 gap-2.5">
        <button className="w-full h-[50px] rounded-md bg-[#6174EC] text-white text-sm font-semibold">
          Upgrad Plan
        </button>
        <button className="w-full h-[50px] rounded-md bg-[#6174EC26] text-[#6174EC] text-sm font-semibold">
          Renew Plan
        </button>
      </div>
    </Page>
  );
}
