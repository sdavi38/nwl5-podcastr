import { createContext, useState, ReactNode, useContext} from 'react';

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
  isLooping: boolean;
  isShuffling: boolean;
  hasNext:boolean,
  hasPrevious:boolean,
  toggleLoop: () => void;
  togglePlay: () => void;
  toggleShuffle: () => void;
  playNext: () => void;
  clearPlayState: () => void;
  playPrevious: () => void;
  playList: (list: Episode[], index: number) => void;
  play: (episode: Episode) => void;
  setPlayingState: (state: boolean) => void;
}


export const PlayerContext = createContext({} as PlayerContextData);
 
type PlayerContextProviderProps ={
    children: ReactNode
}


export function PlayerContextProvider({children}:PlayerContextProviderProps){

  const [episodeList, setEpisodeList] = useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [ isPlaying, setIsPlaying] = useState(false)
  const [ isLooping, setIsLooping] = useState(false)
  const [ isShuffling, setIsShuffling] = useState(false)

  function play(episode: Episode) {
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
    setIsPlaying(true)
  } 
      //criar lista//
  function playList(list:Episode[], index:number){
    setEpisodeList(list)
    setCurrentEpisodeIndex(index)
    setIsPlaying(true)
  }

  //um episode
  function togglePlay(){
    setIsPlaying(!isPlaying)
  }
    //repetir
  function toggleLoop(){
    setIsLooping(!isLooping)
  }

    //aleatório
   function toggleShuffle(){
    setIsShuffling(!isShuffling)
    }
  function  setPlayingState(state:boolean){
    setIsPlaying(state)
  }
  
  function clearPlayState(){
    setEpisodeList([])
    setCurrentEpisodeIndex(0 )
  }

  
  const hasPrevious = currentEpisodeIndex > 0;
  const hasNext = isShuffling || (currentEpisodeIndex +1) < episodeList.length
  
  function playNext(){
    //aleatorio //
    if(isShuffling){
      const nextRamdoEpisodeIndex = Math.floor(Math.random()*episodeList.length)
      setCurrentEpisodeIndex(nextRamdoEpisodeIndex)
        //proximo
    }else if(hasNext){
      setCurrentEpisodeIndex(currentEpisodeIndex + 1)
    }
     
  }
    //anterior  episode
  function playPrevious(){
    if(hasPrevious){
     setCurrentEpisodeIndex(currentEpisodeIndex - 1)
    }
   
  }

  return (
    <PlayerContext.Provider value={{ 
      episodeList, 
      currentEpisodeIndex,
      play, 
      togglePlay,
      playList,
      playNext,
      playPrevious,
      toggleLoop,
      isLooping,
      toggleShuffle,
      isShuffling,
      hasNext,
      hasPrevious,      
      setPlayingState,
      clearPlayState,
      isPlaying }}>
        {children} 
    </PlayerContext.Provider>
    )
} 
//children// repassa todo os values do provider para outros componentes

//criando o hooks 
export const usePlayer =()=>{
  return useContext(PlayerContext)
}