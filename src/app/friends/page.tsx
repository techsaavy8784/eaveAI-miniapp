"use client";

import { ReactNode } from "react";
import { Navbar } from "@/components/Navbar";
import { TbDotsVertical } from "react-icons/tb";
import CardWrapper from "@/components/CardWrapper";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const SignalInfoCard = ({
  title,
  subTitle,
  children,
  icon,
}: {
  title: string;
  subTitle?: string;
  children: ReactNode;
  icon?: boolean;
}) => {
  return (
    <div className="w-full flex justify-between items-center gap-[10px]">
      {children}
      <div className="w-full flex flex-col gap-1 text-sm overflow-hidden">
        <p className="text-white font-semibold">{title}</p>
        <p className="text-[#AAAAAA] text-xs truncate">{subTitle}</p>
      </div>
      {!icon && <TbDotsVertical className="w-6 h-6 text-[#78797E]" />}
    </div>
  );
};

export default function FriendsPage() {
  return (
    <div className="flex w-full min-h-screen justify-center bg-background p-3 pb-[100px] ">
      <div className="relative w-full flex flex-col items-center justify-start animate-opacity-scale">
        <div className="w-full flex flex-col items-center gap-2">
          <Image
            width={88}
            height={88}
            src={"/images/signal-logo.png"}
            alt="Plan"
          />
          <span className="text-white text-sm font-semibold -mt-4">
            Plan: Basic
          </span>
          <p className="text-[#AAAAAA] text-xs">Signal Tracked: 2/10</p>
          <div className="w-full mt-6 mb-7 h-[1px] bg-[#FFFFFF1A]"></div>
        </div>
        <Tabs defaultValue="trickers" className="w-full">
          <TabsList className="w-full h-8 p-[3px] bg-[#2A2A2A] text-white mb-4">
            <TabsTrigger className="w-full text-[13px] h-7" value="trickers">
              Trickers (2)
            </TabsTrigger>
            <TabsTrigger className="w-full text-[13px] h-7" value="projects">
              Projects (2)
            </TabsTrigger>
          </TabsList>
          <TabsContent value="trickers">
            <div className="w-full flex flex-col gap-[10px]">
              <CardWrapper className="h-[54px]">
                <SignalInfoCard title="BTC" subTitle="Bitcoin">
                  <Avatar>
                    <AvatarImage src={"/images/btc.png"} />
                    <AvatarFallback>Host</AvatarFallback>
                  </Avatar>
                </SignalInfoCard>
              </CardWrapper>
              <CardWrapper className="h-[54px]">
                <SignalInfoCard title="ETH" subTitle="Ethereum">
                  <Avatar>
                    <AvatarImage src={"/images/eth.png"} />
                    <AvatarFallback>Host</AvatarFallback>
                  </Avatar>
                </SignalInfoCard>
              </CardWrapper>
              <CardWrapper className="h-[54px] bg-[#6174EC33]">
                <SignalInfoCard title="Add Host" icon>
                  <Avatar>
                    <AvatarImage src={"/images/add-button.png"} />
                    <AvatarFallback>Host</AvatarFallback>
                  </Avatar>
                </SignalInfoCard>
              </CardWrapper>
            </div>
          </TabsContent>
          <TabsContent value="projects">
            <div className="w-full flex flex-col gap-[10px]">
              <CardWrapper className="h-[54px]">
                <SignalInfoCard
                  title="EaveAI"
                  subTitle="Advanced AI tools for market insights"
                >
                  <Avatar>
                    <AvatarImage src={"/images/eaveai.png"} />
                    <AvatarFallback>Host</AvatarFallback>
                  </Avatar>
                </SignalInfoCard>
              </CardWrapper>
              <CardWrapper className="h-[54px]">
                <SignalInfoCard
                  title="CryptoTracker"
                  subTitle="Real-time tracking and analysis"
                >
                  <Avatar>
                    <AvatarImage src={"/images/crypto-tracker.png"} />
                    <AvatarFallback>Host</AvatarFallback>
                  </Avatar>
                </SignalInfoCard>
              </CardWrapper>
              <CardWrapper className="h-[54px] bg-[#6174EC33] cursor-pointer">
                <SignalInfoCard title="Add Host" icon>
                  <Avatar>
                    <AvatarImage src={"/images/add-button.png"} />
                    <AvatarFallback>Host</AvatarFallback>
                  </Avatar>
                </SignalInfoCard>
              </CardWrapper>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <Navbar />
    </div>
  );
}
