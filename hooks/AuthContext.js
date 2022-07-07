import React , {useState, useEffect} from "react";
const AuthContext = React.createContext({
  user: null,
  setUser: (_user) => {},
  isLoggedIn: false,
  setIsLoggedIn: (_isLoggedIn) => {},
  logout: () => {},
});


const AuthProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
  
    useEffect(() => {
      (async function () {
        let token = await getToken();
        setIsLoggedIn(token != null);
        setIsLoading(false);
      });
    }, []);
  
    if (isLoading) {
      return (
        <View>
          <Text>Loading ....</Text>
        </View>
      );
    }
  
    return (
      <AuthContext.Provider
        value={{
          user: user,
          setUser: setUser,
          isLoggedIn: isLoggedIn,
          setIsLoggedIn: setIsLoggedIn,
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  };
  
export { AuthContext, AuthProvider };
  