import React, { useEffect, useState, ReactNode } from "react";
import CardWrapper from "./CardWrapper";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { MdNavigateBefore, MdOutlineNavigateNext } from "react-icons/md";
import { TbDotsVertical } from "react-icons/tb";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LuEye } from "react-icons/lu";
import { useRouter } from "next/navigation";

const SignalInfoCard = ({
  id,
  title,
  subTitle,
  children,
  icon,
  username,
}: {
  id?: number;
  title: string;
  subTitle?: string;
  children: ReactNode;
  icon?: boolean;
  username?: string;
}) => {
  const router = useRouter();

  const handleMoveToCreaterProfile = (id: string) => {
    router.push(`/creater-profile?id=${id}`);
  };

  return (
    <div className="w-full flex justify-between items-center gap-[10px]">
      {children}
      <div className="w-full flex flex-1 flex-col gap-1 text-sm overflow-hidden">
        <p className="text-white font-semibold">{title}</p>
        <p className="text-[#AAAAAA] text-xs truncate">{subTitle}</p>
      </div>
      {!icon &&
        (username ? (
          <div className="flex w-8 h-8 justify-center items-center rounded-full transition-all active:bg-[#787878]">
            <div
              onClick={() => {
                handleMoveToCreaterProfile(username);
              }}
              className="flex w-8 h-8 justify-center items-center rounded-full transition-all active:bg-[#787878] cursor-pointer border border-[#787878]"
            >
              <LuEye className="w-4 h-4 text-white" />
            </div>
          </div>
        ) : (
          <TbDotsVertical className="flex-1 w-6 h-6 text-[#78797E] cursor-pointer" />
        ))}
    </div>
  );
};

const HostTable: React.FC<{
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  pageLimit: number;
  setPageLimit: React.Dispatch<React.SetStateAction<number>>;
  totalItems: number;
  data: any;
}> = ({ page, setPage, pageLimit, setPageLimit, totalItems, data }) => {
  const handlePrevious = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < Math.ceil(totalItems / pageLimit)) {
      setPage(page + 1);
    }
  };

  const totalPages = Math.ceil(totalItems / pageLimit);
  const noData = totalItems === 0;

  return (
    <div className="flex w-full flex-col justify-center items-center gap-4 mt-4  animate-opacity-scale">
      <div className="flex w-full justify-between gap-4">
        <div className="flex flex-1  gap-2">
          <Button
            disabled={page === 1 || noData}
            onClick={() => setPage(1)}
            variant="outline"
          >
            First
          </Button>
          <Button
            disabled={page === 1 || noData}
            onClick={handlePrevious}
            variant="outline"
          >
            <MdNavigateBefore className="w-6 h-6" />
          </Button>
          <Button
            disabled={page === totalPages || noData}
            onClick={handleNext}
            variant="outline"
          >
            <MdOutlineNavigateNext className="w-6 h-6" />
          </Button>
          <Button
            disabled={page === totalPages || noData}
            onClick={() => setPage(totalPages)}
            variant="outline"
          >
            Last
          </Button>
        </div>
        <Select
          value={String(pageLimit)}
          onValueChange={(value) => setPageLimit(Number(value))}
        >
          <SelectTrigger className="w-[65px]">
            <SelectValue placeholder="10" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="50">50</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="w-full flex flex-col gap-[6px] animate-opacity-scale">
        {data.length === 0 ? (
          <div className="w-full text-center mt-10">There is no data</div>
        ) : (
          data?.map((track: any, index: number) => {
            return (
              <CardWrapper key={index} className="h-[54px]">
                <SignalInfoCard
                  title={"@" + track?.twitter_username}
                  subTitle={track?.twitter_description}
                  id={track?.id}
                  username={track.twitter_username}
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
        {/* <CardWrapper className="h-[54px]">
          <SignalInfoCard
            title="@CryptoGuru"
            subTitle="Detailed insights on market trends and forecasts"
            id={1}
            username="CryptoGuru111"s
          >
            <Avatar>
              <AvatarImage src={"/images/signal-avatar-1.png"} />
              <AvatarFallback>Host</AvatarFallback>
            </Avatar>
          </SignalInfoCard>
        </CardWrapper>
        <CardWrapper className="h-[54px]">
          <SignalInfoCard
            title="@CryptoGuru"
            subTitle="Analysis of emerging tokens and market movements"
            id={2}
            username="CryptoGuru"
          >
            <Avatar>
              <AvatarImage src={"/images/signal-avatar-1.png"} />
              <AvatarFallback>Host</AvatarFallback>
            </Avatar>
          </SignalInfoCard>
        </CardWrapper> */}
      </div>
    </div>
  );
};

export default HostTable;
