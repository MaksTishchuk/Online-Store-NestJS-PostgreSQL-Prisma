import slugify from "slugify"
import * as shortId from 'shortid'

export function generateSlug(title: string) {
  return (slugify(title, {lower: true}) + '-' + shortId.generate())
}