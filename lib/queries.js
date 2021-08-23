// const groq = require('groq')

// module.exports.menuItem = groq`{
//   title,
//   description,
//   price,
//   'badge': badge->title,
// }`

// module.exports.location = groq`{
//   address,
//   footerLinks[] { title, url },
//   friends[]-> {
//     title,
//     link,
//     info,
//     image {
//       alt,
//       ...asset-> {
//         _id,
//         url,
//         assetId,
//         'width': metadata.dimensions.width,
//         'height': metadata.dimensions.height,
//         'aspect': metadata.dimensions.aspectRatio,
//         'lqip': metadata.lqip,
//       },
//     },
//   },
//   friendsIntroText,
//   halfsies[] {
//     _type,
//     _type == 'infoText' => {
//       content,
//     },
//     _type == 'carousel' => {
//       images[] { alt, ...asset-> },
//     },
//     _type == 'descriptionText' => {
//       content,
//     },
//     _type == 'bigButton' => {
//       title,
//       url,
//     },
//   },
//   instagramHandle,
//   menuCarousel[] { alt, ...asset-> },
//   menuCategories[]-> {
//     title,
//     'slug': slug.current,
//     'subcategories': lists[]-> {
//       title,
//       'slug': slug.current,
//       image { alt, ...asset-> },
//       items[] {
//         _type,
//         _type == 'menuItem' => {
//           ...menuItem-> ${module.exports.menuItem},
//         },
//         _type == 'menuGroup' => {
//           title,
//           menuItems[]-> ${module.exports.menuItem},
//         },
//       },
//     },
//   },
//   menuIntroText,
//   neighborhood,
//   orderNowLink,
//   'slug': slug.current,
//   tagline,
//   title,
//   whole[] {
//     _type,
//     _type == 'carousel' => {
//       images[] { alt, ...asset-> },
//     },
//     _type == 'threeUp' => {
//       cards[] {
//         link { title, url },
//         image { alt, ...asset-> },
//       },
//     },
//   },
// }`
