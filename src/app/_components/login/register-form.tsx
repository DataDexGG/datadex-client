import {useEffect, useState} from "react";
import {FaCode} from "react-icons/fa";
import {HiOutlineMail, HiLockClosed} from "react-icons/hi";
import {InvalidRegisterReason} from "./invalid-register-reason";
import {toCountdownDisplay, toValidAllycode} from "../utils";
import useComlink from "../comlink/comlink";
import {updateRefreshToken} from "./login-management";
import useStateManager from "../state/state-manager";
import {ContentStates} from "../state/page-state";
import useDatabase from "../database/database";

const PLACEHOLDER_EMAIL = "example@gmail.com";
const VERIFICATION_TIMEOUT = 1_000 * 60 * 5;

export default function RegisterForm(props) {
  const { update } = props;
  const { PageState } = useStateManager();
  const { saveAccount } = useDatabase();
  const {
    getPlayer, setSelf, getGuild, setCachedGuild,
    getLocalization, getPortraits, getTitles
  } = useComlink();

  const [ allycode, setAllycode ] = useState(undefined);
  const [ email, setEmail ] = useState(undefined);
  const [ password, setPassword ] = useState(undefined);
  const [ requestedPortrait, setRequestedPortrait ] = useState(undefined);
  const [ requestedTitle, setRequestedTitle ] = useState(undefined);
  const [ verificationTimeout, setVerificationTimeout ] = useState(VERIFICATION_TIMEOUT);

  const [ isRegistering, setIsRegistering ] = useState(false);
  const [ isWaitingVerification, setIsWaitingVerification ] = useState(false);
  const [ registerReason, setRegisterReason ] = useState(InvalidRegisterReason.NONE);
  const [ alert, setAlert ] = useState(<></>);

  useEffect(() => {
    if (registerReason !== InvalidRegisterReason.NONE) {
      setTimeout(() => {
        setRegisterReason(InvalidRegisterReason.NONE);
        setAlert(<></>);
      }, 5_000);
    }
  }, [registerReason]);

  useEffect(() => {
    if (!isWaitingVerification) {
      setVerificationTimeout(VERIFICATION_TIMEOUT);
      return;
    }

    const interval = setInterval(() => {
      setVerificationTimeout((previous) => {
        let timer = previous - 1000;
        if (timer < 0) {
          timer = 0;
          clearInterval(interval);
          setIsWaitingVerification(false);
          setIsRegistering(false);
        }
        return timer;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isWaitingVerification])

  const attemptRegistration = async (event) => {
    event.preventDefault();

    if (isRegistering) return;
    setIsRegistering(true);

    const canRegisterData = await canRegister(
      event,
      isRegistering,
      setIsRegistering,
      setRegisterReason,
      setAlert,
      getPlayer
    );

    if (!canRegisterData?.canProceed) {
      setIsRegistering(false);
      return;
    }

    const player = canRegisterData.player;
    const ally_code = canRegisterData.allyCode;
    const email = canRegisterData.email;
    const password = canRegisterData.password;

    const localization = getLocalization().data;
    const portraitRegistry = getPortraits().data;
    const titleRegistry = getTitles().data;

    const portraitType = getRandomPortrait(player);
    const portraitEnums = getPortraitRegistryByType(portraitType, portraitRegistry);

    const titleType = getRandomTitle(player);
    const titleEnums = getTitleRegistryByType(titleType, titleRegistry);

    const portrait = {
      type: portraitType,
      name: localization[portraitEnums.nameKey],
      image: portraitEnums.image,
    }

    const title = {
      type: titleType,
      name: localization[titleEnums.nameKey],
    }

    setRequestedPortrait(portrait);
    setRequestedTitle(title);

    setAllycode(ally_code);
    setEmail(email);
    setPassword(password);
    setIsWaitingVerification(true);
  }

  const attemptVerification = async () => {
    const updatedPlayer = await getPlayer(allycode);
    const title = updatedPlayer.selectedPlayerTitle.id;
    const portrait = updatedPlayer.selectedPlayerPortrait.id;
    if (title !== requestedTitle.type || portrait !== requestedPortrait.type) {
      setAlert(
        <div className="z-[101] fixed text-center lg:px-4 top-0 right-1/2 transform translate-x-1/2 translate-y-1/2">
          <div className="p-2 bg-red-800 items-center text-red-100 leading-none rounded-full flex lg:inline-flex" role="alert">
            <span className="flex rounded-full bg-red-500 uppercase px-2 py-1 text-xs font-bold mr-3">Critical</span>
            <span className="font-semibold mr-3 text-left flex-auto">Portrait or title isn't correct.</span>
          </div>
        </div>
      );
      return;
    }

    const registered = await onRegister(saveAccount, allycode, email, password, setAlert, setIsRegistering);
    if (registered.success) {
      setRegisterReason(InvalidRegisterReason.CUSTOM);
      setAlert(
        <div className="z-[101] fixed text-center lg:px-4 top-0 right-1/2 transform translate-x-1/2 translate-y-1/2">
          <div className="p-2 bg-green-800 items-center text-green-100 leading-none rounded-full flex lg:inline-flex" role="alert">
            <span className="flex rounded-full bg-green-500 uppercase px-2 py-1 text-xs font-bold mr-3">Success</span>
            <span className="font-semibold mr-3 text-left flex-auto">Successfully registered account!</span>
          </div>
        </div>
      );

      const player = await getPlayer(allycode);
      setSelf(player);

      const guild_id = player.guildId;
      if (guild_id && guild_id.length > 0) {
        const guild = await getGuild(guild_id);
        setCachedGuild(guild);
      }

      updateRefreshToken(registered.user_id, allycode);
      PageState.setContentPage(ContentStates.PATCH_NOTES);

      update();
    }

    setIsRegistering(false);
    setIsWaitingVerification(false);
  }

  return (
    <div className="w-full h-full">
      {(isWaitingVerification) && (
        <div>

          <div className="z-[99] fixed top-0 left-0 w-screen h-screen bg-black opacity-50" />

          <div className="z-[100] fixed w-[20rem] h-fit bg-[#313338] border-2 border-[#26272a]
                            top-1/2 left-1/2 transform -translate-y-1/2
                            text-white">

            <div className="p-[1rem] flex flex-col">
              <div className="flex justify-center text-center">
                <span className="text-2xl font-bold">VERIFY</span>
              </div>
              <div className="flex justify-center text-center">
                <span className="text-sm font-light text-gray-400">Verifying your allycode requires some actions to securely link your account.</span>
              </div>

              <div className="mt-[1.5rem] flex flex-col p-2 bg-[#2d2e33] border-2 border-[#26272a]">
                <p className="text-[0.75rem] text-gray-500">{`Profile > Stats > Select a Portrait`}</p>
                <span className="mt-[0.5rem] text-base font-semibold">UPDATE PORTRAIT</span>
                <div className="flex">
                  <img className="mt-1 w-10 h-10" src={requestedPortrait.image} alt="" />
                  <span className="ml-2 mt-3 text-sm text-yellow-200">{requestedPortrait.name}</span>
                </div>
              </div>

              <div className="mt-[1.5rem] flex flex-col p-2 bg-[#2d2e33] border-2 border-[#26272a]">
                <p className="text-[0.75rem] text-gray-500">{`Profile > Stats > Select a Title`}</p>
                <span className="mt-[0.5rem] text-base font-semibold">UPDATE TITLE</span>
                <span className="text-sm text-yellow-200">{requestedTitle.name}</span>
              </div>

              <div className="mt-[2rem] flex justify-center text-center text-red-300">
                <span className="text-sm font-light">{toCountdownDisplay(verificationTimeout)}</span>
              </div>

              <div className="mt-[2rem] flex justify-center text-center">
                <span className="text-sm font-light">After you have updated your SWGOH profile with the requested portrait and title, you may proceed. You can revert to your previous selection after verification.</span>
              </div>

              <button className={`mt-[1rem] flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                      onClick={() => attemptVerification()}>
                <span>Proceed</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="relative p-3 w-full h-full overflow-y-auto custom-scrollbar">
        <form onSubmit={(event) => attemptRegistration(event)}
              action="#"
              method="POST"
              className="flex flex-col h-full justify-start items-center">

          {alert}

          <div className="mt-12 mb-20">
            <span className="text-white text-2xl font-bold">REGISTER</span>
          </div>

          <div className="w-3/4 lg:w-2/3 xl:w-1/3">
            <label htmlFor="allycode" className="flex ml-2 text-center">
              <FaCode className="mr-2 text-white" />
              <span className="text-white text-sm font-semibold uppercase">Ally Code</span>
            </label>
            <input id="allycode"
                   name="allycode"
                   type="text"
                   autoComplete="swgoh-ally-code"
                   required
                   placeholder="123-456-789"
                   className="mt-2 relative flex flex-col w-full h-fit
                              bg-[#2d2e33] border-2 border-[#26272a]
                              pl-4 py-2 text-gray-300 text-sm" />
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
            <input id="password1"
                   name="password1"
                   type="password"
                   autoComplete="swgoh-ally-code"
                   required
                   className="mt-2 relative flex flex-col w-full h-fit
                              bg-[#2d2e33] border-2 border-[#26272a]
                              pl-4 py-2 text-gray-300 text-sm" />
          </div>

          <div className="mt-8 w-3/4 lg:w-2/3 xl:w-1/3">
            <label htmlFor="password2" className="flex ml-2 text-center">
              <HiLockClosed className="mr-2 text-white" />
              <span className="text-white text-sm font-semibold uppercase">Repeat Password</span>
            </label>
            <input id="password2"
                   name="password2"
                   type="password"
                   autoComplete="swgoh-ally-code"
                   required
                   className="mt-2 relative flex flex-col w-full h-fit
                              bg-[#2d2e33] border-2 border-[#26272a]
                              pl-4 py-2 text-gray-300 text-sm" />
          </div>

          <div className="w-3/4 lg:w-2/3 xl:w-1/3 mt-12">
            <button type="submit" disabled={false} className={`flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}>
              <span>Register</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}

function getPortraitRegistryByType(type, registry) {
  let portrait = undefined;

  for (let i = 0; i < registry.length; i++) {
    const obj = registry[i];
    if (obj.id !== type)
      continue;

    portrait = obj;
    portrait.image = `https://game-assets.swgoh.gg/${obj.icon}.png`;
    break;
  }

  return portrait;
}

function getTitleRegistryByType(type, registry) {
  let title = undefined;

  for (let i = 0; i < registry.length; i++) {
    const obj = registry[i];
    if (obj.id !== type)
      continue;

    title = obj;
    break;
  }

  return title;
}

function getRandomPortrait(player) {
  const currentPortrait = player.selectedPlayerPortrait.id;
  const array = player.unlockedPlayerPortrait;
  const portrait = array[Math.floor(Math.random() * array.length)];
  if (portrait.id === currentPortrait) {
    return getRandomTitle(player);
  }

  return portrait.id;
}

function getRandomTitle(player) {
  const currentTitle = player.selectedPlayerTitle.id;
  const array = player.unlockedPlayerTitle;
  const title = array[Math.floor(Math.random() * array.length)];
  if (title.id === currentTitle) {
    return getRandomTitle(player);
  }

  return title.id;
}

async function canRegister(event, isRegistering, setRegistering, setRegisterReason, setAlert, getPlayer) {
  const allyCode = event.target.allycode.value;
  const email = event.target.email.value;
  const password = event.target.password1.value;
  const password2 = event.target.password2.value;

  let reason = InvalidRegisterReason.NONE;
  let canProceed = true;

  if (reason === InvalidRegisterReason.NONE && password !== password2) {
    reason = InvalidRegisterReason.PASSWORD_MISMATCH;
    setRegisterReason(reason);
  }

  const allyCodeResult = allyCode.match(/^\d{3}\-{0,1}\d{3}\-{0,1}\d{3}$/);
  if (reason === InvalidRegisterReason.NONE && !allyCodeResult) {
    setRegisterReason(reason = InvalidRegisterReason.INVALID_ALLY_CODE);
  }

  const player = await getPlayer(allyCode);
  if (!player.name) {
    setRegisterReason(reason = InvalidRegisterReason.UNRESOLVED_ALLY_CODE);
  }

  const emailResult = email.match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/);
  if (reason === InvalidRegisterReason.NONE && (!emailResult || email.toLowerCase() === PLACEHOLDER_EMAIL.toLowerCase())) {
    reason = InvalidRegisterReason.INVALID_EMAIL;
    setRegisterReason(reason);
  }

  // Does not contain at least 8 characters
  if (reason === InvalidRegisterReason.NONE && password.length < 8) {
    reason = InvalidRegisterReason.INVALID_PASSWORD_TO_SHORT;
    setRegisterReason(reason);
  }

  // Does not contain at least 1 uppercase character
  if (reason === InvalidRegisterReason.NONE && !password.match(/^.*[A-Z].*$/)) {
    reason = InvalidRegisterReason.INVALID_PASSWORD_NO_UPPERCASE;
    setRegisterReason(reason);
  }

  // Does not contain at least 3 numbers
  if (reason === InvalidRegisterReason.NONE && !password.match(/^.*[0-9].*[0-9].*[0-9].*$/)) {
    reason = InvalidRegisterReason.INVALID_PASSWORD_NOT_ENOUGH_DIGITS;
    setRegisterReason(reason);
  }

  // Does not contain at least 1 special character
  if (reason === InvalidRegisterReason.NONE && !password.match(/^.*[!@#$%^&*()\-_=+{};:,<.>].*$/)) {
    reason = InvalidRegisterReason.INVALID_PASSWORD_NO_SPECIAL_CHAR;
    setRegisterReason(reason);
  }

  // Contains invalid characters
  if (reason === InvalidRegisterReason.NONE && password.match(/[^a-zA-Z0-9!@#$%^&*()\-_=+{};:,<.>]/)) {
    reason = InvalidRegisterReason.INVALID_PASSWORD_SYMBOLS;
    setRegisterReason(reason);
  }

  if (reason !== InvalidRegisterReason.NONE) {
    setRegistering(false);
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

  return { allyCode, email, password, player, canProceed };
}

async function onRegister(saveAccount, allyCode, email, password, setAlert, setIsRegistering) {
  const result = await saveAccount(allyCode, email, password);

  let success = true;

  if (result.email_exists) {
    success = false;
    setAlert(
      <div className="z-50 fixed text-center lg:px-4 top-0 right-1/2 transform translate-x-1/2 translate-y-1/2">
        <div className="p-2 bg-red-800 items-center text-red-100 leading-none rounded-full flex lg:inline-flex" role="alert">
          <span className="flex rounded-full bg-red-500 uppercase px-2 py-1 text-xs font-bold mr-3">Critical</span>
          <span className="font-semibold mr-3 text-left flex-auto">This email address is already registered.</span>
        </div>
      </div>
    );
  }

  if (result.ally_code_exists) {
    success = false;
    setAlert(
      <div className="z-50 fixed text-center lg:px-4 top-0 right-1/2 transform translate-x-1/2 translate-y-1/2">
        <div className="p-2 bg-red-800 items-center text-red-100 leading-none rounded-full flex lg:inline-flex" role="alert">
          <span className="flex rounded-full bg-red-500 uppercase px-2 py-1 text-xs font-bold mr-3">Critical</span>
          <span className="font-semibold mr-3 text-left flex-auto">This allycode is already registered.</span>
        </div>
      </div>
    );
  }

  setIsRegistering(false);

  return { success, user_id: result.user_id };
}