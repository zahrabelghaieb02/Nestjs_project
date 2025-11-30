import {
  Entity,
  ObjectIdColumn,
  ObjectId,
  Column,
  BeforeInsert,
  AfterInsert,
  AfterUpdate,
  BeforeRemove,
  AfterLoad,
} from 'typeorm';
import { Logger } from '@nestjs/common'; // 📝 Logger de NestJS

// 🎯 L'entité User représente un document dans la collection MongoDB "user"
@Entity()
export class User {
  // 📝 Logger pour cette entité (contexte "User")
  private readonly logger = new Logger(User.name);

  // 🔑 Clé primaire MongoDB (ObjectId généré automatiquement)
  // MongoDB utilise _id par défaut (pas "id")
  @ObjectIdColumn()
  _id: ObjectId;

  // 📧 Email de l'utilisateur
  @Column()
  email: string;

  // 🔒 Mot de passe (à hasher plus tard avec bcrypt!)
  @Column()
  password: string;

  // ✅ Statut d'activation (false par défaut)
  // L'utilisateur doit confirmer son email pour activer le compte
  @Column({ default: false })
  active: boolean;

  // 🪝 HOOK 1 : Avant l'insertion
  @BeforeInsert()
  logBeforeInsert() {
    this.logger.log(
      `📥 Tentative d'insertion d'un nouvel utilisateur avec email: ${this.email}`,
    );
  }

  // 🪝 HOOK 2 : Après l'insertion
  @AfterInsert()
  logAfterInsert() {
    this.logger.log(
      `✅ Utilisateur créé avec succès - ID: ${this._id} | Email: ${this.email}`,
    );
  }

  // 🪝 HOOK 3 : Après la mise à jour
  @AfterUpdate()
  logAfterUpdate() {
    this.logger.log(
      `🔄 Utilisateur mis à jour - ID: ${this._id} | Email: ${this.email} | Active: ${this.active}`,
    );
  }

  // 🪝 HOOK 4 : Avant la suppression
  @BeforeRemove()
  logBeforeRemove() {
    this.logger.warn(
      `🗑️ Suppression de l'utilisateur - ID: ${this._id} | Email: ${this.email}`,
    );
  }

  // 🪝 HOOK 5 : Après le chargement depuis MongoDB
  @AfterLoad()
  logAfterLoad() {
    this.logger.debug(
      `📖 Utilisateur chargé depuis la base - ID: ${this._id} | Email: ${this.email}`,
    );
  }
}