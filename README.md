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

#### `generateVizId(): string`

Generates a unique VizId (a UUID v4 string without dashes) for a visualization. The generated ID is a 32-character hexadecimal string with the 13th character always being "4" (following UUID v4 format).

```typescript
import { generateVizId } from "@vizhub/viz-utils";

const newVizId = generateVizId(); // e.g. "550e8400e29b41d4a716446655440000"
```

#### `generateVizFileId(): string`

Generates a unique VizFileId (an 8-character hexadecimal string) for a file within a visualization.

```typescript
import { generateVizFileId } from "@vizhub/viz-utils";

const newFileId = generateVizFileId(); // e.g. "550e8400"
```

### Validation

#### `isVizId(str: string): boolean`

Checks if a string is a valid VizId. A valid VizId must:

- Be exactly 32 characters long
- Contain only hexadecimal characters (0-9, a-f)
- Have "4" as the 13th character (following UUID v4 format)

```typescript
import { isVizId } from "@vizhub/viz-utils";

isVizId("12345678901234567890123456789012"); // true if valid
isVizId("invalid-id"); // false
```

### Time Utilities

#### `dateToTimestamp(date: Date): Timestamp`

Converts a JavaScript Date object to a Unix timestamp (seconds since epoch). The result is floored to remove milliseconds.

```typescript
import { dateToTimestamp } from "@vizhub/viz-utils";

const date = new Date("2023-01-01T00:00:00.000Z");
const timestamp = dateToTimestamp(date); // 1672531200
```

#### `timestampToDate(timestamp: Timestamp): Date`

Converts a Unix timestamp (seconds since epoch) to a JavaScript Date object.

```typescript
import { timestampToDate } from "@vizhub/viz-utils";

const timestamp = 1672531200;
const date = timestampToDate(timestamp); // 2023-01-01T00:00:00.000Z
```

### File Operations

#### `getFileText(content: VizContent, fileName: string): string | null`

Gets the text content of a file with the given name from a VizContent object.
Returns null if:

- The file is not found
- The content is undefined
- The content has no files property

If multiple files with the same name exist, returns the content of the first matching file.

```typescript
import { getFileText } from "@vizhub/viz-utils";

const htmlContent = getFileText(vizContent, "index.html");
if (htmlContent) {
  // Use the file content
}
```

#### `vizFilesToFileCollection(files?: VizFiles): Record<string, string>`

Converts VizFiles (keyed by file ID) to a simpler file collection format (keyed by filename).
Returns an empty object if:

- No files are provided
- The files object is empty

```typescript
import { vizFilesToFileCollection } from "@vizhub/viz-utils";

const vizFiles = {
  "550e8400": { name: "index.html", text: "<html>Test</html>" },
  e29b41d4: { name: "script.js", text: 'console.log("Hello");' },
};

const fileCollection = vizFilesToFileCollection(vizFiles);
// Result: { "index.html": "<html>Test</html>", "script.js": 'console.log("Hello");' }
```

#### `fileCollectionToVizFiles(files: FileCollection): VizFiles`

Converts a simple file collection (keyed by filename) to VizFiles format (keyed by generated file ID).
Returns an empty object if:

- No files are provided
- The files object is empty

```typescript
import { fileCollectionToVizFiles } from "@vizhub/viz-utils";

const fileCollection = {
  "index.html": "<html>Test</html>",
  "script.js": 'console.log("Hello");',
};

const vizFiles = fileCollectionToVizFiles(fileCollection);
// Result: {
//   "550e8400": { name: "index.html", text: "<html>Test</html>" },
//   "e29b41d4": { name: "script.js", text: 'console.log("Hello");' }
// }
```

## Types

This package uses the following types from `@vizhub/viz-types`:

- `VizId`: A 32-character hexadecimal string that uniquely identifies a visualization
- `VizFileId`: An 8-character hexadecimal string that uniquely identifies a file within a visualization
- `VizContent`: The content of a visualization, including its files
- `VizFile`: A file with a name and text content
- `VizFiles`: A collection of files, indexed by their VizFileId
- `Timestamp`: A Unix timestamp representing seconds since epoch

## License

MIT
