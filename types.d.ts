type CommonContextType = {
  commonState: {
    globalState: string;
    darkMode: boolean;
  };
};

interface MyType {
  lang: string;
  // other properties...
}

interface DynamicData {
  [key: string]: any;
}
