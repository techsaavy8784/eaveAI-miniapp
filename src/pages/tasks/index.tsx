import { ReactNode, useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { TbDotsVertical } from "react-icons/tb";
import CardWrapper from "@/components/CardWrapper";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useUserStore from "@/store/useStore";
import api from "@/lib/api";
import { FadeLoader } from "react-spinners";

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

type T_TrackData = {
  id: number;
  twitter_id: string;
  twitter_username: string;
  twitter_profile_image_url: string;
  twitter_verified: boolean;
  twitter_verified_type: string;
  twitter_name: string;
  twitter_location: string | null;
  twitter_description: string;
  twitter_created_at: string;
  last_updated: string;
};

export default function FriendsPage() {
  const [trackData, setTrackData] = useState<T_TrackData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { userId, username } = useUserStore((state: any) => ({
    userId: state.userId,
    username: state.username,
  }));

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await api.get("/api/creators/");

        setTrackData(response.data?.results || []);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex w-full min-h-screen justify-center bg-background p-3 pb-[100px] ">
      <div className="relative w-full flex flex-col items-center justify-start animate-opacity-scale">
        <div className="w-full flex flex-col items-center gap-2">
          <Image
            width={88}
            height={88}
            src={"/images/tracking-avatar.png"}
            alt="Plan"
          />
          <span className="text-white text-sm font-semibold -mt-4">
            Plan: Basic
          </span>
          <p className="text-[#AAAAAA] text-xs">Hosts Tracked: 2/10</p>
          <div className="w-full mt-6 mb-7 h-[1px] bg-[#FFFFFF1A]"></div>
        </div>
        <div className="w-full flex flex-col gap-[10px] animate-opacity-scale">
          {isLoading ? (
            <div className="w-full flex justify-center my-10">
              <FadeLoader
                loading={isLoading}
                color="#6174ec"
                height={20}
                width={6}
              />
            </div>
          ) : (
            trackData?.map((track: any, index: number) => {
              return (
                <CardWrapper key={index} className="h-[54px]">
                  <SignalInfoCard
                    title={"@" + track?.twitter_username}
                    subTitle={track?.twitter_description}
                  >
                    <Avatar>
                      <AvatarImage src={track?.twitter_profile_image_url} />
                      <AvatarFallback>Host</AvatarFallback>
                    </Avatar>
                  </SignalInfoCard>
                </CardWrapper>
              );
            })
          )}
          <CardWrapper className="h-[54px] bg-[#6174EC33]">
            <SignalInfoCard title="Add Host" icon>
              <Avatar>
                <AvatarImage src={"/images/add-button.png"} />
                <AvatarFallback>Host</AvatarFallback>
              </Avatar>
            </SignalInfoCard>
          </CardWrapper>
        </div>
      </div>
      <Navbar />
    </div>
  );
}
