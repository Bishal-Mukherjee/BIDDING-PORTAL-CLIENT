export const StatusLabel = {
  pending: 'Pending',
  accepted: 'Accepted',
  rejected: 'Rejected',
  created: 'Open',
  assigned: 'Assigned',
  'in-progress': 'In Progress',
  completed: 'Completed',
};

export const STATUS_MENU_OPTIONS = [
  { id: 1, label: 'Open', value: 'created' },
  { id: 2, label: 'Assigned', value: 'assigned' },
  { id: 3, label: 'In Progress', value: 'in-progress' },
  { id: 4, label: 'Completed', value: 'completed' },
];

export const QUALITY_MENU_OPTIONS = [
  { id: 1, label: 'Good', value: 'good' },
  { id: 2, label: 'Better', value: 'better' },
  { id: 3, label: 'Best', value: 'best' },
];
