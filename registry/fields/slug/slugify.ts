/**
 * This is main slugify function used in the slug field.
 * You can change its behavior as needed.
 * @returns slugified string
 */
export const slugify = (val?: string) =>
  val
    ?.replace(/ /g, '-')
    .replace(/[^\w-]+/g, '')
    .toLowerCase()
