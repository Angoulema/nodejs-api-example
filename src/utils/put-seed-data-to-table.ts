import connection from "../persistance/data-source";

export async function putSeedData<T>(entity: string, data: Partial<T>[]) {
  await connection.getRepository(entity).save(data);
}
