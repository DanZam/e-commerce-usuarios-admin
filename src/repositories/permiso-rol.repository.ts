import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {PermisoRol, PermisoRolRelations} from '../models';

export class PermisoRolRepository extends DefaultCrudRepository<
  PermisoRol,
  typeof PermisoRol.prototype._id,
  PermisoRolRelations
> {
  constructor(
    @inject('datasources.mongoDb') dataSource: MongoDbDataSource,
  ) {
    super(PermisoRol, dataSource);
  }
}
