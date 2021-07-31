# Pui-Popover

- `Tooltip` 과 사용 목적은 비슷하지만 좀 더 대상 요소에 대한 상세한 내부 컨텐츠를 표시하기 위한 용도로 사용됨.

- 간소한 상호작용 정도가 포함 될 수 있으며 되도록 자동적으로 팝오버 인스턴스가 어플리케이션에서 삭제되는 형태를 지향한다.

## Requirements

- `동작`

    - [x] 팝오버 엘리먼트를 대상 엘리먼트의 특정 방향에 발생 시킬 수 있다.
    - [x] 팝오버 엘리먼트가 활성화/비활성화 되는 단계에 애니메이션을 지정할 수 있다.
    - [x] 대상 엘리먼트와 팝오버 엘리먼트 사이의 거리를 지정 할 수 있다.
    - [ ] 팝오버 엘리먼트에 화살표 표시 여부를 지정할 수 있다.
    - [x] 팝오버 엘리먼트가 활성화 된 후, 비활성화 된 후에 특정 동작을 하도록 설정할 수 있다.
    - [x] 대상 엘리먼트에서 특정한 이벤트가 발생 했을 때 팝오버가 비활성화 되도록 설정할 수 있다.
    - [x] 새로운 팝오버를 발생시켰을 때 기존의 팝오버 인스턴스에 대한 해제 여부를 설정할 수 있다.
    - [x] 위의 동작에 대한 기본 옵션을 미리 설정 혹은 변경할 수 있다.

- `뷰`

    - [x] 다이나믹 컴포넌트가 렌더링 하는 뷰의 형태에 따름.
    - [ ] [`placer.js`](../$common/placer) 의 반환값을 통해 지정 위치의 절대 좌표에 발생하고 이후 대상 엘리먼트의 위치가 변동하는 경우 `translate()` 속성을 통해 `repaint` 과정만 동반할 수 있도록 한다.

## Options

|Name|Desc|Type|Default|Available
|:---:|:---:|:---:|:---:|:---:|
|`distance`|팝오버를 발생시킬 대상 엘리먼트와 팝오버 사이의 거리|Number|20|O|
|`placement`|대상 엘리먼트에 팝오버를 발생시킬 방향|String|'Top-Center'|O|
|`useArrow`|팝오버에 대상 엘리먼트를 가리키는 화살표 UI 표시 여부|Boolean|false|X|
|`useAnimation`|팝오버를 생성 및 해제하는 단계에서 애니메이션 효과 지정 여부|Boolean|true|O|
|`animationName`|지정할 애니메이션 이름|String|'fade'|O|
|`animationDuration`|지정한 애니메이션의 동작 시간|Number|0.25|O|
|`useStack`|새로운 팝오버 인스턴스를 생성시 기존의 인스턴스 해제 여부|Boolean|true|O|
|`mountAt`|-|Null|Null|X|
|`clickToClose`|팝오버 인스턴스의 외부 영역 클릭시 인스턴스 해제 여부|Boolean|true|O|
|`resizeToClose`|윈도우 리사이즈 이벤트에서 팝오버 인스턴스 해제 여부|Boolean|true|O|
|`scrollToClose`|윈도우 및 HTML 엘리먼트 스크롤시 팝오버 인스턴스 해제 여부|Boolean|true|O|
|`responsive`|반응형 동작 지원 여부|Boolean|false|X|

## Research & Analyze

> 팝오버 발생 이후 윈도우 레벨의 스크롤, 리사이징 혹은 컨테이너의 스크롤 단계에서 대상 엘리먼트의 위치가 이동했을 때 팝오버에 반응형 옵션을 도입하여 같이 움직여주면 좋겠다고 생각하고 있다. 기본적인 구현이 완료되면 고급 옵션으로 포함할 예정이다.

> 반응형 동작에 대한 구상은 다음과 같다. responsive: true로 발생시킨 팝오버를 처리하는 단계에서 source element를 팝오버 컨트롤러에서 단일 객체로 갖고 있는 InterSection Observer 에 등록한다.(다른 방법도 있을 것이다.)  옵저버가 지속적으로 반응형으로 동작하도록 지정한 source 를 관찰하고 있으니 onIntersect 마다 이전 위치 대비 이동한 만큼 자신을 기준으로 발생시킨 팝오버의 위치를 수정해주면 어떨까 한다.

## Reconstruction

- 기본 구현이 완료되면 반응형 동작 옵션 도입 시도하기.

- 사용자가 입력한 방향에 배치시켰을 때 팝오버 인스턴스가 `ViewPort` 와 충돌한 경우

    - 별도의 옵션을 지정하지 않은 경우, 해당 위치에 발생 시킨다.

    - 옵션을 지정한 경우, 배치 방향 리스트를 순회하면서 손해량이 없는 곳에 배치하거나 어느 방향에 배치해도 손해량이 존재한다면 가장 손해량이 적은 곳에 배치한다.

## Reference

- [Modal과 PopUp 구분하기](http://design.gabia.com/wordpress/?p=33075)

- [ElementUI - Popover](https://element.eleme.io/#/en-US/component/popover)

- [BootstrapVue - Popover](https://bootstrap-vue.org/docs/components/popover)

## Dev History

`2021-07-25`

- `scrollToClose` 옵션을 도입하여 스크롤 이벤트를 캡쳐해서 해당 옵션이 true 인 팝오버 인스턴스를 해제하기로 결정함.

- 반응형 고급 기능의 구현에는 `Tree` 형태의 데이터 모델링이 필요하다는 것을 느꼈음. 이건 추후 구현 예정.

    > 예를들어 `Popover` 의 동작만으로 4단계의 하위 메뉴가 존재하는 `Context Menu` 와 같은 UI 기능을 구현한다고 하였을 때 중간 단계의 하위 메뉴에서 다른 메뉴로 전환시 해당 레벨 하위에 발생한 인스턴스를 해제할 방법이 없음. 팝오버 인스턴스 생성시 데이터에 부모 자식 관계를 도입하여 트리뷰 형태로 렌더링을 진행하면서 placer.js 함수 구현을 통해 위치를 잡아주는 방식이 필요해 보임.
