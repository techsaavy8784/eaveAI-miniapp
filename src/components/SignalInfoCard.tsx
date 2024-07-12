"use client";

import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { LuEye } from "react-icons/lu";
import { TbDotsVertical } from "react-icons/tb";

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
    router.push(`/creater-profile/${id}`);
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

export default SignalInfoCard;
