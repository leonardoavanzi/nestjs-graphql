import {ArgsType, Field} from '@nestjs/graphql'
import { isArray, IsArray } from 'class-validator';


@ArgsType()
export class GetUsersArgs {
    @Field(() => [String])
    @IsArray()
    ids: string[];

}