# Windows Setup Guide for ScootRoute

## Quick Fix for CLI Issue

If you're getting the React Native CLI error on Windows, follow these steps:

### 1. Install Dependencies
```cmd
npm install
```

### 2. Install React Native CLI Globally (if needed)
```cmd
npm install -g @react-native-community/cli
```

### 3. Start Metro Bundler
```cmd
npm start
```

### 4. Run on Android (separate terminal)
```cmd
npm run android
```

## Common Windows Issues & Solutions

### Issue: Metro bundler won't start
**Solution:** Run with npx explicitly:
```cmd
npx react-native start
```

### Issue: Android build fails
**Solution:** Make sure you have:
1. **Java JDK 17** installed
2. **Android Studio** with SDK 34
3. **Environment variables** set:
   ```cmd
   set JAVA_HOME=C:\Program Files\Java\jdk-17
   set ANDROID_HOME=C:\Users\%USERNAME%\AppData\Local\Android\Sdk
   set PATH=%PATH%;%ANDROID_HOME%\platform-tools;%ANDROID_HOME%\emulator
   ```

### Issue: Permission errors
**Solution:** Run PowerShell/Command Prompt as Administrator

## Windows Environment Setup

### 1. Install Chocolatey Package Manager
```powershell
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
```

### 2. Install Java JDK 17
```cmd
choco install openjdk17
```

### 3. Install Android Studio
Download from: https://developer.android.com/studio

### 4. Set Environment Variables
Add to System Environment Variables:
- `JAVA_HOME`: Path to JDK installation
- `ANDROID_HOME`: Path to Android SDK
- Update `PATH` to include Android tools

## Alternative: Use WSL2
For better compatibility, consider using Windows Subsystem for Linux:

```cmd
wsl --install
```

Then clone and run the project in WSL2 Ubuntu environment.

## Testing the Setup
```cmd
npm test
npm run lint
npx react-native doctor
```

## Troubleshooting
If issues persist:
1. Delete `node_modules` and `package-lock.json`
2. Run `npm install`
3. Clear React Native cache: `npx react-native start --reset-cache`