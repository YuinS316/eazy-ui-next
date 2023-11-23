---
to: packages/components/src/index.scss
inject: true
skip_if: <%= name %>
after: "// template inject"
---
@use "./<%= name %>/style/index.scss" as ez-<%= name %>;