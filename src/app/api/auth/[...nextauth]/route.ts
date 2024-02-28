import NextAuth, { AuthOptions } from 'next-auth'
import KeycloakProvider, { KeycloakProfile } from 'next-auth/providers/keycloak'
import { JWT } from 'next-auth/jwt'
import { OAuthConfig } from 'next-auth/providers'

export const authOptions: AuthOptions = {
  session: {
    strategy: 'jwt',
  },
  providers: [
    KeycloakProvider({
      clientId: process.env.KEYCLOAK_CLIENT_ID,
      clientSecret: process.env.KEYCLOAK_SECRET,
      issuer: process.env.KEYCLOAK_ISSUER,
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.id_token = account.id_token
        token.provider = account.provider
        token.accessToken = account.access_token
      }
      return token
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      // @ts-ignore
      session.idToken = token.id_token
      // @ts-ignore
      session.accessToken = token.accessToken
      return session
    },
  },
  events: {
    async signOut(message) {
      const token = message.token as JWT
      if (token.provider === 'keycloak') {
        const issuerUrl = (
          authOptions.providers.find(
            (p) => p.id === 'keycloak',
          ) as OAuthConfig<KeycloakProfile>
        ).options!.issuer!
        const logOutUrl = new URL(`${issuerUrl}/protocol/openid-connect/logout`)
        // @ts-ignore
        logOutUrl.searchParams.set('id_token_hint', token.id_token!)
        await fetch(logOutUrl)
      }
    },
  },
}
const handler = NextAuth(authOptions)
// return 'http://comcert-auth-keycloak-main.cde.comcert.pl'
// return `${process.env.KEYCLOAK_ISSUER}/protocol/openid-connect/logout?redirect_uri=${process.env.NEXTAUTH_URL}`

export { handler as GET, handler as POST }
