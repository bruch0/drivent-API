
export async function findSessionByToken(token: string) {
  const session = await Session.findOne({ where: { token } });

  return session;
}
