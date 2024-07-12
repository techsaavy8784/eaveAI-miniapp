import { type ReactNode, JSX, useState, useEffect } from "react";
import { Link } from "@/components/Link/Link";
import { Navbar } from "@/components/Navbar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import CardWrapper from "@/components/CardWrapper";
import {
  useInitData,
  type User,
  useLaunchParams,
} from "@telegram-apps/sdk-react";
import useUserStore from "@/store/useStore";
import { FadeLoader } from "react-spinners";
import { fetchUserData } from "@/libs/dataFetches";

type T_UserInforItem = {
  icon: JSX.Element;
  title: string;
  value: string;
  wallet?: boolean;
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

export default async function IndexPage() {
  const trackingData = await fetchUserData();

  const follows = trackingData?.follows;
  const maxFollows = trackingData?.current_subscription?.plan?.max_follows;

  return (
    <main className="flex w-full min-h-screen justify-center bg-background p-3 pb-[100px] ">
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
                amount={follows?.toString() ?? "0"}
                total={maxFollows?.toString() ?? "0"}
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
