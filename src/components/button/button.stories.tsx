
import type { Meta, StoryObj } from '@storybook/react-vite';
import Button from './button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'],
    },
    size: {
      control: 'select',
      options: ['sm', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
};

export const DangerLarge: Story = {
  args: {
    variant: 'danger',
    size: 'lg',
    children: 'Danger Button',
  },
};

export const Disabled: Story = {
  args: {
    variant: 'secondary',
    disabled: true,
    children: 'Disabled',
  },
};