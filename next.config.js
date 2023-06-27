/** @type {import('next').NextConfig} */

module.exports = {
  env: {
    AZURE_AD_CLIENT_ID: process.env.AZURE_AD_CLIENT_ID,
    AZURE_AD_CLIENT_SECRET: process.env.AZURE_AD_CLIENT_SECRET,
    AZURE_AD_TENANT_ID: process.env.AZURE_AD_TENANT_ID,
    AZURE_AD_SCOPES: process.env.AZURE_AD_SCOPES,
  },
};

const nextConfig = {
  reactStrictMode: true,
  experimental:{
    appDir: true
  }
}

module.exports = nextConfig
