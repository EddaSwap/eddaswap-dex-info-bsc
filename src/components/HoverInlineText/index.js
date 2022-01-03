import Tooltip from '../Tooltip'
import React, { useState } from 'react'
import styled from 'styled-components'

const TextWrapper = styled.div`
  position: relative;
  margin-left: ${({ margin }) => margin && '4px'};
  color: ${({ theme, link, color }) => (link ? theme.blue1 : color ?? theme.text1)};
  font-size: ${({ fontSize }) => fontSize ?? 'inherit'};

  :hover {
    cursor: pointer;
  }

  @media screen and (max-width: 600px) {
    font-size: ${({ adjustSize }) => adjustSize && '12px'};
  }
`

const HoverInlineText = ({
  text,
  maxCharacters = 20,
  margin = false,
  adjustSize = false,
  fontSize,
  color,
  link,
  ...rest
}) => {
  const [showHover, setShowHover] = useState(false)

  if (!text) {
    return <span></span>
  }

  if (text.length > maxCharacters) {
    return (
      <Tooltip text={text} show={showHover}>
        <TextWrapper
          onMouseEnter={() => setShowHover(true)}
          onMouseLeave={() => setShowHover(false)}
          margin={margin}
          adjustSize={adjustSize}
          link={!!link}
          color={color}
          fontSize={fontSize}
          {...rest}
        >
          {' ' + text.slice(0, maxCharacters - 1) + '...'}
        </TextWrapper>
      </Tooltip>
    )
  }

  return (
    <TextWrapper color={color} margin={margin} adjustSize={adjustSize} link={!!link} fontSize={fontSize} {...rest}>
      {text}
    </TextWrapper>
  )
}

export default HoverInlineText
