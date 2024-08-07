import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {useSetting} from '../context/SettingContext';

const useProvider = () => {
  const [loading, setLoading] = useState(false);
  const {setting} = useSetting();
  const getProvider = () => {
    
  };
  getProvider();
  return {loading};
};

export default useProvider;
