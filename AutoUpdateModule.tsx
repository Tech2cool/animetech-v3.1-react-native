import {NativeModules} from 'react-native';
const {AutoUpdateModule} = NativeModules;
interface AutoUpdateInterface {
  checkForUpdates: (updateUrl: string) => Promise<boolean>;
  downloadUpdate: (updateUrl: string) => Promise<string>;
  installUpdate: (filePath: string) => Promise<void>;
}
export default AutoUpdateModule as AutoUpdateInterface;
