import {
  Attributes,
  CreateOptions,
  CreationAttributes,
  DestroyOptions,
  FindOptions,
  Model,
  ModelStatic,
  UpdateOptions,
  WhereOptions,
} from "sequelize";

export abstract class BaseRepository<T extends Model> {
  protected model: ModelStatic<T>;

  constructor(model: ModelStatic<T>) {
    this.model = model;
  }

  async create(data: CreationAttributes<T>): Promise<T> {
    return this.model.create(data);
  }

  async createWithOptions(
    data: CreationAttributes<T>,
    options?: CreateOptions<Attributes<T>>,
  ): Promise<T> {
    return this.model.create(data, options);
  }

  async bulkCreate(
    data: CreationAttributes<T>[],
    options?: CreateOptions<Attributes<T>>,
  ): Promise<T[]> {
    return this.model.bulkCreate(data, options);
  }

  async findById(id: number): Promise<T | null> {
    return this.model.findByPk(id);
  }

  async findByIdWithOptions(
    id: number,
    options?: Omit<FindOptions<Attributes<T>>, "where">,
  ): Promise<T | null> {
    return this.model.findByPk(id, options);
  }

  async findOne(where: WhereOptions<Attributes<T>>): Promise<T | null> {
    return this.model.findOne({
      where,
    });
  }

  async findOneWithOptions(
    options?: FindOptions<Attributes<T>>,
  ): Promise<T | null> {
    return this.model.findOne(options);
  }

  async findAll(options?: FindOptions<Attributes<T>>): Promise<T[]> {
    return this.model.findAll(options);
  }

  async findAllWithOptions(options?: FindOptions<Attributes<T>>): Promise<T[]> {
    return this.model.findAll(options);
  }

  async update(
    where: WhereOptions<Attributes<T>>,
    data: Partial<Attributes<T>>,
    options?: Omit<UpdateOptions<Attributes<T>>, "where">,
  ): Promise<[number]> {
    return this.model.update(data, {
      where,
      ...options,
    });
  }

  async delete(
    where: WhereOptions<Attributes<T>>,
    options?: Omit<DestroyOptions<Attributes<T>>, "where">,
  ): Promise<number> {
    return this.model.destroy({
      where,
      ...options,
    });
  }

  async count(options?: FindOptions): Promise<number> {
    return this.model.count(options);
  }

  async sum(
    field: keyof Attributes<T>,
    options?: FindOptions<Attributes<T>>,
  ): Promise<number | null> {
    return this.model.sum(field as string, options);
  }

  async exists(where: WhereOptions<Attributes<T>>): Promise<boolean> {
    const count = await this.model.count({
      where,
    });

    return count > 0;
  }
}
