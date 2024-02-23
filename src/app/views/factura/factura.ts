export interface Factura{
    FacturaId: number;
    Nombre: string;
    ClienteId:number;
    Observacion:string;
    Fecha:Date;
    FacturaTotal : number
    // menuAccion: MenuAccionRelDTO[];
}

export interface FacturaDetalle{
    productoId: number;
    productoName:string;
    cantidad:number;
    precio:number;
    total:number;
}