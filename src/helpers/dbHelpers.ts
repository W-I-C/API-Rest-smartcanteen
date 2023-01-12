import { createClient } from "../config/db";

export async function getRefreshToken(uid: string) {
  // verificar se o token de refresh expirou
  const getRefreshTokenDBClient = createClient();
  const query = await getRefreshTokenDBClient.query(`SELECT refreshtoken FROM users 
                                              WHERE uid = $1
                                              `, [uid])

  await getRefreshTokenDBClient.end()

  if (query['rows'].length >= 1)
    return query['rows'][0]['refreshtoken']
  else
    return undefined
}


export async function getNotStartedStatusId() {
  const getNotStartedStatusIdDBClient = createClient();
  const query = await getNotStartedStatusIdDBClient.query(`SELECT stateid FROM states WHERE name=$1`, ['Não Iniciado'])

  await getNotStartedStatusIdDBClient.end()

  return query['rows'][0]['stateid']
}

export async function getDeliveredStatusId() {
  const getNotStartedStatusIdDBClient = createClient();
  const query = await getNotStartedStatusIdDBClient.query(`SELECT stateid FROM states WHERE name=$1`, ['Entregue'])

  await getNotStartedStatusIdDBClient.end()

  return query['rows'][0]['stateid']
}

export async function getUserName(uid: string) {
  const getUserNameDBClient = createClient()
  const query = await getUserNameDBClient.query(`SELECT name FROM users WHERE uid=$1`, [uid])

  await getUserNameDBClient.end()

  return query['rows'][0]['name']
}

export async function getUserRole(uid: string) {
  const getUserRoleDBClient = createClient()
  const query = await getUserRoleDBClient.query('SELECT userrole.name FROM users JOIN userrole On userrole.roleid = users.roleid WHERE uid=$1', [uid])

  await getUserRoleDBClient.end()

  return query['rows'][0]['name']
}