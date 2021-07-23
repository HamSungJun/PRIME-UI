import { PUI_VALID_PLACEMENTS } from '../../../constants'
/**
 * @description 기준 엘리먼트와 배치할 엘리먼트 두 요소간 절대 좌표를 확인하여 배치할 엘리먼트가 위치해야 할 절대 좌표 및 뷰포트와 충돌시 입은 픽셀 손해량을 계산하는 함수
 * @param {HTMLElement} source 뷰포트 상에서의 기준점으로 이용할 엘리먼트
 * @param {HTMLElement} target 뷰포트 상에서 기준점으로 이용할 엘리먼트의 특정 방향에 배치시킬 엘리먼트
 * @returns 배치할 엘리먼트가 뷰포트와 충돌시 입은 픽셀 손해량, 특정 방향에 배치할 경우 top, left 값 {damage: number, top: number, left: number}
 */
export const placeAt = ({ source = null, target = null, placement = '' } = {}) => {
  if (!placement || !PUI_VALID_PLACEMENTS.has(placement)) return null
  if ([source, target].some(el => !(el instanceof HTMLElement))) return null
  //* 좌표를 확인하는 함수는 ReFlow 연산에 대한 코스트를 부담하므로 계산하기전 변수에 담아 참조로 동작하도록 합니다.
  const windowIWidth = window.innerWidth
  const windowIHeight = window.innerHeight
  const sourceRect = source.getBoundingClientRect()
  const targetRect = target.getBoundingClientRect()
  switch (placement) {
    case 'Top-Start': return placeAtTopStart({ windowIWidth, windowIHeight, sourceRect, targetRect })
    case 'Top-Center': return placeAtTopCenter({ windowIWidth, windowIHeight, sourceRect, targetRect })
    case 'Top-End': return placeAtTopEnd({ windowIWidth, windowIHeight, sourceRect, targetRect })
    case 'Bottom-Start': return placeAtBottomStart({ windowIWidth, windowIHeight, sourceRect, targetRect })
    case 'Bottom-Center': return placeAtBottomCenter({ windowIWidth, windowIHeight, sourceRect, targetRect })
    case 'Bottom-End': return placeAtBottomEnd({ windowIWidth, windowIHeight, sourceRect, targetRect })
    case 'Left-Start': return placeAtLeftStart({ windowIWidth, windowIHeight, sourceRect, targetRect })
    case 'Left-Center': return placeAtLeftCenter({ windowIWidth, windowIHeight, sourceRect, targetRect })
    case 'Left-End': return placeAtLeftEnd({ windowIWidth, windowIHeight, sourceRect, targetRect })
    case 'Right-Start': return placeAtRightStart({ windowIWidth, windowIHeight, sourceRect, targetRect })
    case 'Right-Center': return placeAtRightCenter({ windowIWidth, windowIHeight, sourceRect, targetRect })
    case 'Right-End': return placeAtRightEnd({ windowIWidth, windowIHeight, sourceRect, targetRect })
    default: return null
  }
}

export const placeAtTopStart = ({ windowIWidth, windowIHeight, sourceRect, targetRect }) => {
  const targetArea = (targetRect.height * targetRect.width)
  const top = sourceRect.top - targetRect.height
  const left = sourceRect.left - targetRect.width
  const right = sourceRect.left
  const bottom = sourceRect.top
  const operands = { targetArea, top, left, right, bottom, windowIWidth, windowIHeight }
  const returnForm = {
    damage: isFullyInViewPort(operands) ? 0 : calcDamage(operands),
    top,
    left
  }
  return setReturn(returnForm)
}

export const placeAtTopCenter = ({ windowIWidth, windowIHeight, sourceRect, targetRect }) => {
  const targetArea = (targetRect.height * targetRect.width)
  const top = sourceRect.top - targetRect.height
  const left = sourceRect.left + (sourceRect.width / 2) - (targetRect.width / 2)
  const right = left + targetRect.width
  const bottom = sourceRect.top
  const operands = { targetArea, top, left, right, bottom, windowIWidth, windowIHeight }
  const returnForm = {
    damage: isFullyInViewPort(operands) ? 0 : calcDamage(operands),
    top,
    left
  }
  return setReturn(returnForm)
}
export const placeAtTopEnd = ({ windowIWidth, windowIHeight, sourceRect, targetRect }) => {
  const targetArea = (targetRect.height * targetRect.width)
  const top = sourceRect.top - targetRect.height
  const left = sourceRect.right
  const right = left + targetRect.width
  const bottom = sourceRect.top
  const operands = { targetArea, top, left, right, bottom, windowIWidth, windowIHeight }
  const returnForm = {
    damage: isFullyInViewPort(operands) ? 0 : calcDamage(operands),
    top,
    left
  }
  return setReturn(returnForm)
}

