import { useSelector } from '../../store/hooks'
import { ModalOptions } from '../../store/slices/ui/types';
import { getModal } from '../../store/slices/ui/ui.selectors';
import LoginModal from './LoginModal'
import TransferDevicePrompt from './TransferDevicePrompt';

type Props = {}

export default function ModalPortal({}: Props) {
  const modal = useSelector(getModal);
  
  switch (modal) {
    case ModalOptions.login:
      return <LoginModal />
    case ModalOptions.transfer_device:
      return <TransferDevicePrompt />
    default:
      return null;
  }
}