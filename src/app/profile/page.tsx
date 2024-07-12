import CardWrapper from "@/components/CardWrapper";
import { truncateAddress } from "@/libs/utils";
import { Page } from "@/components/Page/Page";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PiWalletBold } from "react-icons/pi";
import { CgCreditCard } from "react-icons/cg";
import { LuCalendar } from "react-icons/lu";
import { fetchUserData } from "@/libs/dataFetches";
import BackButton from "@/components/BackButton";

type T_UserInforItem = {
  icon: JSX.Element;
  title: string;
  value: string | undefined;
  wallet?: boolean;
};

const UserInforItem: React.FC<T_UserInforItem> = ({
  icon,
  title,
  value,
  wallet,
}) => {
  return (
    <div className="flex w-full justify-between">
      <div className="flex items-center gap-1 text-white">
        {icon}
        <p className="text-[13px] leading-4">{title}</p>
      </div>
      <div className="w-28 flex justify-end items-center overflow-hidden">
        <p className="text-white truncate text-[17px] leading-6">
          {wallet ? truncateAddress(value ?? "") : value}
        </p>
      </div>
    </div>
  );
};

interface Space {
  id: number;
  title: string;
  space_id: string;
  creator_id: string;
  creator: {
    twitter_username: string;
    twitter_id: string;
    twitter_profile_image_url: string;
    id: number;
    twitter_name: string;
  };
}

const ProfilePage: React.FC = async () => {
  const userData = await fetchUserData();

  return (
    <Page>
      <BackButton />
      <CardWrapper className="flex h-[410px] flex-col gap-2 justify-between items-center bg-[#0F0F0F] pt-4 animate-opacity-scale">
        <Avatar className="w-[113px] h-[113px]">
          <AvatarImage src={"/images/avatar-lg.png"} />
          <AvatarFallback>Host</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-1 items-center">
          <span className="text-white text-sm font-semibold">
            @{userData.telegram_username}
          </span>
          <p className="text-[#AAAAAA] text-xs">{userData?.plan ?? "N/A"}</p>
        </div>
        <CardWrapper className="bg-background h-[60px]">
          <UserInforItem
            icon={<PiWalletBold className="w-6 h-6 stroke-1" />}
            title="Connected Wallet"
            value={userData?.wallet_address ?? "N/A"}
            wallet={true}
          />
        </CardWrapper>
        <CardWrapper className="bg-background h-[60px]">
          <UserInforItem
            icon={<CgCreditCard className="w-6 h-6 stroke-1" />}
            title="Payment Method"
            value="ETH"
          />
        </CardWrapper>
        <CardWrapper className="bg-background h-[60px]">
          <UserInforItem
            icon={<LuCalendar className="w-6 h-6 stroke-2" />}
            title="Subscription Ending"
            value={userData?.subscription_end ?? "N/A"}
          />
        </CardWrapper>
      </CardWrapper>

      <div className="flex flex-1 w-full flex-col justify-end items-center p-2 gap-2.5 animate-opacity-scale">
        <button className="w-full h-[50px] rounded-md bg-[#6174EC] text-white text-sm font-semibold">
          Upgrade Plan
        </button>
        <button className="w-full h-[50px] rounded-md bg-[#6174EC26] text-[#6174EC] text-sm font-semibold">
          Renew Plan
        </button>
      </div>
    </Page>
  );
};

export default ProfilePage;
