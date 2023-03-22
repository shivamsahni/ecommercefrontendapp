import { LogLevel, Configuration, BrowserCacheLocation } from '@azure/msal-browser';

const isIE = window.navigator.userAgent.indexOf("MSIE ") > -1 || window.navigator.userAgent.indexOf("Trident/") > -1;
 
export const b2cPolicies = {
     names: {
         signUpSignIn: "B2C_1_signupsignin",
         passwordReset: "B2C_1_passwordreset"
     },
     authorities: {
         signUpSignIn: {
             authority: "https://ecommercenagpshivam.b2clogin.com/ecommercenagpshivam.onmicrosoft.com/B2C_1_signupsignin",
         },
         passwordReset: {
             authority: "https://ecommercenagpshivam.b2clogin.com/ecommercenagpshivam.onmicrosoft.com/B2C_1_passwordreset"
         }
     },
     authorityDomain: "ecommercenagpshivam.b2clogin.com"
 };
 
 
export const msalConfig: Configuration = {
     auth: {
         clientId: '0a4fc026-7880-41e0-8036-f7ae9e756ff8',
         authority: b2cPolicies.authorities.signUpSignIn.authority,
         knownAuthorities: [b2cPolicies.authorityDomain],
         redirectUri: 'http://localhost:4200', 
     },
     cache: {
         cacheLocation: BrowserCacheLocation.LocalStorage,
         storeAuthStateInCookie: isIE, 
     },
     system: {
         loggerOptions: {
            loggerCallback: (logLevel, message, containsPii) => {
                //console.log(message);
             },
             logLevel: LogLevel.Verbose,
             piiLoggingEnabled: false
         }
     }
 }

export const protectedResources = {
  productsApi: {
    endpoint: "http://localhost:5000/api/products",
    scopes: ["https://ecommercenagpshivam.onmicrosoft.com/products/api/products.write", "https://ecommercenagpshivam.onmicrosoft.com/products/api/products.read"],
  },
}
export const loginRequest = {
  scopes: protectedResources.productsApi.scopes
};