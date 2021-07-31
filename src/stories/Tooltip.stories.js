import PuiTooltip from '../packages/components/pui-tooltip/pui-tooltip'

export default {
  title: 'PRIME-UI/Prototypes/Tooltip',
  component: PuiTooltip,
  argTypes: {
    theme: {
      name: 'theme',
      type: { name: 'string', required: false },
      defaultValue: 'dark',
      description: '툴팁 적용할 기본 스타일 테마',
      control: {
        options: ['dark', 'light'],
        type: 'radio'
      },
      table: {
        type: {
          summary: 'string'
        },
        defaultValue: {
          summary: 'dark'
        }
      }
    },
    distance: {
      name: 'distance',
      type: { name: 'number', required: false },
      defaultValue: 10,
      description: '대상 엘리먼트와 툴팁 인스턴스 사이의 거리',
      control: {
        type: 'number'
      },
      table: {
        type: {
          summary: 'number'
        },
        defaultValue: {
          summary: 10
        }
      }
    },
    autoPlacement: {
      name: 'autoPlacement',
      type: 'boolean',
      defaultValue: true,
      description: '툴팁을 지정방향에 발생시키는 단계에서 뷰포트 오버플로우 발생시 자동 재배치 여부',
      control: {
        type: 'boolean'
      },
      table: {
        type: {
          summary: 'boolean'
        },
        defaultValue: {
          summary: true
        }
      }
    },
    customStyle: {
      name: 'customStyle',
      type: 'object',
      defaultValue: {},
      description: '툴팁 인스턴스에 인라인 스타일을 부여합니다.',
      table: {
        type: {
          summary: 'object'
        },
        defaultValue: {
          summary: '{}'
        }
      }
    },
    customClass: {
      name: 'customClass',
      type: 'string',
      defaultValue: '',
      description: '툴팁 인스턴스에 커스텀 클래스를 부여합니다',
      table: {
        type: {
          summary: 'string'
        },
        defaultValue: {
          summary: ''
        }
      }
    },
    showDelay: {
      name: 'showDelay',
      type: 'number',
      defaultValue: 0,
      description: '툴팁 인스턴스 생성시 지연 시간',
      table: {
        type: {
          summary: 'number'
        },
        defaultValue: {
          summary: 0
        }
      }
    },
    hideDelay: {
      name: 'hideDelay',
      type: 'number',
      defaultValue: 0,
      description: '툴팁 인스턴스 해제시 지연 시간',
      table: {
        type: {
          summary: 'number'
        },
        defaultValue: {
          summary: '0'
        }
      }
    },
    useStack: {
      name: 'useStack',
      type: 'boolean',
      defaultValue: false,
      description: '새로운 툴팁 인스턴스 생성시 기존의 툴팁 인스턴스 해제 여부',
      table: {
        type: {
          summary: 'boolean'
        },
        defaultValue: {
          summary: false
        }
      }
    },
    useAnimation: {
      name: 'useAnimation',
      type: 'boolean',
      defaultValue: true,
      description: '툴팁 인스턴스 생성/해제시 애니메이션 사용 여부',
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
      type: 'string',
      defaultValue: 'fade',
      description: '애니메이션 사용시 지정할 애니메이션 이름',
      control: {
        options: ['fade'],
        type: 'radio'
      },
      table: {
        type: {
          summary: 'string'
        },
        defaultValue: {
          summary: 'fade'
        }
      }
    },
    animationDuration: {
      name: 'animationDuration',
      type: 'number',
      defaultValue: 0.25,
      description: '애니메이션 사용시 동작 완료까지의 시간',
      table: {
        type: {
          summary: 'number'
        },
        defaultValue: {
          summary: 0.25
        }
      }
    },
    clickToClose: {
      name: 'clickToClose',
      type: 'boolean',
      defaultValue: true,
      description: '툴팁 인스턴스의 외부 영역 클릭시 인스턴스 해제 여부',
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
      type: 'boolean',
      defaultValue: true,
      description: '윈도우 리사이즈 이벤트에서 툴팁 인스턴스 해제 여부',
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
      type: 'boolean',
      defaultValue: true,
      description: '윈도우 및 HTML 엘리먼트 스크롤시 툴팁 인스턴스 해제 여부',
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
  components: { PuiTooltip },
  template: '<div><pui-tooltip v-bind="$props"></pui-tooltip></div>'
})

export const Default = Template.bind({})
Default.args = {}
