import React from 'react';
import StackNavigation from './src/navigation/StackNavigation';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {SettingContextProvider} from './src/context/SettingContext';
import ToastManager from 'toastify-react-native';
import {VideoStateContextProvider} from './src/context/VideoStateContext';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const queryClient = new QueryClient();
const App: React.FC = () => {
  return (
    <GestureHandlerRootView>
      <QueryClientProvider client={queryClient}>
        <SettingContextProvider>
          <VideoStateContextProvider>
            <StackNavigation />
            <ToastManager />
          </VideoStateContextProvider>
        </SettingContextProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
};

export default App;
