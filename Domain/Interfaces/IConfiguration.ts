
export default interface IConfiguration {

    getConfiguration<T>(confName: string): T;
    setConfiguration(confName: string, value: any): void;
}