export const placeAtBottomStart = ({ windowIWidth, windowIHeight, sourceRect, targetRect }) => {
  const targetArea = (targetRect.height * targetRect.width)
  const top = sourceRect.bottom
  const left = sourceRect.left - targetRect.width
  const right = left + targetRect.width
  const bottom = top + targetRect.height
  const operands = { targetArea, top, left, right, bottom, windowIWidth, windowIHeight }
  const returnForm = {
    damage: isFullyInViewPort(operands) ? 0 : calcDamage(operands),
    top,
    left
  }
  return setReturn(returnForm)
}
export const placeAtBottomCenter = ({ windowIWidth, windowIHeight, sourceRect, targetRect }) => {
  const targetArea = (targetRect.height * targetRect.width)
  const top = sourceRect.bottom
  const left = sourceRect.left + (sourceRect.width / 2) - (targetRect.width / 2)
  const right = left + targetRect.width
  const bottom = top + targetRect.height
  const operands = { targetArea, top, left, right, bottom, windowIWidth, windowIHeight }
  const returnForm = {
    damage: isFullyInViewPort(operands) ? 0 : calcDamage(operands),
    top,
    left
  }
  return setReturn(returnForm)
}
export const placeAtBottomEnd = ({ windowIWidth, windowIHeight, sourceRect, targetRect }) => {
  const targetArea = (targetRect.height * targetRect.width)
  const top = sourceRect.bottom
  const left = sourceRect.right
  const right = left + targetRect.width
  const bottom = top + targetRect.height
  const operands = { targetArea, top, left, right, bottom, windowIWidth, windowIHeight }
  const returnForm = {
    damage: isFullyInViewPort(operands) ? 0 : calcDamage(operands),
    top,
    left
  }
  return setReturn(returnForm)
}

export const placeAtLeftStart = ({ windowIWidth, windowIHeight, sourceRect, targetRect }) => {
  const targetArea = (targetRect.height * targetRect.width)
  const top = sourceRect.top
  const left = sourceRect.left - targetRect.width
  const right = left + targetRect.width
  const bottom = top + targetRect.height
  const operands = { targetArea, top, left, right, bottom, windowIWidth, windowIHeight }
  const returnForm = {
    damage: isFullyInViewPort(operands) ? 0 : calcDamage(operands),
    top,
    left
  }
  return setReturn(returnForm)
}
export const placeAtLeftCenter = ({ windowIWidth, windowIHeight, sourceRect, targetRect }) => {
  const targetArea = (targetRect.height * targetRect.width)
  const top = sourceRect.top + (sourceRect.height / 2) - (targetRect.height / 2)
  const left = sourceRect.left - targetRect.width
  const right = left + targetRect.width
  const bottom = top + targetRect.height
  const operands = { targetArea, top, left, right, bottom, windowIWidth, windowIHeight }
  const returnForm = {
    damage: isFullyInViewPort(operands) ? 0 : calcDamage(operands),
    top,
    left
  }
  return setReturn(returnForm)
}
export const placeAtLeftEnd = ({ windowIWidth, windowIHeight, sourceRect, targetRect }) => {
  const targetArea = (targetRect.height * targetRect.width)
  const top = sourceRect.bottom - targetRect.height
  const left = sourceRect.left - targetRect.width
  const right = left + targetRect.width
  const bottom = top + targetRect.height
  const operands = { targetArea, top, left, right, bottom, windowIWidth, windowIHeight }
  const returnForm = {
    damage: isFullyInViewPort(operands) ? 0 : calcDamage(operands),
    top,
    left
  }
  return setReturn(returnForm)
}

export const placeAtRightStart = ({ windowIWidth, windowIHeight, sourceRect, targetRect }) => {
  const targetArea = (targetRect.height * targetRect.width)
  const top = sourceRect.top
  const left = sourceRect.right
  const right = left + targetRect.width
  const bottom = top + targetRect.height
  const operands = { targetArea, top, left, right, bottom, windowIWidth, windowIHeight }
  const returnForm = {
    damage: isFullyInViewPort(operands) ? 0 : calcDamage(operands),
    top,
    left
  }
  return setReturn(returnForm)
}
export const placeAtRightCenter = ({ windowIWidth, windowIHeight, sourceRect, targetRect }) => {
  const targetArea = (targetRect.height * targetRect.width)
  const top = sourceRect.top + (sourceRect.height / 2) - (targetRect.height / 2)
  const left = sourceRect.right
  const right = left + targetRect.width
  const bottom = top + targetRect.height
  const operands = { targetArea, top, left, right, bottom, windowIWidth, windowIHeight }
  const returnForm = {
    damage: isFullyInViewPort(operands) ? 0 : calcDamage(operands),
    top,
    left
  }
  return setReturn(returnForm)
}
export const placeAtRightEnd = ({ windowIWidth, windowIHeight, sourceRect, targetRect }) => {
  const targetArea = (targetRect.height * targetRect.width)
  const top = sourceRect.bottom - targetRect.height
  const left = sourceRect.right
  const right = left + targetRect.width
  const bottom = top + targetRect.height
  const operands = { targetArea, top, left, right, bottom, windowIWidth, windowIHeight }
  const returnForm = {
    damage: isFullyInViewPort(operands) ? 0 : calcDamage(operands),
    top,
    left
  }
  return setReturn(returnForm)
}

