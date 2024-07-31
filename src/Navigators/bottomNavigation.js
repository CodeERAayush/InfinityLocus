import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../Screens/Home';
import History from '../Screens/History';
import Icon, { Icons } from '../../assets/Icons/Icons';
import { Colors } from '../constants/Colors';

const Tab = createBottomTabNavigator();

export function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen 
      options={{
        tabBarIcon:({color,size})=>(<Icon
            type={Icons.AntDesign}
            name="home"
            color={color}
            />
        )
      }}
      name="Home" component={HomeScreen} />
      <Tab.Screen 
       options={{
        tabBarIcon:({color,size})=>(<Icon
            type={Icons.FontAwesome}
            name="history"
            color={color}
            />
        )
      }}
      name="History" component={History} />
    </Tab.Navigator>
  );
}

