import { AbstractAdoptionEntity } from "../entities/abstract.adoption";
import { DogEntity } from "../entities/dog.entity";

export type MockProvider<T> = {
    [P in keyof T]: jest.Mock<any>;
};

export interface Adoption extends AbstractAdoptionEntity {
    dog: DogEntity
}



