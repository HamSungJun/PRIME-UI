import PuiModal from '../packages/components/pui-modal/pui-modal'

export default {
  title: 'PRIME-UI/Prototypes/Modal',
  component: PuiModal
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { PuiModal },
  template: '<div><pui-modal></pui-modal></div>'
})

export const Default = Template.bind({})
Default.args = {}
