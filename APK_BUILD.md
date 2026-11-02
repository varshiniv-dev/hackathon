# APK build
1. Install Node.js and Android Studio with Android SDK.
2. Build frontend: cd frontend; npm install; npm run build.
3. Copy web build: cd ../mobile; npm install; npm run sync.
4. Add Android: npx cap add android.
5. Sync: npx cap sync android.
6. Open: npx cap open android.
7. In Android Studio: Build > Generate App Bundles or APKs > Generate APKs.
8. Install app-debug.apk on the phone.

The phone cannot use 127.0.0.1:8000 as the laptop backend. Deploy backend over HTTPS and build the frontend with that URL.
