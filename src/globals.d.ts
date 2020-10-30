import {FixedObject, FluidObject} from 'gatsby-image'

interface RemarkImage {
  readonly childImageSharp: {fixed: FixedObject} | {fluid: FluidObject}
}

interface WorkNode {
  readonly id: string
  readonly body: string
  readonly excerpt?: string
  readonly fields: {
    readonly slug: string
  }
  readonly frontmatter: {
    readonly title: string
    readonly date: Date
    readonly image: RemarkImage
  }
}
