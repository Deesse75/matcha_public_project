
export type CreateUser = {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  hashpass: string;
};


export type MysqlUserType = {
    id: number;
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    emailCode: number;
    emailCertified: boolean;
    hashedPassword: string;
    passwordCode: number;
    birthdate: Date;
    gender: string;
    orientation: string;
    region: string;
    tall: number;
    physique: string;
    diet: string;
    popularity: number;
    photo1: string;
    photo2: string;
    photo3: string;
    photo4: string;
    photo5: string;
    title: string;
    bio: string;
    pourcentFilled: number;
    lastConnection: Date;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
};

