import { ID } from '@datorama/akita';

export interface Resource {
  id: ID;
}

/**
 * A factory function that creates Resources
 */
export function createResource(params: Partial<Resource>) {
  return {

  } as Resource;
}
