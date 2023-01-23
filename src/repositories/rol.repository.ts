import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Rol, RolRelations, Usuario, Permiso, PermisoRol} from '../models';
import {UsuarioRepository} from './usuario.repository';
import {PermisoRolRepository} from './permiso-rol.repository';
import {PermisoRepository} from './permiso.repository';

export class RolRepository extends DefaultCrudRepository<
  Rol,
  typeof Rol.prototype._id,
  RolRelations
> {

  public readonly usuarios: HasManyRepositoryFactory<Usuario, typeof Rol.prototype._id>;

  public readonly tienepermisos: HasManyThroughRepositoryFactory<Permiso, typeof Permiso.prototype._id,
          PermisoRol,
          typeof Rol.prototype._id
        >;

  constructor(
    @inject('datasources.mongoDb') dataSource: MongoDbDataSource, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>, @repository.getter('PermisoRolRepository') protected permisoRolRepositoryGetter: Getter<PermisoRolRepository>, @repository.getter('PermisoRepository') protected permisoRepositoryGetter: Getter<PermisoRepository>,
  ) {
    super(Rol, dataSource);
    this.tienepermisos = this.createHasManyThroughRepositoryFactoryFor('tienepermisos', permisoRepositoryGetter, permisoRolRepositoryGetter,);
    this.registerInclusionResolver('tienepermisos', this.tienepermisos.inclusionResolver);
    this.usuarios = this.createHasManyRepositoryFactoryFor('usuarios', usuarioRepositoryGetter,);
    this.registerInclusionResolver('usuarios', this.usuarios.inclusionResolver);
  }
}
