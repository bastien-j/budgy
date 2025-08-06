/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

router.post('/login', [() => import('#controllers/auth_controller'), 'login'])
router.post('/register', [() => import('#controllers/auth_controller'), 'register'])
router
  .get('/logout', [() => import('#controllers/auth_controller'), 'logout'])
  .use(middleware.auth())
