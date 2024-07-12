import { ReactNode } from "react";
import { Navbar } from "@/components/Navbar";
import { TbDotsVertical } from "react-icons/tb";
import CardWrapper from "@/components/CardWrapper";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useUserStore from "@/store/useStore";
import { FadeLoader } from "react-spinners";
import { Link } from "@/components/Link/Link";
import { fetchTrackingData, fetchUserData } from "@/libs/dataFetches";
import { LuEye } from "react-icons/lu";
import { useRouter } from "next/navigation";
import SignalInfoCard from "@/components/SignalInfoCard";

// const SignalInfoCard = ({
//   id,
//   title,
//   subTitle,
//   children,
//   icon,
//   username,
// }: {
//   id?: number;
//   title: string;
//   subTitle?: string;
//   children: ReactNode;
//   icon?: boolean;
//   username?: string;
// }) => {
//   const router = useRouter();

//   const handleMoveToCreaterProfile = (id: string) => {
//     router.push(`/creater-profile?id=${id}`);
//   };

//   return (
//     <div className="w-full flex justify-between items-center gap-[10px]">
//       {children}
//       <div className="w-full flex flex-1 flex-col gap-1 text-sm overflow-hidden">
//         <p className="text-white font-semibold">{title}</p>
//         <p className="text-[#AAAAAA] text-xs truncate">{subTitle}</p>
//       </div>
//       {!icon &&
//         (username ? (
//           <div className="flex w-8 h-8 justify-center items-center rounded-full transition-all active:bg-[#787878]">
//             <div
//               onClick={() => {
//                 handleMoveToCreaterProfile(username);
//               }}
//               className="flex w-8 h-8 justify-center items-center rounded-full transition-all active:bg-[#787878] cursor-pointer border border-[#787878]"
//             >
//               <LuEye className="w-4 h-4 text-white" />
//             </div>
//           </div>
//         ) : (
//           <TbDotsVertical className="flex-1 w-6 h-6 text-[#78797E] cursor-pointer" />
//         ))}
//     </div>
//   );
// };

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

export default async function FriendsPage() {
  const trackData = await fetchTrackingData();
  const trackingData = await fetchUserData();

  const follows = trackingData?.follows;
  const maxFollows = trackingData?.current_subscription?.plan?.max_follows;

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
          <p className="text-[#AAAAAA] text-xs">
            Hosts Tracked: {follows + "/" + maxFollows}
          </p>
          <div className="w-full mt-6 mb-7 h-[1px] bg-[#FFFFFF1A]"></div>
        </div>
        <div className="w-full flex flex-col gap-[10px] animate-opacity-scale">
          <CardWrapper className="h-[54px] bg-[#6174EC33] cursor-pointer">
            <Link href="/add-host">
              <SignalInfoCard title="Add Host" icon>
                <Avatar>
                  <AvatarImage src={"/images/add-button.png"} />
                  <AvatarFallback>Host</AvatarFallback>
                </Avatar>
              </SignalInfoCard>
            </Link>
          </CardWrapper>
          {trackData.follows.length > 0
            ? trackData.follows.map((track: any, index: number) => {
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
            : ""}
        </div>
      </div>
      <Navbar />
    </div>
  );
}
