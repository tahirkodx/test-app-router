import React from "react";

const AuthContext = React.createContext({
  isLoggedIn: false,
  isAdmin: false,
  token: "",
  user: {
    FirstName: "",
  },
  showLogin: false,
  showExtend: false,
  iat: "",
  exp: "",
  sessId: "",
  onLogout: (respSessId) => {},
  onLogin: async (authDetails) => {},
  onAuthSet: (authDetails) => {},
  onShowLogin: (show) => {},
  onShowExtend: (authDetails) => {},
});

/* export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUserLoggedInInformation = localStorage.getItem("isLoggedIn");

    if (storedUserLoggedInInformation === "1") {
      setIsLoggedIn(true);
    }
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  const loginHandler = () => {
    localStorage.setItem("isLoggedIn", "1");
    setIsLoggedIn(true);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler,
        onLogin: loginHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}; */

export default AuthContext;
