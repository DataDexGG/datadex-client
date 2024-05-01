import useStateManager from "../state/state-manager";
import {SharedStateKeys} from "../state/shared-state";

export default function Loading(props) {
  const { update } = props;
  const { SharedState } = useStateManager();

  const loadingVideo = SharedState.get(SharedStateKeys.LOADING_VIDEO);

  return (
    <>
      <div className={loadingVideo === undefined
            ? 'object-cover z-[100] fixed w-screen h-screen bg-black'
            : 'hidden'}
      />

      <video autoPlay muted
             className={loadingVideo === undefined
               ? 'object-cover z-[101] fixed w-screen h-screen opacity-30'
               : 'hidden'}
             src="/assets/images/lightspeed.mp4"
             onEndedCapture={() => {
               console.log("onEndedCapture");
             }}
             onEnded={() => {
               console.log("onEnded");
               SharedState.set(SharedStateKeys.LOADING_VIDEO, { done: true });
               update();
             }}
             onAbort={() => console.log('abort')}
      />

      <img className={loadingVideo === undefined
            ? 'object-contain z-[102] fixed w-1/2 h-screen transform translate-x-1/2'
            : 'hidden'}
           src="/assets/images/loading-logo.png" alt="" />
    </>
  );
}