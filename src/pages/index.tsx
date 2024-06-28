import { Link } from "@/components/Link/Link";
import { Navbar } from "@/components/Navbar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import CardWrapper from "@/components/CardWrapper";

import { type ReactNode, useMemo, JSX, useState, useEffect } from "react";
import { useInitData, type User, useLaunchParams } from "@tma.js/sdk-react";
import {
  DisplayData,
  type DisplayDataRow,
} from "@/components/DisplayData/DisplayData";
import useUserStore from "@/store/useStore";
import api from "@/lib/api";

type T_UserInforItem = {
  icon: JSX.Element;
  title: string;
  value: string;
  wallet?: boolean;
};

const UserInfoCard = () => {
  return (
    <div className="w-full flex justify-between items-center gap-[10px]">
      <Avatar>
        <AvatarImage src={"/images/Avatar.png"} />
        <AvatarFallback>Host</AvatarFallback>
      </Avatar>
      <div className="flex flex-1 flex-col gap-1 text-sm">
        <p className="text-white font-semibold">@username</p>
        <p className="text-[#AAAAAA]">Basic Plan (Ends on 2024-12-31)</p>
      </div>
      <MdOutlineKeyboardArrowRight className="w-6 h-6 text-[#78797E]" />
    </div>
  );
};

const SignalCard = ({
  title,
  total,
  amount,
  children,
}: {
  title: string;
  total: string | undefined;
  amount: string;
  children: ReactNode;
}) => {
  return (
    <div className="w-full flex justify-between items-center gap-3 text-white">
      {children}
      <div className="flex flex-col flex-1 justify-center items-start gap-1">
        <span className="text-white  text-sm">{title}</span>
      </div>
      <p className="text-sm">
        {amount}/{total}
      </p>
    </div>
  );
};

export default function IndexPage() {
  const initData = useInitData(true);
  const initDataRaw = useLaunchParams(true)?.initDataRaw;
  const setUserData = useUserStore((state: any) => state.setUserData);
  const [hostTrack, setHostTrack] = useState<number>();

  const initDataRows = useMemo<DisplayDataRow[] | undefined>(() => {
    if (!initData || !initDataRaw) {
      return;
    }
    const {
      hash,
      queryId,
      chatType,
      chatInstance,
      authDate,
      startParam,
      canSendAfter,
      canSendAfterDate,
    } = initData;
    return [
      { title: "raw", value: initDataRaw },
      { title: "auth_date", value: authDate.toLocaleString() },
      { title: "auth_date (raw)", value: authDate.getTime() / 1000 },
      { title: "hash", value: hash },
      { title: "can_send_after", value: canSendAfterDate?.toISOString() },
      { title: "can_send_after (raw)", value: canSendAfter },
      { title: "query_id", value: queryId },
      { title: "start_param", value: startParam },
      { title: "chat_type", value: chatType },
      { title: "chat_instance", value: chatInstance },
    ];
  }, [initData, initDataRaw]);

  useEffect(() => {
    if (initData?.user?.id && initData?.user?.username) {
      setUserData(initData.user.id, initData.user.username);
    }
  }, [initData, setUserData]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/api/creators/");

        setHostTrack(response.data?.count);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="flex w-full min-h-screen justify-center bg-background p-3 pb-[100px] ">
      <div className="relative w-full flex flex-col items-center justify-between gap-4 animate-opacity-scale">
        {/* <CardWrapper className="cursor-pointer z-10">
          <Link className="w-full" href="/profile">
            <UserInfoCard />
          </Link>
        </CardWrapper> */}
        <div>{initData?.user?.id}</div>
        <div>{initData?.user?.username}</div>
        <Image
          className=""
          width={350}
          height={350}
          src={"/images/eaveai-logo.png"}
          alt="Dragon Egg"
        />
        <div className="w-full flex flex-col gap-3 -mt-10">
          <span className="w-full text-[20px] font-semibold text-white text-center">
            Welcome to Eave AI!
          </span>
          <p className="w-full text-sm text-[#AAAAAA] text-start ">
            Track your favorite hosts and signals, and stay ahead with real-time
            insights and analytics.
          </p>
        </div>
        <div className="w-full flex flex-col gap-[10px]">
          <Link href="/tasks">
            <CardWrapper className="h-[66px] px-4 py-3 cursor-pointer">
              <SignalCard
                title="Hosts tracked"
                amount="5"
                total={hostTrack?.toString() ?? "N/A"}
              >
                <Avatar>
                  <AvatarImage src={"/images/host.png"} />
                  <AvatarFallback>Host</AvatarFallback>
                </Avatar>
              </SignalCard>
            </CardWrapper>
          </Link>
          <Link href="/friends">
            <CardWrapper className="h-[66px] px-4 py-3 cursor-pointer">
              <SignalCard title="Signals Used" amount="10" total="20">
                <Avatar>
                  <AvatarImage src={"/images/signal.png"} />
                  <AvatarFallback>Host</AvatarFallback>
                </Avatar>
              </SignalCard>
            </CardWrapper>
          </Link>
        </div>
      </div>
      <Navbar />
    </main>
  );
}
