import React, { useMemo, useRef, useState, useEffect } from 'react'
import styled from 'styled-components'
import { useAllTokenData } from '../../contexts/TokenData'
import TokenLogo from '../TokenLogo'
import { AutoColumn } from '../Column'
import { RowFixed, RowFlat } from '../Row'
import { GreyCard } from '../Card'
import { TYPE } from '../../Theme'
import { StyledInternalLink } from '../Link'
import { formatDollarAmount } from '../../utils'
import Percent from '../Percent'
import HoverInlineText from '../HoverInlineText'

const CardWrapper = styled(StyledInternalLink)`
  min-width: 190px;
  margin-right: 16px;

  :hover {
    cursor: pointer;
    opacity: 0.6;
  }
`

const FixedContainer = styled(AutoColumn)``

export const ScrollableRow = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  overflow-x: auto;
  white-space: nowrap;

  ::-webkit-scrollbar {
    display: none;
  }
`

const DataCard = ({ tokenData }) => {
  return (
    <CardWrapper to={'/token/' + tokenData.id}>
      <GreyCard padding="16px">
        <RowFixed>
          <TokenLogo address={tokenData.id} size="32px" />
          <AutoColumn gap="3px" style={{ marginLeft: '12px' }}>
            <TYPE.label fontSize="14px">
              <HoverInlineText text={tokenData.symbol} />
            </TYPE.label>
            <RowFlat>
              <TYPE.label fontSize="14px" mr="6px" lineHeight="16px">
                {formatDollarAmount(tokenData.priceUSD)}
              </TYPE.label>
              <Percent fontSize="14px" value={tokenData.priceChangeUSD} />
            </RowFlat>
          </AutoColumn>
        </RowFixed>
      </GreyCard>
    </CardWrapper>
  )
}

function useHorizontalScroll() {
  const elRef = useRef()
  useEffect(() => {
    const el = elRef.current
    if (el) {
      const onWheel = (e) => {
        if (e.deltaY == 0) return
        e.preventDefault()
        el.scrollTo({
          left: el.scrollLeft + 5 * e.deltaY,
          behavior: 'smooth',
        })
      }
      el.addEventListener('wheel', onWheel)
      return () => el.removeEventListener('wheel', onWheel)
    }
  }, [])
  return elRef
}

export default function TopTokenMovers() {
  const allTokens = useAllTokenData()

  const topPriceIncrease = useMemo(() => {
    return Object.values(allTokens)
      .sort(({ data: a }, { data: b }) => {
        return a && b ? (Math.abs(a?.priceUSDChange) > Math.abs(b?.priceUSDChange) ? -1 : 1) : -1
      })
      .slice(0, Math.min(20, Object.values(allTokens).length))
  }, [allTokens])

  const increaseRef = useHorizontalScroll()
  const [increaseSet, setIncreaseSet] = useState(false)
  const [scrollInvertal, setScrollInterval] = useState(null)
  // const [pauseAnimation, setPauseAnimation] = useState(false)
  // const [resetInterval, setClearInterval] = useState<() => void | undefined>()

  useEffect(() => {
    if (!increaseSet && increaseRef && increaseRef.current) {
      const invertal = setInterval(() => {
        if (increaseRef.current && increaseRef.current.scrollLeft !== increaseRef.current.scrollWidth) {
          increaseRef.current.scrollTo(increaseRef.current.scrollLeft + 1, 0)
        }
      }, 30)

      setScrollInterval(invertal)
      setIncreaseSet(true)
    }
  }, [increaseRef, increaseSet])

  // function handleHover() {
  //   if (resetInterval) {
  //     resetInterval()
  //   }
  //   setPauseAnimation(true)
  // }

  const onMouseEnter = () => {
    clearInterval(scrollInvertal)
  }

  const onMouseLeave = () => {
    const invertal = setInterval(() => {
      if (increaseRef.current && increaseRef.current.scrollLeft !== increaseRef.current.scrollWidth) {
        increaseRef.current.scrollTo(increaseRef.current.scrollLeft + 1, 0)
      }
    }, 30)

    setScrollInterval(invertal)
  }

  return (
    <FixedContainer gap="md">
      <ScrollableRow ref={increaseRef} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        {topPriceIncrease.map((entry) =>
          entry.symbol ? <DataCard key={'top-card-token-' + entry.id} tokenData={entry} /> : null
        )}
      </ScrollableRow>
    </FixedContainer>
  )
}
