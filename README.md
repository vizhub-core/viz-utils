# viz-utils

A collection of utility functions for use across VizHub packages. This library provides common functionality for working with VizHub visualizations, including ID generation and file manipulation.

## Installation

```bash
npm install @vizhub/viz-utils
```

## Dependencies

This package depends on `@vizhub/viz-types`, which defines the TypeScript types used throughout the VizHub ecosystem.

## API

### ID Generation

#### `generateVizId()`

Generates a unique VizId (a UUID v4 string without dashes) for a visualization.

```typescript
import { generateVizId } from "@vizhub/viz-utils";

const newVizId = generateVizId(); // e.g. "12345678901234567890123456789012"
```

#### `generateVizFileId()`

Generates a unique VizFileId (an 8-character substring of a VizId) for a file within a visualization.

```typescript
import { generateVizFileId } from "@vizhub/viz-utils";

const newFileId = generateVizFileId(); // e.g. "12345678"
```

### Validation

#### `isVizId(str: string): boolean`

Checks if a string is a valid VizId.

```typescript
import { isVizId } from "@vizhub/viz-utils";

isVizId("12345678901234567890123456789012"); // true if valid
isVizId("invalid-id"); // false
```

### File Operations

#### `getFileText(content: VizContent, fileName: string): string | null`

Gets the text content of a file with the given name from a VizContent object.
Returns null if the file is not found.

```typescript
import { getFileText } from "@vizhub/viz-utils";

const htmlContent = getFileText(vizContent, "index.html");
if (htmlContent) {
  // Use the file content
}
```

## Types

This package uses the following types from `@vizhub/viz-types`:

- `VizId`: A 32-character hexadecimal string that uniquely identifies a visualization
- `VizFileId`: An 8-character hexadecimal string that uniquely identifies a file within a visualization
- `VizContent`: The content of a visualization, including its files
- `VizFile`: A file with a name and text content
- `VizFiles`: A collection of files, indexed by their VizFileId

## License

MIT
