"use client";

import { Drawer } from "vaul";
import { FC } from "react";
import { useState, useEffect } from "react";
import { TbUserShare } from "react-icons/tb";
import { LiaTelegram } from "react-icons/lia";
import { FaWhatsapp, FaXTwitter } from "react-icons/fa6";
import { LuFacebook } from "react-icons/lu";
import { AiOutlineReddit } from "react-icons/ai";
import { IoClose, IoCopyOutline } from "react-icons/io5";

const InviteFriendModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenChange = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <Drawer.Root open={isOpen} onOpenChange={setIsOpen} fixed={false}>
      <Drawer.Trigger asChild className="">
        <div className="w-[88%] h-11 flex justify-between px-2 items-center rounded-full bg-border text-black animate-scale animate-scaleDown gap-14">
          <TbUserShare className="flex-1 w-5 h-5" />
          <span className="text-[13px] font-semibold uppercase">
            invite a friend
          </span>
          <div className="flex-1"></div>
        </div>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay
          className="fixed inset-0 bg-black/70 z-20"
          style={{
            backdropFilter: "blur(8px)",
          }}
        />
        <Drawer.Content
          className="bg-[#171717] bg-custom-radial focus-visible:outline-none flex max-w-xl mx-auto flex-col rounded-t-[10px] h-[400px] border-t-[1.5px] border-border fixed bottom-0 left-0 text-white right-0 z-30"
          style={{
            boxShadow: "0px -10px 100px 0px rgba(0, 0, 0, 0.5)",
          }}
        >
          <div className="py-4 bg-transparent rounded-t-[10px] flex-1">
            <div className="mx-auto w-24 h-2 flex-shrink-0 rounded-full bg-[#242424] mb-3" />
            <div className="max-w-xl flex flex-col gap-5 py-2">
              <div className="w-full flex flex-col justify-center items-center gap-2 border-b-[1px] border-[#242424] pb-4">
                <div className="bg-[#0f0f0f] w-[54px] h-[54px] flex justify-center items-center rounded-full">
                  <TbUserShare className="w-8 h-8 text-[#88dde7]" />
                </div>
                <h1 className="text-maintext text-[18px]">Invite Friends</h1>
                <p className="w-full px-4 text-[11px] text-center">
                  Share the unique link with your friends to invite them to our
                  bot. Help expand our community!
                </p>
              </div>
              <div className="w-[260px] mx-auto flex justify-between gap-2">
                <button className="w-11 h-11 bg-[#171717] flex justify-center items-center rounded-full">
                  <LiaTelegram className="w-5 h-5 text-white" />
                </button>
                <button className="w-11 h-11 bg-[#171717] flex justify-center items-center rounded-full">
                  <FaXTwitter className="w-5 h-5 text-white" />
                </button>
                <button className="w-11 h-11 bg-[#171717] flex justify-center items-center rounded-full">
                  <FaWhatsapp className="w-5 h-5 text-white" />
                </button>
                <button className="w-11 h-11 bg-[#171717] flex justify-center items-center rounded-full">
                  <LuFacebook className="w-5 h-5 text-white" />
                </button>
                <button className="w-11 h-11 bg-[#171717] flex justify-center items-center rounded-full">
                  <AiOutlineReddit className="w-5 h-5 text-white" />
                </button>
              </div>
              <div className="w-full flex flex-col gap-3 px-4">
                <button className="w-full h-11 flex justify-between items-center bg-[#171717] rounded-full text-white border border-[#242424] px-3">
                  <IoCopyOutline className="w-5 h-5" />
                  <h1 className="flex-1 text-sm font-semibold uppercase">
                    copy your ref link
                  </h1>
                  <div className=""></div>
                </button>
                <button
                  onClick={handleOpenChange}
                  className="w-full h-11 flex justify-between items-center bg-[#171717] rounded-full text-white border border-[#242424] px-3"
                >
                  <IoClose className="w-5 h-5" />
                  <h1 className="flex-1 text-sm font-semibold uppercase">
                    close
                  </h1>
                  <div className=""></div>
                </button>
              </div>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export default InviteFriendModal;
