import React, { useEffect, useState } from "react";
import Accordion from "./Accordion";
import Image from "next/image";
import api from "../api/twitch_api";
import live from "../../assets/icons/live.png";
import premium from "../../assets/icons/top-rated.png";

const LiveOn = () => {
  const [channels, setChannels] = useState([]);
  const [premiumChannels, setPremiumChannels] = useState([]);
  const [online, setOnline] = useState(false);

  // REMPLACER OU AJOUTER LES NOMS DES CHAINES TWITCH
  let premiumChannelName = [
    {
      name: "naowh",
    },
  ];

  // REMPLACER OU AJOUTER LES NOMS DES CHAINES TWITCH
  let channelName = [
    {
      name: "zoltan",
    },
    {
      name: "yunatahel",
    },
    {
      name: "drunge_",
    },
    // {
    //   name: "NOM_DE_CHAINE",
    // },
  ];

  let channelNames = channelName.map((channel) => channel.name);
  let premiumChannelNames = premiumChannelName.map((channel) => channel.name);

  useEffect(() => {
    const fetchData = async () => {
      const result = await api.get(
        `https://api.twitch.tv/helix/streams/?user_login=${channelNames.join(
          "&user_login="
        )}`
      );

      const premiumResult = await api.get(
        `https://api.twitch.tv/helix/streams/?user_login=${premiumChannelNames.join(
          "&user_login="
        )}`
      );

      let dataArray = result.data.data;
      let premiumDataArray = premiumResult.data.data;

      let gameIDs = dataArray.map((stream) => {
        return stream.game_id;
      });
      let premiumGameIDs = premiumDataArray.map((premiumStream) => {
        return premiumStream.game_id;
      });

      let baseURL = "https://api.twitch.tv/helix/games?";
      let queryParams = "";

      gameIDs.map((id) => {
        return (queryParams = queryParams + `id=${id}&`);
      });
      premiumGameIDs.map((id) => {
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

      let premiumFinalArray = premiumDataArray.map((premiumStream) => {
        premiumStream.gameName = "";
        gameNameArray.map((name) => {
          if (premiumStream.game_id === name.id) {
            return (premiumStream.gameName = name.name);
          }
        });

        let newURL = premiumStream.thumbnail_url
          .replace("{width}", "250")
          .replace("{height}", "150");
        premiumStream.thumbnail_url = newURL;
        return premiumStream;
      });
      setChannels(finalArray);
      setPremiumChannels(premiumFinalArray);
    };
    fetchData();
  }, []);

  return (
    <>
      <div className='md:flex-row flex flex-col gap-y-2 items-center justify-center gap-x-10 mt-10'>
        <div className='flex'>
          <Image src={live} width={150} height={50} alt='icon-live' />
        </div>
        <h1 className='text-2xl font-semibold'>
          Stream WoW Classic actuellement en ligne
        </h1>
      </div>
      <div className='bg-[#252626] h-4 mt-10'></div>
      <div>
        {premiumChannels.map((premiumChannel, index) => (
          <div className='relative pt-4 bg-[#2c3e50]/90' key={index}>
            <div className='items-center justify-center flex xl:absolute 2xl:left-[250px] xl:top-3'>
              <div className='flex flex-col items-center'>
                <div className='flex items-center justify-center'>
                  <Image
                    src={premium}
                    width={130}
                    height={130}
                    alt='icon-live'
                  />
                </div>
                <span className='uppercase font-semibold text-[#f1c40f]'>
                  Stream mis en avant
                </span>
                <small className='text-[#bf94ff] cursor-pointer'>
                  {/* lien vers l'article d'explication */}
                  <a href='/' target='_blank' rel='noreferrer'>
                    En savoir plus
                  </a>
                </small>
              </div>
            </div>
            <Accordion channel={premiumChannel} />
            <div className='bg-[#f1c40f] h-1 my-4'></div>
          </div>
        ))}
        {channels.map((channel, index) => (
          <div key={index}>
            <Accordion channel={channel} />
            <div className='bg-[#f1f1f1] h-1 my-4'></div>
          </div>
        ))}
      </div>
    </>
  );
};

export default LiveOn;
