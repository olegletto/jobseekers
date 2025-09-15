import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ThemeToggle } from './ThemeToggle';

const meta: Meta<typeof ThemeToggle> = {
  title: 'UI/ThemeToggle',
  component: ThemeToggle,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    onToggle: { action: 'toggled' },
  },
};

export default meta;
type Story = StoryObj<typeof ThemeToggle>;

export const Dark: Story = {
  args: {
    theme: 'dark',
  },
};

export const Light: Story = {
  args: {
    theme: 'light',
  },
};

export const Interactive: Story = {
  render: (args) => {
    const [theme, setTheme] = useState<'light' | 'dark'>(args.theme ?? 'dark');
    return (
      <div style={{ padding: 24 }}>
        <ThemeToggle
          theme={theme}
          onToggle={() => {
            args.onToggle?.();
            setTheme(theme === 'dark' ? 'light' : 'dark');
          }}
        />
      </div>
    );
  },
  args: {
    theme: 'dark',
  },
};
