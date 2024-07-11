import React, { useEffect, useState } from "react";
import { fetchTrackingData } from "@/lib/dataFetches";
import useUserStore from "@/store/useStore";
import CardWrapper from "@/components/CardWrapper";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSearchParams } from "next/navigation";
import { FadeLoader } from "react-spinners";

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
  is_whitelisted: boolean;
};

export default function CreaterProfilePage() {
  const [trackData, setTrackData] = useState<T_TrackData>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { userId, username } = useUserStore((state: any) => ({
    userId: state.userId,
    username: state.username,
  }));

  const params = useSearchParams();
  const creatorId = params.get("id");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tracking = await fetchTrackingData(userId);
        setTrackData(
          tracking.filter((item: T_TrackData) => (item.id = Number(creatorId)))
        );
        setIsLoading(true);
      } catch (error) {
        setIsLoading(false);
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [userId, creatorId]);

  return (
    <div className="flex w-full min-h-screen justify-center bg-background p-3 pb-[100px] ">
      {isLoading && (
        <div className="fixed w-full min-h-screen flex justify-center items-center top-0 left-0 z-50 bg-black/70">
          <FadeLoader color="#6174ec" height={20} width={6} />
        </div>
      )}
      <div className="relative w-full flex flex-col items-center justify-start animate-opacity-scale">
        <p className="w-full text-white text-2xl text-start font-bold mt-5">
          Host: {trackData?.twitter_username}
        </p>
        <CardWrapper className="bg-transparent border border-[#787878] p-5 mt-6">
          <div className="flex w-full flex-col gap-3 justify-center items-center">
            <div className="flex w-full justify-center items-center gap-2">
              <Avatar>
                <AvatarImage src={trackData?.twitter_profile_image_url} />
                <AvatarFallback>Host</AvatarFallback>
              </Avatar>
              <div className="flex flex-1 flex-col justify-center items-start gap-1">
                <p className="text-white text-sm font-semibold">
                  {trackData?.twitter_name}
                </p>
                <p className="text-[#AAAAAA] text-xs">
                  {trackData?.twitter_username}
                </p>
              </div>
            </div>
            <p className="w-full text-[#AAAAAA] text-sm text-justify">
              {trackData?.twitter_description}
            </p>
            <div className="w-full flex flex-col gap-1 text-sm text-white">
              <p>Location: {trackData?.twitter_location}</p>
              <p>Joined: {trackData?.twitter_created_at}</p>
              <p>Verified: {trackData?.twitter_verified}</p>
              <p>Verified Type: {trackData?.twitter_verified_type}</p>
            </div>
          </div>
        </CardWrapper>
      </div>
    </div>
  );
}
