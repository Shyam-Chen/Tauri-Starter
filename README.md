# Tauri Starter

:link: A boilerplate for Native App with Tauri, Vue, and Tailwind on Vite.

:rainbow: View Demo: [Live](https://vue-starter-6fa6.onrender.com) | Windows | macOS | Android | iOS

:octocat: Source Code: [Web-side](https://github.com/Shyam-Chen/Vue-Starter) | [Native-side](https://github.com/Shyam-Chen/Tauri-Starter) | [Server-side](https://github.com/Shyam-Chen/Fastify-Starter) | [Cloud-side](https://github.com/Shyam-Chen/Pulumi-Starter)

## Table of Contents

- [Getting Started](#getting-started)
- [Project Setup](#project-setup)
- [Key Features](#key-features)

## Getting Started

Prerequisites:

- Node.js version 20
- PNPM version 9
- [Tauri version 2](https://beta.tauri.app/guides/prerequisites/)

Get started with Tauri Starter.

```sh
# install dependencies
$ pnpm install

# dev server (in one terminal)
# the default is to run it on macOS
$ pnpm dev:mobile
# or
$ pnpm dev:desktop

# mock server (in another terminal)
$ pnpm mock
```

Or use barebones scaffolding for your new Tauri app

```sh
$ pnpm dlx degit Shyam-Chen/Starter-Templates/tauri my-tauri-app
```

## Project Setup

Follow steps to execute this boilerplate.

### iOS

![iOS](./ios.png)

```sh
$ sudo xcode-select -s /Applications/Xcode.app/Contents/Developer
$ xcrun -f devicectl
```

```sh
$ pnpm tauri ios init
# Xcode -> Open Developer Tool -> Simulator -> File -> Open Simulator -> iPhone Pro
$ pnpm tauri ios dev
# Detected iOS simulators:
#   [1] iPhone
#   [2] iPhone Plus
#   [3] iPhone Pro
#   [4] iPhone Pro Max
#   Enter an index for a simulator above.
# Simulator: 3
```

```sh
$ pnpm clean:ios
$ pnpm tauri ios init
$ pnpm tauri ios build
```

### macOS

![macOS](./macos.png)

```sh
$ pnpm tauri dev
```

```sh
$ pnpm tauri build
```

<details>
  <summary><h3>Android</h3></summary>

![Android](./android.png)

```sh
$ cd Library/Android/sdk/ndk/
$ ls
# 26.2.11394342

export NDK_HOME="$ANDROID_HOME/ndk/26.2.11394342"
```

```sh
$ pnpm tauri android init
$ pnpm tauri android dev
# select emulator
```

```sh
$ pnpm clean:android
$ pnpm tauri android init
$ pnpm tauri android build
```

</details>

<details>
  <summary><h3>Windows</h3></summary>

```sh
$ pnpm tauri dev
```

```sh
$ pnpm tauri build
```

</details>

## Key Features

This seed repository provides the following features:

- ---------- **Essentials** ----------
- [x] [Tauri](https://github.com/tauri-apps/tauri) - Native Apps Framework
- [x] [Vue](https://github.com/vuejs/vue) - User Interface Framework
- [x] [Router](https://github.com/vuejs/vue-router) - Routing
- [x] [Routes](https://github.com/Vanilla-IceCream/vite-plugin-vue-routes) - File-based Routing
- [x] [Storer](https://github.com/Vanilla-IceCream/vue-storer) - State Management
- [x] [Formor](https://github.com/Vanilla-IceCream/vue-formor) - Form Validation
- [x] [Valibot](https://github.com/fabian-hiller/valibot) - Schema Validation
- [x] [Localer](https://github.com/Vanilla-IceCream/vue-localer) - Internationalization and Localization
- [x] [Use](https://github.com/vueuse/vueuse) - Composition Utilities
- [x] [Qrcode Image](https://github.com/Vanilla-IceCream/vue-qrcode-image) - QR Code Generation
- [x] [Lodash](https://github.com/lodash/lodash) - JavaScript Utilities
- [x] [Date Fns](https://github.com/date-fns/date-fns) - Date Utilities
- [x] [UnoCSS](https://github.com/unocss/unocss) - CSS Utilities
- [x] [Iconify](https://github.com/iconify/iconify) - Icon Utilities
- [x] [Tiptap](https://github.com/ueberdosis/tiptap) - Rich Text Editor
- [x] [ECharts](https://github.com/apache/echarts) - Data Visualization
- ---------- **Tools** ----------
- [x] [Vite](https://github.com/vitejs/vite) - Bundler
- [x] [TypeScript](https://github.com/microsoft/TypeScript) - JavaScript with Syntax for Types
- [x] [Sassy CSS](https://github.com/sass/sass) - CSS Extension
- [x] [Biome](https://github.com/biomejs/biome) - Formatter and Linter
- [x] [ESLint](https://github.com/eslint/eslint) - Linter
- [x] [Prettier](https://github.com/prettier/prettier) - Formatter
- [x] [Vitest](https://github.com/vitest-dev/vitest) - Test Runner
- [ ] [WebdriverIO](https://github.com/webdriverio/webdriverio) - Test Automation
- [ ] [Appium](https://github.com/appium/appium) - WebDriver Protocol Mobile Test Automation
- ---------- **Environments** ----------
- [x] [Node.js](https://nodejs.org/en/) - JavaScript Runtime Environment
- [x] [Pnpm](https://pnpm.io/) - Package Manager
- [x] [GitHub Actions](https://github.com/features/actions) - Continuous Integration and Delivery
- [ ] [Tauri GitHub Action](https://github.com/tauri-apps/tauri-action) - Native Binary
