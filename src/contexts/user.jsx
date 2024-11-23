import { randomInt } from "@/services/math";
import { createContext, createSignal, useContext } from "solid-js";

/**
 * @typedef {[import("solid-js").Accessor<User>, Record<string, any>]} UserContext
 */

const UserContext = createContext();

export const UserProvider = (props) => {
  const id = randomInt(1000, 10000);
  const [getUser, setUser] = createSignal({ id, name: `无名客${id}`, });

  /** @type {UserContext} */
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

/** @returns {UserContext} */
export const useUserContext = () => {
  return useContext(UserContext);
};