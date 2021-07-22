import { PUI_VALID_PLACEMENTS } from '../../../constants'

/**
 * @description 기준 엘리먼트와 배치할 엘리먼트 두 요소간 절대 좌표를 확인하여 배치할 엘리먼트가 위치해야 할 절대 좌표 및 뷰포트와 충돌시 입은 픽셀 손해량을 계산하는 함수
 * @param {HTMLElement} base 뷰포트 상에서의 기준점으로 이용할 엘리먼트
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

}
export const placeAtTopCenter = ({ windowIWidth, windowIHeight, sourceRect, targetRect }) => {

}
export const placeAtTopEnd = ({ windowIWidth, windowIHeight, sourceRect, targetRect }) => {

}

export const placeAtBottomStart = ({ windowIWidth, windowIHeight, sourceRect, targetRect }) => {}
export const placeAtBottomCenter = ({ windowIWidth, windowIHeight, sourceRect, targetRect }) => {}
export const placeAtBottomEnd = ({ windowIWidth, windowIHeight, sourceRect, targetRect }) => {}

export const placeAtLeftStart = ({ windowIWidth, windowIHeight, sourceRect, targetRect }) => {}
export const placeAtLeftCenter = ({ windowIWidth, windowIHeight, sourceRect, targetRect }) => {}
export const placeAtLeftEnd = ({ windowIWidth, windowIHeight, sourceRect, targetRect }) => {}

export const placeAtRightStart = ({ windowIWidth, windowIHeight, sourceRect, targetRect }) => {}
export const placeAtRightCenter = ({ windowIWidth, windowIHeight, sourceRect, targetRect }) => {}
export const placeAtRightEnd = ({ windowIWidth, windowIHeight, sourceRect, targetRect }) => {}
