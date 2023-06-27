import { Configuration, LogLevel, PublicClientApplication, RedirectRequest } from "@azure/msal-browser";
import axios from "axios";

const msalConfig = {
  auth: {
    clientId: process.env.NEXT_PUBLIC_AZURE_AD_CLIENT_ID ,
    authority: `https://login.microsoftonline.com/${process.env.NEXT_PUBLIC_AZURE_AD_TENANT_ID}`,
    redirectUri:process.env.NEXT_PUBLIC_AZURE_AD_REDIRECT_URI,
    clientSecret: process.env.NEXT_PUBLIC_AZURE_AD_CLIENT_SECRET,
    audience: "https://graph.microsoft.com/me/appRoleAssignments"
  },
  cache: {
    cacheLocation: 'sessionStorage',
    storeAuthStateInCookie: false,
  },
  scopes: ['openid', 'profile', 'offline_access', 'Mail.Read', 'User.Read', 'email'],
};

export const loginRequest: RedirectRequest = {
    scopes: ['openid', 'profile', 'offline_access', 'Mail.Read', 'User.Read', 'email']
};

export const graphConfig = {
    graphMeEndpoint: `https://graph.microsoft.com/v1.0/me/appRoleAssignments?$filter=resourceId eq 0736a0b9-da92-434c-8bc7-a9e5bdccd943`
};
const msalInstance = new PublicClientApplication(msalConfig);

const getToken = async () => {
    const accounts = msalInstance.getAllAccounts();
    const response = await msalInstance.acquireTokenSilent({
      scopes: ['openid', 'profile', 'offline_access', 'Mail.Read', 'User.Read', 'email'],
      account: accounts[0]
    });
    return response.accessToken;
  };


export const makeApiCall = async () => {
    try {
      const accessToken = await getToken();
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'OData-Version': '4.0',
        'OData-MaxVersion': '4.0',
        'Prefer': 'odata.include-annotations=*'
      };
      const response = await axios.get(graphConfig.graphMeEndpoint, { headers });
      localStorage.setItem('user', JSON.stringify(response.data));
    } catch (error) {
      console.log(error);
    }
  };


export default msalInstance;
