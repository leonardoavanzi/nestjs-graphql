import { Injectable } from "@nestjs/common";
import { CreateUserInput } from "./dto/input/create-user.input";
import { User } from "./models/user";
import { v4 as uuidv4} from "uuid";
import { UpdateUserInput } from "./dto/input/update-user.input";
import { GetUserArgs } from "./dto/args/get-user.args";
import { GetUsersArgs } from "./dto/args/get-users.args";
import { DeleteUserInput } from "./dto/input/delete-user.input";

@Injectable()
export class UsersService {
    private users: User[] = [];

    public createUser(createUserData: CreateUserInput): User {
        const user: User = {
            id: uuidv4(),
            ...createUserData
        }

        this.users.push(user);

        return user;

    };

    public updateUser(updateUserData: UpdateUserInput): User {
        const user = this.users.find(x => x.id === updateUserData.id); 

        Object.assign(user, updateUserData);
        return user;

    };

    public getUser(getUserArgs: GetUserArgs): User {
        return this.users.find(x => x.id === getUserArgs.id);
    };

    public getUsers(getUsersArgs: GetUsersArgs): User[] {
        //
        return getUsersArgs.ids.map((x) => this.getUser({id: x}));
       
    };

    public deleteUser(deleteUserData: DeleteUserInput): User {
        const userIndex = this.users.findIndex(x => x.id === deleteUserData.id);
        const user = this.users[userIndex];

        this.users.splice(userIndex);
        return user;

    };


}