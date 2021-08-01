import PuiTreeView from '../stories/storyviews/TreeView.vue'

export default {
  title: 'PRIME-UI/Components/TreeView',
  component: PuiTreeView,
  argTypes: {
    treeBus: {
      name: 'treeBus',
      type: { name: 'object', required: false },
      description: '트리의 모든 노드와 통신할 단일 이벤트 버스 인스턴스',
      table: {
        type: {
          summary: 'object',
          detail: 'PUI_TREE_BUS: new Vue({})'
        }
      }
    },
    treeData: {
      name: 'treeData',
      type: { name: 'object', required: true },
      defaultValue: { id: 0, name: 'Root Node.', children: [] },
      description: '트리뷰 렌더링 데이터',
      table: {
        type: {
          summary: 'object',
          detail: '{ id: 0, name: \'Root Node.\', children: [] }'
        }
      }
    },
    treeDataParent: {
      name: 'treeDataParent',
      type: { name: 'object', required: false },
      description: '특정 트리 데이터 노드의 부모 노드',
      table: {
        type: {
          summary: 'object',
          detail: '{ id: \'Number\', name: \'String\', children: \'Array<TreeNode>\' }'
        }
      }
    },
    treeFold: {
      name: 'treeFold',
      type: { name: 'boolean', required: false },
      description: '트리뷰의 각 부모노드의 열기/닫기 여부',
      defaultValue: false,
      table: {
        type: {
          summary: 'boolean'
        }
      }
    },
    treeLevel: {
      name: 'treeLevel',
      type: { name: 'number', required: false },
      description: '트리에 존재하는 노드의 깊이, 재귀 렌더링중에 내부적으로 결정된다.',
      defaultValue: false,
      table: {
        type: {
          summary: 'number'
        }
      }
    },
    treeMaxLevel: {
      name: 'treeMaxLevel',
      type: { name: 'number', required: false },
      description: '트리가 가질 수 있는 최대 깊이를 지정.',
      defaultValue: 5,
      table: {
        type: {
          summary: 'number'
        }
      }
    },
    treeLevelGap: {
      name: 'treeLevelGap',
      type: { name: 'number', required: false },
      description: '트리에서 레벨이 다른 노드간 여백의 차이.',
      defaultValue: 20,
      table: {
        type: {
          summary: 'number'
        }
      }
    },
    treeNodeCreateBefore: {
      name: 'treeNodeCreateBefore',
      type: { name: 'boolean', required: false },
      description: '트리의 특정 노드의 이전에 노드를 생성하는 기능의 활성화 여부.',
      defaultValue: true,
      table: {
        type: {
          summary: 'boolean'
        }
      }
    },
    treeNodeCreateAfter: {
      name: 'treeNodeCreateAfter',
      type: { name: 'boolean', required: false },
      description: '트리의 특정 노드의 이후에 노드를 생성하는 기능의 활성화 여부.',
      defaultValue: true,
      table: {
        type: {
          summary: 'boolean'
        }
      }
    },
    treeNodeAppend: {
      name: 'treeNodeAppend',
      type: { name: 'boolean', required: false },
      description: '트리의 특정 노드에 자식노드를 생성할 수 있는 기능의 활성화 여부.',
      defaultValue: true,
      table: {
        type: {
          summary: 'boolean'
        }
      }
    },
    treeNodeRemove: {
      name: 'treeNodeRemove',
      type: { name: 'boolean', required: false },
      description: '트리의 특정 노드를 삭제할 수 있는 기능의 활성화 여부.',
      defaultValue: true,
      table: {
        type: {
          summary: 'boolean'
        }
      }
    },
    treeNodeUpdate: {
      name: 'treeNodeUpdate',
      type: { name: 'boolean', required: false },
      description: '트리의 특정 노드의 이름을 수정할 수 있는 기능의 활성화 여부.',
      defaultValue: true,
      table: {
        type: {
          summary: 'boolean'
        }
      }
    },
    treeNodeMove: {
      name: 'treeNodeMove',
      type: { name: 'boolean', required: false },
      description: '트리의 특정 노드를 Drag & Drop 을 통해 이동시키는 기능의 활성화 여부.',
      defaultValue: true,
      table: {
        type: {
          summary: 'boolean',
          detail: '현재는 부모노드를 자신의 자식 노드로 시킬 수 없는 제약정도가 걸려 있으며 각 노드에 drag-enter 페이즈에서 드롭 가능 여부를 표시하고 있다.'
        }
      }
    },
    treeNodeDefaultName: {
      name: 'treeNodeDefaultName',
      type: { name: 'string', required: false },
      description: '트리에 새로운 노드 생성시 기본으로 부여할 이름.',
      defaultValue: 'New Node',
      table: {
        type: {
          summary: 'string'
        }
      }
    }
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { PuiTreeView },
  template: '<div><Pui-TreeView v-bind="$props"></Pui-TreeView></div>'
})

export const Default = Template.bind({})
Default.args = {}
