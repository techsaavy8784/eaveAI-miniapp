import { ReactNode, useEffect, useState } from "react";
import { TbDotsVertical } from "react-icons/tb";
import CardWrapper from "@/components/CardWrapper";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FadeLoader } from "react-spinners";
import { Page } from "@/components/Page/Page";
import { GoSearch } from "react-icons/go";
import useUserStore from "@/store/useStore";
import { Input } from "@/components/ui/input";
import api from "@/lib/api";
import HostTable from "@/components/HostTable";
import { fetchHostsData } from "@/lib/dataFetches";

const SignalInfoCard = ({
  id,
  title,
  subTitle,
  children,
  icon,
}: {
  id?: number;
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
      {!icon &&
        (id ? (
          <TbDotsVertical
            onClick={() => {
              openToolTip(id);
            }}
            className="w-6 h-6 text-[#78797E] cursor-pointer"
          />
        ) : (
          <TbDotsVertical className="w-6 h-6 text-[#78797E] cursor-pointer" />
        ))}
    </div>
  );
};

const openToolTip = (id: number) => {};

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

export default function ProfilePage() {
  const [trackData, setTrackData] = useState<T_TrackData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hostTrack, setHostTrack] = useState<number>(0);
  const [followedHost, setFollowedHost] = useState<number>(0);
  const [search, setSearch] = useState<string>("");
  const [allHostData, setAllHostData] = useState<any>([]);
  const [totalHostData, setTotalHostData] = useState<number>(0);

  const [page, setPage] = useState<number>(1);
  const [pageLimit, setPageLimit] = useState<number>(10);

  const { userId, username } = useUserStore((state: any) => ({
    userId: state.userId,
    username: state.username,
  }));

  const offset = (page - 1) * pageLimit;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        if (search?.length > 0) {
          setPage(1);
          setPageLimit(10);
        }

        const hostsData = await fetchHostsData(offset, pageLimit, search);

        setAllHostData(hostsData.results);
        setTotalHostData(hostsData.count);
      } catch (error) {
        setIsLoading(false);
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [offset, pageLimit, search]);

  return (
    <Page className="justify-start">
      {isLoading && (
        <div className="fixed w-full h-screen flex justify-center items-center top-0 left-0 z-50 bg-black/70">
          <FadeLoader color="#6174ec" height={20} width={6} />
        </div>
      )}
      <div className="relative w-full flex flex-col items-center justify-start">
        <div className="w-full flex flex-col items-center gap-2  animate-opacity-scale">
          <span className="text-xl font-semibold text-white">Add new host</span>
          {/* <span className="text-white text-sm font-semibold mt-2">
            Plan: Basic
          </span>
          <p className="text-[#AAAAAA] text-xs">
            Hosts Tracked: {hostTrack + "/" + followedHost}
          </p> */}
          <div className="w-full mt-3 mb-7 h-[1px] bg-[#FFFFFF1A]"></div>
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

        {/* <div className="w-full flex flex-col gap-[10px] animate-opacity-scale">
          {trackData?.map((track: any, index: number) => {
            return (
              <CardWrapper key={index} className="h-[54px]">
                <SignalInfoCard
                  title={"@" + track?.twitter_username}
                  subTitle={track?.twitter_description}
                  id={track?.id}
                >
                  <Avatar>
                    <AvatarImage src={track?.twitter_profile_image_url} />
                    <AvatarFallback>Host</AvatarFallback>
                  </Avatar>
                </SignalInfoCard>
              </CardWrapper>
            );
          })}
        </div> */}
        <HostTable
          page={page}
          setPage={setPage}
          pageLimit={pageLimit}
          setPageLimit={setPageLimit}
          totalItems={totalHostData}
          data={allHostData}
        />
      </div>
    </Page>
  );
}
