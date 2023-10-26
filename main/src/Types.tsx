// Dans un fichier types.ts (ou n'importe quel nom que vous préférez)
export interface Doctor {
    firstName: string;
    lastName: string;
    gender: string; // Vous pouvez spécifier un type plus spécifique, par exemple "Male" | "Female"
    specialization: string;
    latitude: number;
    longitude: number;
  }
  