const isFullyInViewPort = ({ top, bottom, left, right, windowIWidth, windowIHeight }) => {
  return top >= 0 && left >= 0 && right <= windowIWidth && bottom <= windowIHeight
}

const isFullyOutViewPort = ({ top, bottom, left, right, windowIWidth, windowIHeight }) => {
  const isLeftFullyOut = (left <= 0 && right <= 0)
  const isTopFullyOut = (top <= 0 && bottom <= 0)
  const isRightFullyOut = (left >= windowIWidth && right >= windowIWidth)
  const isBottomFullyOut = (top >= windowIHeight && bottom >= windowIHeight)
  return isLeftFullyOut || isTopFullyOut || isRightFullyOut || isBottomFullyOut
}

const isPartialyOutTop = ({ top, bottom, left, right, windowIWidth, windowIHeight }) => {
  return top < 0 && left > 0 && right < windowIWidth && bottom < windowIHeight
}

const isPartialyOutBottom = ({ top, bottom, left, right, windowIWidth, windowIHeight }) => {
  return top > 0 && left > 0 && right < windowIWidth && bottom > windowIHeight
}

const isPartialyOutLeft = ({ top, bottom, left, right, windowIWidth, windowIHeight }) => {
  return top > 0 && left < 0 && right < windowIWidth && bottom < windowIHeight
}

const isPartialyOutRight = ({ top, bottom, left, right, windowIWidth, windowIHeight }) => {
  return top > 0 && left > 0 && right > windowIWidth && bottom < windowIHeight
}

const isPartialyOutTopLeft = ({ top, bottom, left, right, windowIWidth, windowIHeight }) => {
  return top < 0 && left < 0 && (right > 0 && right < windowIWidth) && (bottom > 0 && bottom < windowIHeight)
}
const isPartialyOutTopRight = ({ top, bottom, left, right, windowIWidth, windowIHeight }) => {
  return top < 0 && (left > 0 && left < windowIWidth) && right > windowIWidth && (bottom > 0 && bottom < windowIHeight)
}
const isPartialyOutBottomLeft = ({ top, bottom, left, right, windowIWidth, windowIHeight }) => {
  return (top > 0 && top < windowIHeight) && left < 0 && (right > 0 && right < windowIWidth) && (bottom > windowIHeight)
}
const isPartialyOutBottomRight = ({ top, bottom, left, right, windowIWidth, windowIHeight }) => {
  return (top > 0 && top < windowIHeight) && (left > 0 && left < windowIWidth) && right > windowIWidth && bottom > windowIHeight
}

const calcDamage = (operands) => {
  const { targetArea, top, bottom, left, right, windowIWidth, windowIHeight } = operands
  if (isFullyOutViewPort(operands)) {
    return targetArea
  }
  let damage = targetArea
  if (isPartialyOutTop(operands)) {
    damage -= (right - left) * bottom
  } else if (isPartialyOutBottom(operands)) {
    damage -= (right - left) * (windowIHeight - top)
  } else if (isPartialyOutLeft(operands)) {
    damage -= (bottom - top) * right
  } else if (isPartialyOutRight(operands)) {
    damage -= (bottom - top) * (windowIWidth - left)
  } else if (isPartialyOutTopLeft(operands)) {
    damage -= right * bottom
  } else if (isPartialyOutTopRight(operands)) {
    damage -= (windowIWidth - left) * bottom
  } else if (isPartialyOutBottomLeft(operands)) {
    damage -= (windowIHeight - top) * right
  } else if (isPartialyOutBottomRight(operands)) {
    damage -= (windowIHeight - top) * (windowIWidth - left)
  }
  return damage
}

const setReturn = (obj) => {
  const pureObject = Object.create(null)
  for (const [k, v] of Object.entries(obj)) {
    Object.defineProperty(pureObject, k, { value: v, writable: false, configurable: false, enumerable: true })
  }
  return pureObject
}
