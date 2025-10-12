# PayloadCMS Extra Fields Registry

A custom registry for PayloadCMS fields built using the `shadcn` CLI. This registry allows you to distribute custom PayloadCMS fields (including both UI components and utility functions) to any PayloadCMS project.

## Getting Started

This registry provides custom fields for PayloadCMS using the shadcn CLI infrastructure.

- The registry uses a `registry.json` file to define fields and their files.
- The `shadcn build` command is used to build the registry.
- The registry items are served as static files under `public/r/[name].json`.
- Every registry item is compatible with the `shadcn` CLI.
- Each field includes both the UI component and utility function for easy integration into your PayloadCMS schemas.

## Documentation

Visit the [shadcn documentation](https://ui.shadcn.com/docs/registry) to view the full documentation.
