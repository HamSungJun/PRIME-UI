import PuiToast from '../packages/components/pui-toast/pui-toast'

export default {
  title: 'PRIME-UI/Toast',
  component: PuiToast
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { PuiToast },
  template: '<div><pui-toast></pui-toast></div>'
})

export const Default = Template.bind({})
Default.args = {}
