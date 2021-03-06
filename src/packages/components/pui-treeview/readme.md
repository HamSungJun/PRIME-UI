# Pui-TreeView

- 계층구조를 가진 리스트데이터를 표현하기 위한 UI

- 폴더와 파일로 이루어진 파일 시스템을 표현하는데 주로 이용된다.

## Requirements

- `동작`

    - 트리뷰를 렌더링하기 위한 데이터의 기본 구조는 다음과 같은 형태를 갖는다.
    ```javascript
    const treeData = {
        id: 0,
        name: 'new node',
        children: [
            {
                id: 1,
                name: 'new node',
                children: [...]
            },
            {
                id: 2,
                name: 'new node',
                children: [...]
            }
        ]
    }
    ```
    - 트리의 모든 노드 혹은 개별 노드를 선택 혹은 선택 해제 할 수 있다.
    - 선택한 모든 노드의 데이터를 반환받을 수 있다.
    - 트리의 일부 노드는 선택 불가능한 상태로 지정할 수 있다.
    - 트리의 노드를 특정노드의 앞, 뒤에 추가할 수 있다.
    - 트리의 특정노드를 삭제할 수 있다.
    - 트리의 특정노드를 수정할 수 있다.
    - 트리의 노드를 Drag & Drop 기능을 통해 각기 다른 노드간 이동할 수 있다.
    - 서버와의 API 연동모드, 클라이언트 동작모드를 설정할 수 있다.
    - 트리의 데이터에 대한 검색/필터 기능을 사용할 수 있다.

- `뷰`

    - 트리의 노드아이템에 마우스 호버 효과를 표시한다.
    - 트리의 부모노드 선택시 하위 자식 노드 영역을 표시할 때, 트랜지션 혹은 애니메이션을 적용할 수 있다.
    - 트리의 부모노드는 표시할 자식 노드가 있음을 알려줄 수 있는 아이콘이나 스타일을 표시한다.

## Research & Analyze

> 고정적인 노드의 스타일만 표시가능한 상황을 보다는 `Slot` 기능을 통해서 노드의 스타일을 자유롭게 결정할 수 있는지 확인하기

> 트리의 모든 노드를 관통하는 프로퍼티는 Vue 의 `Provide`, `Inject`를 활용해보기
```
Provide, Inject API를 활용하려 하였으나 데이터 반응성에서 한계를 확인할 수 있었음.
1. 반응성을 위해 프로퍼티를 컴포넌트의 Data 에 매핑하여 watcher 인스턴스를 할당하는 흐름에 맞길 수 있으나 개별 컴포넌트 고유의 상태값으로 사용하는 data 의 시맨틱에 어울리지 않다고 생각하였음.

2. Vue.observable() 이라는 Global API의 사용을 고려하였으나 Provide에 주입될 모든 키를 해당 전역 메소드를 통해 설정하는 코스트와 props의 모든 키를 템플레이트의 pui-tree-node, pui-tree-view 엘리먼트에 1:1로 다시 매핑하는 코스트와 차이가 없다고 판단하였음.

3. 결론적으로 부모 컴포넌트의 props의 변경이 자식 요소를 리렌더링 시키는 자연스러운 흐름을 살려주기 위해서 props를 일일히 매핑해주기로 결정함. props 매핑은 Vue-DevTools 에서도 추적이 가능해지므로 개발 생산성에도 도움이 될 것임.
```

## Reconstruction

- 트리뷰 렌더링 방향을 지정할 수 있는 프로퍼티를 추가하여 종적 트리뷰, 횡적 트리뷰를 구현 해보기

## Reference

- https://element.eleme.io/#/en-US/component/tree
- https://js.devexpress.com/Documentation/Guide/UI_Components/TreeList/Getting_Started_with_TreeList/


