import {
  IconArrowDown,
  IconArrowRight,
  IconArrowUp,
  IconCircle,
  IconCircleCheck,
  IconAlertCircle,
  IconClock,
  IconHelp,
  IconCircleOff
} from '@tabler/icons-react';

export const labels = [
  {
    value: 'bug',
    label: 'Bug'
  },
  {
    value: 'feature',
    label: 'Feature'
  },
  {
    value: 'documentation',
    label: 'Documentation'
  }
];

export const statuses = [
  {
    value: 'backlog',
    label: 'Backlog',
    icon: IconHelp
  },
  {
    value: 'todo',
    label: 'Todo',
    icon: IconCircle
  },
  {
    value: 'in progress',
    label: 'In Progress',
    icon: IconClock
  },
  {
    value: 'done',
    label: 'Done',
    icon: IconCircleCheck
  },
  {
    value: 'canceled',
    label: 'Canceled',
    icon: IconCircleOff
  }
];

export const priorities = [
  {
    value: 'low',
    label: 'Low',
    icon: IconArrowDown
  },
  {
    value: 'medium',
    label: 'Medium',
    icon: IconArrowRight
  },
  {
    value: 'high',
    label: 'High',
    icon: IconArrowUp
  },
  {
    value: 'critical',
    label: 'Critical',
    icon: IconAlertCircle
  }
];
