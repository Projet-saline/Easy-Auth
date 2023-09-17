import { Table, Model, Column, DataType, CreatedAt, UpdatedAt } from "sequelize-typescript";

@Table({
    tableName: 'users',
    timestamps: true
})

// Le modèle User est une classe qui va représenter la table users dans la base de données.
class User extends Model {
    @Column({
        primaryKey: true,
        type: DataType.INTEGER.UNSIGNED,
        autoIncrement: true,
        allowNull: false,
        // defaultValue: DataType.UUIDV4
    })
    declare idUser: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare username: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare email: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare password: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        defaultValue: 'student'
    })
    declare role: string;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false
    })
    declare is_premium: boolean;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false
    })
    declare is_admin: boolean;

    @CreatedAt
    declare created_at: true;

    @UpdatedAt
    declare updated_at: 'updateTimestamp';
}

export default User;