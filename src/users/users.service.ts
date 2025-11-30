import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'; // 🔑 Pour injecter le Repository
import { Repository } from 'typeorm'; // 📦 Type du Repository
import { User } from './user.entity'; // 📋 Notre entité
import { ObjectId } from 'mongodb'; // 🆔 Type ObjectId de MongoDB

@Injectable()
export class UsersService {
  // 🔑 Injection de dépendances : on injecte le Repository<User>
  // TypeORM crée automatiquement ce repository grâce à TypeOrmModule.forFeature([User])
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  // 📥 Méthode 1 : Créer un nouvel utilisateur
  // active est mis à false par défaut (défini dans l'entité)
  async create(email: string, password: string): Promise<User> {
    // Créer une instance de User
    const newUser = this.usersRepository.create({
      email,
      password, // ⚠️ TODO: Hasher le password avec bcrypt plus tard
      active: false, // 🔒 Utilisateur non actif par défaut
    });

    // Sauvegarder dans MongoDB
    return await this.usersRepository.save(newUser);
  }

  // 📋 Méthode 2 : Récupérer tous les utilisateurs
  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  // 🔍 Méthode 3 : Trouver un utilisateur par ID
  async findOneById(id: string): Promise<User | null> {
    // Convertir la string en ObjectId MongoDB
    const objectId = new ObjectId(id);
    
    // Chercher par _id (MongoDB utilise _id, pas id)
    return await this.usersRepository.findOne({
      where: { _id: objectId } as any,
    });
  }

  // 📧 Méthode 4 : Trouver un utilisateur par email
  async findOneByEmail(email: string): Promise<User | null> {
    return await this.usersRepository.findOne({
      where: { email } as any,
    });
  }

  // ✅ Méthode 5 : Récupérer tous les utilisateurs actifs (active = true)
  async findActive(): Promise<User[]> {
    return await this.usersRepository.find({
      where: { active: true } as any,
    });
  }

  // 🔄 Méthode 6 : Mettre à jour partiellement un utilisateur
  // On peut mettre à jour n'importe quel champ (email, password, active)
  async update(id: string, updateData: Partial<User>): Promise<User | null> {
    const objectId = new ObjectId(id);
    
    // Mettre à jour avec les données partielles
    await this.usersRepository.update(
      { _id: objectId } as any,
      updateData,
    );
    
    // Retourner l'utilisateur mis à jour
    return await this.findOneById(id);
  }

  // 🗑️ Méthode 7 : Supprimer un utilisateur
  async remove(id: string): Promise<boolean> {
    const objectId = new ObjectId(id);
    
    const result = await this.usersRepository.delete({
      _id: objectId,
    } as any);
    
    // Retourne true si au moins 1 document supprimé
    return (result.affected ?? 0) > 0;
  }

  // 🔓 Méthode 8 : Activer un compte utilisateur (avec vérification password)
  async activateAccount(email: string, password: string): Promise<User | null> {
    // 1. Chercher l'utilisateur par email
    const user = await this.findOneByEmail(email);
    
    if (!user) {
      return null; // Utilisateur non trouvé
    }
    
    // 2. Vérifier le password (⚠️ TODO: utiliser bcrypt.compare() plus tard)
    if (user.password !== password) {
      return null; // Password incorrect
    }
    
    // 3. Activer le compte
    user.active = true;
    return await this.usersRepository.save(user);
  }
}