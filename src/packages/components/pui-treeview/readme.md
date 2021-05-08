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

## Reconstruction

- 트리뷰 렌더링 방향을 지정할 수 있는 프로퍼티를 추가하여 종적 트리뷰, 횡적 트리뷰를 구현 해보기

## Reference

- https://element.eleme.io/#/en-US/component/tree
- https://js.devexpress.com/Documentation/Guide/UI_Components/TreeList/Getting_Started_with_TreeList/


