
export default class Utils {

    public static passwordGenerator(length: number): string {

        const charStack = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789:;?<>&*%#!-_=';

        let pass = '';

        for(let i = 0; i < length; i++) {
            pass = `${pass}${charStack.charAt(this.getRandomInt(charStack.length))}`;
        }

        return pass;

    }

    public static verificationTokenGenerator(length: number): string {

        const charStack = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        let pass = '';

        for(let i = 0; i < length; i++) {
            pass = `${pass}${charStack.charAt(this.getRandomInt(charStack.length))}`;
        }

        return pass;

    }

    public static getRandomInt(max: number): number {
        return Math.floor(Math.random()/1 * max);
    }

}