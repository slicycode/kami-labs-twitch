import React, { useEffect, useState } from "react";
import live from "../../assets/icons/live.png";
import Image from "next/image";
import { TwitchPlayer, TwitchChat } from "react-twitch-embed";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";

const Accordion = ({ channel, displayName = channel }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className='my-4'>
      <div className=' w-1/2 mx-auto flex justify-center items-center gap-x-10'>
        <a
          href={"https://twitch.tv/" + channel.user_name}
          className='cursor-pointer hover:scale-105'
          target='_blank'
        >
          <img
            className='rounded-md'
            src={channel.thumbnail_url}
            alt={channel.title}
          />
        </a>
        <div className='bg-[#18181b] px-4 py-[14px] rounded-md w-80'>
          <div className='flex gap-x-3 items-center mb-2'>
            <span className='text-xl mb-1'>Actuellement en</span>

            <Image src={live} width={90} height={30} />
          </div>
          <h3 className='font-semibold text-xl'>
            {channel.user_name} streame {channel.gameName}
          </h3>
          <h3 className='text-[#bf94ff] mt-1'>
            {channel.viewer_count} spectateurs
          </h3>
        </div>
        <div
          className='bg-[#18181b]  py-7 rounded-md w-60 flex justify-center items-center gap-x-5 cursor-pointer'
          onClick={() => setIsActive(!isActive)}
        >
          <h1 className='text-xl mb-1'>Afficher le stream</h1>
          {isActive ? (
            <BsChevronUp className='h-6 w-6' />
          ) : (
            <BsChevronDown className='h-6 w-6' />
          )}
        </div>
      </div>
      {isActive && (
        <div className='flex justify-center mt-4'>
          <TwitchPlayer
            channel={channel.user_name}
            parent={["kami-labs.fr"]}
            autoplay={false}
            muted={true}
          />
          <TwitchChat channel={channel.user_name} theme='dark' height='480px' />
        </div>
      )}
      <div className='bg-[#f1f1f1] h-1 my-4'></div>
    </div>
  );
};

export default Accordion;
