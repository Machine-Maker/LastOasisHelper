import { auth } from '../middleware'
import { errors } from '../validators'
import { formatQuery } from '../utils'
import get, { userParam } from './get'
import add from './add'
import remove from './remove'
import update, { permissionBody } from './update'

export default (router) => {
  router.get('/users', [auth(), errors], async (req, res) => {
    const client = await global.pool.connect()
    const results = await client.query('SELECT * FROM users')
    client.release()
    res.status(200).send(formatQuery(results))
  })

  router.get('/users/:user', [auth(), ...userParam, errors], get)

  router.post('/users/:user', [auth('ADD_USER'), ...userParam, ...permissionBody, errors], add)

  router.delete('/users/:user', [auth('DELETE_USER'), ...userParam, errors], remove)

  router.put('/users/:user', [auth('EDIT_USER'), ...userParam, ...permissionBody, errors], update)
}
