# Egg Peg

## Setup

    $ npm install
    $ (cd ios && carthage bootstrap)

## Running iOS

    $ open ios/eggpeg.xcodeproj

## Adding Sounds

Drag and drop into xcode folder: eggpeg/sounds

## Running Android

    $ react-native run-android

## Generating Android APK

    $ cp ~/Desktop/keep/certs/superseriouscompany.jks ./android/app
    $ npm run build_apk

## Running Android prod APK

    $ npm run run_apk
