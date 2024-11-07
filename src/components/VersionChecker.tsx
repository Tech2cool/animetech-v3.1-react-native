/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Dimensions,
  Modal,
  Share,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';
import {useQuery} from '@tanstack/react-query';
import Theme from '../utils/Theme';
import FastImage from 'react-native-fast-image';
import Animated, {FadeIn, FadeInUp} from 'react-native-reanimated';
import {useNavigation} from '@react-navigation/native';
import VersionInfo from 'react-native-version-info';
import {fetchVersion} from '../api/anitaku';
import rocketFlying from '../assets/images/rocket-flying.jpg';
import RNFetchBlob from 'rn-fetch-blob';
import * as Progress from 'react-native-progress';

const color = Theme.DARK;
const font = Theme.FONTS;
const {width, height} = Dimensions.get('window');

const VersionChecker = () => {
  const navigation = useNavigation();
  const [isOldVersion, setIsOldVersion] = useState({
    isOld: false,
    result: {},
  });
  const [downloading, setDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);

  const {
    data: version,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['version', navigation],
    queryFn: () => fetchVersion(),
  });

  function isMainAppVersionLessThanServer(
    serverAppVersion: string | number,
    mainAppVersion: string | number,
  ) {
    return serverAppVersion > mainAppVersion;
  }

  useEffect(() => {
    if (version) {
      const server_app_version = version[0].app_version;
      const main_app_version = VersionInfo.appVersion;
      const result = isMainAppVersionLessThanServer(
        server_app_version,
        main_app_version,
      );
      setIsOldVersion(prev => ({
        ...prev,
        isOld: result,
        result: version[0],
      }));
    }
  }, [version]);

  const shareLink = async () => {
    try {
      const link = isOldVersion.result.app_url;
      const result = await Share.share({
        message: link,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error?.message);
    }
  };

  const downloadAndInstallUpdate = async () => {
    if (Platform.OS !== 'android') {
      Alert.alert('Auto-update is only supported on Android devices.');
      return;
    }

    try {
      setDownloading(true);
      const {config, android} = RNFetchBlob;
      const downloadDir = RNFetchBlob.fs.dirs.DownloadDir;
      const filePath = `${downloadDir}/app-update.apk`;

      const res = await config({
        fileCache: true,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          path: filePath,
          description: 'Downloading update',
        },
        progress: (received, total) => {
          const percentage = (received / total) * 100;
          setDownloadProgress(percentage);
        },
      }).fetch('GET', isOldVersion.result.app_url);

      setDownloading(false);
      setDownloadProgress(0);

      android.actionViewIntent(
        res.path(),
        'application/vnd.android.package-archive',
      );
    } catch (error) {
      console.error('Error downloading or installing update:', error);
      Alert.alert(
        'Error',
        'Failed to download or install the update. Please try again later.',
      );
      setDownloading(false);
      setDownloadProgress(0);
    }
  };

  return (
    <Modal visible={isOldVersion.isOld} transparent>
      <Animated.View
        entering={FadeIn}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          top: 0,
          backgroundColor: color.DarkBackGround,
        }}>
        <FastImage
          source={rocketFlying}
          style={{width: width, height: height, alignSelf: 'center'}}
          resizeMode="cover"
        />
      </Animated.View>
      <Animated.View
        entering={FadeInUp}
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View
          style={{
            width: width * 0.9,
            height: (width * 4) / 3,
            backgroundColor: color.DarkBackGround2,
            borderColor: color.LighterGray,
            borderWidth: 0.2,
            borderRadius: 10,
            paddingVertical: 10,
            gap: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={{gap: 10, flex: 1}}>
            <Text
              style={{
                fontFamily: font.OpenSansBold,
                textAlign: 'center',
                color: color.White,
                fontSize: 16,
              }}>
              Discover new version
            </Text>
            <Text
              style={{
                fontFamily: font.OpenSansBold,
                textAlign: 'center',
                color: color.Red,
                fontSize: 14,
              }}>
              Current Version: {VersionInfo.appVersion}
            </Text>
            <Text
              style={{
                fontFamily: font.OpenSansBold,
                textAlign: 'center',
                color: color.LimeGreen,
                fontSize: 16,
              }}>
              Latest Version Found: {isOldVersion.result.app_version}
            </Text>
            <Text
              style={{
                fontFamily: font.OpenSansBold,
                textAlign: 'center',
                color: color.LimeGreen,
                fontSize: 16,
              }}>
              Recommended Update to {isOldVersion.result.app_version}
            </Text>
            <Text
              style={{
                fontFamily: font.OpenSansMedium,
                textAlign: 'center',
                color: color.White,
                fontSize: 14,
              }}>
              {isOldVersion.result?.desc || '1) Fixes'}
            </Text>
            {downloading && (
              <View style={{alignItems: 'center', marginTop: 10}}>
                <Progress.Bar
                  progress={downloadProgress / 100}
                  width={200}
                  color={color.LimeGreen}
                />
                <Text style={{color: color.White, marginTop: 5}}>
                  Downloading: {downloadProgress.toFixed(2)}%
                </Text>
              </View>
            )}
          </View>
          <View style={{flexDirection: 'row', gap: 10}}>
            <TouchableOpacity
              onPress={() =>
                setIsOldVersion(prev => ({
                  ...prev,
                  isOld: false,
                }))
              }
              style={{
                padding: 10,
                borderColor: color.Red,
                backgroundColor: color.Red,
                borderWidth: 1,
                height: 60,
                width: width * 0.4,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
              }}>
              <Text style={{fontFamily: font.OpenSansBold, color: color.White}}>
                Dismiss
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={
                downloadAndInstallUpdate
                // Platform.OS === 'android' ? downloadAndInstallUpdate : shareLink
              }
              disabled={downloading}
              style={{
                padding: 10,
                borderColor: color.LimeGreen,
                backgroundColor: downloading ? color.Gray : color.LimeGreen,
                borderWidth: 1,
                height: 60,
                width: width * 0.4,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
              }}>
              <Text style={{fontFamily: font.OpenSansBold, color: color.White}}>
                {Platform.OS === 'android'
                  ? downloading
                    ? 'Downloading...'
                    : 'Update'
                  : 'Share Link'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    </Modal>
  );
};

export default VersionChecker;
// /* eslint-disable react-native/no-inline-styles */
// import {
//   Alert,
//   Dimensions,
//   Modal,
//   Share,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import React, {useEffect, useState} from 'react';
// import {useQuery} from '@tanstack/react-query';
// import Theme from '../utils/Theme';
// import FastImage from 'react-native-fast-image';
// import Animated, {FadeIn, FadeInUp} from 'react-native-reanimated';
// import {useNavigation} from '@react-navigation/native';
// import VersionInfo from 'react-native-version-info';
// import {fetchVersion} from '../api/anitaku';
// import rocketFlying from '../assets/images/rocket-flying.jpg';
// const color = Theme.DARK;
// const font = Theme.FONTS;
// const {width, height} = Dimensions.get('window');

// const VersionChecker = () => {
//   const navigation = useNavigation();
//   const [isOldVersion, setIsOldVersion] = useState({
//     isOld: false,
//     result: {},
//   });
//   const {
//     data: version,
//     isLoading,
//     error,
//   } = useQuery({
//     queryKey: ['version', navigation],
//     queryFn: () => fetchVersion(),
//   });

//   function isMainAppVersionLessThanServer(serverAppVersion, mainAppVersion) {
//     return serverAppVersion > mainAppVersion;
//   }

//   useEffect(() => {
//     if (version) {
//       const server_app_version = version[0].app_version;
//       // console.log(app_version);
//       const main_app_version = VersionInfo.appVersion;
//       const result = isMainAppVersionLessThanServer(
//         server_app_version,
//         main_app_version,
//       );
//       // console.log(server_app_version);
//       // console.log(main_app_version);
//       // console.log(result);
//       setIsOldVersion(prev => ({
//         ...prev,
//         isOld: result,
//         result: version[0],
//       }));
//     }
//   }, [version]);
//   const shareLink = async () => {
//     try {
//       const link = isOldVersion.result.app_url;
//       //   console.log(link);
//       const result = await Share.share({
//         message: link,
//       });
//       if (result.action === Share.sharedAction) {
//         if (result.activityType) {
//           // shared with activity type of result.activityType
//         } else {
//           // shared
//         }
//       } else if (result.action === Share.dismissedAction) {
//         // dismissed
//       }
//     } catch (error) {
//       Alert.alert(error?.message);
//     }
//   };

//   return (
//     <Modal visible={isOldVersion.isOld} transparent>
//       <Animated.View
//         entering={FadeIn}
//         style={{
//           position: 'absolute',
//           bottom: 0,
//           left: 0,
//           right: 0,
//           top: 0,
//           backgroundColor: color.DarkBackGround,
//           // paddingVertical: 10,
//         }}>
//         <FastImage
//           source={rocketFlying}
//           style={{width: width, height: height, alignSelf: 'center'}}
//           resizeMode="cover"
//         />

//         {/* <TouchableOpacity>
//           <IIcon name={"close-circle-outline"} size={30} color={color.Red}/>
//         </TouchableOpacity> */}
//       </Animated.View>
//       <Animated.View
//         entering={FadeInUp}
//         style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//         <View
//           style={{
//             width: width * 0.9,
//             height: (width * 4) / 3,
//             backgroundColor: color.DarkBackGround2,
//             borderColor: color.LighterGray,
//             borderWidth: 0.2,
//             borderRadius: 10,
//             paddingVertical: 10,
//             gap: 10,
//             justifyContent: 'center',
//             alignItems: 'center',
//           }}>
//           <View style={{gap: 10, flex: 1}}>
//             <Text
//               style={{
//                 fontFamily: font.OpenSansBold,
//                 textAlign: 'center',
//                 color: color.White,
//                 fontSize: 16,
//               }}>
//               Discover new version
//             </Text>
//             <Text
//               style={{
//                 fontFamily: font.OpenSansBold,
//                 textAlign: 'center',
//                 color: color.Red,
//                 fontSize: 14,
//               }}>
//               Current Version: {VersionInfo.appVersion}
//             </Text>
//             <Text
//               style={{
//                 fontFamily: font.OpenSansBold,
//                 textAlign: 'center',
//                 color: color.LimeGreen,
//                 fontSize: 16,
//               }}>
//               Latest Version Found: {isOldVersion.result.app_version}
//             </Text>
//             <Text
//               style={{
//                 fontFamily: font.OpenSansBold,
//                 textAlign: 'center',
//                 color: color.LimeGreen,
//                 fontSize: 16,
//               }}>
//               Recommended Update to {isOldVersion.result.app_version}
//             </Text>
//             <Text
//               style={{
//                 fontFamily: font.OpenSansMedium,
//                 textAlign: 'center',
//                 color: color.White,
//                 fontSize: 14,
//               }}>
//               {isOldVersion.result?.desc || '1) Fixes'}
//             </Text>
//           </View>
//           <View style={{flexDirection: 'row', gap: 10}}>
//             <TouchableOpacity
//               onPress={() =>
//                 setIsOldVersion(prev => ({
//                   ...prev,
//                   isOld: false,
//                 }))
//               }
//               style={{
//                 padding: 10,
//                 borderColor: color.Red,
//                 backgroundColor: color.Red,
//                 borderWidth: 1,
//                 height: 60,
//                 width: width * 0.4,
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 borderRadius: 10,
//               }}>
//               <Text style={{fontFamily: font.OpenSansBold, color: color.White}}>
//                 Dismiss
//               </Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               onPress={shareLink}
//               style={{
//                 padding: 10,
//                 borderColor: color.LimeGreen,
//                 backgroundColor: color.LimeGreen,
//                 borderWidth: 1,
//                 height: 60,
//                 width: width * 0.4,
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 borderRadius: 10,
//               }}>
//               <Text style={{fontFamily: font.OpenSansBold, color: color.White}}>
//                 Update
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Animated.View>
//     </Modal>
//   );
// };

// export default VersionChecker;
