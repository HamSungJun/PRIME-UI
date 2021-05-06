# Pui-Modal

- 자식 윈도우에서 부모 윈도우로 복귀하기전에 사용자의 상호작용을 요구하는 레이어 팝업 UI
  
- 과도하게 사용하는 경우 어플리케이션의 주 흐름을 방해하는 요소가 될 수 있다.

## Requirements

- `동작`
    - 모든 `Vue` 컴포넌트의 클래스 정의에서 `Prototype` 메소드를 통해 호출되어 `DOM Tree`의 지정된 레벨에 발생시킬 수 있다.
    - `Dynamic Component`를 적용하여 모달 컨텐트 부분에 발생시킬 컴포넌트를 자유롭게 교체할 수 있다.
    - 생성한 Modal 인스턴스위에 새로운 Modal 인스턴스를 누적하여 생성할 수 있다.
    - 별도의 누적생성 옵션이 없다면 이전 Modal 인스턴스를 해제하고 새롭게 생성한다.
    - `Prototype` 메소드를 통해 생성한 Modal 인스턴스를 개별적으로 해제하거나 인스턴스 전체를 해제할 수 있다.
    - 모달이 온전히 생성된 후, 인스턴스가 해제되기 전, 파라미터로 입력한 함수를 실행할 수 있다.
    
- `뷰`
    - Modal 인스턴스 생성시 컨텐트 영역을 뷰포트에 중앙 배치 한다.
    - Modal 인스턴스 생성시 Transition을 적용하고 일반적인 상황에서는 Transition이 온전히 종료되었을 때, 해당 Modal 인스턴스를 해제한다.

## Research & Analyze

- 특정 Vue 컴포넌트(A라고 하자.)의 템플레이트에 `Pui-Modal-Container`를 배치하고 그 Props 값으로 모달을 생성하는 방식은 Props에 바인딩하는 값을 Vuex에 연동하여 Store의 상태값에 바인딩하지 않는한 컴포넌트 A에서 밖에 생성이 불가능하다. `Pui-Modal-Container`를 DOM Tree상의 필요한 위치에 배치하고 Vue Plugin 형태로 Install 하여 사용할 수 있게 개발하는 방식을 통해 DOM Tree 상의 발생 위치에 대한 자유로운 결정과 Vue 컴포넌트 어느곳에서든 Prototype 메소드 호출을 통해 Modal 인스턴스를 발생시킬 수 있다.
  
## Reconstruction

- ''

## Reference

- https://github.com/euvl/vue-js-modal#readme
- https://getbootstrap.com/docs/4.4/components/modal/
- https://element.eleme.io/#/en-US/component/dialog
