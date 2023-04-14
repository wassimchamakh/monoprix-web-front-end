export class User {
    id!:number ; 
    password!:string ; 
}

interface InventoryStatus {
    label: string;
    value: string;
}
export interface Product {
    id?: number;
    actif?: boolean;  
    nomuser?: string;
    email?: string;
    inventoryStatus?: InventoryStatus;
    password?: string;
 
    datecreation?:number ; 
    date_update?:number ; 
   
}

export class Userput {
    id?: number;
    nomuser!: string;
    email!: string;
    password!: string;
    id_role!: number;
    actif!: boolean;
    date_update: Date = new Date();
    datecreation: Date = new Date();
  

  }

  export class Userupdate {
    id!: number;
    nomuser!: string;
    email!: string;
    password!: string;
    id_role!: number;
    actif!: boolean;
    date_update: Date = new Date();
    datecreation!: any ; 
    usercreation: any ; 
    userupdate: any ; 
  }

  export class roleadd {
    id?:number ; 
    design_r!: string ; 
    dateUpdate: Date = new Date();
    datecreation: Date = new Date() ; 

  }
export class roleupdate {
    id!:number ; 
    design_r!: string ; 
    dateUpdate: Date = new Date();
    datecreation!: any ; 
    usercreation: any ; 
    userUpdate: any ; 
}

export class zones{
  id!:number ; 
  design_z!: string ; 
  id_user!:any ; 
}


export class zonesadd{
  design_z!: string ; 
  nomuser:string[]=[] ; 
}

export class sites{
      id!:number ; 
      nomsite!:string ; 
      email_site!:string ;
      tel!:number ; 
      manager_site!:string ; 
      numerofax!:number ; 
      codepostal_site!:string;  
      adresse_site!:string ; 
      canalDistribSite!:string ;
      latitude_site!:number ;
      longitude_site!:number ; 
      modepaimentSite!:string ; 
      conditionPaimentSite!:string ; 
      reference_erp_site!:string ;
      datecreation:any ; 
      enseigne:any ;  
      id_zone:any ; 
      userupdate:any ; 
      usercreation:any ; 
}

export class article  {
      id!:number ; 
      code_art!:string 
      reference_art!:number ; 
      design_art!:string ;
      gamme_art!:number; 
      prix_art!:number;
      marque_art!:string ; 
      id_structmarch!:number; 
      datecreation:any ; 
      userupdate:any ; 
      usercreation:any ; 
}



