Articles :

- https://dev.to/amanhimself/implement-firebase-phone-authentication-in-react-native-apps-4ho4

`keytool -genkeypair -v -keystore my-upload-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000`

## DEBUG

```
Alias name: androiddebugkey
Creation date: Dec 31, 2013
Entry type: PrivateKeyEntry
Certificate chain length: 1
Certificate[1]:
Owner: CN=Android Debug, OU=Android, O=Unknown, L=Unknown, ST=Unknown, C=US
Issuer: CN=Android Debug, OU=Android, O=Unknown, L=Unknown, ST=Unknown, C=US
Serial number: 232eae62
Valid from: Tue Dec 31 17:35:04 EST 2013 until: Tue Apr 30 18:35:04 EDT 2052
Certificate fingerprints:
         SHA1: 5E:8F:16:06:2E:A3:CD:2C:4A:0D:54:78:76:BA:A6:F3:8C:AB:F6:25
         SHA256: FA:C6:17:45:DC:09:03:78:6F:B9:ED:E6:2A:96:2B:39:9F:73:48:F0:BB:6F:89:9B:83:32:66:75:91:03:3B:9C
```

## PROD

```
Alias name: my-key-alias
Creation date: Jan 31, 2020
Entry type: PrivateKeyEntry
Certificate chain length: 1
Certificate[1]:
Owner: CN=Christopher Fajardo, OU=rocketdevs, O=rocketdevs, L=New York City, ST=New York, C=US
Issuer: CN=Christopher Fajardo, OU=rocketdevs, O=rocketdevs, L=New York City, ST=New York, C=US
Serial number: 650ebb99
Valid from: Fri Jan 31 15:49:13 EST 2020 until: Tue Jun 18 16:49:13 EDT 2047
Certificate fingerprints:
         SHA1: 46:9B:5E:38:53:63:23:D5:D4:BA:3A:AB:BE:3A:85:A2:0F:68:34:24
         SHA256: B7:5B:1B:7A:5A:88:D3:5A:FD:24:A6:59:82:AC:0F:34:1E:7A:C6:CC:70:1E:02:01:69:63:5B:B5:92:D6:9E:77
```

- Update android/build.gradle with

```
buildscript {
    ext {
        buildToolsVersion = "27.0.3"
        minSdkVersion = 16
        compileSdkVersion = 27
        targetSdkVersion = 26
        supportLibVersion = "27.1.1"
        googlePlayServicesAuthVersion = "16.0.1" // <--- use this version or newer
    }
...
    dependencies {
        classpath 'com.android.tools.build:gradle:3.1.2' // <--- use this version or newer
        classpath 'com.google.gms:google-services:4.1.0' // <--- use this version or newer
    }
...
allprojects {
    repositories {
        mavenLocal()
        google() // <--- make sure this is included
        jcenter()
        maven {
            // All of React Native (JS, Obj-C sources, Android binaries) is installed from npm
            url "$rootDir/../node_modules/react-native/android"
        }
    }
}
```
