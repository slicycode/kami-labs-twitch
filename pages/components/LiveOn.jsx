import React, { useEffect, useState } from "react";
import Accordion from "./Accordion";
import Image from "next/image";
import api from "../api/twitch_api";
import live from "../../assets/icons/live.png";

const LiveOn = () => {
  const [channels, setChannels] = useState([]);
  const [online, setOnline] = useState(false);

  // REMPLACER OU AJOUTER LES NOMS DES CHAINES TWITCH
  let channelName = [
    {
      name: "kennystream",
    },
    {
      name: "quin69",
    },
    {
      name: "jokerdtv",
    },
    {
      name: "towelliee",
    },
    {
      name: "metashi12",
    },
    // {
    //   name: "NOM_DE_CHAINE",
    // },
  ];

  let channelNames = channelName.map((channel) => channel.name);

  useEffect(() => {
    const fetchData = async () => {
      const result = await api.get(
        `https://api.twitch.tv/helix/streams/?user_login=${channelNames.join(
          "&user_login="
        )}`
      );

      let dataArray = result.data.data;

      let gameIDs = dataArray.map((stream) => {
        return stream.game_id;
      });

      let baseURL = "https://api.twitch.tv/helix/games?";
      let queryParams = "";
      gameIDs.map((id) => {
        return (queryParams = queryParams + `id=${id}&`);
      });

      let finalURL = baseURL + queryParams;
      let gameNames = await api.get(finalURL);
      let gameNameArray = gameNames.data.data;

      let finalArray = dataArray.map((stream) => {
        stream.gameName = "";
        gameNameArray.map((name) => {
          if (stream.game_id === name.id) {
            return (stream.gameName = name.name);
          }
        });

        let newURL = stream.thumbnail_url
          .replace("{width}", "250")
          .replace("{height}", "150");
        stream.thumbnail_url = newURL;
        return stream;
      });
      setChannels(finalArray);
    };
    fetchData();
  }, []);

  return (
    <>
      <div className='md:flex-row flex flex-col gap-y-2 items-center justify-center gap-x-10 mt-10'>
        <div className='flex'>
          <Image src={live} width={150} height={50} />
        </div>
        <h1 className='text-2xl font-semibold'>
          Stream WoW Classic actuellement en ligne
        </h1>
      </div>
      <div className='bg-[#252626] h-4 mt-10'></div>
      <div>
        {channels.map((channel) => (
          <Accordion channel={channel} />
        ))}
      </div>
    </>
  );
};

export default LiveOn;
