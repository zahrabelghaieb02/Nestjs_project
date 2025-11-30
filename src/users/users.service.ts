import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./users.entity";
import { Repository } from "typeorm";
import { ObjectId } from "mongodb";

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

    async create(email: string, password: string): Promise<User> {
        try {
            const user = this.userRepository.create({ email, password, active: false });
            await this.userRepository.save(user);
            return user;
        } catch (error) {
            console.error("error lors de creation de user", error);
            throw new InternalServerErrorException("erreur lors de la creation");
        }
        
    }
    async findALL():Promise<User[]>{
        try{
       const list= await this.userRepository.find();
        if(list.length===0){
            throw new NotFoundException("Aucun user trouvé");
        }
        return list ; 
    }catch(error){
        throw new InternalServerErrorException("listevide")
    }
    }
    async findOneById(id:ObjectId):Promise<User>{
        try {
            const user = await this.userRepository.findOneBy({ id });
            if(!user){
                throw new NotFoundException("user not find ")
            }
            return user; 
            
        } catch (error) {
            throw new InternalServerErrorException("server error")
            
        }
    }
}