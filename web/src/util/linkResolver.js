// example link resolver

module.exports = function linkResolver({ _type, reference, url, email }) {
  switch (_type) {
    case 'internalLink':
      switch (reference._type) {
        case 'page':
          return `/${reference.slug}`
        case 'editorialIndex':
          return `/articles`
        case 'article':
          return `/article/${reference.slug}`
        case 'category':
          return `/articles/${reference.slug}`
        case 'merchIndex':
          return `/merch`
        case 'product':
          return `/merch#${reference.slug}`
      }
    case 'externalLink':
      return url
    case 'emailLink':
      return `mailto:${email}`
  }
}
