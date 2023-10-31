---
to: packages/components/src/<%= name %>/src/props.ts
---
import type { ExtractPropTypes } from 'vue'
import { defineListenerProps, defineStringProp } from '../../_utils/define'

export const <%= name %>Props = {

}

export type <%= h.capitalize(name) %>Props = ExtractPropTypes<typeof <%= name %>Props>
