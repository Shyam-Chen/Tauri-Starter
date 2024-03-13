# Tauri Starter

:link: A boilerplate for Native App with Tauri, Vue, and Tailwind on Vite.

## Prerequisites

- Node.js version 20
- PNPM version 8
- [Tauri version 2](https://beta.tauri.app/guides/prerequisites/)

### Web

```sh
$ pnpm dev
```

### Windows/macOS

```sh
$ pnpm tauri dev
```

### Android

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
```

### iOS

```sh
$ sudo xcode-select -s /Applications/Xcode.app/Contents/Developer
$ xcrun -f devicectl
```

```sh
$ pnpm tauri ios init
$ pnpm tauri ios dev
# select emulator
```

```sh
$ pnpm clean:ios
$ pnpm tauri ios init
```
