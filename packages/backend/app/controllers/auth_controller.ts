import User from '#models/user'
import { registerValidator } from '#validators/auth'
import { AccessToken } from '@adonisjs/auth/access_tokens'
import { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  async login({ request, auth }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])

    const user = await User.verifyCredentials(email, password)

    // clear previous expired access tokens
    const previousTokens = await User.accessTokens.all(user)
    const expiredTokens = previousTokens.filter((token) => token.isExpired())
    await Promise.all(
      expiredTokens.map((token) => User.accessTokens.delete(user, token.identifier))
    )

    const token = await auth.use('api').createToken(user)

    return this.buildAuthResponse(user, token)
  }

  async register({ request, auth }: HttpContext) {
    const data = request.only(['email', 'password'])

    const validatedData = await registerValidator.validate(data)

    const user = await User.create(validatedData)

    const token = await auth.use('api').createToken(user)

    return this.buildAuthResponse(user, token)
  }

  async logout({ auth }: HttpContext) {
    const user = auth.getUserOrFail()
    await auth.use('api').invalidateToken()
    await User.accessTokens.delete(user, user.currentAccessToken.identifier)
  }

  private buildAuthResponse(user: User, token: AccessToken) {
    return {
      displayName: user.fullName || user.email,
      token: token.value?.release() || null,
    }
  }
}
