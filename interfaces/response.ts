export default interface Response<D> {
    data: Array<D>,
    meta: Record<string, unknown>,
    error?: Record<string, unknown>,
}

export interface Wrapped<D> { 
    data: D | null
}