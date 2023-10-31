---
to: packages/components/src/index.ts
inject: true
skip_if: <%= name %>
after: "// template inject"
---
export * from './<%= name %>'