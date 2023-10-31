---
to: packages/components/src/<%= name %>/index.ts
---
import { withInstall } from '../_utils/define'
import _<%= h.capitalize(name) %> from './src/<%= name %>.vue'

export const <%= h.capitalize(name) %> = withInstall(_<%= h.capitalize(name) %>)
export default <%= h.capitalize(name) %>
export * from './src/props'



