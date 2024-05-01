import {useEffect, useState} from "react";
import {HiOutlineMail, HiLockClosed} from "react-icons/hi";
import {InvalidRegisterReason} from "./invalid-register-reason";
import useComlink from "../comlink/comlink";
import useAccount from "../account/account";
import {updateRefreshToken} from "./login-management";
import useStateManager from "../state/state-manager";
import {ContentStates} from "../state/page-state";

const PLACEHOLDER_EMAIL = "example@gmail.com";

export default function LoginForm(props) {
  const { update } = props;
  const { PageState } = useStateManager();
  const { getAccountByEmail } = useAccount();
  const { getPlayer, setSelf, getGuild, setCachedGuild } = useComlink();

  const [ loggedIn, setLoggedIn ] = useState(false);
  const [ isLoggingIn, setIsLoggingIn ] = useState(false);
  const [ reason, setReason ] = useState(InvalidRegisterReason.NONE);
  const [ alert, setAlert ] = useState(<></>);

  useEffect(() => {
    if (reason !== InvalidRegisterReason.NONE) {
      setTimeout(() => {
        setReason(InvalidRegisterReason.NONE);
        setAlert(<></>);
      }, 5_000);
    }
  }, [reason]);

  const attemptLogin = async (event) => {
    event.preventDefault();

    if (isLoggingIn) return;
    setIsLoggingIn(true);

    const canLoginData = await login(
      event,
      setIsLoggingIn,
      setReason,
      setAlert,
      getAccountByEmail,
      getPlayer,
      setSelf,
      getGuild,
      setCachedGuild,
      setLoggedIn,
      PageState
    );

    update();
  }

  return (
    <div className="w-full h-full">

      <div className="relative p-3 w-full h-full overflow-y-auto custom-scrollbar">
        <form onSubmit={(event) => attemptLogin(event)}
              action="#"
              method="POST"
              className="flex flex-col h-full justify-start items-center">

          {alert}

          <div className="mt-12 mb-20">
            <span className="text-white text-2xl font-bold">LOGIN</span>
          </div>

          <div className="mt-8 w-3/4 lg:w-2/3 xl:w-1/3">
            <label htmlFor="email" className="flex ml-2 text-center">
              <HiOutlineMail className="mr-2 text-white" />
              <span className="text-white text-sm font-semibold uppercase">Email Address</span>
            </label>
            <input id="email"
                   name="email"
                   type="text"
                   autoComplete="swgoh-ally-code"
                   required
                   placeholder={PLACEHOLDER_EMAIL}
                   className="mt-2 relative flex flex-col w-full h-fit
                              bg-[#2d2e33] border-2 border-[#26272a]
                              pl-4 py-2 text-gray-300 text-sm" />
          </div>

          <div className="mt-8 w-3/4 lg:w-2/3 xl:w-1/3">
            <label htmlFor="password1" className="flex ml-2 text-center">
              <HiLockClosed className="mr-2 text-white" />
              <span className="text-white text-sm font-semibold uppercase">Password</span>
            </label>
            <input id="password"
                   name="password"
                   type="password"
                   autoComplete="swgoh-ally-code"
                   required
                   className="mt-2 relative flex flex-col w-full h-fit
                              bg-[#2d2e33] border-2 border-[#26272a]
                              pl-4 py-2 text-gray-300 text-sm" />
          </div>

          <div className="w-3/4 lg:w-2/3 xl:w-1/3 mt-12">
            <button type="submit" disabled={isLoggingIn || loggedIn} className={`flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}>
              <span>Login</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}

async function login(
  event,
  setIsLoggingIn,
  setReason,
  setAlert,
  getAccountByEmail,
  getPlayer,
  setSelf,
  getGuild,
  setCachedGuild,
  setLoggedIn,
  PageState
) {
  const email = event.target.email.value; //lbug@gmail.com
  const password = event.target.password.value;

  let reason = InvalidRegisterReason.NONE;
  let canProceed = true;

  const emailResult = email.match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/);
  if (reason === InvalidRegisterReason.NONE && (!emailResult || email.toLowerCase() === PLACEHOLDER_EMAIL.toLowerCase())) {
    reason = InvalidRegisterReason.INVALID_EMAIL;
    setReason(reason);
  }

  // Does not contain at least 8 characters
  if (reason === InvalidRegisterReason.NONE && password.length < 8) {
    reason = InvalidRegisterReason.INVALID_PASSWORD_TO_SHORT;
    setReason(reason);
  }

  // Does not contain at least 1 uppercase character
  if (reason === InvalidRegisterReason.NONE && !password.match(/^.*[A-Z].*$/)) {
    reason = InvalidRegisterReason.INVALID_PASSWORD_NO_UPPERCASE;
    setReason(reason);
  }

  // Does not contain at least 3 numbers
  if (reason === InvalidRegisterReason.NONE && !password.match(/^.*[0-9].*[0-9].*[0-9].*$/)) {
    reason = InvalidRegisterReason.INVALID_PASSWORD_NOT_ENOUGH_DIGITS;
    setReason(reason);
  }

  // Does not contain at least 1 special character
  if (reason === InvalidRegisterReason.NONE && !password.match(/^.*[!@#$%^&*()\-_=+{};:,<.>].*$/)) {
    reason = InvalidRegisterReason.INVALID_PASSWORD_NO_SPECIAL_CHAR;
    setReason(reason);
  }

  // Contains invalid characters
  if (reason === InvalidRegisterReason.NONE && password.match(/[^a-zA-Z0-9!@#$%^&*()\-_=+{};:,<.>]/)) {
    reason = InvalidRegisterReason.INVALID_PASSWORD_SYMBOLS;
    setReason(reason);
  }

  const account = await getAccountByEmail(email, password);
  if (!account) {
    reason = InvalidRegisterReason.ACCOUNT_DOESNT_EXISTS;
    setReason(reason);
  }

  const player = await getPlayer(account.ally_code);
  setSelf(player);

  const guild_id = player.guildId;
  if (guild_id && guild_id.length > 0) {
    const guild = await getGuild(guild_id);
    setCachedGuild(guild);
  }

  if (reason !== InvalidRegisterReason.NONE) {
    setIsLoggingIn(false);
    canProceed = false;

    setAlert(
      <div className="z-50 fixed text-center lg:px-4 top-0 right-1/2 transform translate-x-1/2 translate-y-1/2">
        <div className="p-2 bg-red-800 items-center text-red-100 leading-none rounded-full flex lg:inline-flex" role="alert">
          <span className="flex rounded-full bg-red-500 uppercase px-2 py-1 text-xs font-bold mr-3">Critical</span>
          <span className="font-semibold mr-3 text-left flex-auto">{reason.message}</span>
        </div>
      </div>
    );
    return undefined;
  }

  updateRefreshToken(account.user_id, account.ally_code);
  PageState.setContentPage(ContentStates.PATCH_NOTES);

  setLoggedIn(true);
  setReason(InvalidRegisterReason.CUSTOM);
  setAlert(
    <div className="z-[101] fixed text-center lg:px-4 top-0 right-1/2 transform translate-x-1/2 translate-y-1/2">
      <div className="p-2 bg-green-800 items-center text-green-100 leading-none rounded-full flex lg:inline-flex" role="alert">
        <span className="flex rounded-full bg-green-500 uppercase px-2 py-1 text-xs font-bold mr-3">Success</span>
        <span className="font-semibold mr-3 text-left flex-auto">Logged in, Hi {player.name}!</span>
      </div>
    </div>
  );

  return { email, password, account, player, canProceed };
}