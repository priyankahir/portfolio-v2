import { type SchemaTypeDefinition } from 'sanity'
import about from './about'
import project from './project'
import skill from './skill'
import experience from './experience'
import blog from './blog'
import testimonial from './testimonial'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [about, project, skill, experience, blog, testimonial],
}
