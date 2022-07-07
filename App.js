import {NavigationContainer} from '@react-navigation/native';
import Navigation from './navigation/navigation';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import 'react-native-gesture-handler';
import { AuthContext, AuthProvider } from './hooks/AuthContext';

export default function App() {
  return (
      
    <AuthProvider>
     <NavigationContainer>
          <Navigation/>
        </NavigationContainer>
    </AuthProvider>
  );
}

