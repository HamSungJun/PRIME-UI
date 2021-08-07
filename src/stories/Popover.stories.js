import PuiPopover from '../packages/components/pui-popover/pui-popover'

export default {
  title: 'PRIME-UI/Prototypes/Popover',
  component: PuiPopover,
  argTypes: {
    top: {
      name: 'top',
      type: { name: 'number', required: false },
      description: '팝오버를 뷰포트의 절대적인 위치에 발생시키기 위한 속성값',
      defaultValue: 0,
      table: {
        type: {
          summary: 'number'
        },
        defaultValue: {
          summary: 0
        }
      }
    },
    left: {
      name: 'left',
      type: { name: 'number', required: false },
      description: '팝오버를 뷰포트의 절대적인 위치에 발생시키기 위한 속성값',
      defaultValue: 0,
      table: {
        type: {
          summary: 'number'
        },
        defaultValue: {
          summary: 0
        }
      }
    },
    distance: {
      name: 'distance',
      type: { name: 'number', required: false },
      description: '팝오버를 발생시킬 대상 엘리먼트와 팝오버 사이의 거리',
      defaultValue: 20,
      table: {
        type: {
          summary: 'number'
        },
        defaultValue: {
          summary: 20
        }
      }
    },
    placement: {
      name: 'placement',
      type: { name: 'number', required: false },
      description: '대상 엘리먼트에 팝오버를 발생시킬 방향',
      defaultValue: 'Top-Center',
      table: {
        type: {
          summary: 'number',
          detail: ` Pui-Popover-Placements:
            | "Top-Start"
            | "Top-Center"
            | "Top-End",
            | "Left-Start",
            | "Left-Center",
            | "Left-End",
            | "Right-Start"
            | "Right-Center"
            | "Right-End"
            | "Bottom-Start"
            | "Bottom-Center"
            | "Bottom-End"
          `
        },
        defaultValue: {
          summary: 'Top-Center'
        }
      }
    },
    autoPlacement: {
      name: 'autoPlacement',
      type: { name: 'boolean', required: false },
      description: '팝오버를 발생시킬때 뷰포트와 충돌시 재배치 여부',
      defaultValue: true,
      table: {
        type: {
          summary: 'boolean'
        },
        defaultValue: {
          summary: true
        }
      }
    },
    useAnimation: {
      name: 'useAnimation',
      type: { name: 'boolean', required: false },
      description: '팝오버를 생성 및 해제하는 단계에서 애니메이션 효과 지정 여부',
      defaultValue: true,
      table: {
        type: {
          summary: 'boolean'
        },
        defaultValue: {
          summary: true
        }
      }
    },
    animationName: {
      name: 'animationName',
      type: { name: 'string', required: false },
      description: '지정할 애니메이션 이름',
      defaultValue: 'fade',
      table: {
        type: {
          summary: 'string',
          detail: `Pui-Popover-AnimationNames:
          | "fade"`
        },
        defaultValue: {
          summary: 'fade'
        }
      }
    },
    animationDuration: {
      name: 'animationDuration',
      type: { name: 'number', required: false },
      description: '지정한 애니메이션의 동작 시간',
      defaultValue: 0.25,
      table: {
        type: {
          summary: 'number'
        },
        defaultValue: {
          summary: 0.25
        }
      }
    },
    useStack: {
      name: 'useStack',
      type: { name: 'boolean', required: false },
      description: '새로운 팝오버 인스턴스를 생성시 기존의 인스턴스 해제 여부',
      defaultValue: false,
      table: {
        type: {
          summary: 'boolean'
        },
        defaultValue: {
          summary: false
        }
      }
    },
    clickToClose: {
      name: 'clickToClose',
      type: { name: 'boolean', required: false },
      description: '팝오버 인스턴스의 외부 영역 클릭시 인스턴스 해제 여부',
      defaultValue: true,
      table: {
        type: {
          summary: 'boolean'
        },
        defaultValue: {
          summary: true
        }
      }
    },
    resizeToClose: {
      name: 'resizeToClose',
      type: { name: 'boolean', required: false },
      description: '윈도우 리사이즈 이벤트에서 팝오버 인스턴스 해제 여부',
      defaultValue: true,
      table: {
        type: {
          summary: 'boolean'
        },
        defaultValue: {
          summary: true
        }
      }
    },
    scrollToClose: {
      name: 'scrollToClose',
      type: { name: 'boolean', required: false },
      description: '윈도우 및 HTML 엘리먼트 스크롤시 팝오버 인스턴스 해제 여부',
      defaultValue: true,
      table: {
        type: {
          summary: 'boolean'
        },
        defaultValue: {
          summary: true
        }
      }
    }
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { PuiPopover },
  template: '<div><pui-popover v-bind="$props"></pui-popover></div>'
})

export const Default = Template.bind({})
Default.args = {}
