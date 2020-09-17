export default {
  name: 'explorer',
  title: 'Explorer',
  type: 'document',
  fields: [
    {
      name: 'avatar',
      title: 'Explorer Avatar',
      type: 'string'
    },
    {
      name: 'achievements',
      title: 'Achievements',
      type: 'array',
      of: [
        // { type: 'reference', to: { type: 'certification' } },
        { type: 'reference', to: { type: 'mission' } },
        // { type: 'reference', to: { type: 'stage' } }
      ]
    }
  ]
}
