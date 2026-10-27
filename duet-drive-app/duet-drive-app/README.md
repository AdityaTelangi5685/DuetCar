# Duet Drive — Android build guide

Two cars, four lanes, dodge everything. This folder is a Capacitor 8 project.
The game itself is `www/index.html`; everything else wraps it as an Android app.

## 1. Install once (on your PC)

| Tool | Version | Where |
|---|---|---|
| Node.js | 22 or newer | nodejs.org (LTS) |
| Android Studio | Otter (2025.2.1) or newer | developer.android.com/studio |

On first launch, let Android Studio install the default Android SDK. Accept the licences.

## 2. Generate the Android project (one time)

Open a terminal in this folder and run:

```
npm install
npm run setup
```

`setup` copies the fonts into the app, creates the `android/` folder, locks the game
to portrait, hides the status bar, and copies the game into the Android project.

## 3. Run it on your phone

1. On the phone: Settings → About phone → tap **Build number** 7 times to unlock Developer options.
   Then Settings → Developer options → turn on **USB debugging**.
2. Plug the phone in with a USB cable and accept the "Allow USB debugging" prompt.
3. Run `npm run open`. Android Studio opens the project.
4. Wait for the Gradle sync to finish (the first sync takes several minutes), pick your phone in the device list, and press the green ▶ Run button.

## 4. After you change the game

Edit `www/index.html`, then run:

```
npm run sync
```

Press ▶ Run in Android Studio again.

## 5. Change the app ID before you publish

`capacitor.config.json` has `"appId": "com.duetdrive.game"`. Change it to something you own
(for example `com.yourname.duetdrive`) **before your first Play Store upload**. Once an app is published, its ID can never change.
If you change it after running setup, delete the `android/` folder and run `npm run setup` again.

## 6. Publishing to Google Play

1. Android Studio → **Build → Generate Signed App Bundle / APK → Android App Bundle**.
2. Create a new keystore when it asks. **Back up the keystore file and its passwords.** Losing them means you can never update the app again.
3. The output `.aab` file is what you upload to the Play Console.
4. A Google Play developer account costs a one-time US$25.
5. New personal accounts must run a **closed test with at least 12 testers, opted in for 14 days in a row**, before Google allows a public (production) release. Line up your 12 testers early.
6. Play also requires an app icon, screenshots, a short description, and a content-rating questionnaire.

## App icon

The default Capacitor icon is used for now. To replace it: Android Studio → right-click `app/res`
→ **New → Image Asset**, and choose a 1024×1024 PNG.
