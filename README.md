# Modern Devtron

A modern DevTools extension for Electron applications. Modern Devtron provides enhanced debugging and inspection capabilities for Electron apps directly within Chrome DevTools.

## Features

- Inspect Electron applications from within Chrome DevTools
- Analyze IPC (Inter-Process Communication) events between main and renderer processes
- Visualize process dependencies and communication
- Monitor app performance and resource usage
- Debug Electron-specific features

## Installation

### Development

1. Clone the repository:
```bash
git clone https://github.com/DeJeune/modern-devtron.git
cd modern-devtron
```

2. Install dependencies:
```bash
pnpm install
```

3. Start the development server:
```bash
pnpm dev
```

### Production Build

To create a production build:

```bash
pnpm build
```

The extension will be built in the `dist` directory.

## Usage

1. Open DevTools in an Electron application
2. Look for the "Modern Devtron" panel in the DevTools window
3. Use the various tools to inspect and debug your Electron app

## Development

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm lint` - Run ESLint
- `pnpm type-check` - Run TypeScript type checking
- `pnpm clean` - Clean build artifacts

## Requirements

- Node.js 16+
- Electron 20.0.0+

## License

This project is licensed under the terms found in the [LICENSE](LICENSE) file.
