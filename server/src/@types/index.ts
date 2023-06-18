export type MockProvider<T> = {
    [P in keyof T]: jest.Mock<any>;
};
