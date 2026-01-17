export type Status = 'idle' | 'loading' | 'success' | 'error';

export const allStatuses: Status[] = ['idle', 'loading', 'success', 'error'];

export const orderStatuses = ['created', 'paid', 'shipped', 'delivered'] as const;
