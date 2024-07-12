"use client";

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
import { GoSearch } from "react-icons/go";
import { Input } from "@/components/ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

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

  const handleMoveToCreaterProfile = (username: string) => {
    router.push(`/creater-profile/${username}`);
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
  searchKey: string;
  page: number;
  pageLimit: number;
  totalItems: number;
  data: any;
}> = ({ page, pageLimit, totalItems, data }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState<string>("");

  const [pageNo, setPageNo] = useState<number>(page);
  const [pageLim, setPageLim] = useState<number>(pageLimit);

  const totalPages = Math.ceil(totalItems / pageLimit);
  const noData = totalItems === 0;

  const handleBefore = () => {
    if (pageNo !== 1) {
      setPageNo(pageNo - 1);
    }
  };

  const handleNext = () => {
    if (pageNo < totalPages) {
      setPageNo(pageNo + 1);
    }
  };

  const handleLast = () => {
    setPageNo(totalPages);
  };

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (search?.length > 0) {
      params.set("search", search);
    } else {
      params.delete("search");
    }
    params.set("page", pageNo.toString());
    params.set("limit", pageLim.toString());

    router.push(`${pathname}?${params.toString()}`);
  }, [search, searchParams, pathname, router, pageNo, pageLim]);

  return (
    <div className="flex w-full flex-col gap-4 justify-center items-center">
      <div className="flex w-full justify-between gap-4">
        <div className="flex flex-1  gap-2">
          <Button
            disabled={page === 1 || noData}
            onClick={() => setPageNo(1)}
            variant="outline"
          >
            First
          </Button>
          <Button
            disabled={page === 1 || noData}
            onClick={handleBefore}
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
            onClick={handleLast}
            variant="outline"
          >
            Last
          </Button>
        </div>
        <Select
          value={String(pageLim)}
          onValueChange={(value) => setPageLim(Number(value))}
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

      <div className="relative w-full  animate-opacity-scale">
        <Input
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          className="bg-transparent border border-[#AAAAAA] h-11 text-border text-sm placeholder:text-[#AAAAAA] placeholder:text-sm"
          placeholder="Enter a twitter @name to search"
        />
        <GoSearch className="absolute right-3 top-3 w-5 h-5 text-border" />
      </div>
      <div className="flex w-full flex-col justify-center items-center gap-4 mt-4  animate-opacity-scale">
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
        </div>
      </div>
    </div>
  );
};

export default HostTable;
