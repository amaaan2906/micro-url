/**
 * Typescript interfaces for `createURL.ts` helper methods
 */

export interface createBody {
  url: string
  format: 'json' | 'xml' | 'txt'
  slug?: string
  account?: string
}

export interface returnURL {
  status: 200 | 400
  res: {
    url: string
    slug?: string
    error?: string
  }
}
