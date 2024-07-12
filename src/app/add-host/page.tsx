import { Page } from "@/components/Page/Page";
import HostTable from "@/components/HostTable";
import { fetchHostsData } from "@/libs/dataFetches";
import BackButton from "@/components/BackButton";

type T_Host = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  gender: string;
  date_of_birth: string;
  street: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  longitude?: number;
  latitude?: number;
  job: string;
  profile_picture?: string | null;
};

type paramsProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

export const dynamic = "force-dynamic";

export default async function ProfilePage({ searchParams }: paramsProps) {
  const page = Number(searchParams.page) || 1;
  const pageLimit = Number(searchParams.limit) || 10;
  let twitter_username = searchParams.search || null;

  if (Array.isArray(twitter_username)) {
    twitter_username = twitter_username[0];
  }

  const offset = (page - 1) * pageLimit;

  const hostsData = await fetchHostsData(offset, pageLimit, twitter_username);
  const totalUsers = hostsData.count;
  const pageCount = Math.ceil(totalUsers / pageLimit);
  const hosts: T_Host[] = hostsData.results;

  return (
    <Page className="justify-start pt-5 pb-7">
      <BackButton />
      <div className="relative w-full flex flex-col items-center justify-start">
        <div className="w-full flex flex-col items-center gap-2  animate-opacity-scale">
          <span className="text-xl font-semibold text-white">Add new host</span>

          <div className="w-full mt-3 mb-7 h-[1px] bg-[#FFFFFF1A]"></div>
        </div>
        <div className="flex w-full justify-center">
          <HostTable
            searchKey="twitter_username"
            page={page}
            pageLimit={pageLimit}
            totalItems={totalUsers}
            data={hosts}
          />
        </div>
      </div>
    </Page>
  );
}
