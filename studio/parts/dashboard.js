export default {
  widgets: [
    {
      name: 'netlify',
      options: {
        title: 'Netlify',
        sites: [
          {
            title: '<SITE_TITLE>',
            apiId: '<NETLIFY_API_ID>',
            buildHookId: '<NETLIFY_BUILD_HOOK_ID>',
            name: '<NETLIFY_SITE_NAME>',
          },
        ],
      },
    },
  ],
}
