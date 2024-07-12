"use client";

import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { SlUserFollowing, SlUserUnfollow } from "react-icons/sl";
import { PiDotsThreeOutlineFill } from "react-icons/pi";
``;
import { useRouter } from "next/navigation";
import apiClient from "@/libs/api";

interface FollowButtonProps {
  hostId?: number;
  is_following?: boolean;
}

const FollowButton = ({ hostId, is_following }: FollowButtonProps) => {
  const router = useRouter();
  const [isFollowing, setIsFollowing] = useState(is_following);
  const [isLoading, setIsLoading] = useState(false);

  const handleFollow = async () => {
    setIsLoading(true);
    try {
      const endpoint = isFollowing ? "/data/unfollow" : "/data/follow";
      const response = await apiClient.post(endpoint, { creator: hostId });
      setIsFollowing(!isFollowing);
      router.refresh();
    } catch (error) {
      console.error("Error updating follow status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger disabled={isLoading}>
        <div className="flex flex-1 w-8 h-8 justify-center items-center rounded-full transition-all active:bg-[#787878] cursor-pointer">
          {isLoading ? (
            <PiDotsThreeOutlineFill className="w-5 h-5 text-white" />
          ) : isFollowing ? (
            <SlUserUnfollow className="w-5 h-5 text-white" />
          ) : (
            <SlUserFollowing className="w-5 h-5 text-white" />
          )}
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-[#787878] " onClick={handleFollow}>
            {isFollowing ? "Unfollow" : "Follow"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default FollowButton;
