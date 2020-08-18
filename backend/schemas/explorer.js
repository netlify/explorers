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
        {
          name: 'certifications',
          title: 'Certifications',
          type: 'array',
          of: [
            {
              type: 'reference',
              to: { type: 'certification' }
            }
          ]
        },
        {
          name: 'missions',
          title: 'Missions',
          type: 'array',
          of: [
            {
              type: 'reference',
              to: { type: 'mission' }
            }
          ]
        },
        {
          name: 'stages',
          title: 'Stages',
          type: 'array',
          of: [
            {
              type: 'reference',
              to: { type: 'stage' }
            }
          ]
        }
      ]
    }
  ]
}
