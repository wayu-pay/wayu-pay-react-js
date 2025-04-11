# Wayu Pay React Component Library

This library provides reusable React components for the Wayu Pay payment flow user interface. It is designed to be published and consumed as an NPM package.

## Development

This project uses React, TypeScript, Vite (for building the library), and Storybook (for component development and visualization).

### Prerequisites

*   Node.js (LTS version recommended)
*   npm (or yarn)

### Installation (for Development)

1.  Clone the repository.
2.  Navigate to the project directory:
    ```bash
    cd wayu-pay-react-js 
    ```
3.  Install the development dependencies:
    ```bash
    npm install 
    ```
    (or `yarn install`)

### Running Storybook

To view and develop components in isolation, run Storybook:

```bash
npm run storybook
```

This will open Storybook in your browser (usually at `http://localhost:6006` or an alternative port if 6006 is busy).

### Building the Library

To generate the distributable files for the library (which can then be published to npm), run:

```bash
npm run build
```

This will generate the compiled files (in ES and UMD formats) and the type declaration files (`.d.ts`) in the `dist/` directory.

## Project Structure

*   **`.storybook/`**: Storybook configuration files.
*   **`dist/`**: Build output directory (ignored by git). This contains the files that are published to NPM.
*   **`node_modules/`**: Project dependencies (ignored by git).
*   **`src/`**: Library source code.
    *   **`components/`**: Public components exported by the library.
        *   **`ComponentName/`**: Specific folder for each public component (contains code, styles, story).
    *   **`internal/`**: Sub-components or internal logic used by public components (not exported).
        *   **`ComponentName/`**: Sub-components specific to a public component.
    *   **`css-modules.d.ts`**: Type declarations for CSS modules.
    *   **`index.ts`**: Main entry point that exports the public components.
*   **`.gitignore`**: Files and folders ignored by git.
*   **`package.json`**: Project metadata, dependencies, and publishing configuration for NPM.
*   **`README.md`**: This file.
*   **`tsconfig.json`**: TypeScript configuration.
*   **`vite.config.ts`**: Vite configuration.
*   **`vite-env.d.ts`**: Vite type declarations.

## Using the Library (Example)

Once the library is published to NPM (e.g., as `wayu-pay-react`), it can be used in another React project as follows:

1.  Install the package:
    ```bash
    npm install wayu-pay-react
    ```
    (or `yarn add wayu-pay-react`)

2.  Import and use the component:

```jsx
import React from 'react';
// Assuming 'WayuPaymentFlow' is the main component exported
import { WayuPaymentFlow } from 'wayu-pay-react'; 
// Import the base styles if necessary (depends on build configuration)
// import 'wayu-pay-react/dist/style.css'; 

function MyApp() {

  const handleComplete = (data) => {
    console.log('Payment completed:', data);
    // Process the data returned by the flow
  };

  const handleError = (error) => {
    console.error('Error during payment flow:', error);
    // Handle the error appropriately
  };

  return (
    <div>
      <h1>Initiate Payment</h1>
      <WayuPaymentFlow
        transactionId="your-unique-transaction-id" 
        onComplete={handleComplete}
        onError={handleError}
        // Add other necessary props for the component
      />
    </div>
  );
}

export default MyApp;
```

Make sure to check the library's documentation or `index.ts` for the exact names of exported components and required props. 