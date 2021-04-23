import { createContext, useState } from 'react';

type Episode ={
  title: string;
  members: string;
  thumbnail: string;
  duration: number;
  url: string;
}
type PlayerContextData = {
  episodeList: Episode[];
  currentEpisodeIndex: number;
  isPlaying: boolean;
  togglePlay: () => void;
  play: (episode: Episode) => void;
  setPlayingState: (state: boolean) => void;
}


export const PlayerContext = createContext({} as PlayerContextData);
export function PlayerContextProvider(){

  const [episodeList, setEpisodeList] = useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [ isPlaying, setIsPlaying] = useState(false)

  function play(episode) {
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
    setIsPlaying(true)
  }
  function togglePlay(){
    setIsPlaying(!isPlaying)
  }
  function  setPlayingState(state:boolean){
    setIsPlaying(state)
  }

  return (
    <PlayerContext.Provider value={{ episodeList, currentEpisodeIndex, play, togglePlay, setPlayingState,isPlaying }}>
    
    </PlayerContext.Provider>
    )
} 