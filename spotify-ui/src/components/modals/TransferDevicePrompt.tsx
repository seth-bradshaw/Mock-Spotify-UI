import React from "react";
import ModalWrapper from "./ModalWrapper";
import { transferDevice } from "../../services";
import { useDispatch, useSelector } from "../../store/hooks";
import { getDeviceId } from "../../store/slices/ui/ui.selectors";
import { changeModal } from "../../store/slices/ui/ui";

type Props = {};

export default function TransferDevicePrompt({}: Props) {
    const dispatch = useDispatch();
  const device_id = useSelector(getDeviceId);

  const handleClick = () => {
    transferDevice(device_id)
    dispatch(changeModal(''))
  }
  return (
    <ModalWrapper title="Transfer Device" dismissable={true}>
      <hr className="mt-2"></hr>
      <div className="h-full w-full flex items-center justify-center">
        <div className="h-full w-96 text-white text-lg text-center p-6 flex flex-col gap-10">
          <p>
            In order to listen in this application you must transfer your
            device. If not, you can still access the rest of the application.
          </p>
          <button
            className="p-2 rounded-full bg-spotify-green-400 w-full font-extrabold"
            onClick={handleClick}
          >
            Start Listening
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
}
