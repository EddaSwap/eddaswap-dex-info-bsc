import React, { useEffect } from 'react'
import { useMedia } from 'react-use'
import 'feather-icons'

import TopTokenList from '../components/TokenList'
import TopTokenMovers from '../components/TopTokenMovers'
import { TYPE } from '../Theme'
import Panel from '../components/Panel'
import { useAllTokenData } from '../contexts/TokenData'
import { PageWrapper, FullWrapper, SectionName } from '../components'
import { RowBetween } from '../components/Row'
import Search from '../components/Search'
import { Type } from 'react-feather'
// import CheckBox from '../components/Checkbox'
// import QuestionHelper from '../components/QuestionHelper'

function AllTokensPage() {
  const allTokens = useAllTokenData()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const below600 = useMedia('(max-width: 800px)')

  // const [useTracked, setUseTracked] = useState(true)

  return (
    <PageWrapper>
      <FullWrapper>
        <Search />
        <SectionName>Top Tokens</SectionName>
        <Panel style={{ padding: below600 && '1rem' }}>
          <TopTokenMovers />
        </Panel>
        {/* <AutoRow gap="4px">
          <CheckBox checked={useTracked} setChecked={() => setUseTracked(!useTracked)} text={'Hide untracked tokens'} />
          <QuestionHelper text="USD amounts may be inaccurate in low liquiidty pairs or pairs without BNB or stablecoins." />
        </AutoRow> */}
        <RowBetween>
          <SectionName>All Tokens</SectionName>
        </RowBetween>
        <Panel style={{ padding: below600 && '1rem 0 0 0 ' }}>
          <TopTokenList tokens={allTokens} itemMax={50} />
        </Panel>
      </FullWrapper>
    </PageWrapper>
  )
}

export default AllTokensPage
