import { isDev } from '../shared/env';

/**
 * Find the index of the first true case
 * @param cases An array of boolean values
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
 * Find all indices of true cases
 * @param cases An array of boolean values
 * @returns An array of indices where cases are true
 */
export function findAllTrueCaseIndices(cases: readonly boolean[]): number[] {
  const indices: number[] = [];
  for (let i = 0; i < cases.length; i++) {
    if (cases[i]) {
      indices.push(i);
    }
  }
  return indices;
}

/**
 * Validate that the number of cases matches the number of children
 * @param casesLength The number of cases
 * @param childrenLength The number of children
 * @param componentName The name of the component
 * @throws An error if the number of cases is greater than the number of children
 * @returns void
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
