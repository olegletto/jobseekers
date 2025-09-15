import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';
import type { Theme } from '../../hooks/useTheme';

const meta: Meta<typeof Input> = {
  title: 'UI/Input',
  component: Input,
  parameters: { layout: 'centered' },
  argTypes: {
    theme: {
      control: { type: 'inline-radio' },
      options: ['light', 'dark'] satisfies Theme[],
    },
    onChange: { action: 'changed' },
  },
  args: {
    theme: 'light',
    value: '',
    placeholder: 'Type here...',
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Text: Story = {
  args: {
    type: 'text',
    label: 'Full name',
    required: true,
    name: 'fullName',
  },
};

export const EmailWithError: Story = {
  args: {
    type: 'email',
    label: 'Email',
    name: 'email',
    error: 'Invalid email address',
  },
};

export const PasswordWithToggle: Story = {
  args: {
    type: 'password',
    label: 'Password',
    showPasswordToggle: true,
    name: 'password',
  },
};

