import ViewWrapper from '../ViewLayout/ViewWrapper'
import Browse from './Browse'
import Results from './Results'

type Props = {}

export default function Search({}: Props) {
  return (
    <ViewWrapper isLoading={false}>
      <Browse />
      <Results />
    </ViewWrapper>
  )
}