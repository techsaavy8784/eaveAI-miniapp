import React from "react";
import CardWrapper from "@/components/CardWrapper";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import FollowButton from "@/components/FollowButton";
import { fetchCreatorData, fetchTrackingData } from "@/libs/dataFetches";
import BackButton from "@/components/BackButton";

interface Params {
  creatorUsername: string;
}

interface T_CreatorData {
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
  is_following: boolean;
}

export default async function Page({ params }: { params: Params }) {
  const { creatorUsername } = params;
  const creator: T_CreatorData = await fetchCreatorData(creatorUsername);

  return (
    <div className="flex w-full min-h-screen justify-center bg-background p-3 pb-[100px] ">
      <BackButton />
      <div className="relative w-full flex flex-col items-center justify-start animate-opacity-scale">
        <div className="flex w-full justify-between gap-2  mt-5">
          <p className="w-full text-white text-2xl text-start font-bold">
            Host: {creator.twitter_username}
          </p>
          <FollowButton
            hostId={creator.id}
            is_following={creator.is_following}
          />
        </div>
        <CardWrapper className="bg-transparent border border-[#787878] p-5 mt-6">
          <div className="flex w-full flex-col gap-3 justify-center items-center">
            <div className="flex w-full justify-center items-center gap-2">
              <Avatar>
                <AvatarImage src={creator.twitter_profile_image_url} />
                <AvatarFallback>Host</AvatarFallback>
              </Avatar>
              <div className="flex flex-1 flex-col justify-center items-start gap-1">
                <p className="text-white text-sm font-semibold">
                  {creator.twitter_name}
                </p>
                <p className="text-[#AAAAAA] text-xs">
                  {creator.twitter_username}
                </p>
              </div>
            </div>
            <p className="w-full text-[#AAAAAA] text-sm text-justify">
              {creator.twitter_description}
            </p>
            <div className="w-full flex flex-col gap-1 text-sm text-white">
              <p>Location: {creator.twitter_location ?? "N/A"}</p>
              <p>Joined: {creator.twitter_created_at ?? "N/A"}</p>
              <p>Verified: {creator.twitter_verified ?? "N/A"}</p>
              <p>Verified Type: {creator.twitter_verified_type ?? "N/A"}</p>
            </div>
          </div>
        </CardWrapper>
      </div>
    </div>
  );
}
