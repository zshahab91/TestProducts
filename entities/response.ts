export interface IResponse<Entity> {
    succeed: boolean,
    message: string,
    results: Entity,
    metas: { [key: string]: unknown }
}