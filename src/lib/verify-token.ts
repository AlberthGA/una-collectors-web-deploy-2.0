import { NextRequest } from 'next/server';
import * as jose from 'jose';


export default async function validateToken(req: NextRequest) {
  try {
    const authorizationHeader = req.headers.get('authorization');
    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
      return false;
    }
    const token = authorizationHeader.split(' ')[1];

    const pKey = process.env.PUBLIC_KEY;
    const clientId = process.env.AZURE_AD_CLIENT_ID;

    const alg = 'RS256'
    const spki = `-----BEGIN PUBLIC KEY-----\n${pKey}\n-----END PUBLIC KEY-----`
    const publicKey = await jose.importSPKI(spki, alg)

    const { payload, protectedHeader } = await jose.jwtVerify(token, publicKey, {
      issuer: "ProyectoFlutter"
    })

    if (!(payload.clientId == clientId && protectedHeader.kid == 'abd123')) return false
    return true;
  }
  catch (err) {
    console.log(err);
    return false;
  }
}
