import {createContext, useContext, useEffect, useState} from 'react';
import {getAsyncData} from '../utils/helperFunctions';

interface settingProps {
  provider: string;
  language: string;
  sliderIntervalTime: number;
  isWifi: boolean;
  breakReminder: number;
  wifiQuality: number | string;
  mobileQuality: number | string;
}
interface childernProp {
  children: React.ReactNode;
}

interface contextType {
  setting: settingProps;
  setSetting: React.Dispatch<React.SetStateAction<settingProps>>;
}

const initialState = {
  provider: 'anitaku',
  language: 'en',
  sliderIntervalTime: 5000,
  isWifi: false,
  breakReminder: 0,
  wifiQuality: 'default',
  mobileQuality: 'default',
};

const SettingContext = createContext<contextType>({} as contextType);

export const SettingContextProvider: React.FC<childernProp> = ({children}) => {
  const [setting, setSetting] = useState<settingProps>(initialState);

  const getInitialDatas = async () => {
    const mobileQuality =
      (await getAsyncData('quality_mobile')) || setting.mobileQuality;
    const wifiQuality =
      (await getAsyncData('quality_wifi')) || setting.wifiQuality;

    setSetting(prev => ({
      ...prev,
      wifiQuality: wifiQuality,
      mobileQuality: mobileQuality,
    }));
  };
  useEffect(() => {
    getInitialDatas();
  }, []);
  return (
    <SettingContext.Provider value={{setting, setSetting}}>
      {children}
    </SettingContext.Provider>
  );
};

export const useSetting = () => {
  return useContext<contextType>(SettingContext);
};
