import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'skill',
  title: 'Skill',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      description: 'e.g. Frontend, Backend, Tools',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Icon (lucide-react name)',
      type: 'string',
      description: 'The name of the Lucide React icon to use (e.g. Code, Database, Server)',
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Used to sort skills. Lower number comes first.',
      initialValue: 0,
    })
  ],
})
