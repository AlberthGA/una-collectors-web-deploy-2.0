import * as jose from 'jose';
import NodeRSA from 'node-rsa';

const base64urlEncode = (value: any) => {
  let buffer = Buffer.from(value);

  // Remove leading zero if present
  if (buffer[0] === 0x00) {
    buffer = buffer.slice(1);
  }

  const base64 = buffer.toString('base64');
  const base64url = base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  return base64url;
};
export default async function generateToken() {
  const key = process.env.PRIVATE_KEY;
  const alg = 'RS256';
  const pemKey = `-----BEGIN RSA PRIVATE KEY-----\n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\n-----END RSA PRIVATE KEY-----`;

  const rsa = new NodeRSA();
  rsa.importKey(pemKey, 'pkcs1');
  const components = rsa.exportKey('components');

  const jwk = {
    kty: 'RSA',
    n: base64urlEncode(components.n),
    e: base64urlEncode(Buffer.from([0x01, 0x00, 0x01])),
    d: base64urlEncode(components.d),
    p: base64urlEncode(components.p),
    q: base64urlEncode(components.q),
    dp: base64urlEncode(components.dmp1),
    dq: base64urlEncode(components.dmq1),
    qi: base64urlEncode(components.coeff),
  };

  const privateKey = await jose.importJWK(jwk, alg);

  const token = await new jose.SignJWT({
    clientId: '1419249a-abfd-4345-9dce-651b8c251abd' /*process.env.AZURE_AD_CLIENT_ID*/,
  }).setProtectedHeader({ kid: 'abd123', alg: 'RS256' }).setIssuer('ProyectoFlutter').sign(privateKey);

  localStorage.setItem("token", token);

}
