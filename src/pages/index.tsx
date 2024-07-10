import { Link } from "@/components/Link/Link";
import { Navbar } from "@/components/Navbar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import CardWrapper from "@/components/CardWrapper";

import { type ReactNode, JSX, useState, useEffect } from "react";
import { useInitData, type User, useLaunchParams } from "@tma.js/sdk-react";
import useUserStore from "@/store/useStore";
import api from "@/lib/api";
import { FadeLoader } from "react-spinners";

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
        <span className="text-white text-sm">{title}</span>
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
  const [followedHost, setFollowedHost] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (initData?.user?.id && initData?.user?.username) {
      setUserData(initData.user.id, initData.user.username);
    }
  }, [initData, setUserData]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await api.get("/api/creators/");
        const response1 = await api.get(
          `api/accounts/${initData?.user?.id}/follows/`
        );

        setHostTrack(response.data?.count);
        setFollowedHost(response1.data?.count);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [initData]);

  return (
    <main className="flex w-full min-h-screen justify-center bg-background p-3 pb-[100px] ">
      {isLoading && (
        <div className="fixed w-full min-h-screen flex justify-center items-center top-0 left-0 z-50 bg-black/70">
          <FadeLoader color="#6174ec" height={20} width={6} />
        </div>
      )}
      <div className="relative w-full flex flex-col items-center justify-between gap-4 animate-opacity-scale">
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
                amount={followedHost?.toString() ?? "0"}
                total={hostTrack?.toString() ?? "0"}
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
