declare namespace NodeJS {
    interface ProcessEnv {
      [AZURE_AD_CLIENT_SECRET: string]: string;
      [AZURE_AD_CLIENT_ID: string]: string;
      [AZURE_AD_TENANT_ID: string]: string;
      [AZURE_AD_SCOPES: string]: string;
      [AZURE_AD_REDIRECT_URI: string]: string;
      [NEXT_PUBLIC_AZURE_AD_CLIENT_SECRET: string]: string;
      [NEXT_PUBLIC_AZURE_AD_CLIENT_ID: string]: string;
      [NEXT_PUBLIC_AZURE_AD_TENANT_ID: string]: string;
      [NEXT_PUBLIC_AZURE_AD_SCOPES: string]: string;
      [NEXT_PUBLIC_AZURE_AD_REDIRECT_URI: string]: string;
    }
  }
  