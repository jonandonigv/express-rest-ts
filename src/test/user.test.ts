import assert from "assert";
import { User } from "../models/user";
import * as AuthController from '../controllers/auth';


describe('User', () => {
    describe('#save()', () => {
        it('Should save the user without error', (done) => {
            var user = new User({
                name: 'Test',
                email: 'Test@Test.com',
                password: '123456'
            });
            user.save((err: any) => {
                if (err) done(err);
                else done();
            });
        });
    });
});