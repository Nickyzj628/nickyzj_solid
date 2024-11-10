import { randomInt } from "@/services/math";
import { createContext, createSignal, useContext } from "solid-js";

const UserContext = createContext();

export const UserProvider = (props) => {
  const id = randomInt(1000, 10000);
  const [getUser, setUser] = createSignal({ id, name: `无名客${id}`, });
  const context = [
    getUser,
    {},
  ];

  return (
    <UserContext.Provider value={context}>
      {props.children}
    </UserContext.Provider>
  )
};

export const useUserContext = () => {
  return useContext(UserContext);
};