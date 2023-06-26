import { AbstractAdoptionEntity } from "../entities/abstract.adoption";
import { Age, DogEntity, DogStatus, EligibleFor, Sex, Size } from "../entities/dog.entity";

export type MockProvider<T> = {
    [P in keyof T]: jest.Mock<any>;
};

export interface Adoption extends AbstractAdoptionEntity {
    dog: DogEntity
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
}




