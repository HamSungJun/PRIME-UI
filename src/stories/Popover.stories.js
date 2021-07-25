import PuiPopover from '../packages/components/pui-popover/pui-popover'

export default {
  title: 'PRIME-UI/Prototypes/Popover',
  component: PuiPopover
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { PuiPopover },
  template: '<div><pui-popover></pui-popover></div>'
})

export const Default = Template.bind({})
Default.args = {}
