Ionic Firebase Authentication  
## Genrate Icons & Splash screens  
```bash  
ionic cordova resources
```  

## Issues  
[stackoverflow](https://stackoverflow.com/questions/43428415/  error-in-firebase-app-shared-promise-js) to fix error when trying to run ionic cordova emulate  
```bash  
$npm install promise-polyfill --save-exact  
```  
[stackoverflow](https://stackoverflow.com/questions/42350505/error-cannot-read-property-replace-of-undefined-when-building-ios-cordova) fix error cannot read property 'replace' of undefined when runing ionic cordova emulate ios  
```bash  
cd platforms/ios/cordova/node_modules/  
sudo npm install ios-sim@latest  
```
if you have the same error when emulate android then  
on file /platforms/android/cordova/lib/emulator.js line 202: replace  

```javascript  
var num = target.split('(API level ')[1].replace(')', '');  
```  
to  
```javascript  
var num = target.match(/\d+/)[0];  
```  
