export class User {
  email!: string;
  password!: string;
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
  datecreation?: number;
  date_update?: number;

}

export class Userput {
  id?: number;
  nomuser!: string;
  email!: string;
  password!: string;
  id_role: any[] = [];
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
  datecreation!: any;
  usercreation: any;
  userupdate: any;
}

export class roleadd {
  id?: number;
  design_r!: string;
  dateUpdate: Date = new Date();
  datecreation: Date = new Date();

}
export class roleupdate {
  id!: number;
  design_r!: string;
  dateUpdate: Date = new Date();
  datecreation!: any;
  usercreation: any;
  userUpdate: any;
}

export class zones {
  id!: number;
  designZ!: string;
  users!: any;
}


export class zonesadd {
  id!: number;
  designZ!: string;
  nomuser: string[] = [];
}
export class enseigne {
  nom_ens!: String;
  usercreation: any;
  userUpdate: any;
}

export class enseigneupd {
  id!: number;
  nom_ens!: String;
  usercreation: any;
  userUpdate: any;
}

export class sites {
  id!: number;
  nomsite!: string;
  email_site!: string;
  tel!: number;
  manager_site!: string;
  numerofax!: number;
  codepostal_site!: string;
  adresse_site!: string;
  canalDistribSite!: string;
  latitude_site!: number;
  longitude_site!: number;
  modepaimentSite!: string;
  conditionPaimentSite!: string;
  reference_erp_site!: string;
  datecreation: any;
  enseigne: any;
  zone: any[] = [];
  userupdate: any;
  usercreation: any;
}

export class article {
  id!: number;
  code_art!: string
  reference_art!: number;
  design_art!: string;
  gamme_art!: number;
  prix_art!: number;
  marque_art!: string;
  id_structmarch!: number;
  datecreation: any;
  userupdate: any;
  usercreation: any;
}

export class Mission {
  id!: number;
  nom_miss!: string;
  descrip_miss!: string;
  maxdiff!: number;
  tags!: string;
  usercreation: any;
  userupdate: any;
  users : any;
  site: any[] = [];
  date_miss!: Date;
  etat!: string
  id_type: any;
  rupture: any;
  nonreconnue: any;
  // date_debut: any;
  // date_cloturer: any;
}

export class TypeMission {
  id!: number;
  nom_type!: String;
  desc_type!: String;
}


