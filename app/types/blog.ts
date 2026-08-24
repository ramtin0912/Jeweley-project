/**
 * @file blog
 * @description Blog post types.
 *
 * @status None
 * @issues None
 * @todo None
 */

export interface BlogPostSummary {
  id: number
  titleFa: string
  slug: string
  seoDescription: string | null
  publishedAt: string | null
}

export interface BlogPostDetail {
  id: number
  titleFa: string
  slug: string
  contentHtml: string
  seoTitle: string | null
  seoDescription: string | null
  publishedAt: string | null
}
