import { useEffect } from 'react'
import ViewWrapper from '../ViewLayout/ViewWrapper'
import { useDispatch, useSelector } from '../../../../store/hooks'
import { changeModal } from '../../../../store/slices/ui/ui';
import { getPromptedTransfer } from '../../../../store/slices/ui/ui.selectors';

type Props = {}

export default function Home({}: Props) {
  const dispatch = useDispatch();
  const promptedTransfer = useSelector(getPromptedTransfer);

  useEffect(() => {
    if (!promptedTransfer) {
      dispatch(changeModal('transfer_device'))
    }
  }, [])

  return (
    <ViewWrapper isLoading={false}>
        <div className="h-full w-full">
        </div>
    </ViewWrapper>
  )
}