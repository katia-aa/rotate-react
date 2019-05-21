import React, { useState } from 'react';
import './style.css';

interface IProps {
  items: any[]
  numOfVisibleItems?: number
}

const defaults = {
  numOfVisibleItems: 4,
}

export const Rotate = (props: IProps) => {

  const [position, setPosition] = useState(0)
  const [firstItemIndex, setFirstItemIndex] = useState(0)

  const navigate = (direction: number) => {
    const { numOfVisibleItems } = props

    const nextFirstItemIndex = direction + firstItemIndex
    const nextLastItemIndex = nextFirstItemIndex + ((numOfVisibleItems !== undefined && numOfVisibleItems - 1) || defaults.numOfVisibleItems - 1)

    const nextItemExists = props.items[numOfVisibleItems === 1 ? nextFirstItemIndex : nextLastItemIndex]


    if (direction === 1 && nextItemExists) {
      setPosition(position - (100 / (numOfVisibleItems || defaults.numOfVisibleItems)))
      setFirstItemIndex(nextFirstItemIndex)
    }

    if (direction === -1) {
      if (!props.items[nextFirstItemIndex]) {
        setFirstItemIndex(nextFirstItemIndex)
        setFirstItemIndex(0)
        setPosition(0)
      } else {
        setFirstItemIndex(nextFirstItemIndex)
        setPosition(position + (100 / (numOfVisibleItems || defaults.numOfVisibleItems)))
      }
    }
  }

  const next = () => navigate(1)
  const prev = () => navigate(-1)

  return (
    <div>
      <div>{firstItemIndex}</div>
      <div className="panel">
        <button
          style={{
            visibility: firstItemIndex === 0 ? 'hidden' : 'visible',
            left: '-0.4rem',
            top: '42%'
          }}
          onClick={prev}
        >
          {`<`}
        </button>
        <button
          style={{
            visibility: (props.items.length - 1) === (firstItemIndex + (props.numOfVisibleItems || defaults.numOfVisibleItems)) ? 'hidden' : 'visible',
            right: '-0.4rem',
            top: '42%'
          }}
          onClick={next}
        >
          {`>`}
        </button>
        <div className="frame">
          <div className="window" style={{
            gridTemplateColumns: `repeat(${props.items.length}, calc(100% / ${(props.numOfVisibleItems || defaults.numOfVisibleItems)}))`,
            left: `${position}%`,
            transition: 'left 0.5s'
          }}>
            {props.items.map((item, index) => <div key={index}>{item}</div>)}
          </div>
        </div>
      </div>
    </div>
  );
}
