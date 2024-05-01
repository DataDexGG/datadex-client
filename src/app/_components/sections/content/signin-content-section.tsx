"use client";

import {useState} from "react";
import RegisterForm from "../../login/register-form";
import LoginForm from "../../login/login-form";
import useComlink from "../../comlink/comlink";

const State = {
  LOGIN: 'login',
  REGISTER: 'register',
}

export default function SigninContentSection(props) {
  const { update } = props;
  const { isLoggedIn } = useComlink();

  const [ state, setState ] = useState(State.LOGIN);

  if (isLoggedIn())
    return null;

  return (
    <div className="relative flex flex-col w-full h-full">

      {/* HEADER */}
      <div className="bg-[#313338] w-full h-fit">
        <div className="relative flex w-full h-[3rem] items-center justify-center">
          <div className="flex gap-12">
            <div onClick={() => setState(State.LOGIN)}
                 className={`cursor-pointer flex px-2 py-0.5 justify-center 
                                         border-2 border-transparent 
                                         ${state === State.LOGIN ? 'border-b-indigo-600' : 'border-b-[#2b2d31] hover:border-b-white'}`}>
              <span className="text-white text-sm uppercase">Login</span>
            </div>

            <div onClick={() => setState(State.REGISTER)}
                 className={`cursor-pointer flex px-2 py-0.5 justify-center 
                                         border-2 border-transparent 
                                         ${state === State.REGISTER ? 'border-b-indigo-600' : 'border-b-[#2b2d31] hover:border-b-white'}`}>
              <span className="text-white text-sm uppercase">Register</span>
            </div>
          </div>
        </div>

        {/* Spacer Icon */}
        <div className={`w-full h-[0.1rem] bg-[#26272a] mx-auto`} />
      </div>

      {(state === State.REGISTER) && <RegisterForm update={update} />}
      {(state === State.LOGIN) && <LoginForm update={update} />}
    </div>
  )
}
