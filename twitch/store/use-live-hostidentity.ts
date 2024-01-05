import {  create } from 'zustand';

interface liveHostIdentityInfoType{
    hostIdentity: string;
    isLive: boolean;
}

interface LiveHostIdentityState{
    liveHostIdentityInfo : liveHostIdentityInfoType;
}

interface LiveHostIdentityActions{
    setLiveHostIdentityInfo: (useLiveHostIdentityInfo : liveHostIdentityInfoType) => void;
}

const defaultState  = { hostIdentity: '', isLive: false };

export const useLiveHostIdentityInfo = create<LiveHostIdentityState & LiveHostIdentityActions>((set) => ({
    liveHostIdentityInfo: defaultState,
    setLiveHostIdentityInfo: (liveHostIdentityInfo: liveHostIdentityInfoType) => {
      set((state) => ({ ...state, liveHostIdentityInfo }));
    },
  }));