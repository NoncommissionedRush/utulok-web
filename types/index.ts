import { AbstractAdoptionEntity } from "../server/src/entities/abstract.adoption";
import { DogEntity } from "../server/src/entities/dog.entity";

export enum Size {
    SMALL = "small",
    MEDIUM = "medium",
    BIG = "big",
  }
  
  export enum Sex {
    MALE = 'male',
    FEMALE = 'female',
  }
  
  export enum Age {
    PUPPY = "puppy",
    TEENAGER = "teen",
    ADULT = "adult",
    SENIOR = "senior",
  }
  
  export enum DogStatus {
    AVAILABLE = 'available',
    ADOPTED = 'adopted',
    DECEASED = 'deceased'
  }
  
  export enum EligibleFor {
    STANDARD = 'standard',
    VIRTUAL_ONLY = 'virtual_only',
  }

export enum AdoptionApprovalStatus {
    PENDING = 'PENDING',
    APPROVED = 'APPROVED',
    REJECTED = 'REJECTED',
}

export enum AdoptionType {
  STANDARD = 'standard',
  VIRTUAL = 'virtual',
  TEMPORARY = 'temp'
}


export type MockProvider<T> = {
    [P in keyof T]: jest.Mock<any>;
};

export interface Adoption extends AbstractAdoptionEntity {
    dog: DogEntity
}

export interface Image {
  url: string;
}

export interface Dog {
  name: string;

  size: Size;

  sex: Sex;

  age: Age;

  status: DogStatus;

  eligibleFor: EligibleFor;

  breed: string;

  color: string;

  isKidFriendly: boolean;

  isVaccinated: boolean;

  isCastrated: boolean;

  mainImageUrl: string;
  
  images?: Image[] | string[]
}

