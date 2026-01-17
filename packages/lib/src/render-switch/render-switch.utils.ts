import { isDev } from '../shared/env';

/**
 * Find the index of the first true case
 * @returns The index of the first true case, or -1 if none are true
 */
export function findTrueCaseIndex(cases: readonly boolean[]): number {
  for (let i = 0; i < cases.length; i++) {
    if (cases[i]) {
      return i;
    }
  }
  return -1;
}

/**
 * Validate that the number of cases matches the number of children
 */
export function validateCasesLength(
  casesLength: number,
  childrenLength: number,
  componentName: string
): void {
  if (isDev && casesLength > childrenLength) {
    console.warn(
      `${componentName}: More cases (${casesLength}) than children (${childrenLength}). Extra cases will be ignored.`
    );
  }
}
