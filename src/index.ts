import { DataSource, LessThanOrEqual, Like, MoreThanOrEqual } from "typeorm";
import "reflect-metadata";
import { User } from "./entity/User";
import { Comment } from "./entity/Comment";

export const AppDataSource: DataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "123456",
  database: "zero",
  entities: ["src/entity/**/*.ts"],
  synchronize: true,
  logging: true,
  migrations: [],
});

(async function main() {
  try {
    const dataSource = await AppDataSource.initialize();
    const userRepos = dataSource.getRepository(User);
    const commentRepos = dataSource.getRepository(Comment);

    // C
    // const user = new User();
    // user.nick = "zero";
    // user.salary = 100;
    // await userRepos.save(user);

    // R
    // const users = await userRepos.find({
    //   where: {
    //     salary: MoreThanOrEqual(400),
    //   },
    // });
    // console.log(users);

    // R with order
    // const userss = await userRepos.find({
    //   where: [{ nick: Like("%zero%") }],
    //   order: {
    //     salary: "ASC",
    //   },
    //   skip: 0,
    //   take: 100,
    // });
    // console.log(userss);

    // U
    // const user = await userRepos.findOne({
    //   where: { id: 1 },
    // });
    // console.log(user);
    // user.nick = "zeroooop";
    // await userRepos.save(user);

    // D
    // const user = await userRepos.findOne({
    //   where: { id: 4 },
    // });
    // console.log(user);
    // const res = await userRepos.remove(user);
    // console.log(res);

    // R with relations
    const comments = await commentRepos.find({
      relations: ["user"],
    });
    console.log(comments);

    // R with relations
    const users = await userRepos.find({
      relations: ["comments"],
    });
    console.log(JSON.stringify(users, null, 2));

    dataSource.destroy();
  } catch (e) {
    console.error(e);
  }
})();
