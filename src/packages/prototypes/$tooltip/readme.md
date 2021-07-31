# Pui-Tooltip

- 사용자가 어플리케이션을 경험하면서 동작에 대한 간단한 피드백을 텍스트 형태로 제공하는 PopUp 형태의 UI.

## Requirements

- `동작`

    - [x] 툴팁 엘리먼트를 대상 엘리먼트의 특정 방향에 발생 시킬 수 있다.
    - [x] 툴팁 엘리먼트가 활성화/비활성화 되는 단계에 애니메이션을 지정할 수 있다.
    - [x] 대상 엘리먼트와 툴팁 엘리먼트 사이의 거리를 지정 할 수 있다.
    - [ ] 툴팁 엘리먼트에 화살표 표시 여부를 지정할 수 있다.
    - [x] 툴팁 엘리먼트가 활성화 된 후, 비활성화 된 후에 특정 동작을 하도록 설정할 수 있다.
    - [x] 대상 엘리먼트에서 특정한 이벤트가 발생 했을 때 툴팁이 비활성화 되도록 설정할 수 있다.
    - [x] 새로운 툴팁 엘리먼트를 발생시켰을 때 기존의 툴팁 인스턴스에 대한 해제 여부를 설정할 수 있다.
    - [x] 위의 동작에 대한 기본 옵션을 설정 및 변경할 수 있다.
    
- `뷰`

    - [x] 툴팁박스의 기본 스타일을 제공하며 커스텀 스타일은 유저 입력값에 따름.
    - [x] [`placer.js`](../$common/placer) 의 반환값을 통해 대상 엘리먼트의 절대 좌표를 기준으로 지정한 방향에 발생한다.

## Options

|Name|Desc|Type|Default|Available
|:---:|:---:|:---:|:---:|:---:|
|`distance`|대상 엘리먼트와 툴팁 인스턴스 사이의 거리|String|10|O|
|`placement`|대상 엘리먼트에 툴팁 인스턴스 생성시 배치할 방향|String|'Top-Center'|O|
|`autoPlacement`|툴팁을 지정방향에 발생시키는 단계에서 뷰포트 오버플로우 발생시 자동 재배치 여부|Boolean|true|O|
|`customStyle`|툴팁 인스턴스에 인라인 스타일을 부여|Object|null|O|
|`customClass`|툴팁 인스턴스에 커스텀 클래스를 부여|String|''|O|
|`showDelay`|툴팁 인스턴스 생성시 지연 시간|String|0|O|
|`hideDelay`|툴팁 인스턴스 해제시 지연 시간|String|0|O|
|`useStack`|새로운 툴팁 인스턴스 생성시 기존의 툴팁 인스턴스 해제 여부|Boolean|true|O|
|`useArrow`|툴팁 인스턴스에 대상 엘리먼트를 가리키는 화살표 UI 사용 여부|Boolean|false|X|
|`useAnimation`|툴팁 인스턴스 생성/해제시 애니메이션 사용 여부|String|true|O|
|`animationName`|애니메이션 사용시 지정할 애니메이션 이름|String|'fade'|O|
|`animationDuration`|애니메이션 사용시 동작 완료까지의 시간|String|0.25|O|
|`clickToClose`|툴팁 인스턴스의 외부 영역 클릭시 인스턴스 해제 여부|Boolean|true|O|
|`resizeToClose`|윈도우 리사이즈 이벤트에서 툴팁 인스턴스 해제 여부|Boolean|true|O|
|`scrollToClose`|윈도우 및 HTML 엘리먼트 스크롤시 툴팁 인스턴스 해제 여부|Boolean|true|O|

## Reference

- [Tooltip - Ant Design](https://ant.design/components/tooltip/)
- [Tooltip - ElementUI](https://element.eleme.io/#/en-US/component/tooltip)
